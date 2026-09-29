/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowDown,
  ArrowLeftRight,
  X,
  Check,
  ShoppingBag,
} from 'lucide-react';

import avatar1 from './assets/images/avatar_fashion_1_1790653241575.jpg';
import avatar2 from './assets/images/avatar_fashion_2_1790653260443.jpg';
import avatar3 from './assets/images/avatar_fashion_3_1790653272255.jpg';
import editorialHero from './assets/images/streetwear_hero_editorial_1790653284151.jpg';

import vibeTshirts from './assets/images/vibe_tshirts_maroon_1790679755876.jpg';
import vibeHoodies from './assets/images/vibe_hoodies_cream_1790679772901.jpg';
import vibeBottoms from './assets/images/vibe_bottoms_cargo_1790679787989.jpg';
import vibeOuterwear from './assets/images/vibe_outerwear_black_1790679803720.jpg';

import dropCoastalTee from './assets/images/drop_coastal_tee_1790679819826.jpg';
import dropSignatureHoodie from './assets/images/drop_signature_hoodie_1790679838814.jpg';
import dropUtilityCargo from './assets/images/drop_utility_cargo_1790679858180.jpg';
import dropEssentialsSweatshirt from './assets/images/drop_essentials_sweatshirt_1790679872604.jpg';

import storyCreatorPortrait from './assets/images/story_creator_portrait_1790679907290.jpg';
import storyCoastalBay from './assets/images/story_coastal_bay_1790679927148.jpg';
import lookbookSunsetPalm from './assets/images/lookbook_sunset_palm_1790679942722.jpg';
import lookbookWovenLabel from './assets/images/lookbook_woven_label_1790679959868.jpg';

const HERO_VIDEO_URL =
  'https://www.image2url.com/r2/default/videos/1790655742560-6170f399-0862-4616-9869-f254f102feb3.mp4';

interface VibeCategory {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

const VIBE_CATEGORIES: VibeCategory[] = [
  {
    id: 't-shirts',
    title: 'T-SHIRTS',
    subtitle: 'Soft. Breathable. Everyday.',
    image: vibeTshirts,
  },
  {
    id: 'hoodies',
    title: 'HOODIES',
    subtitle: 'Warmth with attitude.',
    image: vibeHoodies,
  },
  {
    id: 'bottoms',
    title: 'BOTTOMS',
    subtitle: 'Comfort meets style.',
    image: vibeBottoms,
  },
  {
    id: 'outerwear',
    title: 'OUTERWEAR',
    subtitle: 'Built for every season.',
    image: vibeOuterwear,
  },
];

interface FreshDropProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  swatches: string[];
  category: string;
  gsm: string;
}

const FRESH_DROPS: FreshDropProduct[] = [
  {
    id: 'coastal-tee',
    name: 'Coastal Tee',
    price: '₹1,999',
    image: dropCoastalTee,
    swatches: ['#4E5346', '#9A958D', '#6E5D4F', '#4A1215'],
    category: 'T-Shirts',
    gsm: '280 GSM Combed Cotton',
  },
  {
    id: 'signature-hoodie',
    name: 'Signature Hoodie',
    price: '₹3,499',
    image: dropSignatureHoodie,
    swatches: ['#D8CFC2', '#EAE6DF', '#786858', '#2D0A0C'],
    category: 'Hoodies',
    gsm: '480 GSM Heavyweight Terry',
  },
  {
    id: 'utility-cargo',
    name: 'Utility Cargo',
    price: '₹2,999',
    image: dropUtilityCargo,
    swatches: ['#4B5247', '#8C8881', '#2B2A28', '#4A1215'],
    category: 'Bottoms',
    gsm: '340 GSM Ripstop Twill',
  },
  {
    id: 'essentials-sweatshirt',
    name: 'Essentials Sweatshirt',
    price: '₹2,499',
    image: dropEssentialsSweatshirt,
    swatches: ['#C8B79E', '#E6E1D8', '#756555', '#480D10'],
    category: 'Outerwear',
    gsm: '420 GSM Brushed Fleece',
  },
];

interface LookbookSlide {
  id: string;
  title: string;
  caption: string;
  image: string;
  narrow?: boolean;
}

const LOOKBOOK_SLIDES: LookbookSlide[] = [
  {
    id: 'lb-1',
    title: 'Coastal Palm Oversized Tee',
    caption: 'Shot on location · Gokarna Cliffs',
    image: dropCoastalTee,
    narrow: false,
  },
  {
    id: 'lb-2',
    title: 'Archival Cream Hoodie',
    caption: 'Golden Hour Series · Drop 01',
    image: vibeHoodies,
    narrow: false,
  },
  {
    id: 'lb-3',
    title: 'Dusk Silhouette',
    caption: 'Sunset Edition · Arabian Sea',
    image: lookbookSunsetPalm,
    narrow: true,
  },
  {
    id: 'lb-4',
    title: 'Signature Woven Emblem',
    caption: '100% Single-Origin Indian Cotton',
    image: lookbookWovenLabel,
    narrow: false,
  },
];

export default function App() {
  const [activeDropdown, setActiveDropdown] = useState<'features' | 'shop' | null>(null);
  const [drawerMode, setDrawerMode] = useState<'collection' | 'get-started' | 'about' | 'blog' | null>(null);
  const [useLiveClock, setUseLiveClock] = useState<boolean>(false);
  const [liveTimeStr, setLiveTimeStr] = useState<string>('02:16 PM (IST)');
  const [joinedWaitlist, setJoinedWaitlist] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<FreshDropProduct>(FRESH_DROPS[0]);
  const [selectedSwatches, setSelectedSwatches] = useState<Record<string, number>>({
    'coastal-tee': 0,
    'signature-hoodie': 0,
    'utility-cargo': 2,
    'essentials-sweatshirt': 3,
  });
  const [activeDropStartIndex, setActiveDropStartIndex] = useState<number>(0);
  const [activeLookbookIndex, setActiveLookbookIndex] = useState<number>(0);
  const [lightboxImage, setLightboxImage] = useState<LookbookSlide | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure smooth, uninterrupted background video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      video.play().catch(() => {
        // Fallback if browser waits for user interaction
      });
    };

    attemptPlay();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video.paused) {
        attemptPlay();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!useLiveClock) {
      setLiveTimeStr('02:16 PM (IST)');
      return;
    }
    const updateClock = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setLiveTimeStr(`${formatter.format(new Date())} (IST)`);
    };
    updateClock();
    const interval = setInterval(updateClock, 15000);
    return () => clearInterval(interval);
  }, [useLiveClock]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  const scrollToSection = (id: string) => {
    setActiveDropdown(null);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setJoinedWaitlist(true);
    triggerToast('Welcome to ASVÉRA Inner Circle.');
  };

  // Ordered drops for smooth carousel rotation
  const orderedDrops = [
    ...FRESH_DROPS.slice(activeDropStartIndex),
    ...FRESH_DROPS.slice(0, activeDropStartIndex),
  ];

  // Ordered lookbook slides for smooth carousel rotation
  const orderedLookbook = [
    ...LOOKBOOK_SLIDES.slice(activeLookbookIndex),
    ...LOOKBOOK_SLIDES.slice(0, activeLookbookIndex),
  ];

  const handleNextDrop = () => {
    setActiveDropStartIndex((prev) => (prev + 1) % FRESH_DROPS.length);
  };

  const handlePrevDrop = () => {
    setActiveDropStartIndex((prev) => (prev - 1 + FRESH_DROPS.length) % FRESH_DROPS.length);
  };

  const handleNextLookbook = () => {
    setActiveLookbookIndex((prev) => (prev + 1) % LOOKBOOK_SLIDES.length);
  };

  const handlePrevLookbook = () => {
    setActiveLookbookIndex((prev) => (prev - 1 + LOOKBOOK_SLIDES.length) % LOOKBOOK_SLIDES.length);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden select-none">
      {/* Subtle Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-6 z-50 flex items-center gap-2.5 bg-[#1C0506]/95 backdrop-blur-md border border-[#E6D7C3]/30 text-[#F7F2EA] text-xs px-4 py-3 rounded-full shadow-2xl">
          <Check className="w-3.5 h-3.5 text-[#DFD3C3]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =====================================================================
          HERO SECTION (WITH SMOOTH VIDEO BACKGROUND)
         ===================================================================== */}
      <div id="top" className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between overflow-hidden">
        {/* Full-Bleed Background Video */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
          <video
            ref={videoRef}
            src={HERO_VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center transform-gpu"
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30" />
        </div>

        {/* Hero Content Wrapper */}
        <section className="relative z-10 flex-1 flex flex-col justify-between w-full max-w-[1536px] mx-auto px-6 sm:px-10 md:px-14 lg:px-[60px] pt-6 sm:pt-7 pb-5">
          {/* 1. TOP NAVIGATION BAR */}
          <header className="w-full flex items-center justify-between gap-4">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                setActiveDropdown(null);
                setDrawerMode(null);
              }}
              className="font-brand text-[28px] sm:text-[34px] md:text-[36px] font-normal tracking-[0.06em] text-[#F5F2EB] leading-none whitespace-nowrap shrink-0"
            >
              ASVÉRA
            </a>

            {/* Center Pill Navigation */}
            <div ref={navRef} className="relative hidden lg:flex items-center">
              <nav
                aria-label="Primary Navigation"
                className="flex items-center gap-8 xl:gap-9 border border-white/25 rounded-full px-7 py-2.5 bg-black/45 backdrop-blur-md"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === 'features' ? null : 'features')
                  }
                  className="flex items-center gap-1.5 text-[13.5px] font-normal text-white/90 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Features</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/75 transition-transform duration-150 ${
                      activeDropdown === 'features' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === 'shop' ? null : 'shop')
                  }
                  className="flex items-center gap-1.5 text-[13.5px] font-normal text-white/90 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span>Shop</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/75 transition-transform duration-150 ${
                      activeDropdown === 'shop' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('our-story')}
                  className="text-[13.5px] font-normal text-white/90 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  About
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('collections')}
                  className="text-[13.5px] font-normal text-white/90 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  Collection
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('lookbook')}
                  className="text-[13.5px] font-normal text-white/90 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  Blog
                </button>
              </nav>

              {/* Dropdown Menu Overlays */}
              {activeDropdown === 'features' && (
                <div className="absolute left-0 top-full mt-3 w-72 rounded-2xl border border-white/20 bg-[#0A0A0A]/95 backdrop-blur-xl p-4 shadow-2xl z-30">
                  <p className="text-[11px] text-white/45 mb-2.5">
                    Craftsmanship Standards
                  </p>
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => scrollToSection('new-arrivals')}
                      className="w-full text-left p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="text-xs font-medium text-white">
                        480 GSM Heavyweight Terry
                      </div>
                      <div className="text-[11px] text-white/55 mt-0.5">
                        Custom milled in Tiruppur for structured drape
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('collections')}
                      className="w-full text-left p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="text-xs font-medium text-white">
                        Coastal &amp; Street Silhouettes
                      </div>
                      <div className="text-[11px] text-white/55 mt-0.5">
                        Breathable everyday cuts built for every season
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollToSection('our-story')}
                      className="w-full text-left p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="text-xs font-medium text-white">
                        100% Premium Quality
                      </div>
                      <div className="text-[11px] text-white/55 mt-0.5">
                        Crafted by creators, for creators
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {activeDropdown === 'shop' && (
                <div className="absolute left-16 top-full mt-3 w-64 rounded-2xl border border-white/20 bg-[#0A0A0A]/95 backdrop-blur-xl p-4 shadow-2xl z-30">
                  <p className="text-[11px] text-white/45 mb-2.5">
                    Fresh Drops · Limited Stock
                  </p>
                  <div className="space-y-1.5">
                    {FRESH_DROPS.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedProduct(item);
                          setActiveDropdown(null);
                          scrollToSection('new-arrivals');
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors text-left cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-medium text-white">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-white/50">
                            {item.category}
                          </div>
                        </div>
                        <span className="text-xs text-[#DFD3C3] tabular-nums">
                          {item.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Time Display + Primary Action */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => setUseLiveClock(!useLiveClock)}
                title="Click to toggle between reference time and live IST clock"
                className="hidden sm:inline-block text-[13.5px] font-normal text-white/90 hover:text-white tracking-[-0.01em] tabular-nums whitespace-nowrap cursor-pointer"
              >
                {liveTimeStr}
              </button>

              <button
                type="button"
                onClick={() => setDrawerMode('get-started')}
                className="bg-[#FAF7F0] hover:bg-white text-black text-[13.5px] font-medium px-5 sm:px-6 py-2.5 rounded-[12px] transition-transform duration-150 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </header>

          {/* 2. MAIN HERO CENTER AREA */}
          <div className="relative flex-1 flex flex-col justify-center my-8 lg:my-4">
            {/* Right Floating Vertical Callout */}
            <div className="hidden md:flex lg:absolute lg:right-[3.5%] lg:top-[16%] z-20 mb-6 lg:mb-0">
              <button
                type="button"
                onClick={() => scrollToSection('collections')}
                className="group text-left border-l border-white/55 pl-3.5 py-0.5 transition-colors hover:border-white cursor-pointer"
              >
                <span className="block text-[15px] leading-[1.32] text-white/80 group-hover:text-white font-normal tracking-[-0.01em]">
                  Premium
                </span>
                <span className="block text-[15px] leading-[1.32] text-white/80 group-hover:text-white font-normal tracking-[-0.01em]">
                  Streetwear
                </span>
                <span className="block text-[15px] leading-[1.32] text-white/80 group-hover:text-white font-normal tracking-[-0.01em]">
                  Collection
                </span>
              </button>
            </div>

            {/* Left Main Content Stack */}
            <div className="max-w-[780px]">
              <div className="flex items-center gap-3.5 mb-5">
                <svg
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[29px] h-[29px] text-white/95 shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="14" cy="14" r="11.5" stroke="currentColor" strokeWidth="1.2" />
                  <ellipse cx="14" cy="14" rx="5.6" ry="11.5" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="2.5" y1="14" x2="25.5" y2="14" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4.2 8.8H23.8" stroke="currentColor" strokeWidth="1.15" />
                  <path d="M4.2 19.2H23.8" stroke="currentColor" strokeWidth="1.15" />
                </svg>

                <div className="h-7 w-[1px] bg-white/35 shrink-0" />

                <div className="text-[12.5px] leading-[1.38] text-white/90 font-normal tracking-[-0.005em]">
                  <div>Premium Indian Streetwear</div>
                  <div>For The Next Generation</div>
                </div>
              </div>

              <h1 className="text-[46px] sm:text-[66px] md:text-[78px] lg:text-[88px] xl:text-[92px] font-normal leading-[0.97] tracking-[-0.04em] text-white">
                <span className="block">Clothing</span>
                <span className="block">Crafted for All</span>
                <span className="block">
                  Not Just{' '}
                  <span className="font-editorial italic font-normal text-[#DFD3C3] tracking-[-0.015em] ml-1">
                    Trends
                  </span>
                </span>
              </h1>

              <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.45] text-white/80 font-normal max-w-[375px] tracking-[-0.01em]">
                We create premium Indian streetwear with timeless design, superior
                quality and a deeper sense of identity.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-7">
                <button
                  type="button"
                  onClick={() => scrollToSection('collections')}
                  className="group bg-[#FAF7F0] hover:bg-white text-black rounded-full pl-6 pr-2 py-2 flex items-center gap-4 transition-transform duration-150 active:scale-95 cursor-pointer"
                >
                  <span className="text-[13.5px] sm:text-[14px] font-medium tracking-[-0.01em] whitespace-nowrap">
                    Explore Collection
                  </span>
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black text-white flex items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5 shrink-0">
                    <ArrowRight className="w-4 h-4 stroke-[1.75]" />
                  </span>
                </button>

                <div
                  onClick={() => setDrawerMode('get-started')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setDrawerMode('get-started');
                    }
                  }}
                  className="flex items-center gap-3.5 cursor-pointer group"
                >
                  <div className="flex items-center -space-x-2.5">
                    {[
                      { src: avatar1, alt: 'ASVÉRA Member Ananya' },
                      { src: avatar2, alt: 'ASVÉRA Member Rohan' },
                      { src: avatar3, alt: 'ASVÉRA Member Kabir' },
                    ].map((av, idx) => (
                      <div
                        key={idx}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-[1.5px] border-black bg-[#93A8B8] overflow-hidden shrink-0 transition-transform duration-150 group-hover:scale-105"
                      >
                        <img
                          src={av.src}
                          alt={av.alt}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="text-left">
                    <div className="text-[12.5px] sm:text-[13px] font-medium text-white leading-[1.3] whitespace-nowrap">
                      50K+ Fashion Lovers
                    </div>
                    <div className="text-[12px] sm:text-[12.5px] text-white/65 group-hover:text-white/90 transition-colors leading-[1.3] whitespace-nowrap">
                      Join ASVÉRA
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. LOWER ROW: METRIC CARDS & PARTNERS */}
          <div className="mt-6 lg:mt-8 mb-5 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection('new-arrivals')}
                className="w-[195px] sm:w-[218px] h-[104px] sm:h-[108px] rounded-[16px] border border-white/25 hover:border-white/45 bg-black/35 backdrop-blur-sm px-5 py-4 relative flex flex-col justify-between text-left transition-colors cursor-pointer"
              >
                <span className="absolute top-3.5 right-4 text-[20px] leading-none text-white/85 font-light" aria-hidden="true">
                  *
                </span>
                <span className="text-[35px] sm:text-[38px] font-normal tracking-[-0.03em] text-white leading-none tabular-nums mt-1">
                  150+
                </span>
                <span className="text-[12.5px] text-white/80 font-normal whitespace-nowrap">
                  Premium Designs
                </span>
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('our-story')}
                className="w-[195px] sm:w-[218px] h-[104px] sm:h-[108px] rounded-[16px] border border-white/25 hover:border-white/45 bg-black/35 backdrop-blur-sm px-5 py-4 relative flex flex-col justify-between text-left transition-colors cursor-pointer"
              >
                <span className="absolute top-3.5 right-4 text-[20px] leading-none text-white/85 font-light" aria-hidden="true">
                  *
                </span>
                <span className="text-[35px] sm:text-[38px] font-normal tracking-[-0.03em] text-white leading-none tabular-nums mt-1">
                  98%
                </span>
                <span className="text-[12.5px] text-white/80 font-normal whitespace-nowrap">
                  Customer Satisfaction
                </span>
              </button>
            </div>

            <div className="flex flex-col lg:items-end">
              <span className="text-[12.5px] text-white/70 font-normal mb-3.5 lg:text-right">
                Our Partners
              </span>

              <div className="flex flex-wrap items-center gap-7 sm:gap-9">
                <div className="flex items-center gap-2 text-white/95 hover:text-white transition-opacity">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M6.2 3.4C4.6 3.4 3.4 4.6 3.4 6.2c0 .9.4 1.7 1.1 2.3L8.3 12l-3.8 3.5c-.7.6-1.1 1.4-1.1 2.3 0 1.6 1.2 2.8 2.8 2.8.9 0 1.7-.4 2.3-1.1L12 15.7l3.5 3.8c.6.7 1.4 1.1 2.3 1.1 1.6 0 2.8-1.2 2.8-2.8 0-.9-.4-1.7-1.1-2.3L15.7 12l3.8-3.5c.7-.6 1.1-1.4 1.1-2.3 0-1.6-1.2-2.8-2.8-2.8-.9 0-1.7.4-2.3 1.1L12 8.3 8.5 4.5c-.6-.7-1.4-1.1-2.3-1.1z" />
                  </svg>
                  <span className="text-[17px] font-medium tracking-[-0.02em]">zantic</span>
                </div>

                <div className="flex items-center gap-2 text-white/90 hover:text-white transition-opacity">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M12 2.5L4.2 9.2c-.5.4-.5 1.1 0 1.5h15.6c.5-.4.5-1.1 0-1.5L12 2.5zm-7.8 10.8c-.5.4-.5 1.1 0 1.5L12 21.5l7.8-6.7c.5-.4.5-1.1 0-1.5H4.2z" />
                  </svg>
                  <span className="text-[15.5px] font-normal tracking-[-0.01em]">Crona</span>
                </div>

                <div className="flex items-center gap-2 text-white/90 hover:text-white transition-opacity">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
                    <path
                      d="M3.5 18.5L7.2 8.2C7.6 7 9.2 7 9.7 8.2L12 14.2L14.3 8.2C14.8 7 16.4 7 16.8 8.2L20.5 18.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="18.5" r="1.4" fill="currentColor" />
                  </svg>
                  <span className="text-[15px] font-normal tracking-[-0.01em]">Mercury</span>
                </div>

                <div className="flex items-center gap-2 text-white/90 hover:text-white transition-opacity">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <circle cx="12" cy="5.5" r="2.7" />
                    <circle cx="12" cy="18.5" r="2.7" />
                    <circle cx="5.5" cy="12" r="2.7" />
                    <circle cx="18.5" cy="12" r="2.7" />
                  </svg>
                  <span className="text-[15.5px] font-normal tracking-[-0.01em]">Wagar</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. BOTTOM HERO BAR */}
          <div className="border-t border-white/20 pt-4 flex items-center justify-between gap-4">
            <div className="inline-flex items-center border border-white/25 bg-black/30 backdrop-blur-sm rounded-full px-5 sm:px-7 py-2 text-[12px] sm:text-[12.5px] text-white/90 font-normal">
              <span className="whitespace-nowrap">EST 2025</span>
              <span className="mx-5 sm:mx-7 h-4 w-[1px] bg-white/25 shrink-0" />
              <span className="whitespace-nowrap">Made in India</span>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('collections')}
              className="group flex items-center gap-3 text-[13px] text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <span className="whitespace-nowrap">Scroll Down</span>
              <span className="w-7 h-7 rounded-full bg-[#FAF7F0] text-black flex items-center justify-center transition-transform duration-150 group-hover:translate-y-0.5 shrink-0">
                <ArrowDown className="w-3.5 h-3.5 stroke-[2]" />
              </span>
            </button>
          </div>
        </section>
      </div>

      {/* =====================================================================
          SECTION 1: FEATURED COLLECTIONS — "EXPLORE THE VIBE"
         ===================================================================== */}
      <section
        id="collections"
        className="relative w-full bg-gradient-to-r from-[#210405] via-[#34080A] to-[#240405] text-[#F7F2EA] py-14 sm:py-16 lg:py-20 px-6 sm:px-10 md:px-14 lg:px-[60px] border-t border-[#E6D7C3]/10"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10 xl:gap-12">
          {/* Left Typography Block */}
          <div className="lg:w-[28%] xl:w-[26%] shrink-0">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[11px] font-medium tracking-[0.2em] text-[#E6D7C3]/85 uppercase whitespace-nowrap">
                FEATURED COLLECTIONS
              </span>
              <span className="w-14 h-[1px] bg-[#E6D7C3]/40 shrink-0" />
            </div>

            <h2 className="font-brand text-[46px] sm:text-[54px] xl:text-[62px] font-normal leading-[0.95] tracking-[0.03em] text-[#FAF5EE] uppercase">
              <span className="block">EXPLORE</span>
              <span className="block">THE VIBE</span>
            </h2>

            <p className="mt-5 text-[14px] sm:text-[15px] leading-[1.55] text-[#E6D7C3]/80 font-normal max-w-[260px]">
              From the streets to the coast, find your perfect fit.
            </p>

            <button
              type="button"
              onClick={() => scrollToSection('new-arrivals')}
              className="group mt-8 inline-flex items-center gap-5 border border-[#E6D7C3]/45 hover:border-[#FAF5EE] hover:bg-white/[0.04] rounded-full px-6 py-2.5 text-[10.5px] font-medium tracking-[0.18em] text-[#FAF5EE] uppercase transition-all cursor-pointer"
            >
              <span className="whitespace-nowrap">VIEW ALL COLLECTIONS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E6D7C3] transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right 4-Column Category Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {VIBE_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => scrollToSection('new-arrivals')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    scrollToSection('new-arrivals');
                  }
                }}
                className="group relative rounded-[14px] overflow-hidden aspect-[3/3.85] bg-[#1A0405] shadow-xl cursor-pointer"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Warm Burgundy Frosted Bottom Bar */}
                <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-[#2C0607]/95 via-[#3B090B]/75 to-transparent backdrop-blur-[2px] flex flex-col justify-end p-4 sm:p-5">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <h3 className="text-[13px] sm:text-[13.5px] font-semibold tracking-[0.12em] text-[#FAF5EE] uppercase">
                        {cat.title}
                      </h3>
                      <p className="text-[11.5px] text-[#E6D7C3]/85 mt-0.5 whitespace-nowrap">
                        {cat.subtitle}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FAF5EE]/90 shrink-0 mb-0.5 transition-transform duration-150 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: NEW ARRIVALS — "FRESH DROPS / Limited Stock"
         ===================================================================== */}
      <section
        id="new-arrivals"
        className="relative w-full bg-[#F2ECE1] text-[#2D1412] py-14 sm:py-16 lg:py-20 px-6 sm:px-10 md:px-14 lg:px-[60px]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 30%, rgba(255,252,245,0.7) 0%, transparent 55%), radial-gradient(circle at 85% 75%, rgba(218,206,188,0.45) 0%, transparent 50%)',
        }}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-10 xl:gap-12">
          {/* Left Typography Block */}
          <div className="lg:w-[26%] xl:w-[24%] shrink-0">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#3B0A0C] uppercase whitespace-nowrap">
                NEW ARRIVALS
              </span>
              <span className="w-20 h-[1px] bg-[#3B0A0C]/40 shrink-0" />
            </div>

            <h2 className="font-brand text-[50px] sm:text-[58px] xl:text-[66px] font-normal leading-[0.92] tracking-[0.02em] text-[#350709] uppercase">
              <span className="block">FRESH</span>
              <span className="block">DROPS</span>
            </h2>

            {/* Handwritten Script "Limited Stock" with Brush Underline */}
            <div className="relative inline-block mt-1 mb-3">
              <span className="font-script text-[36px] sm:text-[42px] font-bold leading-none text-[#6B1215] -rotate-2 inline-block">
                Limited Stock
              </span>
              <svg
                viewBox="0 0 190 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-44 h-3.5 text-[#6B1215] -mt-1"
                aria-hidden="true"
              >
                <path
                  d="M3 10.5C48 4.5 118 2.5 186 4.5C150 6.5 85 8.5 22 12"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="text-[13.5px] sm:text-[14px] leading-[1.55] text-[#4A2C2A]/90 font-normal max-w-[245px]">
              Be the first to wear what&apos;s next. Our latest pieces are here.
            </p>

            <button
              type="button"
              onClick={() => {
                setSelectedProduct(FRESH_DROPS[0]);
                setDrawerMode('collection');
              }}
              className="group mt-6 inline-flex items-center gap-4 bg-[#350709] hover:bg-[#4C0B0E] text-[#FAF5EE] rounded-full px-6 py-3 text-[10.5px] font-medium tracking-[0.16em] uppercase shadow-md transition-all cursor-pointer"
            >
              <span className="whitespace-nowrap">SHOP NEW ARRIVALS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E6D7C3] transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right 4 Product Cards + Far-Right Stacked Controls */}
          <div className="flex-1 flex items-center gap-4 sm:gap-5">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {orderedDrops.map((product) => {
                const activeSwatchIdx = selectedSwatches[product.id] ?? 0;
                return (
                  <div key={product.id} className="group flex flex-col">
                    {/* Product Image Frame */}
                    <div
                      onClick={() => {
                        setSelectedProduct(product);
                        setDrawerMode('collection');
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedProduct(product);
                          setDrawerMode('collection');
                        }
                      }}
                      className="relative rounded-[12px] overflow-hidden aspect-[3/3.4] bg-[#DDD4C6] shadow-sm cursor-pointer"
                    >
                      <span className="absolute top-3 left-3 z-10 bg-[#350709] text-[#FAF5EE] text-[9.5px] font-medium tracking-[0.15em] px-3 py-1 rounded-full uppercase">
                        NEW
                      </span>
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Product Metadata & Interactive Color Swatches */}
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProduct(product);
                          setDrawerMode('collection');
                        }}
                        className="text-[14px] font-medium text-[#2D1412] hover:text-[#6B1215] transition-colors text-left cursor-pointer"
                      >
                        {product.name}
                      </button>
                      <div className="text-[12.5px] text-[#6E5650] tabular-nums mt-0.5">
                        {product.price}
                      </div>

                      {/* 4 Color Swatch Dots */}
                      <div className="flex items-center gap-2 mt-2">
                        {product.swatches.map((hex, idx) => {
                          const isSelected = activeSwatchIdx === idx;
                          return (
                            <button
                              key={hex + idx}
                              type="button"
                              aria-label={`Select color swatch ${idx + 1} for ${product.name}`}
                              onClick={() =>
                                setSelectedSwatches((prev) => ({
                                  ...prev,
                                  [product.id]: idx,
                                }))
                              }
                              className={`w-2.5 h-2.5 rounded-full transition-transform cursor-pointer ${
                                isSelected
                                  ? 'ring-1 ring-offset-2 ring-[#350709] scale-110'
                                  : ' opacity-85 hover:opacity-100'
                              }`}
                              style={{ backgroundColor: hex }}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Far-Right Vertical Hairline + Two Stacked Circular Buttons */}
            <div className="hidden md:flex items-center gap-3 pl-1">
              <div className="h-28 w-[1px] bg-[#350709]/15" />
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handlePrevDrop}
                  aria-label="Shuffle drops"
                  className="w-9 h-9 rounded-full border border-[#350709]/35 text-[#350709] hover:bg-[#350709] hover:text-[#FAF5EE] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextDrop}
                  aria-label="Next drop"
                  className="w-9 h-9 rounded-full border border-[#350709]/35 text-[#350709] hover:bg-[#350709] hover:text-[#FAF5EE] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: OUR STORY — "CRAFTED BY CREATORS, FOR CREATORS"
         ===================================================================== */}
      <section
        id="our-story"
        className="relative w-full bg-gradient-to-r from-[#220405] via-[#34080A] to-[#260506] text-[#F7F2EA] overflow-hidden"
      >
        <div className="max-w-[1536px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Col 1: Left Bleed Monochromatic Creator Portrait (4 cols on lg) */}
          <div className="relative lg:col-span-4 h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden">
            <img
              src={storyCreatorPortrait}
              alt="ASVÉRA Creator Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center sepia-[0.25] contrast-110 brightness-90"
            />
            {/* Seamless oxblood blend gradients */}
            <div className="absolute inset-0 bg-[#3B080A]/35 mix-blend-multiply" />
            <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-r from-transparent to-[#2B0608]" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#240405] to-transparent lg:hidden" />
          </div>

          {/* Col 2: Story Copy Block (4 cols on lg) */}
          <div className="lg:col-span-4 px-6 sm:px-10 lg:px-8 py-10 lg:py-12">
            <div className="flex items-center gap-3.5 mb-3">
              <span className="text-[10.5px] font-medium tracking-[0.2em] text-[#E6D7C3]/80 uppercase">
                OUR STORY
              </span>
              <span className="w-12 h-[1px] bg-[#E6D7C3]/35" />
            </div>

            <h2 className="font-brand text-[34px] sm:text-[40px] xl:text-[44px] font-normal leading-[1.04] tracking-[0.03em] text-[#FAF5EE] uppercase">
              <span className="block">CRAFTED</span>
              <span className="block">BY CREATORS,</span>
              <span className="block">FOR CREATORS</span>
            </h2>

            <p className="mt-4 text-[13px] sm:text-[13.5px] leading-[1.65] text-[#E6D7C3]/85 font-normal max-w-[390px]">
              <strong className="font-semibold text-[#FAF5EE]">ASVÉRA</strong> is
              more than a brand — it&apos;s a movement. We design for the
              dreamers, the rebels and the ones who see style as a form of
              self-expression.
            </p>

            <button
              type="button"
              onClick={() => setDrawerMode('about')}
              className="group mt-6 inline-flex items-center gap-5 border border-[#E6D7C3]/45 hover:border-[#FAF5EE] hover:bg-white/[0.04] rounded-full px-6 py-2 text-[10.5px] font-medium tracking-[0.18em] text-[#FAF5EE] uppercase transition-all cursor-pointer"
            >
              <span>OUR JOURNEY</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E6D7C3] transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Col 3 & 4: Framed Coastal Photo with Signature + Metrics Column (4 cols on lg) */}
          <div className="lg:col-span-4 px-6 sm:px-10 lg:pr-12 lg:pl-4 py-10 lg:py-12 flex flex-col sm:flex-row items-center justify-between gap-8 border-t lg:border-t-0 lg:border-l border-[#E6D7C3]/10">
            {/* Rounded Square Coastal Bay Image + Handwritten Signature Overlay */}
            <div className="relative shrink-0">
              <div className="w-[210px] sm:w-[225px] aspect-[4/3.4] rounded-[12px] overflow-hidden shadow-2xl border border-[#E6D7C3]/15">
                <img
                  src={storyCoastalBay}
                  alt="Indian Coastal Landscape"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Handwritten Signature SVG overlapping bottom-right corner */}
              <svg
                viewBox="0 0 120 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-14 text-[#FAF5EE]/90 absolute -bottom-4 -right-5 pointer-events-none drop-shadow"
                aria-hidden="true"
              >
                <path
                  d="M18 52C34 26 58 14 70 18C78 21 52 46 44 68C58 46 84 22 98 26C106 28 92 46 84 52C94 49 108 46 116 44"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Vertical Divider */}
            <div className="hidden sm:block h-44 w-[1px] bg-[#E6D7C3]/15" />

            {/* Stacked Brand Metrics */}
            <div className="relative flex-1 flex sm:flex-col justify-between gap-6 w-full sm:w-auto">
              <div>
                <div className="font-brand text-[28px] sm:text-[32px] font-normal text-[#FAF5EE] leading-none tabular-nums">
                  10K+
                </div>
                <div className="text-[9px] sm:text-[9.5px] tracking-[0.18em] text-[#E6D7C3]/75 uppercase mt-1 whitespace-nowrap">
                  HAPPY CUSTOMERS
                </div>
              </div>

              <div>
                <div className="font-brand text-[28px] sm:text-[32px] font-normal text-[#FAF5EE] leading-none tabular-nums flex items-center gap-1">
                  <span>4.8</span>
                  <span className="text-[20px] text-[#FAF5EE]">★</span>
                </div>
                <div className="text-[9px] sm:text-[9.5px] tracking-[0.18em] text-[#E6D7C3]/75 uppercase mt-1 whitespace-nowrap">
                  AVERAGE RATING
                </div>
              </div>

              <div>
                <div className="font-brand text-[28px] sm:text-[32px] font-normal text-[#FAF5EE] leading-none tabular-nums">
                  100%
                </div>
                <div className="text-[9px] sm:text-[9.5px] tracking-[0.18em] text-[#E6D7C3]/75 uppercase mt-1 whitespace-nowrap">
                  PREMIUM QUALITY
                </div>
              </div>

              {/* Coastal Palm Starburst Emblem at bottom-right */}
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hidden sm:block w-6 h-6 text-[#FAF5EE]/85 self-end -mt-2"
                aria-hidden="true"
              >
                <path
                  d="M16 15V29M16 15L8 11M16 15L24 11M16 15L6 17M16 15L26 17M16 15L11 6M16 15L21 6M16 15V4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: STYLE LOOKBOOK — "REAL PEOPLE. REAL VIBES."
         ===================================================================== */}
      <section
        id="lookbook"
        className="relative w-full bg-[#080808] text-[#F7F2EA] py-12 sm:py-14 px-6 sm:px-10 md:px-14 lg:px-[60px] border-t border-white/10"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8 xl:gap-10">
          {/* Left Lookbook Title & CTA */}
          <div className="lg:w-[22%] shrink-0">
            <h2 className="font-brand text-[36px] sm:text-[42px] font-normal leading-[0.96] tracking-[0.03em] text-[#FAF5EE] uppercase">
              <span className="block">STYLE</span>
              <span className="block">LOOKBOOK</span>
            </h2>

            <p className="mt-2.5 text-[10px] sm:text-[10.5px] font-medium tracking-[0.2em] text-[#E6D7C3]/75 uppercase">
              REAL PEOPLE. REAL VIBES.
            </p>

            <button
              type="button"
              onClick={() => setLightboxImage(LOOKBOOK_SLIDES[activeLookbookIndex])}
              className="group mt-5 inline-flex items-center gap-3.5 border border-[#E6D7C3]/45 hover:border-white rounded-full px-5 py-2 text-[10px] font-medium tracking-[0.16em] text-[#FAF5EE] uppercase transition-all cursor-pointer"
            >
              <span>VIEW LOOKBOOK</span>
              <ArrowRight className="w-3 h-3 text-[#E6D7C3] transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Lookbook Gallery Carousel */}
          <div className="flex-1 flex items-center gap-3 sm:gap-4">
            {/* Previous Slide Button */}
            <button
              type="button"
              onClick={handlePrevLookbook}
              aria-label="Previous lookbook slide"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#E6D7C3]/70 hover:text-white transition-colors shrink-0 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* 4 Lookbook Cards */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-12 gap-3.5 sm:gap-4 items-center">
              {orderedLookbook.map((slide) => (
                <div
                  key={slide.id}
                  onClick={() => setLightboxImage(slide)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setLightboxImage(slide);
                    }
                  }}
                  className={`${
                    slide.narrow ? 'md:col-span-2' : 'md:col-span-3'
                  } group relative h-[165px] sm:h-[185px] rounded-[12px] overflow-hidden bg-[#141414] cursor-pointer`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-[11px] font-medium text-white truncate">
                      {slide.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Slide Button + Slide Counter (1/4) */}
            <div className="flex flex-col items-center justify-between h-[165px] sm:h-[185px] py-1 shrink-0">
              <div />
              <button
                type="button"
                onClick={handleNextLookbook}
                aria-label="Next lookbook slide"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#E6D7C3]/70 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 stroke-[1.5]" />
              </button>
              <span className="text-[11px] text-[#E6D7C3]/75 tabular-nums">
                {activeLookbookIndex + 1}/{LOOKBOOK_SLIDES.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          LOOKBOOK LIGHTBOX MODAL
         ===================================================================== */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-[#111111] border border-white/15 rounded-2xl overflow-hidden shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close lookbook preview"
              className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="aspect-[4/3] w-full bg-black">
              <img
                src={lightboxImage.image}
                alt={lightboxImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-white">
                  {lightboxImage.title}
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  {lightboxImage.caption}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLightboxImage(null);
                  setDrawerMode('collection');
                }}
                className="bg-[#FAF7F0] text-black text-xs font-medium px-4 py-2 rounded-full hover:bg-white transition-colors cursor-pointer"
              >
                Shop This Look
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          INTERACTIVE DRAWER OVERLAY (SHOP / WAITLIST / OUR STORY)
         ===================================================================== */}
      {drawerMode && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0B0B0B] border-l border-white/15 h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <span className="font-brand text-2xl tracking-[0.06em] text-[#F5F2EB]">
                  ASVÉRA
                </span>
                <button
                  type="button"
                  onClick={() => setDrawerMode(null)}
                  aria-label="Close panel"
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {drawerMode === 'collection' && (
                <div className="mt-6 space-y-6">
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[4/3] bg-[#141414]">
                    <img
                      src={selectedProduct.image || editorialHero}
                      alt={selectedProduct.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
                      <span className="text-[11px] text-[#DFD3C3]">
                        Fresh Drops · Limited Stock
                      </span>
                      <h2 className="text-lg font-medium text-white">
                        {selectedProduct.name} — {selectedProduct.price}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {FRESH_DROPS.map((item) => {
                      const isSelected = selectedProduct.id === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedProduct(item)}
                          className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                            isSelected
                              ? 'border-[#DFD3C3]/60 bg-white/[0.04]'
                              : 'border-white/15 hover:border-white/30 bg-transparent'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white">
                              {item.name}
                            </span>
                            <span className="text-sm font-medium text-[#DFD3C3] tabular-nums">
                              {item.price}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-white/55">
                            <span>{item.category}</span>
                            <span>·</span>
                            <span>{item.gsm}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      triggerToast(`Added ${selectedProduct.name} to your ASVÉRA bag.`);
                      setDrawerMode(null);
                    }}
                    className="w-full bg-[#FAF7F0] hover:bg-white text-black font-medium text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {selectedProduct.name} to Bag</span>
                  </button>
                </div>
              )}

              {drawerMode === 'get-started' && (
                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-xs text-[#DFD3C3] mb-1">
                      50K+ Fashion Lovers · Inner Circle
                    </p>
                    <h2 className="text-2xl font-normal tracking-tight text-white">
                      Join the Next Generation of Indian Streetwear
                    </h2>
                    <p className="mt-2 text-sm text-white/65 leading-relaxed">
                      Receive private access keys to numbered drops, studio
                      pop-ups in Mumbai, Delhi &amp; Bengaluru, and archival
                      restocks.
                    </p>
                  </div>

                  {joinedWaitlist ? (
                    <div className="p-4 rounded-xl border border-[#DFD3C3]/40 bg-white/[0.03] text-sm text-white/90">
                      You are registered for Drop 01 early access. Check your
                      inbox for your private member pass.
                    </div>
                  ) : (
                    <form onSubmit={handleWaitlistSubmit} className="space-y-3">
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full bg-black border border-white/25 focus:border-white rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full bg-[#FAF7F0] hover:bg-white text-black font-medium text-sm py-3 rounded-xl transition-colors cursor-pointer"
                      >
                        Request Private Access
                      </button>
                    </form>
                  )}
                </div>
              )}

              {(drawerMode === 'about' || drawerMode === 'blog') && (
                <div className="mt-6 space-y-5">
                  <p className="text-xs text-[#DFD3C3]">
                    EST 2025 · Made in India
                  </p>
                  <h2 className="font-brand text-3xl font-normal tracking-wide text-white uppercase">
                    Crafted By Creators, For Creators
                  </h2>
                  <p className="text-sm text-white/70 leading-relaxed">
                    ASVÉRA is more than a brand — it&apos;s a movement. We
                    design for the dreamers, the rebels and the ones who see
                    style as a form of self-expression. Every silhouette blends
                    coastal ease with urban architectural precision.
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl border border-white/15">
                      <div className="font-brand text-2xl text-white tabular-nums">10K+</div>
                      <div className="text-[10px] text-white/55 uppercase mt-0.5">
                        Happy Customers
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-white/15">
                      <div className="font-brand text-2xl text-white tabular-nums">4.8 ★</div>
                      <div className="text-[10px] text-white/55 uppercase mt-0.5">
                        Average Rating
                      </div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-white/15">
                      <div className="font-brand text-2xl text-white tabular-nums">100%</div>
                      <div className="text-[10px] text-white/55 uppercase mt-0.5">
                        Premium Quality
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/45">
              <span>ASVÉRA Studio · India</span>
              <span>AW&apos;25 Coastal &amp; Street Edition</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
