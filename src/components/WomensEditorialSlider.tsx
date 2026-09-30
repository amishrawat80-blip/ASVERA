import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Upload, Plus, X, RotateCcw } from 'lucide-react';
import editSlide1 from '../assets/images/womens_edit_slide_1_1790748923846.jpg';
import editSlide2 from '../assets/images/womens_edit_slide_2_1790748934965.jpg';
import editSlide3 from '../assets/images/womens_edit_slide_3_1790748947912.jpg';
import editSlide4 from '../assets/images/womens_edit_slide_4_1790748961684.jpg';
import editSlide5 from '../assets/images/womens_insp_6_1790749228956.jpg';
import editSlide6 from '../assets/images/womens_edit_slide_6_1790748984449.jpg';

export interface WomensEditSlide {
  id: string;
  src: string;
  title: string;
  subtitle: string;
}

const STORAGE_KEY = 'asvera_womens_edit_uploads_v1';

const DEFAULT_EDITORIAL_SLIDES: WomensEditSlide[] = [
  {
    id: 'we-default-1',
    src: editSlide1,
    title: 'Draped Rose Silk Study',
    subtitle: 'Editorial Look 01',
  },
  {
    id: 'we-default-2',
    src: editSlide2,
    title: 'Lavender Tailored Wrap',
    subtitle: 'Editorial Look 02',
  },
  {
    id: 'we-default-3',
    src: editSlide3,
    title: 'Coastal Linen & Blush Drape',
    subtitle: 'Editorial Look 03',
  },
  {
    id: 'we-default-4',
    src: editSlide4,
    title: 'Champagne Satin & Cashmere',
    subtitle: 'Editorial Look 04',
  },
  {
    id: 'we-default-5',
    src: editSlide5,
    title: 'Golden Hour Silk & Blazer',
    subtitle: 'Editorial Look 05',
  },
  {
    id: 'we-default-6',
    src: editSlide6,
    title: 'Ivory Poplin & Dusty Rose',
    subtitle: 'Editorial Look 06',
  },
];

export const WomensEditorialSlider: React.FC = () => {
  const [uploadedSlides, setUploadedSlides] = useState<WomensEditSlide[]>(() => {
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

  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [showManageTray, setShowManageTray] = useState(false);
  const [inView, setInView] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const innerImgRefs = useRef<Array<HTMLImageElement | null>>([]);

  // Smooth animation & interaction refs
  const scrollOffsetRef = useRef<number>(0);
  const currentSpeedRef = useRef<number>(0.038);
  const isHoveredRef = useRef<boolean>(false);
  const isPointerDownRef = useRef<boolean>(false);
  const pointerStartXRef = useRef<number>(0);
  const lastPointerXRef = useRef<number>(0);
  const dragVelocityRef = useRef<number>(0);

  // Subtle fade/parallax reveal when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Persist user's manually uploaded images
  useEffect(() => {
    try {
      if (uploadedSlides.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(uploadedSlides));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota limits for large files
    }
  }, [uploadedSlides]);

  // Handle manual image file uploads without compression or alteration
  const processFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    );
    if (validFiles.length === 0) return;

    Promise.all(
      validFiles.map(
        (file, idx) =>
          new Promise<WomensEditSlide>((resolve) => {
            const reader = new FileReader();
            const cleanName = file.name
              .replace(/\.[^/.]+$/, '')
              .replace(/[-_]+/g, ' ')
              .trim();
            reader.onload = () => {
              resolve({
                id: `womens-edit-${Date.now()}-${idx}-${Math.random()
                  .toString(36)
                  .slice(2, 7)}`,
                src: reader.result as string,
                title: cleanName || `The Women's Edit ${idx + 1}`,
                subtitle: 'ASVÉRA Women Editorial',
              });
            };
            reader.readAsDataURL(file);
          })
      )
    ).then((newSlides) => {
      setUploadedSlides((prev) => [...prev, ...newSlides]);
    });
  }, []);

  const handleRemoveSlide = (id: string) => {
    setUploadedSlides((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setUploadedSlides([]);
    setShowManageTray(false);
  };

  // Use uploaded slides when provided; otherwise display the 6 distinct editorial slides
  const sourceSlides = useMemo(() => {
    return uploadedSlides.length > 0 ? uploadedSlides : DEFAULT_EDITORIAL_SLIDES;
  }, [uploadedSlides]);

  // Build virtual loop ring so 4–5 cards are always seamlessly visible across desktop & mobile
  const virtualSlides = useMemo(() => {
    if (sourceSlides.length === 0) return [];
    const minSlots = 12;
    const repeats = Math.max(2, Math.ceil(minSlots / sourceSlides.length));
    const list: Array<{ slotKey: string; slide: WomensEditSlide; index: number }> = [];
    for (let r = 0; r < repeats; r++) {
      for (let i = 0; i < sourceSlides.length; i++) {
        list.push({
          slotKey: `we-slot-${r}-${i}-${sourceSlides[i].id}`,
          slide: sourceSlides[i],
          index: i,
        });
      }
    }
    return list;
  }, [sourceSlides]);

  // Continuous GPU-accelerated horizontal scrolling carousel with center scale & subtle parallax
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const TARGET_BASE_SPEED = 0.038;

    const renderFrame = (now: number) => {
      const dt = Math.min(48, Math.max(0, now - lastTime));
      lastTime = now;

      const stageEl = stageRef.current;
      const numCards = virtualSlides.length;

      if (stageEl && numCards > 0) {
        const viewportW = stageEl.clientWidth || window.innerWidth;
        const isMobile = viewportW < 640;
        const isTablet = viewportW >= 640 && viewportW < 1024;

        // Desktop: 4–5 images partially visible at once; Mobile: 1 large image + next partially visible at side
        const cardWidth = isMobile
          ? Math.min(300, Math.round(viewportW * 0.74))
          : isTablet
          ? 250
          : 276;
        const cardGap = isMobile ? 18 : isTablet ? 24 : 28;
        const step = cardWidth + cardGap;
        const totalTrackWidth = numCards * step;
        const halfTrack = totalTrackWidth / 2;

        // Smoothly pause when hovering or dragging, and resume smoothly afterward
        const desiredSpeed =
          isHoveredRef.current || isPointerDownRef.current ? 0 : TARGET_BASE_SPEED;
        currentSpeedRef.current +=
          (desiredSpeed - currentSpeedRef.current) * Math.min(1, dt * 0.008);

        if (!isPointerDownRef.current) {
          scrollOffsetRef.current +=
            currentSpeedRef.current * dt + dragVelocityRef.current * dt;
          dragVelocityRef.current *= Math.pow(0.94, dt / 16);
          if (Math.abs(dragVelocityRef.current) < 0.001) {
            dragVelocityRef.current = 0;
          }
        }

        scrollOffsetRef.current =
          ((scrollOffsetRef.current % totalTrackWidth) + totalTrackWidth) %
          totalTrackWidth;

        const visibleRadius = Math.max(viewportW * 0.58, step * 2.6);

        for (let i = 0; i < numCards; i++) {
          const cardEl = cardRefs.current[i];
          if (!cardEl) continue;

          const rawX = i * step - scrollOffsetRef.current;
          const wrappedX =
            ((((rawX + halfTrack) % totalTrackWidth) + totalTrackWidth) %
              totalTrackWidth) -
            halfTrack;

          const norm = wrappedX / visibleRadius;
          const absNorm = Math.abs(norm);

          cardEl.style.width = `${cardWidth}px`;

          if (absNorm > 1.45) {
            cardEl.style.opacity = '0';
            cardEl.style.pointerEvents = 'none';
            cardEl.style.transform = `translate3d(${wrappedX.toFixed(1)}px, 0px, 0px) scale(0.84)`;
            continue;
          }

          // Center image slightly larger, side images slightly smaller with gentle vertical curve
          const clampedNorm = Math.max(-1.2, Math.min(1.2, norm));
          const cosFactor = Math.cos(clampedNorm * 1.1);
          const scale = isMobile
            ? 0.9 + 0.12 * Math.max(0, cosFactor)
            : 0.86 + 0.2 * Math.max(0, cosFactor);
          const liftY = (1 - Math.max(0, cosFactor)) * (isMobile ? 6 : 12);

          const opacity =
            absNorm < 0.92
              ? 1
              : Math.max(0, 1 - (absNorm - 0.92) / 0.45);

          const zIndex = Math.round(100 - absNorm * 50);

          cardEl.style.opacity = opacity.toFixed(3);
          cardEl.style.zIndex = String(zIndex);
          cardEl.style.pointerEvents = opacity > 0.25 ? 'auto' : 'none';
          cardEl.style.transform = `translate3d(${wrappedX.toFixed(
            2
          )}px, ${liftY.toFixed(1)}px, 0px) scale(${scale.toFixed(4)})`;

          // Subtle internal horizontal parallax on the image itself
          const imgEl = innerImgRefs.current[i];
          if (imgEl) {
            const parallaxX = -clampedNorm * 10;
            imgEl.style.transform = `translate3d(${parallaxX.toFixed(1)}px, 0px, 0px) scale(1.06)`;
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    animationFrameId = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(animationFrameId);
  }, [virtualSlides]);

  // Mouse drag & touch swipe handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isPointerDownRef.current = true;
    pointerStartXRef.current = e.clientX;
    lastPointerXRef.current = e.clientX;
    dragVelocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;

    scrollOffsetRef.current -= deltaX;
    dragVelocityRef.current = -deltaX * 0.045;
  };

  const handlePointerUpOrCancel = () => {
    isPointerDownRef.current = false;
  };

  return (
    <section
      ref={sectionRef}
      id="the-womens-edit"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        processFiles(e.dataTransfer.files);
      }}
      style={{
        background:
          'linear-gradient(180deg, #FFFDFB 0%, #FDF4F8 48%, #F8EFFB 100%)',
      }}
      className={`relative w-full overflow-hidden py-16 sm:py-20 lg:py-24 border-y border-[#F4E3EC] transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Hidden File Input for User's Uploaded Editorial Images */}
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

      {/* Soft Pastel Ambient Glow Behind Slider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[760px] h-[340px] rounded-full blur-3xl opacity-60"
        style={{
          background:
            'radial-gradient(circle, rgba(247, 205, 224, 0.55) 0%, rgba(226, 213, 248, 0.45) 55%, rgba(255, 253, 251, 0) 100%)',
        }}
      />

      {/* Drag-and-Drop Overlay */}
      {isDraggingOver && (
        <div className="pointer-events-none absolute inset-5 z-50 rounded-[24px] border-2 border-dashed border-[#E3568B] bg-[#FFF9FB]/90 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-[#1B1E32]">
          <Upload className="w-7 h-7 text-[#E3568B]" />
          <p className="font-editorial text-2xl font-semibold">
            Drop Your Editorial Images Here
          </p>
          <p className="text-xs text-[#6E5D78]">
            Your uploaded images will appear directly in The Women&apos;s Edit slider
          </p>
        </div>
      )}

      {/* Editorial Section Header */}
      <div className="relative z-20 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div>
          <span className="block text-[11px] font-semibold tracking-[0.22em] text-[#E3568B] uppercase mb-2">
            ASVÉRA WOMEN EDITORIAL
          </span>
          <h2 className="font-editorial text-[34px] sm:text-[44px] lg:text-[48px] font-semibold leading-[1.04] tracking-[-0.01em] text-[#1B1E32] uppercase">
            THE WOMEN&apos;S EDIT
          </h2>
          <p className="mt-2 text-[14.5px] sm:text-[15.5px] text-[#6E5D78] font-normal">
            Soft silhouettes. Distinct expression.
          </p>
        </div>

        {/* Manual Image Upload Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FDEBF1] text-[#1B1E32] border border-[#F0D6E4] rounded-full px-5 py-2.5 text-[12px] font-medium shadow-[0_4px_14px_rgba(227,86,139,0.08)] transition-colors cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#E3568B]" />
            <span>
              {uploadedSlides.length > 0
                ? 'Add More Images'
                : 'Upload Custom Images'}
            </span>
          </button>

          {uploadedSlides.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setShowManageTray((prev) => !prev)}
                className="inline-flex items-center gap-1.5 bg-[#F7F1FC] hover:bg-[#EFE4FA] text-[#5E4B8B] rounded-full px-4 py-2.5 text-[12px] font-medium transition-colors cursor-pointer"
              >
                <span>Uploaded ({uploadedSlides.length})</span>
              </button>

              <button
                type="button"
                onClick={handleClearAll}
                title="Reset to default editorial looks"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-[#FDEBF1] text-[#6E5D78] border border-[#F0D6E4] rounded-full px-3.5 py-2.5 text-[12px] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Optional Manage Tray for Uploaded Images */}
      {showManageTray && uploadedSlides.length > 0 && (
        <div className="relative z-30 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 mb-8">
          <div className="rounded-[20px] bg-white/90 backdrop-blur-md border border-[#F3DFEA] p-4 sm:p-5 shadow-[0_8px_24px_rgba(27,30,50,0.05)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-[#1B1E32]">
                Displaying your {uploadedSlides.length} uploaded{' '}
                {uploadedSlides.length === 1 ? 'image' : 'images'}
              </span>
              <button
                type="button"
                onClick={() => setShowManageTray(false)}
                className="text-xs text-[#6E5D78] hover:text-[#1B1E32] cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {uploadedSlides.map((slide) => (
                <div
                  key={slide.id}
                  className="relative group w-20 h-24 rounded-xl overflow-hidden border border-[#F3DFEA] bg-[#FFFDFB] shrink-0"
                >
                  <img
                    src={slide.src}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSlide(slide.id)}
                    aria-label={`Remove ${slide.title}`}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#1B1E32]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-24 rounded-xl border border-dashed border-[#E3568B]/45 hover:border-[#E3568B] flex flex-col items-center justify-center gap-1 text-[#D95B8A] shrink-0 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span className="text-[10px] font-medium">Add</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Editorial Carousel Stage */}
      <div
        ref={stageRef}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          handlePointerUpOrCancel();
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrCancel}
        onPointerCancel={handlePointerUpOrCancel}
        className="relative w-full h-[390px] sm:h-[430px] lg:h-[470px] flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing"
      >
        {/* Soft Pastel Edge Vignettes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 lg:w-28 z-30 bg-gradient-to-r from-[#FDF5F9] via-[#FDF5F9]/65 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 lg:w-28 z-30 bg-gradient-to-l from-[#FDF5F9] via-[#FDF5F9]/65 to-transparent"
        />

        {/* Center Track Anchor */}
        <div className="relative w-full h-full flex items-center justify-center">
          {virtualSlides.map((slot, idx) => {
            const { slide } = slot;
            return (
              <div
                key={slot.slotKey}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="group absolute aspect-[3/4.1] will-change-transform"
              >
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-white border border-[#F2DCE8] shadow-[0_14px_36px_rgba(217,91,138,0.10)] group-hover:shadow-[0_20px_44px_rgba(217,91,138,0.18)] transition-all duration-300 ease-out group-hover:scale-[1.03] relative">
                  <img
                    ref={(el) => {
                      innerImgRefs.current[idx] = el;
                    }}
                    src={slide.src}
                    alt={slide.title}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center pointer-events-none select-none will-change-transform transition-transform duration-300"
                  />

                  {/* Subtle Editorial Caption Overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1B1E32]/65 via-[#1B1E32]/20 to-transparent flex flex-col justify-end p-4 sm:p-5">
                    <span className="text-[9.5px] font-semibold tracking-[0.2em] text-[#FDEBF1] uppercase">
                      {slide.subtitle}
                    </span>
                    <h3 className="font-editorial text-[17px] sm:text-[18px] font-medium text-white leading-snug mt-0.5">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WomensEditorialSlider;
