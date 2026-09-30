import React, { useEffect, useRef, useState, useMemo } from 'react';
import {
  Search,
  Heart,
  User,
  ShoppingBag,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Truck,
  ShieldCheck,
  RefreshCw,
  Headphones,
  Check,
  X,
} from 'lucide-react';
import womensHero4k from '../assets/images/womens_hero_4k_1790740613455.jpg';
import womensCatBabyTee from '../assets/images/womens_cat_baby_tee_1790746753562.jpg';
import womensCatSignatureShirt from '../assets/images/womens_cat_signature_shirt_1790746766176.jpg';
import womensCatEssentials from '../assets/images/womens_cat_essentials_1790746777428.jpg';
import womensCatDresses from '../assets/images/womens_cat_dresses_1790748871861.jpg';
import womensCatCoords from '../assets/images/womens_cat_coming_soon_1790746790030.jpg';
import womensCatHoodies from '../assets/images/womens_cat_hoodies_1790748884532.jpg';
import womensCatBottoms from '../assets/images/womens_cat_bottoms_1790748897470.jpg';
import womensCatOuterwear from '../assets/images/womens_cat_outerwear_1790748909660.jpg';
import womensPromoBanner from '../assets/images/womens_promo_banner_1790749012807.jpg';
import womensInsp1 from '../assets/images/womens_insp_1_1790749025793.jpg';
import womensInsp2 from '../assets/images/womens_insp_2_1790749039116.jpg';
import womensInsp3 from '../assets/images/womens_insp_3_1790749055443.jpg';
import womensInsp4 from '../assets/images/womens_insp_4_1790749068933.jpg';
import womensInsp5 from '../assets/images/womens_insp_5_1790749079707.jpg';
import WomensEditorialSlider from './WomensEditorialSlider';
import WomensCategoryExperience, {
  WomensCategorySlug,
  WomensCartItem,
} from './WomensCategoryExperience';

interface WomensCollectionPageProps {
  onReturnToMain: () => void;
  isActive?: boolean;
  onScrollContainerTop?: () => void;
}

interface CategoryShortcut {
  id: string;
  label: string;
  status: 'LAUNCHING' | 'COMING SOON';
  bgClass: string;
  iconColor: string;
  svgPath: React.ReactNode;
}

const CATEGORY_SHORTCUTS: CategoryShortcut[] = [
  {
    id: 'baby-tee',
    label: 'Baby Tee',
    status: 'LAUNCHING',
    bgClass: 'bg-[#FDEBF1] hover:bg-[#FBDCE7]',
    iconColor: 'text-[#D95B8A]',
    svgPath: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M8 4L4 7L6 11L8 9.5V19H16V9.5L18 11L20 7L16 4C15 5.5 13.5 6 12 6C10.5 6 9 5.5 8 4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'signature-shirt',
    label: 'Signature Shirt',
    status: 'LAUNCHING',
    bgClass: 'bg-[#EFEBF9] hover:bg-[#E4DDF6]',
    iconColor: 'text-[#5E4B8B]',
    svgPath: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 3L12 6L15 3L20 6.5L18 11L16 9.5V20H8V9.5L6 11L4 6.5L9 3Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 6V20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'essentials',
    label: 'Essentials',
    status: 'LAUNCHING',
    bgClass: 'bg-[#FDF1E6] hover:bg-[#FAE4D2]',
    iconColor: 'text-[#B88467]',
    svgPath: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M8 4H16L17 20H7L8 4Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 4C9.5 5.5 10.6 6.5 12 6.5C13.4 6.5 14.5 5.5 14.5 4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'dresses',
    label: 'Dresses',
    status: 'COMING SOON',
    bgClass: 'bg-[#FCE8EC] hover:bg-[#F9D8DF]',
    iconColor: 'text-[#D45B7A]',
    svgPath: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 3L7.5 8L5 20H19L16.5 8L15 3H9Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 8H16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'coords',
    label: 'Co-ords',
    status: 'COMING SOON',
    bgClass: 'bg-[#F5EBF9] hover:bg-[#EADBF3]',
    iconColor: 'text-[#7B65A8]',
    svgPath: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M7 4H17L18 10H6L7 4Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 13H17L18 20H13.5L12 15.5L10.5 20H6L7 13Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'hoodies',
    label: 'Hoodies',
    status: 'COMING SOON',
    bgClass: 'bg-[#F9EBF0] hover:bg-[#F3DCE4]',
    iconColor: 'text-[#B9828A]',
    svgPath: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M9 3C7 4 5.5 6 4 9L6 12L8 10.5V20H16V10.5L18 12L20 9C18.5 6 17 4 15 3C14 4.5 13 5 12 5C11 5 10 4.5 9 3Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'bottoms',
    label: 'Bottoms',
    status: 'COMING SOON',
    bgClass: 'bg-[#FAF2EA] hover:bg-[#F4E6D8]',
    iconColor: 'text-[#B8A58D]',
    svgPath: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M7 4H17L18.5 20H13.5L12 11L10.5 20H5.5L7 4Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'outerwear',
    label: 'Outerwear',
    status: 'COMING SOON',
    bgClass: 'bg-[#FDEBF3] hover:bg-[#FADBE9]',
    iconColor: 'text-[#DF5388]',
    svgPath: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M8 6V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V6M5 6H19L20 20H4L5 6Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

interface CuratedSilhouetteSlot {
  id: string;
  categorySlug?: WomensCategorySlug;
  title: string;
  subtitle: string;
  badge: string;
  isComingSoon: boolean;
  image: string;
  swatches: string[];
  swatchNames: string[];
  gradientBg: string;
}

const CURATED_SILHOUETTE_SLOTS: CuratedSilhouetteSlot[] = [
  {
    id: 'slot-01',
    categorySlug: 'baby-tee',
    title: 'BABY TEE',
    subtitle: 'Cropped Fitted Silhouette · Available Category',
    badge: 'LAUNCHING',
    isComingSoon: false,
    image: womensCatBabyTee,
    swatches: ['#E8C7C8', '#FAF6EF', '#B9828A'],
    swatchNames: ['Soft Blush', 'Soft Ivory', 'Dusty Rose'],
    gradientBg: 'linear-gradient(160deg, #FDEBF1 0%, #F5D6E3 50%, #FCEEE9 100%)',
  },
  {
    id: 'slot-02',
    categorySlug: 'signature-shirt',
    title: 'SIGNATURE SHIRT',
    subtitle: 'Relaxed Tailoring · Available Category',
    badge: 'LAUNCHING',
    isComingSoon: false,
    image: womensCatSignatureShirt,
    swatches: ['#D7CBEF', '#FAF6EF', '#E8C7C8'],
    swatchNames: ['Pastel Lavender', 'Soft Ivory', 'Soft Blush'],
    gradientBg: 'linear-gradient(160deg, #F7F3FB 0%, #E9E0F6 55%, #FDF8F5 100%)',
  },
  {
    id: 'slot-03',
    categorySlug: 'essentials',
    title: 'ESSENTIALS',
    subtitle: 'Minimalist Wardrobe · Available Category',
    badge: 'LAUNCHING',
    isComingSoon: false,
    image: womensCatEssentials,
    swatches: ['#F3EBDD', '#E8C7C8', '#B8A58D'],
    swatchNames: ['Warm Cream', 'Soft Blush', 'Muted Champagne'],
    gradientBg: 'linear-gradient(160deg, #FCF3EC 0%, #F4E1D4 55%, #FBEBF1 100%)',
  },
  {
    id: 'slot-04',
    title: 'DRESSES',
    subtitle: 'Editorial Placeholder · Future Category',
    badge: 'COMING SOON',
    isComingSoon: true,
    image: womensCatDresses,
    swatches: ['#E8C7C8', '#B8A58D', '#FAF6EF'],
    swatchNames: ['Soft Blush', 'Champagne', 'Soft Ivory'],
    gradientBg: 'linear-gradient(160deg, #FDEBF1 0%, #EFE6F8 55%, #FCF4EE 100%)',
  },
  {
    id: 'slot-05',
    title: 'CO-ORDS',
    subtitle: 'Editorial Placeholder · Future Category',
    badge: 'COMING SOON',
    isComingSoon: true,
    image: womensCatCoords,
    swatches: ['#B9828A', '#E8C7C8', '#F3EBDD'],
    swatchNames: ['Dusty Rose', 'Soft Blush', 'Warm Cream'],
    gradientBg: 'linear-gradient(160deg, #F7F3FB 0%, #FDEBF1 55%, #FCF4EE 100%)',
  },
  {
    id: 'slot-06',
    title: 'HOODIES',
    subtitle: 'Editorial Placeholder · Future Category',
    badge: 'COMING SOON',
    isComingSoon: true,
    image: womensCatHoodies,
    swatches: ['#B9828A', '#FAF6EF', '#7A3F4A'],
    swatchNames: ['Dusty Rose', 'Soft Ivory', 'Deep Rose'],
    gradientBg: 'linear-gradient(160deg, #FDEBF1 0%, #F5DDE4 55%, #FAF6EF 100%)',
  },
  {
    id: 'slot-07',
    title: 'BOTTOMS',
    subtitle: 'Editorial Placeholder · Future Category',
    badge: 'COMING SOON',
    isComingSoon: true,
    image: womensCatBottoms,
    swatches: ['#FAF6EF', '#B8A58D', '#E8C7C8'],
    swatchNames: ['Soft Ivory', 'Champagne', 'Soft Blush'],
    gradientBg: 'linear-gradient(160deg, #FCF3EC 0%, #F3EBDD 55%, #FAF6EF 100%)',
  },
  {
    id: 'slot-08',
    title: 'OUTERWEAR',
    subtitle: 'Editorial Placeholder · Future Category',
    badge: 'COMING SOON',
    isComingSoon: true,
    image: womensCatOuterwear,
    swatches: ['#E8C7C8', '#F3EBDD', '#7A3F4A'],
    swatchNames: ['Soft Blush', 'Warm Cream', 'Deep Rose'],
    gradientBg: 'linear-gradient(160deg, #FDEBF1 0%, #F7E8EE 55%, #FAF6EF 100%)',
  },
];

interface InspirationFrame {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  aspectClass: string;
}

const INSPIRATION_SLIDER_FRAMES: InspirationFrame[] = [
  {
    id: 'insp-1',
    tag: 'Drape & Texture',
    title: 'Soft Knit & Pastel Layering',
    subtitle: 'ASVÉRA Women Moodboard 01',
    image: womensInsp1,
    aspectClass: 'aspect-[4/3.2]',
  },
  {
    id: 'insp-2',
    tag: 'Golden Hour',
    title: 'Sunlit Resort Proportions',
    subtitle: 'ASVÉRA Women Moodboard 02',
    image: womensInsp2,
    aspectClass: 'aspect-[4/3.6]',
  },
  {
    id: 'insp-3',
    tag: 'Atelier Archive',
    title: 'Blush, Lavender & Soft Ivory',
    subtitle: 'ASVÉRA Women Moodboard 03',
    image: womensInsp3,
    aspectClass: 'aspect-[4/3.2]',
  },
  {
    id: 'insp-4',
    tag: 'Finishing Notes',
    title: 'Minimalist Everyday Accents',
    subtitle: 'ASVÉRA Women Moodboard 04',
    image: womensInsp4,
    aspectClass: 'aspect-[4/3.6]',
  },
  {
    id: 'insp-5',
    tag: 'Fluid Motion',
    title: 'Pleated Silk in Afternoon Light',
    subtitle: 'ASVÉRA Women Moodboard 05',
    image: womensInsp5,
    aspectClass: 'aspect-[4/3.2]',
  },
];

const parseCategorySlugFromPath = (pathname: string): WomensCategorySlug | null => {
  if (pathname === '/women/baby-tee') return 'baby-tee';
  if (pathname === '/women/signature-shirt') return 'signature-shirt';
  if (pathname === '/women/essentials') return 'essentials';
  return null;
};

const LOWER_COLOUR_THEMES = [
  {
    id: 'blush',
    name: 'Soft Blush Pink',
    hex: '#E8C7C8',
    sectionBg: 'linear-gradient(180deg, #FFFDFB 0%, #FDF2F6 50%, #FCEAF2 100%)',
    footerBg: 'linear-gradient(180deg, #FCEAF2 0%, #E7D8F8 48%, #B9A3E3 100%)',
    accentText: '#D95B8A',
    targetCategory: 'baby-tee' as WomensCategorySlug,
    targetLabel: 'Explore Baby Tee →',
  },
  {
    id: 'lavender',
    name: 'Pastel Lavender',
    hex: '#D7CBEF',
    sectionBg: 'linear-gradient(180deg, #FFFDFB 0%, #F6F1FC 50%, #EDE3FA 100%)',
    footerBg: 'linear-gradient(180deg, #EDE3FA 0%, #D9C8F4 48%, #A992DC 100%)',
    accentText: '#7B65A8',
    targetCategory: 'signature-shirt' as WomensCategorySlug,
    targetLabel: 'Explore Signature Shirt →',
  },
  {
    id: 'cream',
    name: 'Warm Cream & Champagne',
    hex: '#F3EBDD',
    sectionBg: 'linear-gradient(180deg, #FFFDFB 0%, #FAF3E8 50%, #F6E9D8 100%)',
    footerBg: 'linear-gradient(180deg, #F6E9D8 0%, #EEDCE8 48%, #C9B3D9 100%)',
    accentText: '#B88467',
    targetCategory: 'essentials' as WomensCategorySlug,
    targetLabel: 'Explore Essentials →',
  },
  {
    id: 'dusty-rose',
    name: 'Dusty Rose',
    hex: '#B9828A',
    sectionBg: 'linear-gradient(180deg, #FFFDFB 0%, #FBEFF2 50%, #F5DCE3 100%)',
    footerBg: 'linear-gradient(180deg, #F5DCE3 0%, #E3CEE8 48%, #B899C9 100%)',
    accentText: '#9E5866',
    targetCategory: 'baby-tee' as WomensCategorySlug,
    targetLabel: 'Shop Baby Tee →',
  },
];

export const WomensCollectionPage: React.FC<WomensCollectionPageProps> = ({
  onReturnToMain,
  onScrollContainerTop,
}) => {
  const [activeCategoryRoute, setActiveCategoryRoute] =
    useState<WomensCategorySlug | null>(() =>
      typeof window !== 'undefined'
        ? parseCategorySlugFromPath(window.location.pathname)
        : null
    );
  const [comingSoonNotice, setComingSoonNotice] = useState<string | null>(null);
  const [lowerThemeIndex, setLowerThemeIndex] = useState<number>(0);
  const [cartItems, setCartItems] = useState<WomensCartItem[]>([]);
  const [checkoutMode, setCheckoutMode] = useState<'bag' | 'checkout' | 'success'>('bag');
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');

  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});
  const [selectedSwatchMap, setSelectedSwatchMap] = useState<Record<string, number>>({
    'slot-01': 0,
    'slot-02': 0,
    'slot-03': 0,
    'slot-04': 0,
    'slot-05': 0,
    'slot-06': 0,
    'slot-07': 0,
    'slot-08': 0,
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [bagDrawerOpen, setBagDrawerOpen] = useState(false);

  // Sync browser URL (/women, /women/baby-tee, /women/signature-shirt, /women/essentials)
  useEffect(() => {
    const onPopState = () => {
      setActiveCategoryRoute(parseCategorySlugFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateToCategory = (slug: WomensCategorySlug | null) => {
    const nextPath = slug ? `/women/${slug}` : '/women';
    if (window.location.pathname !== nextPath) {
      window.history.pushState({ world: 'women', category: slug }, '', nextPath);
    }
    setActiveCategoryRoute(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (onScrollContainerTop) {
      onScrollContainerTop();
    }
  };

  const handleCategoryClick = (idOrTitle: string) => {
    const normalized = idOrTitle.toLowerCase();
    if (normalized.includes('baby')) {
      navigateToCategory('baby-tee');
      return;
    }
    if (normalized.includes('signature') || normalized.includes('shirt')) {
      navigateToCategory('signature-shirt');
      return;
    }
    if (normalized.includes('essential')) {
      navigateToCategory('essentials');
      return;
    }
    // For Coming Soon categories, show a clear editorial notification & scroll to preview
    setComingSoonNotice(
      `${idOrTitle.toUpperCase()} is currently marked COMING SOON. Explore our launching categories: Baby Tee, Signature Shirt, or Essentials.`
    );
    window.setTimeout(() => {
      setComingSoonNotice((prev) => (prev ? null : null));
    }, 4200);
  };

  const handleAddToCart = (
    newItem: Omit<WomensCartItem, 'quantity'>,
    openCheckout = false
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.size === newItem.size &&
          item.colorName === newItem.colorName
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + 1,
        };
        return updated;
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });

    if (openCheckout) {
      setCheckoutMode('checkout');
      setBagDrawerOpen(true);
    }
  };

  const updateCartQuantity = (idx: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + item.priceNumber * item.quantity,
    0
  );
  const activeLowerTheme =
    LOWER_COLOUR_THEMES[lowerThemeIndex] || LOWER_COLOUR_THEMES[0];

  // Slider 2 (Style Inspiration Staggered Panoramic Slider) refs & state
  const slider2StageRef = useRef<HTMLDivElement | null>(null);
  const slider2CardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const slider2ImgRefs = useRef<Array<HTMLImageElement | null>>([]);
  const slider2OffsetRef = useRef<number>(0);
  const slider2SpeedRef = useRef<number>(0.028);
  const slider2HoverRef = useRef<boolean>(false);
  const slider2PointerDownRef = useRef<boolean>(false);
  const slider2LastXRef = useRef<number>(0);
  const slider2VelocityRef = useRef<number>(0);

  const virtualSlider2Frames = useMemo(() => {
    const repeats = 3;
    const list: Array<{ key: string; frame: InspirationFrame; idx: number }> = [];
    for (let r = 0; r < repeats; r++) {
      for (let i = 0; i < INSPIRATION_SLIDER_FRAMES.length; i++) {
        list.push({
          key: `s2-${r}-${i}-${INSPIRATION_SLIDER_FRAMES[i].id}`,
          frame: INSPIRATION_SLIDER_FRAMES[i],
          idx: i,
        });
      }
    }
    return list;
  }, []);

  // Slider 2 Animation: Staggered Panoramic Wave + Counter-Directional Glide (distinct from Slider 1)
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();
    const BASE_SPEED = -0.028; // Counter-directional gentle panoramic flow

    const animateSlider2 = (now: number) => {
      const dt = Math.min(48, Math.max(0, now - lastTime));
      lastTime = now;

      const stageEl = slider2StageRef.current;
      const numCards = virtualSlider2Frames.length;

      if (stageEl && numCards > 0) {
        const viewportW = stageEl.clientWidth || window.innerWidth;
        const isMobile = viewportW < 640;
        const isTablet = viewportW >= 640 && viewportW < 1024;

        // Wide landscape editorial cards with staggered vertical rhythm
        const cardWidth = isMobile
          ? Math.min(310, Math.round(viewportW * 0.78))
          : isTablet
          ? 310
          : 345;
        const cardGap = isMobile ? 18 : 26;
        const step = cardWidth + cardGap;
        const totalTrack = numCards * step;
        const halfTrack = totalTrack / 2;

        const targetSpeed =
          slider2HoverRef.current || slider2PointerDownRef.current ? 0 : BASE_SPEED;
        slider2SpeedRef.current +=
          (targetSpeed - slider2SpeedRef.current) * Math.min(1, dt * 0.008);

        if (!slider2PointerDownRef.current) {
          slider2OffsetRef.current +=
            slider2SpeedRef.current * dt + slider2VelocityRef.current * dt;
          slider2VelocityRef.current *= Math.pow(0.94, dt / 16);
          if (Math.abs(slider2VelocityRef.current) < 0.001) {
            slider2VelocityRef.current = 0;
          }
        }

        slider2OffsetRef.current =
          ((slider2OffsetRef.current % totalTrack) + totalTrack) % totalTrack;

        const visibleRadius = Math.max(viewportW * 0.62, step * 2.4);

        for (let i = 0; i < numCards; i++) {
          const cardEl = slider2CardRefs.current[i];
          if (!cardEl) continue;

          const rawX = i * step - slider2OffsetRef.current;
          const wrappedX =
            ((((rawX + halfTrack) % totalTrack) + totalTrack) % totalTrack) -
            halfTrack;

          const norm = wrappedX / visibleRadius;
          const absNorm = Math.abs(norm);

          cardEl.style.width = `${cardWidth}px`;

          if (absNorm > 1.45) {
            cardEl.style.opacity = '0';
            cardEl.style.pointerEvents = 'none';
            cardEl.style.transform = `translate3d(${wrappedX.toFixed(1)}px, 0px, 0px)`;
            continue;
          }

          // Alternating staggered vertical offset + smooth sine wave float
          const staggerSign = i % 2 === 0 ? -1 : 1;
          const waveY =
            staggerSign * (isMobile ? 6 : 14) +
            Math.sin(norm * Math.PI) * (isMobile ? 4 : 8);

          const opacity =
            absNorm < 0.92
              ? 1
              : Math.max(0, 1 - (absNorm - 0.92) / 0.45);

          cardEl.style.opacity = opacity.toFixed(3);
          cardEl.style.pointerEvents = opacity > 0.25 ? 'auto' : 'none';
          cardEl.style.transform = `translate3d(${wrappedX.toFixed(
            2
          )}px, ${waveY.toFixed(1)}px, 0px)`;

          const imgEl = slider2ImgRefs.current[i];
          if (imgEl) {
            const parallaxX = Math.max(-1, Math.min(1, norm)) * 12;
            imgEl.style.transform = `translate3d(${parallaxX.toFixed(1)}px, 0px, 0px) scale(1.08)`;
          }
        }
      }

      rafId = requestAnimationFrame(animateSlider2);
    };

    rafId = requestAnimationFrame(animateSlider2);
    return () => cancelAnimationFrame(rafId);
  }, [virtualSlider2Frames]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSaved = (id: string) => {
    setSavedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      id="womens-top"
      className="min-h-screen w-full bg-[#FFFDFB] text-[#1B1E32] select-none overflow-x-hidden font-sans"
    >
      {/* Floating Editorial Notification for COMING SOON Categories */}
      {comingSoonNotice && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] bg-[#1B1E32] text-white px-5 py-3.5 rounded-full shadow-[0_14px_36px_rgba(27,30,50,0.28)] border border-[#E8C7C8]/30 flex items-center justify-between gap-3 text-[12px] tracking-[0.04em]"
        >
          <span>{comingSoonNotice}</span>
          <button
            type="button"
            onClick={() => setComingSoonNotice(null)}
            className="text-[#E8C7C8] hover:text-white shrink-0 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {activeCategoryRoute ? (
        <WomensCategoryExperience
          categorySlug={activeCategoryRoute}
          onBackToWomen={() => navigateToCategory(null)}
          onSelectCategory={(slug) => navigateToCategory(slug)}
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onOpenBag={() => {
            setCheckoutMode('bag');
            setBagDrawerOpen(true);
          }}
        />
      ) : (
        <>
          {/* =====================================================================
              1. CLEAN TOP NAVIGATION / HEADER
             ===================================================================== */}
          <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#F4E3EC]">
            <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 h-[74px] flex items-center justify-between gap-4">
              {/* Left Brand Emblem + ASVÉRA WOMEN */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToSection('womens-top')}
                  className="flex items-center gap-2.5 text-left group cursor-pointer"
                >
                  {/* Soft Lotus / Petal Fashion Emblem */}
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FDE7F0] to-[#E8DCF8] flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-5 h-5 text-[#D95B8A]"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 4C10 7.5 9.5 11 12 15C14.5 11 14 7.5 12 4Z"
                        fill="currentColor"
                        fillOpacity="0.85"
                      />
                      <path
                        d="M6 8.5C6.5 12 8.5 14.5 12 15C10.5 11.5 8.5 9.5 6 8.5Z"
                        fill="#9B7EDE"
                        fillOpacity="0.8"
                      />
                      <path
                        d="M18 8.5C17.5 12 15.5 14.5 12 15C13.5 11.5 15.5 9.5 18 8.5Z"
                        fill="#9B7EDE"
                        fillOpacity="0.8"
                      />
                      <path
                        d="M7 17.5C10 17.5 14 17.5 17 17.5"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>

                  <div>
                    <span className="block font-editorial text-[23px] sm:text-[25px] font-semibold tracking-[0.04em] text-[#1B1E32] leading-none">
                      ASVÉRA
                    </span>
                    <span className="block text-[10px] tracking-[0.14em] text-[#8C7B90] uppercase mt-0.5">
                      ASVÉRA WOMEN
                    </span>
                  </div>
                </button>
              </div>

              {/* Center Navigation Links */}
              <nav
                aria-label="Women's Collection Navigation"
                className="hidden md:flex items-center gap-7 lg:gap-9 text-[13.5px] font-medium text-[#3A3D52]"
              >
                <button
                  type="button"
                  onClick={() => scrollToSection('womens-top')}
                  className="text-[#1B1E32] border-b-2 border-[#E45C90] pb-1 cursor-pointer"
                >
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('womens-categories')}
                  className="inline-flex items-center gap-1 hover:text-[#E45C90] transition-colors cursor-pointer"
                >
                  <span>Shop</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C7B90]" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateToCategory('baby-tee')}
                  className="hover:text-[#E45C90] transition-colors cursor-pointer"
                >
                  Baby Tee
                </button>
                <button
                  type="button"
                  onClick={() => navigateToCategory('signature-shirt')}
                  className="hover:text-[#E45C90] transition-colors cursor-pointer"
                >
                  Signature Shirt
                </button>
                <button
                  type="button"
                  onClick={() => navigateToCategory('essentials')}
                  className="hover:text-[#E45C90] transition-colors cursor-pointer"
                >
                  Essentials
                </button>
              </nav>

              {/* Right Utility Icons + Return to Men's */}
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={onReturnToMain}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.12em] uppercase text-[#5E4B8B] hover:text-[#E45C90] bg-[#F7F1FC] hover:bg-[#F3E5F8] px-3.5 py-2 rounded-full transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Men&apos;s</span>
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('womens-featured')}
                  aria-label="Search Women's Collection"
                  className="w-9 h-9 rounded-full hover:bg-[#FDEBF1] flex items-center justify-center text-[#2B2E42] transition-colors cursor-pointer"
                >
                  <Search className="w-[18px] h-[18px] stroke-[1.75]" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('womens-featured')}
                  aria-label="Saved Silhouettes"
                  className="relative w-9 h-9 rounded-full hover:bg-[#FDEBF1] flex items-center justify-center text-[#2B2E42] transition-colors cursor-pointer"
                >
                  <Heart className="w-[18px] h-[18px] stroke-[1.75]" />
                  {Object.values(savedIds).filter(Boolean).length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E45C90] text-white text-[9px] font-semibold flex items-center justify-center">
                      {Object.values(savedIds).filter(Boolean).length}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('womens-footer')}
                  aria-label="Account"
                  className="hidden sm:flex w-9 h-9 rounded-full hover:bg-[#FDEBF1] items-center justify-center text-[#2B2E42] transition-colors cursor-pointer"
                >
                  <User className="w-[18px] h-[18px] stroke-[1.75]" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCheckoutMode('bag');
                    setBagDrawerOpen(true);
                  }}
                  aria-label="Women's Collection Bag"
                  className="relative w-9 h-9 rounded-full hover:bg-[#FDEBF1] flex items-center justify-center text-[#2B2E42] transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-[18px] h-[18px] stroke-[1.75]" />
                  {totalBagCount > 0 ? (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#E45C90] text-white text-[9px] font-semibold flex items-center justify-center">
                      {totalBagCount}
                    </span>
                  ) : (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E45C90]" />
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* =====================================================================
              2. LARGE WOMEN HERO SECTION (LOCKED — UNCHANGED)
             ===================================================================== */}
          <section className="relative w-full overflow-hidden bg-[#FDF5F8]">
            {/* Maximum-Fidelity 4K Women's Hero Image Layer */}
            <div
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
              aria-hidden="true"
            >
              <img
                src={womensHero4k}
                alt="ASVÉRA Women Hero Campaign"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                draggable={false}
                className="w-full h-full object-cover object-[74%_center] sm:object-[66%_center] lg:object-center select-none transform-gpu"
              />

              {/* Subtle mobile-only localized left readability veil so the subject remains 100% untouched on desktop */}
              <div
                className="absolute inset-0 lg:hidden"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255, 250, 252, 0.84) 0%, rgba(255, 250, 252, 0.55) 45%, rgba(255, 250, 252, 0) 82%)',
                }}
              />
            </div>

            {/* Hero Inner Container */}
            <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24 lg:py-28 min-h-[500px] sm:min-h-[560px] lg:min-h-[610px] flex flex-col justify-between">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">
                {/* Left Editorial Stack */}
                <div className="lg:col-span-7 max-w-[540px]">
                  <span className="block font-editorial italic text-[26px] sm:text-[32px] text-[#E06393] leading-none mb-2 -rotate-2 origin-left">
                    Asvera Women
                  </span>

                  <h1 className="font-editorial text-[44px] sm:text-[60px] lg:text-[68px] font-semibold leading-[1.04] tracking-[-0.02em] text-[#1B1E32]">
                    <span className="block">Modern Grace</span>
                    <span className="block">Quiet Confidence</span>
                  </h1>

                  <p className="mt-4 sm:mt-5 text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[#4A4D62] max-w-[420px]">
                    Contemporary silhouettes crafted with intention. Designed for
                    women who move with elegance, softness, and distinct identity.
                  </p>

                  <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToSection('womens-featured')}
                      style={{
                        background:
                          'linear-gradient(90deg, #E3568B 0%, #EE78A5 100%)',
                      }}
                      className="group inline-flex items-center gap-3 text-white text-[14px] font-medium px-8 py-3.5 rounded-full shadow-[0_10px_24px_rgba(227,86,139,0.32)] hover:shadow-[0_14px_28px_rgba(227,86,139,0.42)] transition-all duration-200 cursor-pointer"
                    >
                      <span>Explore Women</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                {/* Right Script Accent Callout */}
                <div className="hidden lg:flex lg:col-span-5 justify-end items-start pr-4">
                  <div className="font-editorial italic text-[28px] leading-[1.15] text-[#2B2438]/85 text-center -rotate-6 select-none drop-shadow-[0_2px_12px_rgba(255,255,255,0.65)]">
                    <span className="block">Her Own</span>
                    <span className="block">Expression</span>
                    <span className="inline-block text-[22px] text-[#E3568B] mt-1">
                      ♡
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom-Left Slide Indicator */}
              <div className="mt-10 flex items-center gap-3 text-[12px] font-medium text-[#4A4D62]">
                {[1, 2, 3].map((num) => (
                  <React.Fragment key={num}>
                    <button
                      type="button"
                      onClick={() => setActiveSlide(num)}
                      className={`tabular-nums transition-colors cursor-pointer ${
                        activeSlide === num
                          ? 'text-[#1B1E32] font-semibold'
                          : 'text-[#8C7B90] hover:text-[#1B1E32]'
                      }`}
                    >
                      0{num}
                    </button>
                    {num === 1 && (
                      <span className="w-7 h-[1.5px] bg-[#1B1E32]/60 inline-block" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================================
              WOMEN SLIDER 1 — THE WOMEN'S EDIT (6 DISTINCT EDITORIAL LOOKS)
             ===================================================================== */}
          <WomensEditorialSlider />

          {/* =====================================================================
              3. CATEGORY SHORTCUTS (CLICKABLE → DEDICATED CATEGORY EXPERIENCE)
             ===================================================================== */}
          <section
            id="womens-categories"
            className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-14"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-start justify-items-center">
              {CATEGORY_SHORTCUTS.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className="group flex flex-col items-center gap-2.5 cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full ${cat.bgClass} ${cat.iconColor} flex items-center justify-center shadow-[0_6px_20px_rgba(227,86,139,0.08)] transition-transform duration-200 group-hover:-translate-y-1`}
                  >
                    {cat.svgPath}
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[#2B2E42] group-hover:text-[#E3568B] transition-colors">
                      <span>{cat.label}</span>
                      <span
                        aria-hidden="true"
                        className="text-[11px] text-[#8C7B90] group-hover:text-[#E3568B] transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                    <span
                      className={`text-[9px] font-semibold tracking-[0.14em] uppercase mt-0.5 ${
                        cat.status === 'LAUNCHING'
                          ? 'text-[#D95B8A]'
                          : 'text-[#9A87A0]'
                      }`}
                    >
                      {cat.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* =====================================================================
              4. FEATURED COLLECTION & COMING SOON CATEGORIES (8 DISTINCT CARDS)
             ===================================================================== */}
          <section
            id="womens-featured"
            className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12"
          >
            {/* Section Header */}
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <span className="block text-[11px] font-semibold tracking-[0.2em] text-[#E3568B] uppercase mb-1.5">
                  FEATURED COLLECTION
                </span>
                <h2 className="font-editorial text-[34px] sm:text-[42px] font-semibold leading-none tracking-[-0.01em] text-[#1B1E32]">
                  Curated Silhouettes
                </h2>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateToCategory('baby-tee')}
                  className="text-[12px] font-medium text-[#1B1E32] hover:text-[#E3568B] bg-[#FDEBF1] hover:bg-[#FBDCE7] px-3.5 py-2 rounded-full transition-colors cursor-pointer"
                >
                  Baby Tee →
                </button>
                <button
                  type="button"
                  onClick={() => navigateToCategory('signature-shirt')}
                  className="text-[12px] font-medium text-[#1B1E32] hover:text-[#5E4B8B] bg-[#EFEBF9] hover:bg-[#E4DDF6] px-3.5 py-2 rounded-full transition-colors cursor-pointer"
                >
                  Signature Shirt →
                </button>
                <button
                  type="button"
                  onClick={() => navigateToCategory('essentials')}
                  className="text-[12px] font-medium text-[#1B1E32] hover:text-[#B88467] bg-[#FDF1E6] hover:bg-[#FAE4D2] px-3.5 py-2 rounded-full transition-colors cursor-pointer"
                >
                  Essentials →
                </button>
              </div>
            </div>

            {/* 8-Card Grid: 3 Launching Categories + 5 Coming Soon Editorial Placeholders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-9">
              {CURATED_SILHOUETTE_SLOTS.map((slot) => {
                const isSaved = !!savedIds[slot.id];
                const activeSwatch = selectedSwatchMap[slot.id] ?? 0;
                const activeSwatchHex = slot.swatches[activeSwatch] || slot.swatches[0];
                const activeSwatchName =
                  slot.swatchNames[activeSwatch] || slot.swatchNames[0];

                return (
                  <div key={slot.id} className="group flex flex-col">
                    {/* Rounded Portrait Visual Frame with High-Resolution Editorial Category Image */}
                    <div
                      onClick={() => handleCategoryClick(slot.title)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCategoryClick(slot.title);
                        }
                      }}
                      style={{
                        background: slot.gradientBg,
                        boxShadow: `0 10px 28px -8px ${activeSwatchHex}66`,
                      }}
                      className="relative aspect-[3/3.7] rounded-[18px] overflow-hidden border border-[#F3DFEA] p-4 flex flex-col justify-between transition-all duration-300 group-hover:-translate-y-1 cursor-pointer"
                    >
                      {/* Full-Bleed High-Resolution Category Editorial Image */}
                      <img
                        src={slot.image}
                        alt={slot.title}
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        draggable={false}
                        className={`absolute inset-0 w-full h-full object-cover object-center select-none transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
                          slot.isComingSoon ? 'opacity-92' : 'opacity-100'
                        }`}
                      />

                      {/* Dynamic Colour-Transition Ambient Glow Layer tied to Swatch Button */}
                      <div
                        aria-hidden="true"
                        style={{
                          background: `radial-gradient(circle at 50% 100%, ${activeSwatchHex}55 0%, transparent 70%)`,
                        }}
                        className="pointer-events-none absolute inset-0 transition-all duration-500"
                      />

                      {/* Subtle Bottom Readability Veil */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1B1E32]/65 via-[#1B1E32]/20 to-transparent"
                      />

                      {/* Top Row: Category Status Pill Badge + Heart Button */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span
                          className={`text-[10px] font-semibold tracking-[0.16em] uppercase px-3 py-1 rounded-full shadow-xs ${
                            slot.isComingSoon
                              ? 'bg-white/95 text-[#6E5D78] border border-[#EBD6E3]'
                              : 'bg-[#E3568B] text-white'
                          }`}
                        >
                          {slot.badge}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaved(slot.id);
                          }}
                          aria-label={`Save ${slot.title}`}
                          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm flex items-center justify-center text-[#4A4D62] hover:text-[#E3568B] transition-colors cursor-pointer"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isSaved ? 'fill-[#E3568B] text-[#E3568B]' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Prominent COMING SOON Editorial Banner for Future Categories */}
                      {slot.isComingSoon && (
                        <div className="relative z-10 my-auto mx-auto px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#F2DCE8] shadow-sm">
                          <span className="text-[10.5px] font-semibold tracking-[0.22em] text-[#1B1E32] uppercase">
                            COMING SOON
                          </span>
                        </div>
                      )}

                      {/* Soft Bottom Accent Bar */}
                      <div className="relative z-10 flex items-center justify-between text-[10.5px] font-medium tracking-[0.14em] text-white/95 uppercase pt-2 border-t border-white/30">
                        <span>{activeSwatchName}</span>
                        <span>
                          {slot.isComingSoon ? 'COMING SOON' : 'OPEN CATEGORY →'}
                        </span>
                      </div>
                    </div>

                    {/* Card Metadata & Working Colour-Transition Swatch Buttons Below Frame */}
                    <div className="pt-3.5 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleCategoryClick(slot.title)}
                          className="text-left text-[15px] font-semibold text-[#1B1E32] hover:text-[#E3568B] leading-snug transition-colors cursor-pointer"
                        >
                          {slot.title}
                        </button>

                        {!slot.isComingSoon && slot.categorySlug && (
                          <button
                            type="button"
                            onClick={() => navigateToCategory(slot.categorySlug!)}
                            className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#E3568B] hover:text-[#1B1E32] transition-colors cursor-pointer"
                          >
                            Shop →
                          </button>
                        )}
                      </div>

                      <p className="text-[12.5px] text-[#7A6A82]">{slot.subtitle}</p>

                      {/* Working Colour-Transition Swatch Buttons */}
                      <div className="pt-1 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {slot.swatches.map((hex, idx) => (
                            <button
                              key={hex}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSwatchMap((prev) => ({
                                  ...prev,
                                  [slot.id]: idx,
                                }));
                              }}
                              aria-label={`Transition ${slot.title} colour to ${slot.swatchNames[idx]}`}
                              style={{ backgroundColor: hex }}
                              className={`w-4 h-4 rounded-full border border-[#D8C2CE] transition-all duration-300 cursor-pointer ${
                                activeSwatch === idx
                                  ? 'ring-2 ring-offset-2 ring-[#E3568B] scale-115'
                                  : 'opacity-80 hover:opacity-100 hover:scale-105'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-medium text-[#6E5D78]">
                          {activeSwatchName}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* =====================================================================
              LOWER SECTION INTERACTIVE COLOUR-TRANSITION Wrapper
              (Smoothly transitions lower sections when colour-transition buttons are clicked)
             ===================================================================== */}
          <div
            style={{ background: activeLowerTheme.sectionBg }}
            className="w-full transition-all duration-700"
          >
            {/* Interactive Lower Colour-Transition Bar */}
            <section className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 pt-6 pb-2 relative z-20">
              <div className="rounded-[20px] bg-white/90 backdrop-blur-md border border-[#F2DCE8] px-5 sm:px-7 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_8px_24px_rgba(217,91,138,0.06)]">
                <div className="flex items-center gap-3">
                  <span
                    style={{ backgroundColor: activeLowerTheme.hex }}
                    className="w-3.5 h-3.5 rounded-full border border-black/10 transition-colors duration-500 shrink-0"
                  />
                  <div>
                    <span className="text-[10.5px] font-semibold tracking-[0.18em] text-[#7A6A82] uppercase block">
                      ATELIER PALETTE TRANSITION
                    </span>
                    <span className="text-[13.5px] font-semibold text-[#1B1E32]">
                      {activeLowerTheme.name} Mood
                    </span>
                  </div>
                </div>

                {/* Working Lower Colour-Transition Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {LOWER_COLOUR_THEMES.map((theme, idx) => {
                    const isSelected = lowerThemeIndex === idx;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setLowerThemeIndex(idx)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium border transition-all duration-300 cursor-pointer pointer-events-auto ${
                          isSelected
                            ? 'bg-[#1B1E32] text-white border-[#1B1E32] shadow-sm scale-[1.03]'
                            : 'bg-[#FFFDFB] text-[#3A3D52] border-[#EBD6E3] hover:border-[#E3568B] hover:text-[#1B1E32]'
                        }`}
                      >
                        <span
                          style={{ backgroundColor: theme.hex }}
                          className="w-3 h-3 rounded-full border border-black/15"
                        />
                        <span>{theme.name}</span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => navigateToCategory(activeLowerTheme.targetCategory)}
                    style={{ backgroundColor: activeLowerTheme.accentText }}
                    className="inline-flex items-center gap-1.5 text-white text-[12px] font-semibold px-4 py-2 rounded-full shadow-xs hover:opacity-95 transition-all duration-300 cursor-pointer pointer-events-auto"
                  >
                    <span>{activeLowerTheme.targetLabel}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* =====================================================================
                5. PROMOTIONAL / EDITORIAL BANNER (WITH HIGH-RES CAMPAIGN IMAGERY)
               ===================================================================== */}
            <section
              id="womens-editorial-banner"
              className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-10 relative z-10"
            >
              <div className="relative rounded-[24px] overflow-hidden border border-[#F0D9E7] min-h-[300px] sm:min-h-[340px] px-7 sm:px-12 lg:px-16 py-12 sm:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-[0_12px_36px_rgba(217,91,138,0.10)]">
                {/* High-Resolution Editorial Campaign Background Image */}
                <div
                  className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <img
                    src={womensPromoBanner}
                    alt="ASVÉRA Women Inaugural Edition Campaign"
                    loading="eager"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    draggable={false}
                    className="w-full h-full object-cover object-[70%_center] sm:object-center select-none"
                  />
                  {/* Soft Left Pastel Readability Veil */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(236, 224, 248, 0.92) 0%, rgba(246, 220, 236, 0.76) 42%, rgba(246, 220, 236, 0.12) 74%, rgba(246, 220, 236, 0) 100%)',
                    }}
                  />
                </div>

                {/* Left Editorial Callout */}
                <div className="relative z-10 max-w-[480px]">
                  <span className="block font-editorial italic text-[24px] sm:text-[28px] text-[#D95B8A] leading-none mb-2 -rotate-2 origin-left">
                    Inaugural Edition
                  </span>
                  <h2 className="font-editorial text-[36px] sm:text-[48px] font-semibold text-[#1B1E32] leading-[1.06]">
                    Designed For Her World
                  </h2>
                  <p className="mt-2.5 text-[15px] text-[#3A3D52]">
                    Soft tailoring, fluid drape, and timeless pastel &amp; neutral
                    tones.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => navigateToCategory(activeLowerTheme.targetCategory)}
                      className="group inline-flex items-center gap-2.5 bg-[#1B1E32] hover:bg-[#2B2F4A] text-white text-[13px] font-medium px-7 py-3 rounded-full transition-colors cursor-pointer pointer-events-auto"
                    >
                      <span>{activeLowerTheme.targetLabel.replace(' →', '')}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('womens-footer')}
                      className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-[#1B1E32] border border-[#E6D4DF] text-[13px] font-medium px-6 py-3 rounded-full transition-colors cursor-pointer pointer-events-auto"
                    >
                      <span>Join Private Preview</span>
                    </button>
                  </div>
                </div>

                {/* Right Handwritten Script Accent */}
                <div className="relative z-10 md:pr-6 self-end md:self-center">
                  <div className="font-editorial italic text-[26px] sm:text-[30px] leading-[1.15] text-[#2B2438] text-center -rotate-6 drop-shadow-[0_2px_10px_rgba(255,255,255,0.75)]">
                    <span className="block">Quiet</span>
                    <span className="block">Confidence</span>
                    <span className="block">Always</span>
                    <span className="inline-block text-[20px] text-[#E3568B] mt-1">
                      ♡
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                6. TRUST / SERVICE INFORMATION ROW
               ===================================================================== */}
            <section className="w-full max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-7 px-6 rounded-[20px] bg-white border border-[#F4E3EC] shadow-[0_6px_24px_rgba(27,30,50,0.03)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FDEBF1] text-[#D95B8A] flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#1B1E32]">
                      Complimentary Delivery
                    </h3>
                    <p className="text-[12px] text-[#7A6A82]">
                      Across India on all drops
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:border-l sm:border-[#F4E3EC] sm:pl-6">
                  <div className="w-12 h-12 rounded-full bg-[#EFEBF9] text-[#6B56A6] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#1B1E32]">
                      Secure Checkout
                    </h3>
                    <p className="text-[12px] text-[#7A6A82]">
                      100% protected experience
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 lg:border-l lg:border-[#F4E3EC] lg:pl-6">
                  <div className="w-12 h-12 rounded-full bg-[#FDF1E6] text-[#C87D4B] flex items-center justify-center shrink-0">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#1B1E32]">
                      Effortless Exchanges
                    </h3>
                    <p className="text-[12px] text-[#7A6A82]">
                      Simple size &amp; fit assurance
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:border-l sm:border-[#F4E3EC] sm:pl-6">
                  <div className="w-12 h-12 rounded-full bg-[#E9F6F2] text-[#3C7A6B] flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#1B1E32]">
                      Atelier Support
                    </h3>
                    <p className="text-[12px] text-[#7A6A82]">
                      Dedicated client care
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* =====================================================================
                7. WOMEN SLIDER 2 & STYLE INSPIRATION SECTION (COMPLETELY FILLED)
               ===================================================================== */}
            <section className="w-full py-12 sm:py-16 overflow-hidden">
              <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <span className="block text-[11px] font-semibold tracking-[0.2em] text-[#E3568B] uppercase mb-1.5">
                    ATELIER MOODBOARD · SLIDER II
                  </span>
                  <h2 className="font-editorial text-[30px] sm:text-[38px] font-semibold text-[#1B1E32] leading-tight">
                    Style Inspiration
                  </h2>
                  <p className="mt-1.5 text-[13.5px] sm:text-[14.5px] text-[#6E5D78] max-w-[460px]">
                    Follow ASVÉRA Women for daily silhouette studies, pastel
                    moodboards, and upcoming collection previews.
                  </p>
                </div>

                <div className="font-editorial italic text-[24px] leading-[1.12] text-[#2B2438] md:text-right -rotate-3 self-start md:self-end">
                  <span>More Grace, More You ♡</span>
                </div>
              </div>

              {/* WOMEN SLIDER 2: Staggered Panoramic Horizontal Flow (Visually Distinct from Slider 1) */}
              <div
                ref={slider2StageRef}
                onMouseEnter={() => {
                  slider2HoverRef.current = true;
                }}
                onMouseLeave={() => {
                  slider2HoverRef.current = false;
                  slider2PointerDownRef.current = false;
                }}
                onPointerDown={(e) => {
                  slider2PointerDownRef.current = true;
                  slider2LastXRef.current = e.clientX;
                  slider2VelocityRef.current = 0;
                }}
                onPointerMove={(e) => {
                  if (!slider2PointerDownRef.current) return;
                  const deltaX = e.clientX - slider2LastXRef.current;
                  slider2LastXRef.current = e.clientX;
                  slider2OffsetRef.current -= deltaX;
                  slider2VelocityRef.current = -deltaX * 0.045;
                }}
                onPointerUp={() => {
                  slider2PointerDownRef.current = false;
                }}
                onPointerCancel={() => {
                  slider2PointerDownRef.current = false;
                }}
                className="relative w-full h-[300px] sm:h-[340px] flex items-center justify-center touch-pan-y cursor-grab active:cursor-grabbing"
              >
                {/* Soft Pastel Edge Fades */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-20 lg:w-28 z-20 bg-gradient-to-r from-[#FFFDFB] via-[#FFFDFB]/65 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-20 lg:w-28 z-20 bg-gradient-to-l from-[#FFFDFB] via-[#FFFDFB]/65 to-transparent"
                />

                <div className="relative w-full h-full flex items-center justify-center">
                  {virtualSlider2Frames.map((item, index) => (
                    <div
                      key={item.key}
                      ref={(el) => {
                        slider2CardRefs.current[index] = el;
                      }}
                      className="group absolute aspect-[4/2.9] will-change-transform"
                    >
                      <div className="w-full h-full rounded-[20px] overflow-hidden bg-white border border-[#F3DFEA] shadow-[0_12px_30px_rgba(27,30,50,0.07)] group-hover:shadow-[0_18px_38px_rgba(217,91,138,0.16)] transition-all duration-300 relative">
                        <img
                          ref={(el) => {
                            slider2ImgRefs.current[index] = el;
                          }}
                          src={item.frame.image}
                          alt={item.frame.title}
                          loading="eager"
                          decoding="async"
                          draggable={false}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-center pointer-events-none select-none will-change-transform transition-transform duration-300"
                        />

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B1E32]/65 via-[#1B1E32]/15 to-transparent p-5 flex flex-col justify-between">
                          <span className="text-[10px] font-semibold tracking-[0.16em] text-[#1B1E32] uppercase bg-white/90 backdrop-blur-sm self-start px-3 py-1 rounded-full">
                            {item.frame.tag}
                          </span>
                          <div>
                            <h3 className="font-editorial text-[19px] font-medium text-white leading-snug">
                              {item.frame.title}
                            </h3>
                            <span className="text-[11px] text-[#FDEBF1]/90">
                              {item.frame.subtitle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* =====================================================================
                8. PREMIUM PASTEL WAVE FOOTER (WITH LOWER COLOUR-TRANSITION SUPPORT)
               ===================================================================== */}
            <footer
              id="womens-footer"
              className="relative w-full mt-4 overflow-hidden transition-all duration-700"
              style={{
                background: activeLowerTheme.footerBg,
              }}
            >
              {/* Soft Curved Wave Top Divider */}
              <div className="w-full overflow-hidden leading-none" aria-hidden="true">
                <svg
                  viewBox="0 0 1440 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-8 sm:h-12 preserve-3d"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 0H1440V28C1220 68 940 64 720 32C500 0 220 4 0 42V0Z"
                    fill="#FFFDFB"
                  />
                </svg>
              </div>

              <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-10 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/40">
                  {/* Brand Column + Lower Colour-Transition Pills */}
                  <div className="lg:col-span-4 space-y-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-white/75 flex items-center justify-center text-[#D95B8A]">
                        ✦
                      </span>
                      <span className="font-editorial text-[26px] font-semibold tracking-[0.04em] text-[#1B1E32]">
                        ASVÉRA
                      </span>
                    </div>
                    <p className="text-[13px] text-[#3A3D52] max-w-[280px] leading-relaxed">
                      ASVÉRA WOMEN — Contemporary silhouettes, quiet confidence, and
                      timeless expression.
                    </p>

                    {/* Footer Colour-Transition Selector */}
                    <div className="pt-1">
                      <span className="block text-[10px] font-semibold tracking-[0.16em] text-[#3A3D52] uppercase mb-2">
                        Palette Mood: {activeLowerTheme.name}
                      </span>
                      <div className="flex items-center gap-2">
                        {LOWER_COLOUR_THEMES.map((theme, idx) => (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() => setLowerThemeIndex(idx)}
                            aria-label={`Set ${theme.name} palette`}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-300 cursor-pointer pointer-events-auto ${
                              lowerThemeIndex === idx
                                ? 'bg-[#1B1E32] text-white shadow-xs scale-105'
                                : 'bg-white/75 hover:bg-white text-[#1B1E32]'
                            }`}
                          >
                            <span
                              style={{ backgroundColor: theme.hex }}
                              className="w-2.5 h-2.5 rounded-full border border-black/15"
                            />
                            <span>{theme.name.split(' ')[1] || theme.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="lg:col-span-2 space-y-2.5">
                    <h3 className="text-[13px] font-semibold text-[#1B1E32]">
                      Quick Links
                    </h3>
                    <ul className="space-y-2 text-[13px] text-[#3A3D52]">
                      <li>
                        <button
                          type="button"
                          onClick={() => scrollToSection('womens-top')}
                          className="hover:text-[#1B1E32] cursor-pointer"
                        >
                          Home
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => scrollToSection('womens-featured')}
                          className="hover:text-[#1B1E32] cursor-pointer"
                        >
                          Shop
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => scrollToSection('womens-editorial-banner')}
                          className="hover:text-[#1B1E32] cursor-pointer"
                        >
                          About
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={onReturnToMain}
                          className="hover:text-[#1B1E32] cursor-pointer"
                        >
                          Men&apos;s Collection
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Categories (Clickable → Dedicated Category View) */}
                  <div className="lg:col-span-2 space-y-2.5">
                    <h3 className="text-[13px] font-semibold text-[#1B1E32]">
                      Categories
                    </h3>
                    <ul className="space-y-2 text-[13px] text-[#3A3D52]">
                      <li>
                        <button
                          type="button"
                          onClick={() => navigateToCategory('baby-tee')}
                          className="hover:text-[#D95B8A] font-medium cursor-pointer"
                        >
                          Baby Tee →
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => navigateToCategory('signature-shirt')}
                          className="hover:text-[#5E4B8B] font-medium cursor-pointer"
                        >
                          Signature Shirt →
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => navigateToCategory('essentials')}
                          className="hover:text-[#B88467] font-medium cursor-pointer"
                        >
                          Essentials →
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleCategoryClick('Dresses')}
                          className="hover:text-[#1B1E32] cursor-pointer"
                        >
                          Dresses (Coming Soon)
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => handleCategoryClick('Co-ords')}
                          className="hover:text-[#1B1E32] cursor-pointer"
                        >
                          Co-ords (Coming Soon)
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Newsletter Column */}
                  <div className="lg:col-span-4 space-y-3">
                    <h3 className="text-[14px] font-semibold text-[#1B1E32]">
                      Subscribe to our newsletter
                    </h3>
                    <p className="text-[12.5px] text-[#3A3D52]">
                      Receive the latest ASVÉRA Women updates, private previews, and
                      style notes.
                    </p>

                    {subscribed ? (
                      <div className="inline-flex items-center gap-2 bg-white/85 text-[#1B1E32] text-[12.5px] font-medium px-4 py-2.5 rounded-full">
                        <Check className="w-4 h-4 text-[#E3568B]" />
                        <span>Thank you for joining ASVÉRA Women.</span>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleNewsletterSubmit}
                        className="flex items-center bg-white rounded-full p-1.5 shadow-sm max-w-[360px]"
                      >
                        <label htmlFor="womens-footer-email" className="sr-only">
                          Your email address
                        </label>
                        <input
                          id="womens-footer-email"
                          type="email"
                          required
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          placeholder="Your email address"
                          className="flex-1 bg-transparent px-4 py-1.5 text-[13px] text-[#1B1E32] placeholder:text-[#8C7B90] outline-none"
                        />
                        <button
                          type="submit"
                          aria-label="Subscribe"
                          className="w-9 h-9 rounded-full bg-[#E3568B] hover:bg-[#D1477B] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Bottom Legal Row */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#3A3D52]">
                  <span>© 2025 ASVÉRA WOMEN. All rights reserved.</span>
                  <div className="flex items-center gap-6">
                    <span>Privacy Policy</span>
                    <span>Terms &amp; Conditions</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </>
      )}

      {/* =====================================================================
          BAG & CHECKOUT DRAWER (SUPPORTS ADD TO CART & BUY NOW FOR WOMEN'S CATEGORIES)
         ===================================================================== */}
      {bagDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#1B1E32]/35 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#FFFDFB] h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl border-l border-[#F4E3EC] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#F4E3EC]">
                <div>
                  <span className="font-editorial text-[22px] font-semibold text-[#1B1E32]">
                    ASVÉRA WOMEN
                  </span>
                  <span className="block text-[11px] text-[#8C7B90]">
                    {checkoutMode === 'checkout'
                      ? 'Express Atelier Checkout'
                      : checkoutMode === 'success'
                      ? 'Order Confirmed'
                      : `Shopping Bag (${totalBagCount})`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setBagDrawerOpen(false)}
                  aria-label="Close bag drawer"
                  className="w-8 h-8 rounded-full bg-[#FDEBF1] text-[#D95B8A] flex items-center justify-center hover:bg-[#F9D8E5] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {checkoutMode === 'success' ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#FDEBF1] text-[#E3568B] flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7" />
                  </div>
                  <h4 className="font-editorial text-[26px] font-semibold text-[#1B1E32]">
                    Thank You for Your Order
                  </h4>
                  <p className="text-[13px] text-[#6E5D78] leading-relaxed">
                    Your ASVÉRA Women pieces are being prepared at our atelier. A
                    dispatch confirmation has been sent to your inbox.
                  </p>
                </div>
              ) : checkoutMode === 'checkout' && cartItems.length > 0 ? (
                <form
                  id="womens-checkout-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCartItems([]);
                    setCheckoutMode('success');
                  }}
                  className="py-6 space-y-4"
                >
                  <button
                    type="button"
                    onClick={() => setCheckoutMode('bag')}
                    className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#D95B8A] hover:text-[#1B1E32] cursor-pointer"
                  >
                    ← Back to Bag
                  </button>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6E5D78] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                      placeholder="Aarohi Sharma"
                      className="w-full rounded-xl border border-[#EBD6E3] bg-white px-3.5 py-2.5 text-[13px] text-[#1B1E32] outline-none focus:border-[#E3568B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6E5D78] mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      placeholder="Street, Apartment / Suite"
                      className="w-full rounded-xl border border-[#EBD6E3] bg-white px-3.5 py-2.5 text-[13px] text-[#1B1E32] outline-none focus:border-[#E3568B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6E5D78] mb-1">
                      City &amp; PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingCity}
                      onChange={(e) => setShippingCity(e.target.value)}
                      placeholder="Mumbai · 400001"
                      className="w-full rounded-xl border border-[#EBD6E3] bg-white px-3.5 py-2.5 text-[13px] text-[#1B1E32] outline-none focus:border-[#E3568B]"
                    />
                  </div>
                  <div className="pt-3 border-t border-[#F4E3EC] flex items-center justify-between text-[14px] font-semibold text-[#1B1E32]">
                    <span>Total Payable</span>
                    <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                </form>
              ) : cartItems.length > 0 ? (
                <div className="py-6 space-y-4">
                  {cartItems.map((item, idx) => (
                    <div
                      key={`${item.productId}-${item.size}-${item.colorName}`}
                      className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#F3DFEA]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="inline-block text-[9.5px] font-semibold tracking-[0.14em] text-[#E3568B] uppercase">
                          {item.categoryLabel}
                        </span>
                        <h4 className="text-[13.5px] font-semibold text-[#1B1E32] truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11.5px] text-[#7A6A82]">
                          Size: {item.size} · {item.colorName}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center gap-2 border border-[#EBD6E3] rounded-full px-2.5 py-0.5 text-[12px]">
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(idx, -1)}
                              className="text-[#6E5D78] hover:text-[#1B1E32] cursor-pointer"
                            >
                              −
                            </button>
                            <span className="font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateCartQuantity(idx, 1)}
                              className="text-[#6E5D78] hover:text-[#1B1E32] cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[13px] font-semibold text-[#1B1E32]">
                            ₹{(item.priceNumber * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t border-[#F4E3EC] flex items-center justify-between text-[14px] font-semibold text-[#1B1E32]">
                    <span>Subtotal</span>
                    <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ) : (
                <div className="py-6 space-y-4">
                  <p className="text-[12.5px] text-[#6E5D78]">
                    Your bag is currently empty. Select a launching category to
                    explore pieces:
                  </p>
                  {CURATED_SILHOUETTE_SLOTS.slice(0, 3).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setBagDrawerOpen(false);
                        if (item.categorySlug) {
                          navigateToCategory(item.categorySlug);
                        }
                      }}
                      className="w-full flex items-center gap-4 p-3 rounded-2xl bg-white hover:bg-[#FDEBF1]/50 border border-[#F3DFEA] text-left transition-colors cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="inline-block text-[9.5px] font-semibold tracking-[0.14em] text-[#E3568B] uppercase">
                          {item.badge}
                        </span>
                        <h4 className="text-[14px] font-semibold text-[#1B1E32] truncate">
                          {item.title}
                        </h4>
                        <p className="text-[11.5px] text-[#7A6A82] truncate">
                          Explore {item.title} →
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {checkoutMode === 'success' ? (
              <button
                type="button"
                onClick={() => {
                  setCheckoutMode('bag');
                  setBagDrawerOpen(false);
                }}
                className="w-full bg-[#1B1E32] text-white text-[13px] font-semibold py-3.5 rounded-full cursor-pointer"
              >
                Continue Exploring ASVÉRA Women
              </button>
            ) : checkoutMode === 'checkout' && cartItems.length > 0 ? (
              <button
                type="submit"
                form="womens-checkout-form"
                style={{
                  background: 'linear-gradient(90deg, #E3568B 0%, #EE78A5 100%)',
                }}
                className="w-full text-white text-[13.5px] font-semibold py-3.5 rounded-full shadow-[0_8px_20px_rgba(227,86,139,0.28)] cursor-pointer"
              >
                Place Order · ₹{cartSubtotal.toLocaleString('en-IN')}
              </button>
            ) : cartItems.length > 0 ? (
              <button
                type="button"
                onClick={() => setCheckoutMode('checkout')}
                style={{
                  background: 'linear-gradient(90deg, #E3568B 0%, #EE78A5 100%)',
                }}
                className="w-full text-white text-[13.5px] font-semibold py-3.5 rounded-full shadow-[0_8px_20px_rgba(227,86,139,0.28)] cursor-pointer"
              >
                Proceed to Checkout · ₹{cartSubtotal.toLocaleString('en-IN')}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setBagDrawerOpen(false);
                  navigateToCategory('baby-tee');
                }}
                style={{
                  background: 'linear-gradient(90deg, #E3568B 0%, #EE78A5 100%)',
                }}
                className="w-full text-white text-[13.5px] font-medium py-3.5 rounded-full shadow-[0_8px_20px_rgba(227,86,139,0.28)] cursor-pointer"
              >
                Explore Launching Categories →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WomensCollectionPage;
