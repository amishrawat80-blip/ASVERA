/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Upload, RotateCcw, Plus, X, Sparkles } from 'lucide-react';

export interface CarouselClothingItem {
  id: string;
  src: string;
  title: string;
  subtitle?: string;
  price?: string;
  isCustomUpload?: boolean;
}

interface ClothingCarousel3DProps {
  defaultItems: CarouselClothingItem[];
  onSelectItem?: (item: CarouselClothingItem) => void;
}

const STORAGE_KEY = 'asvera_custom_carousel_uploads_v1';

export default function ClothingCarousel3D({
  defaultItems,
  onSelectItem,
}: ClothingCarousel3DProps) {
  const [customUploads, setCustomUploads] = useState<CarouselClothingItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [showManageTray, setShowManageTray] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save custom uploads to localStorage when updated
  useEffect(() => {
    try {
      if (customUploads.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customUploads));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore quota errors for large base64 files
    }
  }, [customUploads]);

  // If the user has uploaded their own ASVÉRA clothing images, ONLY show those uploaded images.
  // Otherwise, show the ASVÉRA clothing images from the site collection.
  const sourceItems = useMemo(() => {
    return customUploads.length > 0 ? customUploads : defaultItems;
  }, [customUploads, defaultItems]);

  // Build a repeated virtual ring of at least 14 cards so the 3D track is always wider than any screen
  // and loops infinitely from right to left with zero gaps or jumps.
  const virtualCards = useMemo(() => {
    if (sourceItems.length === 0) return [];
    const minSlots = 14;
    const repeats = Math.max(2, Math.ceil(minSlots / sourceItems.length));
    const list: Array<{ slotKey: string; item: CarouselClothingItem; originalIndex: number }> = [];
    for (let r = 0; r < repeats; r++) {
      for (let i = 0; i < sourceItems.length; i++) {
        list.push({
          slotKey: `slot-${r}-${i}-${sourceItems[i].id}`,
          item: sourceItems[i],
          originalIndex: i,
        });
      }
    }
    return list;
  }, [sourceItems]);

  // Refs for 60fps/120fps requestAnimationFrame loop without React re-renders
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollOffsetRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  const pointerStartXRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);
  const hasMovedPointerRef = useRef<boolean>(false);

  // Handle manual image file uploads
  const processFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    );
    if (validFiles.length === 0) return;

    Promise.all(
      validFiles.map(
        (file, idx) =>
          new Promise<CarouselClothingItem>((resolve) => {
            const reader = new FileReader();
            const cleanName = file.name
              .replace(/\.[^/.]+$/, '')
              .replace(/[-_]+/g, ' ')
              .trim();
            reader.onload = () => {
              resolve({
                id: `custom-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 7)}`,
                src: reader.result as string,
                title: cleanName || `ASVÉRA Piece ${idx + 1}`,
                subtitle: 'ASVÉRA Archival Piece',
                isCustomUpload: true,
              });
            };
            reader.readAsDataURL(file);
          })
      )
    ).then((newItems) => {
      setCustomUploads((prev) => [...prev, ...newItems]);
    });
  }, []);

  const handleRemoveUploadedItem = (id: string) => {
    setCustomUploads((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetToDefault = () => {
    setCustomUploads([]);
    setShowManageTray(false);
  };

  // Continuous 3D right-to-left animation loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();

    // Base continuous speed in pixels per millisecond (slow, luxury right-to-left drift ~42px/sec)
    const BASE_SPEED = 0.042;

    const renderFrame = (now: number) => {
      const dt = Math.min(48, Math.max(0, now - lastTime));
      lastTime = now;

      const stageEl = stageRef.current;
      const numCards = virtualCards.length;

      if (stageEl && numCards > 0) {
        const viewportW = stageEl.clientWidth || window.innerWidth;
        const isMobile = viewportW < 640;
        const isTablet = viewportW >= 640 && viewportW < 1024;

        // Consistent spacing between vertical cards
        const cardWidth = isMobile ? 185 : isTablet ? 225 : 255;
        const cardGap = isMobile ? 20 : isTablet ? 26 : 32;
        const step = cardWidth + cardGap;
        const totalTrackWidth = numCards * step;
        const halfTrack = totalTrackWidth / 2;

        // Advance offset continuously from right to left when not actively dragging
        if (!isPointerDownRef.current) {
          scrollOffsetRef.current += BASE_SPEED * dt + dragVelocityRef.current * dt;
          // Smoothly decay any swipe momentum back to 0
          dragVelocityRef.current *= Math.pow(0.94, dt / 16);
          if (Math.abs(dragVelocityRef.current) < 0.001) {
            dragVelocityRef.current = 0;
          }
        }

        // Keep scrollOffset bounded within [0, totalTrackWidth) for numerical precision
        scrollOffsetRef.current =
          ((scrollOffsetRef.current % totalTrackWidth) + totalTrackWidth) %
          totalTrackWidth;

        // Radius of the visible 3D arc
        const visibleRadius = Math.max(viewportW * 0.56, step * 3.2);

        for (let i = 0; i < numCards; i++) {
          const cardEl = cardRefs.current[i];
          if (!cardEl) continue;

          // Raw position moving right-to-left as scrollOffsetRef increases
          const rawX = i * step - scrollOffsetRef.current;

          // Wrap seamlessly into [-halfTrack, +halfTrack]
          const wrappedX =
            ((((rawX + halfTrack) % totalTrackWidth) + totalTrackWidth) %
              totalTrackWidth) -
            halfTrack;

          // Normalized distance from center: 0 at center, -1 at left edge, +1 at right edge
          const norm = wrappedX / visibleRadius;
          const absNorm = Math.abs(norm);

          if (absNorm > 1.35) {
            // Card is well outside the visible viewport frustum
            cardEl.style.opacity = '0';
            cardEl.style.pointerEvents = 'none';
            cardEl.style.transform = `translate3d(${wrappedX.toFixed(1)}px, 0px, -400px) scale(0.6)`;
            continue;
          }

          // Curved 3D perspective math:
          // - Center cards (norm = 0) are largest (scale ~ 1.08) and closest (translateZ = +65px)
          // - Side cards gradually become smaller (down to ~0.74) and angle away in 3D
          const clampedNorm = Math.max(-1.25, Math.min(1.25, norm));
          const cosFactor = Math.cos(clampedNorm * 1.05); // 1 at center, tapers toward edges

          const scale = 0.74 + 0.34 * Math.max(0, cosFactor);
          const translateZ = (cosFactor - 1) * (isMobile ? 130 : 210) + (isMobile ? 35 : 65);
          // Angle side cards away in 3D so they follow a sleek curved gallery arc
          const rotateY = -clampedNorm * (isMobile ? 24 : 32);

          // Subtle horizontal compression at the outer curve so card gaps remain visually uniform in 3D
          const visualX =
            wrappedX * (1 - 0.08 * Math.min(1, absNorm * absNorm));

          // Smooth edge fade only at the very outer extremes of the stage
          const opacity =
            absNorm < 0.88
              ? 1
              : Math.max(0, 1 - (absNorm - 0.88) / 0.42);

          // Higher z-index for cards closer to the center
          const zIndex = Math.round(100 - absNorm * 60);

          cardEl.style.opacity = opacity.toFixed(3);
          cardEl.style.zIndex = String(zIndex);
          cardEl.style.pointerEvents = opacity > 0.25 ? 'auto' : 'none';
          cardEl.style.transform = `translate3d(${visualX.toFixed(2)}px, 0px, ${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
        }
      }

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    animationFrameId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animationFrameId);
  }, [virtualCards]);

  // Touch & Mouse swipe handlers for mobile and desktop
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = true;
    hasMovedPointerRef.current = false;
    pointerStartXRef.current = e.clientX;
    lastPointerXRef.current = e.clientX;
    dragVelocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;

    if (Math.abs(e.clientX - pointerStartXRef.current) > 6) {
      hasMovedPointerRef.current = true;
    }

    // Dragging left advances right-to-left movement; dragging right reverses it smoothly
    scrollOffsetRef.current -= deltaX;
    dragVelocityRef.current = -deltaX * 0.045;
  };

  const handlePointerUpOrCancel = () => {
    isPointerDownRef.current = false;
  };

  return (
    <section
      id="motion-archive"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingFile(true);
      }}
      onDragLeave={() => setIsDraggingFile(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDraggingFile(false);
        processFiles(e.dataTransfer.files);
      }}
      className="relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 border-t border-[#E6D7C3]/10 select-none"
      style={{
        background:
          'radial-gradient(ellipse 68% 54% at 50% 52%, rgba(74, 12, 22, 0.52) 0%, rgba(36, 7, 22, 0.36) 42%, rgba(8, 5, 6, 0.98) 82%), linear-gradient(180deg, #090406 0%, #160509 50%, #080506 100%)',
      }}
    >
      {/* Hidden File Input for Uploading Custom ASVÉRA Clothing Images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          processFiles(e.target.files);
          e.currentTarget.value = '';
        }}
        className="hidden"
      />

      {/* Drag-and-drop overlay indicator */}
      {isDraggingFile && (
        <div className="pointer-events-none absolute inset-4 z-50 rounded-3xl border-2 border-dashed border-[#DFD3C3]/70 bg-[#1B0508]/85 backdrop-blur-md flex flex-col items-center justify-center gap-2 text-[#FAF5EE]">
          <Upload className="w-8 h-8 text-[#DFD3C3]" />
          <p className="font-brand text-2xl tracking-wider uppercase">
            Drop ASVÉRA Clothing Images Here
          </p>
          <p className="text-xs text-[#E6D7C3]/75">
            Your uploaded clothing images will immediately populate the 3D carousel
          </p>
        </div>
      )}

      {/* Subtle Ambient Center Spotlight in ASVÉRA Dark Cherry / Deep Plum / Warm Ivory */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] h-[320px] sm:h-[390px] rounded-full blur-[95px] opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(128, 22, 36, 0.55) 0%, rgba(58, 12, 38, 0.35) 52%, transparent 78%)',
        }}
        aria-hidden="true"
      />

      {/* Section Header */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-[60px] mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3.5 mb-3">
            <span className="text-[10.5px] font-medium tracking-[0.22em] text-[#E6D7C3]/80 uppercase">
              3D ARCHIVAL RUNWAY
            </span>
            <span className="w-12 h-[1px] bg-[#E6D7C3]/35" />
          </div>

          <h2 className="font-brand text-[38px] sm:text-[48px] lg:text-[56px] font-normal leading-[0.96] tracking-[0.03em] text-[#FAF5EE] uppercase">
            IN MOTION
          </h2>
          <p className="mt-2.5 text-[13.5px] sm:text-[14.5px] text-[#E6D7C3]/75 max-w-[420px]">
            Continuous 3D perspective showcase of ASVÉRA silhouettes. Hover any
            garment to inspect closer or swipe to glide through the collection.
          </p>
        </div>

        {/* Upload / Manage ASVÉRA Clothing Images Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2.5 border border-[#E6D7C3]/45 hover:border-[#FAF5EE] bg-[#2B070B]/70 hover:bg-[#3D0A10] text-[#FAF5EE] rounded-full px-5 py-2.5 text-[11px] font-medium tracking-[0.15em] uppercase transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#DFD3C3]" />
            <span>
              {customUploads.length > 0
                ? 'Add More Clothing Images'
                : 'Upload Clothing Images'}
            </span>
          </button>

          {customUploads.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setShowManageTray(!showManageTray)}
                className="inline-flex items-center gap-2 border border-[#E6D7C3]/30 hover:border-[#E6D7C3]/70 bg-black/50 text-[#E6D7C3] rounded-full px-4 py-2.5 text-[11px] tracking-[0.12em] uppercase transition-colors cursor-pointer"
              >
                <span>Uploaded ({customUploads.length})</span>
              </button>

              <button
                type="button"
                onClick={handleResetToDefault}
                title="Reset to default ASVÉRA clothing collection"
                className="inline-flex items-center gap-1.5 border border-white/15 hover:border-white/40 bg-black/40 text-white/70 hover:text-white rounded-full px-3.5 py-2.5 text-[11px] tracking-[0.1em] uppercase transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Optional Manage Tray for Custom Uploaded Clothing Images */}
      {showManageTray && customUploads.length > 0 && (
        <div className="relative z-30 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-[60px] mb-8">
          <div className="rounded-2xl border border-[#E6D7C3]/20 bg-[#140507]/90 backdrop-blur-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs text-[#FAF5EE]">
                <Sparkles className="w-3.5 h-3.5 text-[#DFD3C3]" />
                <span>
                  Displaying ONLY your {customUploads.length} uploaded ASVÉRA
                  clothing {customUploads.length === 1 ? 'image' : 'images'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowManageTray(false)}
                className="text-xs text-[#E6D7C3]/70 hover:text-white cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {customUploads.map((item) => (
                <div
                  key={item.id}
                  className="relative group w-20 h-24 rounded-xl overflow-hidden border border-[#E6D7C3]/25 bg-black shrink-0"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveUploadedItem(item.id)}
                    aria-label={`Remove ${item.title}`}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-24 rounded-xl border border-dashed border-[#E6D7C3]/35 hover:border-[#FAF5EE] flex flex-col items-center justify-center gap-1 text-[#E6D7C3]/75 hover:text-[#FAF5EE] shrink-0 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-wider">Add</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 3D CURVED CAROUSEL STAGE ==================== */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrCancel}
        onPointerCancel={handlePointerUpOrCancel}
        onPointerLeave={handlePointerUpOrCancel}
        className="relative w-full h-[350px] sm:h-[410px] lg:h-[450px] flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing"
        style={{
          perspective: '1300px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Left & Right Soft Atmospheric Vignette Scrims */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 lg:w-40 z-30 bg-gradient-to-r from-[#090406] via-[#090406]/65 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 lg:w-40 z-30 bg-gradient-to-l from-[#090406] via-[#090406]/65 to-transparent"
          aria-hidden="true"
        />

        {/* 3D Preserve-3D Track Center Anchor */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {virtualCards.map((slot, index) => (
            <div
              key={slot.slotKey}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              onClick={() => {
                if (!hasMovedPointerRef.current && onSelectItem) {
                  onSelectItem(slot.item);
                }
              }}
              className="group absolute w-[185px] sm:w-[225px] lg:w-[255px] aspect-[3/4.1] will-change-transform"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Inner Card: Enlarges and comes forward in 3D on desktop hover while outer track keeps moving smoothly */}
              <div className="w-full h-full rounded-[18px] overflow-hidden bg-[#190508] border border-[#E6D7C3]/20 group-hover:border-[#FAF5EE]/65 shadow-[0_22px_50px_rgba(0,0,0,0.75)] transition-all duration-300 ease-out group-hover:scale-[1.08] group-hover:-translate-y-2 group-hover:shadow-[0_28px_65px_rgba(92,14,26,0.55)] relative">
                <img
                  src={slot.item.src}
                  alt={slot.item.title}
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center pointer-events-none select-none"
                />

                {/* Subtle Luxury Bottom Gradient & Garment Label */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-[#140305]/95 via-[#1F0509]/55 to-transparent flex flex-col justify-end p-4 opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] tracking-[0.18em] text-[#DFD3C3]/80 uppercase truncate">
                        {slot.item.subtitle || 'ASVÉRA ARCHIVE'}
                      </p>
                      <h3 className="text-[13.5px] sm:text-[14.5px] font-medium text-[#FAF5EE] truncate mt-0.5">
                        {slot.item.title}
                      </h3>
                    </div>
                    {slot.item.price && (
                      <span className="text-xs font-medium text-[#DFD3C3] tabular-nums shrink-0">
                        {slot.item.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
