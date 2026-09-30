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
import ClothingCarousel3D, { CarouselClothingItem } from './components/ClothingCarousel3D';
import AsveraFooter from './components/AsveraFooter';
import WomensCollectionPage from './components/WomensCollectionPage';

const HERO_VIDEO_URL =
  'https://www.image2url.com/r2/default/videos/1790655742560-6170f399-0862-4616-9869-f254f102feb3.mp4';

const ASVERA_3D_CAROUSEL_ITEMS: CarouselClothingItem[] = [
  {
    id: 'car-coastal-tee',
    src: dropCoastalTee,
    title: 'Coastal Tee',
    subtitle: '280 GSM Combed Cotton',
    price: '₹1,999',
  },
  {
    id: 'car-signature-hoodie',
    src: dropSignatureHoodie,
    title: 'Signature Hoodie',
    subtitle: '480 GSM Heavyweight Terry',
    price: '₹3,499',
  },
  {
    id: 'car-utility-cargo',
    src: dropUtilityCargo,
    title: 'Utility Cargo',
    subtitle: '340 GSM Ripstop Twill',
    price: '₹2,999',
  },
  {
    id: 'car-essentials-sweatshirt',
    src: dropEssentialsSweatshirt,
    title: 'Essentials Sweatshirt',
    subtitle: '420 GSM Brushed Fleece',
    price: '₹2,499',
  },
  {
    id: 'car-vibe-tshirts',
    src: vibeTshirts,
    title: 'Maroon Oversized Tee',
    subtitle: 'Soft. Breathable. Everyday.',
    price: '₹2,199',
  },
  {
    id: 'car-vibe-hoodies',
    src: vibeHoodies,
    title: 'Archival Graphic Hoodie',
    subtitle: 'Warmth with attitude.',
    price: '₹3,899',
  },
  {
    id: 'car-vibe-bottoms',
    src: vibeBottoms,
    title: 'Olive Coastal Cargo',
    subtitle: 'Comfort meets style.',
    price: '₹3,199',
  },
  {
    id: 'car-vibe-outerwear',
    src: vibeOuterwear,
    title: 'Noir Crest Hoodie',
    subtitle: 'Built for every season.',
    price: '₹4,299',
  },
];

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

type MensCategoryKey = 'T-SHIRTS' | 'SHIRTS' | 'HOODIES' | 'BOTTOMS';

const MENS_CATEGORIES: Array<{
  key: MensCategoryKey;
  index: string;
  title: string;
  image: string;
  available: boolean;
}> = [
  { key: 'T-SHIRTS', index: '01', title: 'T-SHIRTS', image: vibeTshirts, available: true },
  { key: 'SHIRTS', index: '02', title: 'SHIRTS', image: dropCoastalTee, available: false },
  { key: 'HOODIES', index: '03', title: 'HOODIES', image: vibeHoodies, available: false },
  { key: 'BOTTOMS', index: '04', title: 'BOTTOMS', image: vibeBottoms, available: false },
];

const MENS_CATEGORY_CATALOG: Record<MensCategoryKey, FreshDropProduct[]> = {
  'T-SHIRTS': [
    FRESH_DROPS[0],
    {
      id: 'maroon-oversized-tee',
      name: 'Maroon Oversized Tee',
      price: '₹2,199',
      image: vibeTshirts,
      swatches: ['#4A1215', '#111014'],
      category: 'T-Shirts',
      gsm: '280 GSM Combed Cotton',
    },
  ],
  SHIRTS: [
    {
      id: 'coastal-camp-shirt',
      name: 'Coastal Camp Shirt',
      price: '₹2,699',
      image: dropCoastalTee,
      swatches: ['#4E5346', '#F3EBDD'],
      category: 'Shirts',
      gsm: '240 GSM Textured Cotton Weave',
    },
    {
      id: 'crimson-resort-overshirt',
      name: 'Crimson Resort Overshirt',
      price: '₹2,899',
      image: vibeTshirts,
      swatches: ['#3A0D16', '#111014'],
      category: 'Shirts',
      gsm: '290 GSM Structured Twill',
    },
  ],
  HOODIES: [
    FRESH_DROPS[1],
    {
      id: 'archival-graphic-hoodie',
      name: 'Archival Graphic Hoodie',
      price: '₹3,899',
      image: vibeHoodies,
      swatches: ['#FAF6EF', '#111014'],
      category: 'Hoodies',
      gsm: '480 GSM Heavyweight Terry',
    },
  ],
  BOTTOMS: [
    FRESH_DROPS[2],
    {
      id: 'olive-coastal-cargo',
      name: 'Olive Coastal Cargo',
      price: '₹3,199',
      image: vibeBottoms,
      swatches: ['#4B5247', '#111014'],
      category: 'Bottoms',
      gsm: '340 GSM Ripstop Twill',
    },
  ],
};

const ALL_MENS_PRODUCTS: FreshDropProduct[] = [
  ...MENS_CATEGORY_CATALOG['T-SHIRTS'],
  ...MENS_CATEGORY_CATALOG.SHIRTS,
  ...MENS_CATEGORY_CATALOG.HOODIES,
  ...MENS_CATEGORY_CATALOG.BOTTOMS,
];

export default function App() {
  const [activeDropdown, setActiveDropdown] = useState<'features' | 'shop' | null>(null);
  const [drawerMode, setDrawerMode] = useState<'collection' | 'get-started' | 'about' | 'blog' | null>(null);
  const [useLiveClock, setUseLiveClock] = useState<boolean>(false);
  const [liveTimeStr, setLiveTimeStr] = useState<string>('02:16 PM (IST)');
  const [joinedWaitlist, setJoinedWaitlist] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<FreshDropProduct | null>(null);
  const [dedicatedProductPage, setDedicatedProductPage] = useState<FreshDropProduct | null>(null);
  const [productSize, setProductSize] = useState<'S' | 'M' | 'L' | 'XL'>('L');
  const [productQuantity, setProductQuantity] = useState<number>(1);
  const [activeCategoryPage, setActiveCategoryPage] = useState<MensCategoryKey | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
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
  const [activeWorld, setActiveWorld] = useState<'men' | 'women'>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/women')) {
      return 'women';
    }
    return 'men';
  });
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'entering' | 'revealing'>('idle');

  const navRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const womensContainerRef = useRef<HTMLDivElement>(null);

  // Sync browser back/forward navigation between Men's (/) and Women's (/women/*)
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname.startsWith('/women')) {
        setActiveWorld('women');
      } else {
        setActiveWorld('men');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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

  const enterWomensCollection = () => {
    if (transitionPhase !== 'idle') return;
    setActiveDropdown(null);
    setTransitionPhase('entering');

    window.setTimeout(() => {
      if (!window.location.pathname.startsWith('/women')) {
        window.history.pushState({ world: 'women' }, '', '/women');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      setActiveWorld('women');
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (womensContainerRef.current) {
        womensContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
      }
      setTransitionPhase('revealing');
    }, 480);

    window.setTimeout(() => {
      setTransitionPhase('idle');
    }, 920);
  };

  const returnToMensCollection = () => {
    if (transitionPhase !== 'idle') return;
    setTransitionPhase('entering');

    window.setTimeout(() => {
      if (window.location.pathname !== '/') {
        window.history.pushState({ world: 'men' }, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      setActiveWorld('men');
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTransitionPhase('revealing');
    }, 480);

    window.setTimeout(() => {
      setTransitionPhase('idle');
    }, 920);
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
          HERO SECTION (WITH SMOOTH HIGH-DEFINITION 3D VIDEO BACKGROUND)
         ===================================================================== */}
      <div id="top" className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between overflow-hidden">
        {/* Zero-dimension SVG Optical Super-Resolution & Micro-Detail Filter for 3D Hero Video */}
        <svg className="pointer-events-none absolute w-0 h-0 opacity-0" aria-hidden="true">
          <defs>
            <filter
              id="asvera-hero-4k-clarity"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              colorInterpolationFilters="sRGB"
            >
              {/* Calibrated sub-pixel edge & texture sharpening without halos */}
              <feConvolveMatrix
                order="3 3"
                kernelMatrix="0 -0.16 0 -0.16 1.64 -0.16 0 -0.16 0"
                divisor="1"
                bias="0"
                preserveAlpha="true"
                result="sharpened"
              />
              {/* Subtle tonal lift & micro-contrast preservation */}
              <feComponentTransfer in="sharpened">
                <feFuncR type="linear" slope="1.04" intercept="0.008" />
                <feFuncG type="linear" slope="1.04" intercept="0.008" />
                <feFuncB type="linear" slope="1.04" intercept="0.008" />
              </feComponentTransfer>
            </filter>
          </defs>
        </svg>

        {/* Full-Bleed Background Video — Preserving Original Colors, Natural Brightness & Maximum Crispness */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black" aria-hidden="true">
          <video
            ref={videoRef}
            src={HERO_VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            style={{
              filter: 'url(#asvera-hero-4k-clarity) saturate(1.05)',
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
            className="w-full h-full object-cover object-center transform-gpu"
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
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
              className="font-brand text-[28px] sm:text-[34px] md:text-[36px] font-normal tracking-[0.06em] text-[#F5F2EB] leading-none whitespace-nowrap shrink-0 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
            >
              ASVÉRA
            </a>

            {/* Center Pill Navigation */}
            <div ref={navRef} className="relative hidden lg:flex items-center">
              <nav
                aria-label="Primary Navigation"
                className="flex items-center gap-8 xl:gap-9 border border-white/25 rounded-full px-7 py-2.5 bg-black/30 backdrop-blur-md"
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === 'features' ? null : 'features')
                  }
                  className="flex items-center gap-1.5 text-[13.5px] font-normal text-white/95 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
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
                  className="flex items-center gap-1.5 text-[13.5px] font-normal text-white/95 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
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
                  className="text-[13.5px] font-normal text-white/95 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  About
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('collections')}
                  className="text-[13.5px] font-normal text-white/95 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  Collection
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('lookbook')}
                  className="text-[13.5px] font-normal text-white/95 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
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

            {/* Spacer to keep minimal navigation balanced */}
            <div className="hidden lg:block w-[110px]" aria-hidden="true" />
          </header>

          {/* Lower-Middle / Center-Left Editorial Hero CTA Overlay */}
          <div className="relative mt-auto mb-16 sm:mb-24 lg:mb-28 pt-12 max-w-[460px]">
            {/* Very subtle localized transparent gradient strictly behind text area */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-5 -inset-y-5 rounded-3xl bg-radial from-black/22 via-black/8 to-transparent blur-xl -z-10"
            />

            <span className="block text-[10px] sm:text-[10.5px] tracking-[0.28em] text-[#F3EBDD] uppercase mb-3 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
              ASVÉRA WOMEN / MEN
            </span>

            <h1 className="font-brand text-[34px] sm:text-[42px] md:text-[48px] font-normal leading-[0.94] tracking-[0.03em] text-[#FAF6EF] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.38)]">
              <span className="block">A WORLD OF QUIET</span>
              <span className="block text-[#F3EBDD]">CONFIDENCE.</span>
            </h1>

            <p className="mt-3.5 text-[13px] sm:text-[13.5px] leading-[1.6] text-[#FAF6EF]/95 font-normal max-w-[340px] drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
              Contemporary silhouettes.
              <br />
              Distinct identity. Made for those who move differently.
            </p>

            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 w-full sm:w-auto max-w-[280px] sm:max-w-none">
              {/* Primary CTA: EXPLORE MEN */}
              <button
                type="button"
                onClick={() => scrollToSection('collections')}
                className="group inline-flex items-center justify-between sm:justify-center gap-3 bg-[#FAF6EF] hover:bg-[#F3EBDD] text-[#111014] text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] uppercase px-5 py-3 rounded-[5px] transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <span>EXPLORE MEN</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>

              {/* Secondary Luxury CTA: ENTER WOMEN'S COLLECTION */}
              <button
                type="button"
                onClick={enterWomensCollection}
                style={{
                  background:
                    'linear-gradient(135deg, rgba(36, 19, 41, 0.92) 0%, rgba(58, 13, 22, 0.92) 55%, rgba(90, 23, 36, 0.9) 100%)',
                }}
                className="group inline-flex items-center justify-between sm:justify-center gap-3 text-[#FAF6EF] text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] uppercase px-5 py-3 rounded-[5px] border border-[#B8A58D]/35 hover:border-[#FAF6EF]/65 shadow-[0_8px_24px_rgba(58,13,22,0.45)] backdrop-blur-sm transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <span>ENTER WOMEN&apos;S COLLECTION</span>
                <span
                  aria-hidden="true"
                  className="text-[#F3EBDD] transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================================
          CONTINUOUS 3D SCROLLING CLOTHING CAROUSEL
         ===================================================================== */}
      <ClothingCarousel3D
        defaultItems={ASVERA_3D_CAROUSEL_ITEMS}
        onSelectItem={(item) =>
          setLightboxImage({
            id: item.id,
            title: item.title,
            caption: item.subtitle || 'ASVÉRA Archival Collection',
            image: item.src,
          })
        }
      />

      {/* =====================================================================
          01 — SHOP MEN (4 CATEGORIES ONLY + DEDICATED CATEGORY DESTINATION)
         ===================================================================== */}
      <section
        id="collections"
        className="relative w-full bg-[#111014] text-[#FAF6EF] py-24 sm:py-32 px-6 sm:px-10 md:px-14 lg:px-[60px] border-t border-[#B8A58D]/15"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-14 sm:mb-16">
            <span className="block text-[11px] tracking-[0.28em] text-[#B8A58D] uppercase mb-3">
              01 — SHOP MEN
            </span>
            <h2 className="font-brand text-[44px] sm:text-[58px] lg:text-[68px] font-normal leading-[0.94] tracking-[0.02em] text-[#FAF6EF] uppercase">
              MEN&apos;S CATEGORIES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {MENS_CATEGORIES.map((category) => {
              if (category.available) {
                return (
                  <div
                    key={category.key}
                    onClick={() => {
                      setActiveCategoryPage('T-SHIRTS');
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveCategoryPage('T-SHIRTS');
                      }
                    }}
                    className="group relative aspect-[3/4.2] overflow-hidden bg-[#241329] cursor-pointer border border-[#B8A58D]/30"
                  >
                    <img
                      src={category.image}
                      alt={category.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111014]/90 via-[#111014]/20 to-transparent" />

                    <div className="absolute top-6 left-7 right-7 flex items-center justify-between text-[10px] tracking-[0.24em] text-[#FAF6EF]/85 uppercase">
                      <span>{category.index}</span>
                      <span>AVAILABLE NOW</span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8 flex flex-col items-start justify-end">
                      <h3 className="font-brand text-[28px] sm:text-[32px] tracking-[0.05em] text-[#FAF6EF] uppercase leading-none">
                        {category.title}
                      </h3>
                      <span className="mt-3 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-[#F3EBDD] uppercase">
                        <span>EXPLORE NOW</span>
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={category.key}
                  aria-disabled="true"
                  className="relative aspect-[3/4.2] overflow-hidden bg-[#111014] border border-[#B8A58D]/12 select-none cursor-default"
                >
                  <img
                    src={category.image}
                    alt={`${category.title} — Coming Soon`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center opacity-55 saturate-[0.75] scale-100"
                  />
                  {/* Subtle Luxury Editorial Dusk Scrim for Upcoming Drops */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111014]/95 via-[#241329]/45 to-[#111014]/40" />

                  <div className="absolute top-6 left-7 right-7 flex items-center justify-between text-[10px] tracking-[0.24em] text-[#B8A58D]/70 uppercase">
                    <span>{category.index}</span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8 flex flex-col items-start justify-end">
                    <h3 className="font-brand text-[28px] sm:text-[32px] tracking-[0.05em] text-[#FAF6EF]/85 uppercase leading-none">
                      {category.title}
                    </h3>
                    <span className="mt-3 inline-block text-[10.5px] tracking-[0.26em] text-[#B8A58D] uppercase">
                      COMING SOON
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          02 — NEW DROP
         ===================================================================== */}
      <section
        id="new-arrivals"
        className="relative w-full bg-[#FAF6EF] text-[#111014] py-28 sm:py-36 px-6 sm:px-10 md:px-14 lg:px-[60px]"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16 sm:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-brand text-[48px] sm:text-[64px] lg:text-[76px] font-normal leading-[0.92] tracking-[0.02em] text-[#3A0D16] uppercase">
              NEW DROP
            </h2>
            <p className="text-[11px] tracking-[0.26em] text-[#5A1724] uppercase">
              THE LATEST ASVÉRA PIECES.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-10 lg:gap-x-14 items-start">
            {FRESH_DROPS.slice(0, 3).map((product, idx) => {
              const colSpanClass =
                idx === 0
                  ? 'md:col-span-5'
                  : idx === 1
                  ? 'md:col-span-4 md:mt-20'
                  : 'md:col-span-3';

              return (
                <div
                  key={product.id}
                  onClick={() => {
                    setDedicatedProductPage(product);
                    setProductSize('L');
                    setProductQuantity(1);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setDedicatedProductPage(product);
                      setProductSize('L');
                      setProductQuantity(1);
                    }
                  }}
                  className={`${colSpanClass} group cursor-pointer`}
                >
                  <div className="relative aspect-[3/3.9] overflow-hidden bg-[#F3EBDD]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <h3 className="font-brand text-[26px] sm:text-[28px] tracking-[0.03em] text-[#111014] uppercase leading-none">
                      {product.name}
                    </h3>
                    <span className="text-[15px] text-[#5A1724] tabular-nums">
                      {product.price}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-[#3A0D16] uppercase">
                      <span>VIEW PRODUCT</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          03 — MEN'S EDIT
         ===================================================================== */}
      <section
        id="mens-edit"
        className="relative w-full bg-[#241329] text-[#FAF6EF] py-28 sm:py-36 lg:py-40 px-6 sm:px-10 md:px-14 lg:px-[60px]"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Primary Large Men's Fashion Image */}
          <div className="lg:col-span-7 relative aspect-[4/4.8] overflow-hidden bg-[#111014]">
            <img
              src={vibeTshirts}
              alt="ASVÉRA Men's Drop-Shoulder Silhouette"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Asymmetrical Editorial Column: Typography + Smaller Supporting Image */}
          <div className="lg:col-span-5 lg:pt-8 flex flex-col justify-between lg:min-h-full space-y-14 sm:space-y-20">
            <div>
              <span className="block text-[11px] tracking-[0.28em] text-[#B8A58D] uppercase mb-5">
                03 — MEN&apos;S EDIT
              </span>
              <h2 className="font-brand text-[46px] sm:text-[58px] lg:text-[64px] font-normal leading-[0.93] tracking-[0.02em] text-[#FAF6EF] uppercase">
                SILHOUETTE &amp; PROPORTION
              </h2>
              <p className="mt-7 text-[15px] sm:text-[16px] leading-[1.75] text-[#F3EBDD]/80 max-w-[390px]">
                Relaxed drop-shoulder silhouettes paired with structured proportions.
                Designed for movement, presence and everyday expression.
              </p>
            </div>

            <div className="w-full max-w-[340px] lg:ml-auto">
              <div className="aspect-[3/3.6] overflow-hidden bg-[#111014]">
                <img
                  src={dropUtilityCargo}
                  alt="ASVÉRA Structured Proportion Study"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          04 — ASVÉRA STANDARD
         ===================================================================== */}
      <section
        id="asvera-standard"
        className="relative w-full bg-[#F3EBDD] text-[#111014] py-24 sm:py-32 px-6 sm:px-10 md:px-14 lg:px-[60px]"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <span className="block text-[11px] tracking-[0.28em] text-[#5A1724] uppercase mb-4">
              04 — ASVÉRA STANDARD
            </span>
            <h2 className="font-brand text-[44px] sm:text-[56px] font-normal leading-[0.94] tracking-[0.02em] text-[#3A0D16] uppercase mb-10">
              UNCOMPROMISED CRAFT
            </h2>

            <div className="divide-y divide-[#3A0D16]/15 border-y border-[#3A0D16]/15">
              {[
                { label: 'QUALITY', detail: 'Single-origin Indian cotton milled for longevity' },
                { label: 'FABRIC', detail: 'Heavyweight 300–480 GSM custom-knitted jersey & terry' },
                { label: 'CRAFTSMANSHIP', detail: 'Small-batch garment washes with zero shrinkage' },
                { label: 'FIT', detail: 'Architectural drop-shoulder drape tailored for movement' },
                { label: 'DETAIL', detail: 'High-density woven archival emblems and tonal stitching' },
              ].map((pillar) => (
                <div
                  key={pillar.label}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <span className="font-brand text-[22px] tracking-[0.08em] text-[#3A0D16] uppercase">
                    {pillar.label}
                  </span>
                  <span className="text-[13.5px] text-[#111014]/75">
                    {pillar.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3.6] overflow-hidden bg-[#111014]">
            <img
              src={lookbookWovenLabel}
              alt="ASVÉRA Fabric & Woven Label Detail"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          05 — MEN'S LOOKBOOK
         ===================================================================== */}
      <section
        id="lookbook"
        className="relative w-full bg-[#111014] text-[#FAF6EF] py-24 sm:py-32 px-6 sm:px-10 md:px-14 lg:px-[60px]"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <span className="block text-[11px] tracking-[0.28em] text-[#B8A58D] uppercase mb-3">
              05 — MEN&apos;S LOOKBOOK
            </span>
            <h2 className="font-brand text-[44px] sm:text-[58px] lg:text-[68px] font-normal leading-[0.94] tracking-[0.02em] text-[#FAF6EF] uppercase">
              CAMPAIGN ARCHIVE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div
              onClick={() => setLightboxImage(LOOKBOOK_SLIDES[1])}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setLightboxImage(LOOKBOOK_SLIDES[1]);
                }
              }}
              className="md:col-span-7 group cursor-pointer"
            >
              <div className="aspect-[16/11] overflow-hidden bg-[#241329]">
                <img
                  src={vibeHoodies}
                  alt="Look 01 — Archival Cream Hoodie"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-[11px] tracking-[0.2em] text-[#B8A58D] uppercase">
                LOOK 01 — COASTAL MONOLITH
              </p>
            </div>

            <div
              onClick={() => setLightboxImage(LOOKBOOK_SLIDES[2])}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setLightboxImage(LOOKBOOK_SLIDES[2]);
                }
              }}
              className="md:col-span-5 group cursor-pointer"
            >
              <div className="aspect-[3/3.8] overflow-hidden bg-[#241329]">
                <img
                  src={lookbookSunsetPalm}
                  alt="Look 02 — Dusk Silhouette"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-[11px] tracking-[0.2em] text-[#B8A58D] uppercase">
                LOOK 02 — ARABIAN DUSK
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          06 — FEATURED PRODUCT
         ===================================================================== */}
      <section
        id="featured-product"
        className="relative w-full bg-[#3A0D16] text-[#FAF6EF] py-24 sm:py-32 px-6 sm:px-10 md:px-14 lg:px-[60px]"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 aspect-[4/4.5] overflow-hidden bg-[#5A1724]">
            <img
              src={dropSignatureHoodie}
              alt="Signature Hoodie"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <span className="block text-[11px] tracking-[0.28em] text-[#B8A58D] uppercase mb-4">
              06 — FEATURED PRODUCT
            </span>
            <h2 className="font-brand text-[48px] sm:text-[64px] lg:text-[74px] font-normal leading-[0.94] tracking-[0.02em] text-[#FAF6EF] uppercase">
              SIGNATURE HOODIE
            </h2>
            <p className="mt-5 font-brand text-[32px] text-[#F3EBDD] tabular-nums">
              ₹3,499
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => {
                  setDedicatedProductPage(FRESH_DROPS[1]);
                  setProductSize('L');
                  setProductQuantity(1);
                }}
                className="group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] text-[#FAF6EF] uppercase border-b border-[#FAF6EF]/40 pb-1.5 hover:border-[#FAF6EF] transition-colors cursor-pointer"
              >
                <span>VIEW PRODUCT</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          07 — LIMITED DROP
         ===================================================================== */}
      <section
        id="limited-drop"
        className="relative w-full bg-[#111014] text-[#FAF6EF] py-28 sm:py-36 px-6 sm:px-10 md:px-14 lg:px-[60px] overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, #3A1E42 0%, #241329 45%, #111014 85%)',
        }}
      >
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <span className="block text-[11px] tracking-[0.28em] text-[#B8A58D] uppercase mb-4">
              07 — LIMITED DROP
            </span>
            <h2 className="font-brand text-[44px] sm:text-[58px] font-normal leading-[0.95] tracking-[0.03em] text-[#FAF6EF] uppercase">
              NOIR ARCHIVE EDITION
            </h2>
            <p className="mt-5 text-[14px] leading-[1.7] text-[#B8A58D] max-w-[340px]">
              Individually numbered heavyweight silhouettes. Produced once in
              strictly limited quantities. Never restocked.
            </p>
          </div>

          <div className="md:col-span-6 order-1 md:order-2 aspect-[3/3.8] overflow-hidden bg-[#111014] border border-[#B8A58D]/15">
            <img
              src={editorialHero}
              alt="ASVÉRA Noir Archive Limited Drop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* =====================================================================
          08 — ASVÉRA STORY
         ===================================================================== */}
      <section
        id="our-story"
        className="relative w-full bg-[#3A0D16] text-[#FAF6EF] py-24 sm:py-32 px-6 sm:px-10 md:px-14 lg:px-[60px]"
      >
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-[#111014]">
            <img
              src={storyCreatorPortrait}
              alt="ASVÉRA Brand Story"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="lg:col-span-5">
            <span className="block text-[11px] tracking-[0.28em] text-[#B8A58D] uppercase mb-4">
              08 — ASVÉRA STORY
            </span>
            <h2 className="font-brand text-[38px] sm:text-[48px] font-normal leading-[1.02] tracking-[0.02em] text-[#FAF6EF] uppercase">
              CRAFTED FOR IDENTITY, NOT EPHEMERAL CYCLES
            </h2>
            <p className="mt-6 text-[15px] leading-[1.75] text-[#F3EBDD]/80">
              Born in India, ASVÉRA bridges heritage textile mastery with modern
              streetwear architecture—built for those who define culture on
              their own terms.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          09 — FINAL CTA / EDITORIAL FOOTER
         ===================================================================== */}
      <AsveraFooter
        onOpenCategory={(catKey) => {
          if (catKey === 'T-SHIRTS') {
            setActiveCategoryPage('T-SHIRTS');
          } else {
            triggerToast(`${catKey} is currently marked COMING SOON.`);
          }
        }}
        onScrollToSection={scrollToSection}
        onOpenInnerCircle={() => setDrawerMode('get-started')}
        onTriggerToast={triggerToast}
        onEnterWomen={enterWomensCollection}
      />

      {/* =====================================================================
          DEDICATED PRODUCT PAGE OVERLAY (OPENED FROM NEW DROP -> VIEW PRODUCT)
         ===================================================================== */}
      {dedicatedProductPage && (
        <div className="fixed inset-0 z-50 bg-[#FAF6EF] text-[#111014] overflow-y-auto">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-[60px] py-10 sm:py-14">
            <div className="flex items-center justify-between pb-8 border-b border-[#3A0D16]/15">
              <button
                type="button"
                onClick={() => setDedicatedProductPage(null)}
                className="text-[11px] tracking-[0.22em] text-[#3A0D16] uppercase hover:opacity-70 transition-opacity cursor-pointer"
              >
                ← BACK TO NEW DROP
              </button>
              <span className="font-brand text-2xl tracking-[0.06em] text-[#3A0D16]">
                ASVÉRA
              </span>
              <button
                type="button"
                onClick={() => setDedicatedProductPage(null)}
                aria-label="Close product page"
                className="w-10 h-10 border border-[#3A0D16]/25 flex items-center justify-center text-[#3A0D16] hover:border-[#3A0D16] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Product Images */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-9 aspect-[3/3.8] overflow-hidden bg-[#F3EBDD]">
                  <img
                    src={dedicatedProductPage.image}
                    alt={dedicatedProductPage.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="sm:col-span-3 flex sm:flex-col gap-4">
                  <div className="w-24 sm:w-full aspect-[3/3.8] overflow-hidden bg-[#F3EBDD] border border-[#3A0D16]">
                    <img
                      src={dedicatedProductPage.image}
                      alt={`${dedicatedProductPage.name} view 1`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="w-24 sm:w-full aspect-[3/3.8] overflow-hidden bg-[#F3EBDD] opacity-80">
                    <img
                      src={lookbookWovenLabel}
                      alt={`${dedicatedProductPage.name} fabric detail`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Product Details, Sizes, Quantity & Add to Bag */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="block text-[11px] tracking-[0.24em] text-[#5A1724] uppercase mb-2">
                    ASVÉRA MEN · {dedicatedProductPage.category}
                  </span>
                  <h1 className="font-brand text-[42px] sm:text-[52px] font-normal leading-[0.96] tracking-[0.02em] text-[#3A0D16] uppercase">
                    {dedicatedProductPage.name}
                  </h1>
                  <p className="mt-4 font-brand text-[28px] text-[#111014] tabular-nums">
                    {dedicatedProductPage.price}
                  </p>
                </div>

                <p className="text-[14.5px] leading-[1.75] text-[#111014]/80">
                  Crafted from {dedicatedProductPage.gsm.toLowerCase()} with an
                  architectural drop-shoulder silhouette. Engineered in India
                  for structured drape, breathable comfort, and lasting form.
                </p>

                {/* Size Selector */}
                <div>
                  <span className="block text-[11px] tracking-[0.22em] text-[#3A0D16] uppercase mb-3">
                    SIZE
                  </span>
                  <div className="grid grid-cols-4 gap-3">
                    {(['S', 'M', 'L', 'XL'] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setProductSize(sz)}
                        className={`py-3 text-xs tracking-[0.18em] uppercase border transition-colors cursor-pointer ${
                          productSize === sz
                            ? 'bg-[#3A0D16] text-[#FAF6EF] border-[#3A0D16]'
                            : 'bg-transparent text-[#111014] border-[#3A0D16]/25 hover:border-[#3A0D16]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div>
                  <span className="block text-[11px] tracking-[0.22em] text-[#3A0D16] uppercase mb-3">
                    QUANTITY
                  </span>
                  <div className="inline-flex items-center border border-[#3A0D16]/25">
                    <button
                      type="button"
                      onClick={() => setProductQuantity((q) => Math.max(1, q - 1))}
                      className="w-11 h-11 flex items-center justify-center text-sm text-[#3A0D16] hover:bg-[#F3EBDD] transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-xs tabular-nums text-[#111014]">
                      {productQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setProductQuantity((q) => Math.min(10, q + 1))}
                      className="w-11 h-11 flex items-center justify-center text-sm text-[#3A0D16] hover:bg-[#F3EBDD] transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Bag CTA */}
                <button
                  type="button"
                  onClick={() => {
                    triggerToast(
                      `Added ${productQuantity} × ${dedicatedProductPage.name} (Size ${productSize}) to your ASVÉRA bag.`
                    );
                    setDedicatedProductPage(null);
                  }}
                  className="w-full bg-[#3A0D16] hover:bg-[#5A1724] text-[#FAF6EF] text-[11px] font-medium tracking-[0.24em] uppercase py-4 transition-colors cursor-pointer"
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          DEDICATED MEN'S CATEGORY DESTINATION PAGE OVERLAY
         ===================================================================== */}
      {activeCategoryPage && (
        <div className="fixed inset-0 z-50 bg-[#111014] text-[#FAF6EF] overflow-y-auto">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-[60px] py-10 sm:py-14">
            <div className="flex items-center justify-between pb-8 border-b border-[#B8A58D]/15">
              <div>
                <span className="block text-[10px] tracking-[0.28em] text-[#B8A58D] uppercase mb-2">
                  ASVÉRA MEN — CATEGORY
                </span>
                <h2 className="font-brand text-[38px] sm:text-[52px] font-normal leading-none tracking-[0.04em] text-[#FAF6EF] uppercase">
                  {activeCategoryPage}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActiveCategoryPage(null)}
                aria-label="Close category page"
                className="w-10 h-10 border border-[#B8A58D]/30 flex items-center justify-center text-[#FAF6EF] hover:border-[#FAF6EF] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Switcher Bar */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-10 py-6 border-b border-[#B8A58D]/10">
              {MENS_CATEGORIES.map((cat) => {
                const isActive = activeCategoryPage === cat.key;
                if (!cat.available) {
                  return (
                    <span
                      key={cat.key}
                      className="text-[11px] tracking-[0.22em] uppercase pb-1 text-[#B8A58D]/45 cursor-default select-none"
                    >
                      {cat.title} · COMING SOON
                    </span>
                  );
                }
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setActiveCategoryPage('T-SHIRTS')}
                    className={`text-[11px] tracking-[0.22em] uppercase pb-1 transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#FAF6EF] border-b border-[#FAF6EF]'
                        : 'text-[#B8A58D]/65 hover:text-[#FAF6EF]'
                    }`}
                  >
                    {cat.title}
                  </button>
                );
              })}
            </div>

            {/* Strictly Only Products from the Selected Men's Category */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
              {MENS_CATEGORY_CATALOG[activeCategoryPage].map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setActiveCategoryPage(null);
                    setDedicatedProductPage(product);
                    setProductSize('L');
                    setProductQuantity(1);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveCategoryPage(null);
                      setDedicatedProductPage(product);
                      setProductSize('L');
                      setProductQuantity(1);
                    }
                  }}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[3/3.8] overflow-hidden bg-[#241329]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="font-brand text-[26px] tracking-[0.03em] text-[#FAF6EF] uppercase">
                      {product.name}
                    </h3>
                    <span className="text-[15px] text-[#B8A58D] tabular-nums">
                      {product.price}
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-[#F3EBDD] uppercase">
                      <span>VIEW PRODUCT</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
            className="relative max-w-lg w-full bg-[#111014] border border-[#B8A58D]/20 overflow-hidden shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              aria-label="Close lookbook preview"
              className="absolute top-3.5 right-3.5 z-10 w-8 h-8 bg-black/70 text-white flex items-center justify-center hover:bg-black cursor-pointer"
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
            <div className="p-5">
              <h3 className="font-brand text-xl tracking-[0.04em] text-[#FAF6EF] uppercase">
                {lightboxImage.title}
              </h3>
              <p className="text-xs text-[#B8A58D] mt-1">
                {lightboxImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MINIMAL QUICK SHOP / NAVIGATION & PRODUCT PANEL
         ===================================================================== */}
      {drawerMode && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#111014] border-l border-[#B8A58D]/15 h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#B8A58D]/15">
                <span className="font-brand text-2xl tracking-[0.06em] text-[#FAF6EF]">
                  ASVÉRA
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setDrawerMode(null);
                    setSelectedProduct(null);
                    setSearchQuery('');
                  }}
                  aria-label="Close panel"
                  className="w-8 h-8 border border-[#B8A58D]/25 flex items-center justify-center text-[#B8A58D] hover:text-[#FAF6EF] hover:border-[#FAF6EF] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {drawerMode === 'collection' && (
                <div className="mt-8">
                  {selectedProduct ? (
                    /* SINGLE SELECTED PRODUCT VIEW — Add to Bag appears ONLY here */
                    <div className="space-y-6">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(null)}
                        className="text-[11px] tracking-[0.2em] text-[#B8A58D] hover:text-[#FAF6EF] uppercase transition-colors cursor-pointer"
                      >
                        ← BACK TO CATEGORIES
                      </button>

                      <div className="aspect-[3/3.6] overflow-hidden bg-[#241329]">
                        <img
                          src={selectedProduct.image || editorialHero}
                          alt={selectedProduct.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <span className="block text-[10px] tracking-[0.24em] text-[#B8A58D] uppercase">
                          {selectedProduct.category}
                        </span>
                        <div className="mt-2 flex items-baseline justify-between gap-4">
                          <h2 className="font-brand text-[30px] tracking-[0.03em] text-[#FAF6EF] uppercase leading-none">
                            {selectedProduct.name}
                          </h2>
                          <span className="text-[16px] text-[#F3EBDD] tabular-nums">
                            {selectedProduct.price}
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-[#B8A58D]">
                          {selectedProduct.gsm}
                        </p>
                      </div>

                      <div className="pt-2 space-y-3">
                        <button
                          type="button"
                          onClick={() => {
                            triggerToast(`Added ${selectedProduct.name} to your ASVÉRA bag.`);
                            setDrawerMode(null);
                          }}
                          className="w-full bg-[#FAF6EF] hover:bg-[#F3EBDD] text-[#111014] text-[11px] font-medium tracking-[0.22em] uppercase py-4 transition-colors cursor-pointer"
                        >
                          ADD TO BAG
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            triggerToast(`Proceeding to checkout for ${selectedProduct.name}.`);
                            setDrawerMode(null);
                          }}
                          className="w-full border border-[#B8A58D]/40 hover:border-[#FAF6EF] text-[#FAF6EF] text-[11px] font-medium tracking-[0.22em] uppercase py-3.5 transition-colors cursor-pointer"
                        >
                          BUY NOW
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* CATEGORY & SEARCH NAVIGATION VIEW — Clean & Uncrowded */
                    <div className="space-y-8">
                      <div>
                        <label htmlFor="asvera-product-search" className="sr-only">
                          Search Men&apos;s Pieces
                        </label>
                        <input
                          id="asvera-product-search"
                          type="search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search Men's pieces..."
                          className="w-full bg-transparent border-b border-[#B8A58D]/35 focus:border-[#FAF6EF] py-3 text-sm text-[#FAF6EF] placeholder:text-[#B8A58D]/55 outline-none"
                        />
                      </div>

                      {searchQuery.trim().length > 0 ? (
                        <div className="space-y-4">
                          <span className="block text-[10px] tracking-[0.24em] text-[#B8A58D] uppercase">
                            SEARCH RESULTS
                          </span>
                          {ALL_MENS_PRODUCTS.filter(
                            (item) =>
                              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.category.toLowerCase().includes(searchQuery.toLowerCase())
                          ).map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setSelectedProduct(item)}
                              className="w-full py-3 border-b border-[#B8A58D]/15 flex items-baseline justify-between text-left hover:border-[#FAF6EF] transition-colors cursor-pointer"
                            >
                              <span className="font-brand text-xl tracking-[0.04em] text-[#FAF6EF] uppercase">
                                {item.name}
                              </span>
                              <span className="text-xs text-[#B8A58D] tabular-nums">
                                {item.price}
                              </span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="divide-y divide-[#B8A58D]/15 border-y border-[#B8A58D]/15">
                          {MENS_CATEGORIES.map((cat) =>
                            cat.available ? (
                              <button
                                key={cat.key}
                                type="button"
                                onClick={() => {
                                  setDrawerMode(null);
                                  setActiveCategoryPage('T-SHIRTS');
                                }}
                                className="w-full py-5 flex items-center justify-between text-left group cursor-pointer"
                              >
                                <span className="font-brand text-[26px] tracking-[0.06em] text-[#FAF6EF] uppercase">
                                  {cat.title}
                                </span>
                                <span className="text-[11px] tracking-[0.2em] text-[#B8A58D] group-hover:text-[#FAF6EF] uppercase transition-colors">
                                  EXPLORE NOW →
                                </span>
                              </button>
                            ) : (
                              <div
                                key={cat.key}
                                aria-disabled="true"
                                className="w-full py-5 flex items-center justify-between text-left select-none cursor-default"
                              >
                                <span className="font-brand text-[26px] tracking-[0.06em] text-[#FAF6EF]/55 uppercase">
                                  {cat.title}
                                </span>
                                <span className="text-[11px] tracking-[0.22em] text-[#B8A58D]/65 uppercase">
                                  COMING SOON
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
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

      {/* =====================================================================
          DEDICATED WOMEN'S COLLECTION LANDING EXPERIENCE
         ===================================================================== */}
      <div
        ref={womensContainerRef}
        aria-hidden={activeWorld !== 'women'}
        className={`fixed inset-0 overflow-y-auto bg-[#FFFDFB] transition-opacity duration-300 ${
          activeWorld === 'women'
            ? 'z-40 opacity-100 pointer-events-auto visible'
            : '-z-10 opacity-0 pointer-events-none invisible'
        }`}
      >
        <WomensCollectionPage
          onReturnToMain={returnToMensCollection}
          isActive={activeWorld === 'women'}
          onScrollContainerTop={() => {
            if (womensContainerRef.current) {
              womensContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />
      </div>

      {/* =====================================================================
          CINEMATIC DEEP PLUM / DARK CHERRY FABRIC & SOFT LIGHT TRANSITION VEIL
         ===================================================================== */}
      <div
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, #3A1E42 0%, #3A0D16 42%, #241329 75%, #111014 100%)',
        }}
        className={`fixed inset-0 z-[60] pointer-events-none overflow-hidden transition-opacity duration-500 ease-in-out ${
          transitionPhase === 'entering'
            ? 'opacity-100'
            : transitionPhase === 'revealing'
            ? 'opacity-0'
            : 'opacity-0'
        }`}
      >
        {/* Subtle Flowing Fabric / Soft Champagne Light Sweep */}
        <div
          style={{
            background:
              'linear-gradient(115deg, transparent 20%, rgba(243, 235, 221, 0.14) 48%, rgba(184, 165, 141, 0.22) 52%, transparent 78%)',
          }}
          className={`absolute inset-0 transition-transform duration-700 ease-out ${
            transitionPhase === 'entering'
              ? 'translate-x-0 scale-105'
              : transitionPhase === 'revealing'
              ? 'translate-x-12 scale-100'
              : '-translate-x-16 scale-100'
          }`}
        />
      </div>
    </div>
  );
}
