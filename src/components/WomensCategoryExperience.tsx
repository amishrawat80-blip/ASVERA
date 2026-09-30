import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Check,
  ShieldCheck,
  Truck,
  RefreshCw,
  Ruler,
  X,
} from 'lucide-react';
import womensCatBabyTee from '../assets/images/womens_cat_baby_tee_1790746753562.jpg';
import womensCatSignatureShirt from '../assets/images/womens_cat_signature_shirt_1790746766176.jpg';
import womensCatEssentials from '../assets/images/womens_cat_essentials_1790746777428.jpg';
import editSlide1 from '../assets/images/womens_edit_slide_1_1790748923846.jpg';
import editSlide2 from '../assets/images/womens_edit_slide_2_1790748934965.jpg';
import editSlide3 from '../assets/images/womens_edit_slide_3_1790748947912.jpg';
import editSlide4 from '../assets/images/womens_edit_slide_4_1790748961684.jpg';
import editSlide6 from '../assets/images/womens_edit_slide_6_1790748984449.jpg';
import womensInsp1 from '../assets/images/womens_insp_1_1790749025793.jpg';

export type WomensCategorySlug = 'baby-tee' | 'signature-shirt' | 'essentials';

export interface WomensCategoryProduct {
  id: string;
  name: string;
  subtitle: string;
  priceNumber: number;
  priceFormatted: string;
  image: string;
  fabricSpec: string;
  fitNote: string;
  colorways: Array<{
    name: string;
    hex: string;
    bgTint: string;
  }>;
  sizes: string[];
}

export interface WomensCartItem {
  productId: string;
  name: string;
  categoryLabel: string;
  priceNumber: number;
  priceFormatted: string;
  size: string;
  colorName: string;
  colorHex: string;
  image: string;
  quantity: number;
}

interface CategoryConfig {
  slug: WomensCategorySlug;
  routePath: string;
  label: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  heroBgGradient: string;
  accentHex: string;
  editorialTitle: string;
  editorialCopy: string;
  craftPoints: Array<{ title: string; detail: string }>;
  products: WomensCategoryProduct[];
}

export const WOMENS_CATEGORY_DATA: Record<WomensCategorySlug, CategoryConfig> = {
  'baby-tee': {
    slug: 'baby-tee',
    routePath: '/women/baby-tee',
    label: 'BABY TEE',
    eyebrow: 'ASVÉRA WOMEN · BABY TEE COLLECTION',
    heroTitle: 'Sculpted Cropped Proportions.',
    heroSubtitle:
      'Precision-cut women’s baby tees milled in 260 GSM combed Supima micro-rib. Designed for a soft second-skin contour that holds its architectural shape.',
    heroImage: womensCatBabyTee,
    heroBgGradient:
      'linear-gradient(125deg, #FFF7FA 0%, #FDE9F1 48%, #F8E8EE 100%)',
    accentHex: '#D95B8A',
    editorialTitle: 'The Anatomy of the ASVÉRA Baby Tee',
    editorialCopy:
      'Engineered specifically for the ASVÉRA Women silhouette with a clean bound crewneck, capped sleeves that frame the shoulder, and a balanced cropped hem.',
    craftPoints: [
      {
        title: '260 GSM Combed Micro-Rib',
        detail: 'Ultra-soft organic cotton with 6% elastane recovery for lasting contour.',
      },
      {
        title: 'Precision Cropped Length',
        detail: 'Hits cleanly at the natural high waist to pair with tailored trousers or denim.',
      },
      {
        title: 'Double-Bound Neckline',
        detail: 'Reinforced collar seam that never loses tension after washing.',
      },
    ],
    products: [
      {
        id: 'bt-01',
        name: 'ASVÉRA Sculpted Rib Baby Tee',
        subtitle: 'Signature Cropped Fit · 260 GSM Micro-Rib',
        priceNumber: 1890,
        priceFormatted: '₹1,890',
        image: womensCatBabyTee,
        fabricSpec: '94% Supima Cotton, 6% Elastane (260 GSM)',
        fitNote: 'Fitted cropped silhouette. True to size.',
        colorways: [
          { name: 'Soft Blush', hex: '#E8C7C8', bgTint: '#FDEBF1' },
          { name: 'Soft Ivory', hex: '#FAF6EF', bgTint: '#FCF9F5' },
          { name: 'Dusty Rose', hex: '#B9828A', bgTint: '#F6E4E8' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
      },
      {
        id: 'bt-02',
        name: 'ASVÉRA Contour Crew Baby Tee',
        subtitle: 'Second-Skin Jersey · Bound Collar',
        priceNumber: 1990,
        priceFormatted: '₹1,990',
        image: editSlide1,
        fabricSpec: '95% Long-Staple Cotton, 5% Spandex (250 GSM)',
        fitNote: 'Sleek waist-skimming cut with capped sleeves.',
        colorways: [
          { name: 'Dusty Rose', hex: '#B9828A', bgTint: '#F6E4E8' },
          { name: 'Soft Blush', hex: '#E8C7C8', bgTint: '#FDEBF1' },
          { name: 'Warm Cream', hex: '#F3EBDD', bgTint: '#FAF5EC' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
      },
      {
        id: 'bt-03',
        name: 'ASVÉRA Atelier Seam Baby Tee',
        subtitle: 'Architectural Stitch Detail · Heavy Rib',
        priceNumber: 2190,
        priceFormatted: '₹2,190',
        image: editSlide3,
        fabricSpec: '100% Combed Interlock Rib (280 GSM)',
        fitNote: 'Structured cropped fit with tonal seam framing.',
        colorways: [
          { name: 'Warm Cream', hex: '#F3EBDD', bgTint: '#FAF5EC' },
          { name: 'Soft Blush', hex: '#E8C7C8', bgTint: '#FDEBF1' },
          { name: 'Muted Champagne', hex: '#B8A58D', bgTint: '#F5EFE6' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
      },
    ],
  },
  'signature-shirt': {
    slug: 'signature-shirt',
    routePath: '/women/signature-shirt',
    label: 'SIGNATURE SHIRT',
    eyebrow: 'ASVÉRA WOMEN · SIGNATURE SHIRT COLLECTION',
    heroTitle: 'Effortless Tailored Drape.',
    heroSubtitle:
      'Relaxed women’s button-down shirts crafted in crisp long-staple poplin and silk-touch weaves with French cuffs and mother-of-pearl buttons.',
    heroImage: womensCatSignatureShirt,
    heroBgGradient:
      'linear-gradient(125deg, #FAF7FE 0%, #EFE8FA 48%, #FBEFF5 100%)',
    accentHex: '#7B65A8',
    editorialTitle: 'Tailoring Reimagined for Soft Movement',
    editorialCopy:
      'Each ASVÉRA Signature Shirt balances crisp menswear-inspired collar construction with a fluid, feminine drape across the shoulders and back pleat.',
    craftPoints: [
      {
        title: 'Silk-Touch Cotton Poplin',
        detail: 'Mercerized long-staple weave with a cool, luminous hand-feel.',
      },
      {
        title: 'Architectural Cuffs & Collar',
        detail: 'Structured interlining that stands gracefully whether buttoned or open.',
      },
      {
        title: 'Mother-of-Pearl Closures',
        detail: 'Tonal iridescent buttons custom-dyed to match each pastel shade.',
      },
    ],
    products: [
      {
        id: 'ss-01',
        name: 'ASVÉRA Relaxed Poplin Signature Shirt',
        subtitle: 'Pastel Lavender · French Cuff Tailoring',
        priceNumber: 3290,
        priceFormatted: '₹3,290',
        image: womensCatSignatureShirt,
        fabricSpec: '100% Mercerized Long-Staple Cotton Poplin',
        fitNote: 'Relaxed tailored drape with dropped shoulder.',
        colorways: [
          { name: 'Pastel Lavender', hex: '#D7CBEF', bgTint: '#F3EEFC' },
          { name: 'Soft Ivory', hex: '#FAF6EF', bgTint: '#FCF9F5' },
          { name: 'Soft Blush', hex: '#E8C7C8', bgTint: '#FDEBF1' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
      },
      {
        id: 'ss-02',
        name: 'ASVÉRA Ivory Atelier Button-Down',
        subtitle: 'Box-Pleat Back · Crisp Poplin Weave',
        priceNumber: 3390,
        priceFormatted: '₹3,390',
        image: editSlide6,
        fabricSpec: '100% Organic Combed Cotton Poplin',
        fitNote: 'Oversized contemporary cut designed for half-tucking.',
        colorways: [
          { name: 'Soft Ivory', hex: '#FAF6EF', bgTint: '#FCF9F5' },
          { name: 'Dusty Rose', hex: '#B9828A', bgTint: '#F6E4E8' },
          { name: 'Pastel Lavender', hex: '#D7CBEF', bgTint: '#F3EEFC' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
      },
      {
        id: 'ss-03',
        name: 'ASVÉRA Draped Wrap-Collar Shirt',
        subtitle: 'Luminous Satin-Poplin · Sculpted Cuff',
        priceNumber: 3590,
        priceFormatted: '₹3,590',
        image: editSlide2,
        fabricSpec: '70% Cotton, 30% Mulberry Silk Blend',
        fitNote: 'Fluid tailored silhouette with subtle waist taper.',
        colorways: [
          { name: 'Pastel Lavender', hex: '#D7CBEF', bgTint: '#F3EEFC' },
          { name: 'Muted Champagne', hex: '#B8A58D', bgTint: '#F5EFE6' },
          { name: 'Soft Blush', hex: '#E8C7C8', bgTint: '#FDEBF1' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
      },
    ],
  },
  essentials: {
    slug: 'essentials',
    routePath: '/women/essentials',
    label: 'ESSENTIALS',
    eyebrow: 'ASVÉRA WOMEN · EVERYDAY ESSENTIALS COLLECTION',
    heroTitle: 'Quiet Luxury Foundations.',
    heroSubtitle:
      'Minimalist women’s wardrobe foundations in warm cream, soft ivory, and muted champagne. Fine-gauge knits and seamless layers built for daily refinement.',
    heroImage: womensCatEssentials,
    heroBgGradient:
      'linear-gradient(125deg, #FFFDF9 0%, #FAF0E6 48%, #FBEBF1 100%)',
    accentHex: '#B88467',
    editorialTitle: 'Foundational Pieces Without Compromise',
    editorialCopy:
      'Designed as the cornerstone of the ASVÉRA Women wardrobe, our Essentials combine breathable fine-gauge knitwear with clean, timeless lines.',
    craftPoints: [
      {
        title: 'Fine-Gauge Cotton-Modal Knit',
        detail: 'Silky, breathable drape that resists pilling and retains softness.',
      },
      {
        title: 'Clean Seamless Finishing',
        detail: 'Double-faced hems and concealed bindings for a sleek profile.',
      },
      {
        title: 'Timeless Neutral & Pastel Tones',
        detail: 'Curated in Warm Cream, Soft Ivory, Soft Blush, and Muted Champagne.',
      },
    ],
    products: [
      {
        id: 'es-01',
        name: 'ASVÉRA Fine-Knit Essential Sleeveless Top',
        subtitle: 'Warm Cream · Contoured Rib Knit',
        priceNumber: 2290,
        priceFormatted: '₹2,290',
        image: womensCatEssentials,
        fabricSpec: '65% Combed Cotton, 35% Modal Fine Knit',
        fitNote: 'Sleek contoured fit that layers effortlessly.',
        colorways: [
          { name: 'Warm Cream', hex: '#F3EBDD', bgTint: '#FAF5EC' },
          { name: 'Soft Blush', hex: '#E8C7C8', bgTint: '#FDEBF1' },
          { name: 'Muted Champagne', hex: '#B8A58D', bgTint: '#F5EFE6' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
      },
      {
        id: 'es-02',
        name: 'ASVÉRA Champagne Satin-Knit Camisole',
        subtitle: 'Muted Champagne · Delicate Strap Drape',
        priceNumber: 2490,
        priceFormatted: '₹2,490',
        image: editSlide4,
        fabricSpec: '80% Tencel Luxe, 20% Silk Jersey',
        fitNote: 'Fluid bias-inspired drape with clean neckline.',
        colorways: [
          { name: 'Muted Champagne', hex: '#B8A58D', bgTint: '#F5EFE6' },
          { name: 'Soft Ivory', hex: '#FAF6EF', bgTint: '#FCF9F5' },
          { name: 'Soft Blush', hex: '#E8C7C8', bgTint: '#FDEBF1' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
      },
      {
        id: 'es-03',
        name: 'ASVÉRA Soft-Knit Everyday Cardigan Set',
        subtitle: 'Blush & Lavender Layering Essential',
        priceNumber: 2890,
        priceFormatted: '₹2,890',
        image: womensInsp1,
        fabricSpec: '100% Fine-Combed Cotton Knit (300 GSM)',
        fitNote: 'Relaxed feminine fit with tonal buttons.',
        colorways: [
          { name: 'Soft Blush', hex: '#E8C7C8', bgTint: '#FDEBF1' },
          { name: 'Warm Cream', hex: '#F3EBDD', bgTint: '#FAF5EC' },
          { name: 'Pastel Lavender', hex: '#D7CBEF', bgTint: '#F3EEFC' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
      },
    ],
  },
};

interface WomensCategoryExperienceProps {
  categorySlug: WomensCategorySlug;
  onBackToWomen: () => void;
  onSelectCategory: (slug: WomensCategorySlug) => void;
  cartItems: WomensCartItem[];
  onAddToCart: (item: Omit<WomensCartItem, 'quantity'>, openCheckout?: boolean) => void;
  onOpenBag: () => void;
}

export const WomensCategoryExperience: React.FC<WomensCategoryExperienceProps> = ({
  categorySlug,
  onBackToWomen,
  onSelectCategory,
  cartItems,
  onAddToCart,
  onOpenBag,
}) => {
  const category = WOMENS_CATEGORY_DATA[categorySlug];

  // Track selected size and colorway per product
  const [selectedSizeMap, setSelectedSizeMap] = useState<Record<string, string>>({
    'bt-01': 'S',
    'bt-02': 'S',
    'bt-03': 'M',
    'ss-01': 'S',
    'ss-02': 'M',
    'ss-03': 'S',
    'es-01': 'S',
    'es-02': 'S',
    'es-03': 'M',
  });
  const [selectedColorIndexMap, setSelectedColorIndexMap] = useState<Record<string, number>>({
    'bt-01': 0,
    'bt-02': 0,
    'bt-03': 0,
    'ss-01': 0,
    'ss-02': 0,
    'ss-03': 0,
    'es-01': 0,
    'es-02': 0,
    'es-03': 0,
  });
  const [savedProductIds, setSavedProductIds] = useState<Record<string, boolean>>({});
  const [addedToastId, setAddedToastId] = useState<string | null>(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  // Ambient colour-transition state for the category page
  const [ambientMoodIndex, setAmbientMoodIndex] = useState<number>(0);
  const ambientMoods = [
    { name: 'Soft Blush', hex: '#E8C7C8', bg: '#FFF7FA', border: '#F3DCE6' },
    { name: 'Pastel Lavender', hex: '#D7CBEF', bg: '#F9F6FE', border: '#E5DCF8' },
    { name: 'Warm Cream', hex: '#F3EBDD', bg: '#FFFDF9', border: '#EFE4D4' },
    { name: 'Dusty Rose', hex: '#B9828A', bg: '#FCF3F5', border: '#EBD5DC' },
    { name: 'Muted Champagne', hex: '#B8A58D', bg: '#FBF8F3', border: '#E8DFD1' },
  ];
  const activeMood = ambientMoods[ambientMoodIndex] || ambientMoods[0];

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleTriggerAdd = (product: WomensCategoryProduct, buyNow = false) => {
    const size = selectedSizeMap[product.id] || 'S';
    const colorIdx = selectedColorIndexMap[product.id] ?? 0;
    const color = product.colorways[colorIdx] || product.colorways[0];

    onAddToCart(
      {
        productId: product.id,
        name: product.name,
        categoryLabel: category.label,
        priceNumber: product.priceNumber,
        priceFormatted: product.priceFormatted,
        size,
        colorName: color.name,
        colorHex: color.hex,
        image: product.image,
      },
      buyNow
    );

    if (!buyNow) {
      setAddedToastId(product.id);
      window.setTimeout(() => {
        setAddedToastId((prev) => (prev === product.id ? null : prev));
      }, 2200);
    }
  };

  return (
    <div
      style={{ backgroundColor: activeMood.bg }}
      className="min-h-screen w-full text-[#1B1E32] transition-colors duration-500 select-none overflow-x-hidden font-sans"
    >
      {/* =====================================================================
          DEDICATED CATEGORY HEADER WITH ← BACK TO WOMEN
         ===================================================================== */}
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#F4E3EC]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 h-[74px] flex items-center justify-between gap-4">
          {/* ← BACK TO WOMEN */}
          <button
            type="button"
            onClick={onBackToWomen}
            className="group inline-flex items-center gap-2.5 text-[11.5px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#1B1E32] hover:text-[#E3568B] bg-[#FDEBF1]/80 hover:bg-[#FBDCE7] px-4 py-2.5 rounded-full transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>BACK TO WOMEN</span>
          </button>

          {/* Center Brand + Category Indicator */}
          <div className="text-center">
            <span className="block font-editorial text-[22px] sm:text-[24px] font-semibold tracking-[0.04em] text-[#1B1E32] leading-none">
              ASVÉRA WOMEN
            </span>
            <span className="block text-[10px] font-semibold tracking-[0.22em] text-[#D95B8A] uppercase mt-0.5">
              {category.label}
            </span>
          </div>

          {/* Right Bag Button */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowSizeGuide(true)}
              className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-medium text-[#5E4B8B] hover:text-[#E3568B] bg-[#F7F1FC] px-3.5 py-2 rounded-full transition-colors cursor-pointer"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Size Guide</span>
            </button>

            <button
              type="button"
              onClick={onOpenBag}
              className="relative inline-flex items-center gap-2 bg-[#1B1E32] hover:bg-[#2B2F4A] text-white text-[12px] font-medium px-4 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag ({totalBagCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          1. DEDICATED CATEGORY HERO BANNER (ONLY THIS CATEGORY)
         ===================================================================== */}
      <section
        style={{ background: category.heroBgGradient }}
        className="relative w-full border-b border-[#F3DFEA] overflow-hidden"
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Category Editorial Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 bg-white/85 backdrop-blur-sm border border-[#F2DCE8] px-3.5 py-1.5 rounded-full">
                <span
                  style={{ backgroundColor: category.accentHex }}
                  className="w-2 h-2 rounded-full"
                />
                <span className="text-[10.5px] font-semibold tracking-[0.2em] text-[#1B1E32] uppercase">
                  {category.eyebrow}
                </span>
              </div>

              <h1 className="font-editorial text-[42px] sm:text-[54px] lg:text-[62px] font-semibold leading-[1.03] tracking-[-0.02em] text-[#1B1E32]">
                {category.heroTitle}
              </h1>

              <p className="text-[14.5px] sm:text-[15.5px] leading-[1.7] text-[#4A4D62] max-w-[490px]">
                {category.heroSubtitle}
              </p>

              {/* Interactive Colour-Mood Transition Selector for this Category */}
              <div className="pt-2">
                <span className="block text-[10.5px] font-semibold tracking-[0.18em] text-[#7A6A82] uppercase mb-2.5">
                  ATELIER COLOUR MOOD · {activeMood.name.toUpperCase()}
                </span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {ambientMoods.map((mood, idx) => (
                    <button
                      key={mood.name}
                      type="button"
                      onClick={() => setAmbientMoodIndex(idx)}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11.5px] font-medium border transition-all duration-300 cursor-pointer ${
                        ambientMoodIndex === idx
                          ? 'bg-[#1B1E32] text-white border-[#1B1E32] shadow-sm scale-105'
                          : 'bg-white/85 text-[#3A3D52] border-[#EBD6E3] hover:border-[#E3568B]'
                      }`}
                    >
                      <span
                        style={{ backgroundColor: mood.hex }}
                        className="w-3 h-3 rounded-full border border-black/10"
                      />
                      <span>{mood.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Dedicated Category Hero Portrait */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3.4] rounded-[24px] overflow-hidden border border-[#F2DCE8] shadow-[0_18px_48px_rgba(217,91,138,0.14)] bg-white">
                <img
                  src={category.heroImage}
                  alt={category.label}
                  loading="eager"
                  decoding="sync"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1B1E32]/65 via-[#1B1E32]/20 to-transparent p-6 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-[#FDEBF1] uppercase">
                      AVAILABLE NOW
                    </span>
                    <h2 className="font-editorial text-[24px] font-medium text-white leading-none mt-1">
                      ASVÉRA {category.label}
                    </h2>
                  </div>
                  <span className="text-[11px] font-medium tracking-[0.14em] text-white/90 uppercase bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full">
                    Edition 01
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. DEDICATED CATEGORY PRODUCTS GRID (ISOLATED TO THIS CATEGORY ONLY)
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-18">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="block text-[11px] font-semibold tracking-[0.2em] text-[#E3568B] uppercase mb-1.5">
              {category.label} EDITIONS
            </span>
            <h2 className="font-editorial text-[34px] sm:text-[42px] font-semibold text-[#1B1E32] leading-none">
              Shop {category.label}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowSizeGuide(true)}
            className="inline-flex items-center gap-2 text-[12.5px] font-medium text-[#5E4B8B] hover:text-[#E3568B] cursor-pointer"
          >
            <Ruler className="w-4 h-4" />
            <span>View {category.label} Size &amp; Fit Guide</span>
          </button>
        </div>

        {/* 3 Product Editions strictly for this Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {category.products.map((product) => {
            const activeSize = selectedSizeMap[product.id] || 'S';
            const activeColorIdx = selectedColorIndexMap[product.id] ?? 0;
            const activeColor =
              product.colorways[activeColorIdx] || product.colorways[0];
            const isSaved = !!savedProductIds[product.id];
            const justAdded = addedToastId === product.id;

            return (
              <article
                key={product.id}
                style={{ backgroundColor: activeColor.bgTint }}
                className="group rounded-[22px] border border-[#F2DCE8] overflow-hidden shadow-[0_10px_30px_rgba(27,30,50,0.05)] flex flex-col justify-between transition-colors duration-500"
              >
                <div>
                  {/* Product Portrait Image */}
                  <div className="relative aspect-[3/3.6] overflow-hidden bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="eager"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                      <span className="bg-white/95 backdrop-blur-sm text-[#1B1E32] text-[10px] font-semibold tracking-[0.16em] uppercase px-3 py-1 rounded-full shadow-xs">
                        {activeColor.name}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setSavedProductIds((prev) => ({
                            ...prev,
                            [product.id]: !prev[product.id],
                          }))
                        }
                        aria-label={`Save ${product.name}`}
                        className="w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#4A4D62] hover:text-[#E3568B] shadow-xs cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isSaved ? 'fill-[#E3568B] text-[#E3568B]' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-editorial text-[22px] font-semibold text-[#1B1E32] leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-[12.5px] text-[#6E5D78] mt-0.5">
                          {product.subtitle}
                        </p>
                      </div>
                      <span className="text-[16px] font-semibold text-[#1B1E32] tabular-nums shrink-0">
                        {product.priceFormatted}
                      </span>
                    </div>

                    <div className="text-[12px] text-[#4A4D62] space-y-1 pt-1 border-t border-[#EBD6E3]/70">
                      <p>
                        <span className="font-semibold text-[#1B1E32]">Fabric:</span>{' '}
                        {product.fabricSpec}
                      </p>
                      <p>
                        <span className="font-semibold text-[#1B1E32]">Fit:</span>{' '}
                        {product.fitNote}
                      </p>
                    </div>

                    {/* Colourway Selector */}
                    <div>
                      <span className="block text-[11px] font-semibold tracking-[0.14em] text-[#6E5D78] uppercase mb-2">
                        Colour: <span className="text-[#1B1E32]">{activeColor.name}</span>
                      </span>
                      <div className="flex items-center gap-2.5">
                        {product.colorways.map((cw, idx) => (
                          <button
                            key={cw.name}
                            type="button"
                            onClick={() =>
                              setSelectedColorIndexMap((prev) => ({
                                ...prev,
                                [product.id]: idx,
                              }))
                            }
                            aria-label={`Select ${cw.name}`}
                            style={{ backgroundColor: cw.hex }}
                            className={`w-5 h-5 rounded-full border border-black/15 transition-transform cursor-pointer ${
                              activeColorIdx === idx
                                ? 'ring-2 ring-offset-2 ring-[#E3568B] scale-110'
                                : 'opacity-80 hover:opacity-100'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Size Selector */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold tracking-[0.14em] text-[#6E5D78] uppercase mb-2">
                        <span>Select Size</span>
                        <span className="text-[#1B1E32]">{activeSize}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {product.sizes.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() =>
                              setSelectedSizeMap((prev) => ({
                                ...prev,
                                [product.id]: sz,
                              }))
                            }
                            className={`py-2 rounded-lg text-[12px] font-semibold border transition-all cursor-pointer ${
                              activeSize === sz
                                ? 'bg-[#1B1E32] text-white border-[#1B1E32]'
                                : 'bg-white/90 text-[#1B1E32] border-[#E6D4DF] hover:border-[#E3568B]'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add to Cart / Buy Now Buttons */}
                <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleTriggerAdd(product, false)}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FDEBF1] text-[#1B1E32] border border-[#1B1E32]/20 text-[12px] font-semibold tracking-[0.12em] uppercase py-3 px-4 rounded-full transition-colors cursor-pointer"
                  >
                    {justAdded ? (
                      <>
                        <Check className="w-4 h-4 text-[#E3568B]" />
                        <span>Added ({activeSize})</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-[#E3568B]" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTriggerAdd(product, true)}
                    style={{
                      background:
                        'linear-gradient(90deg, #E3568B 0%, #EE78A5 100%)',
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-white text-[12px] font-semibold tracking-[0.12em] uppercase py-3 px-4 rounded-full shadow-[0_6px_18px_rgba(227,86,139,0.28)] hover:shadow-[0_10px_22px_rgba(227,86,139,0.38)] transition-all cursor-pointer"
                  >
                    <span>Buy Now</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          3. CATEGORY CRAFTSMANSHIP & SPECIFICATIONS
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <div className="rounded-[24px] bg-white border border-[#F3DFEA] p-8 sm:p-12 shadow-[0_8px_28px_rgba(27,30,50,0.04)]">
          <div className="max-w-[620px] mb-8">
            <span className="block text-[10.5px] font-semibold tracking-[0.2em] text-[#E3568B] uppercase mb-2">
              ATELIER CRAFTSMANSHIP · {category.label}
            </span>
            <h3 className="font-editorial text-[28px] sm:text-[34px] font-semibold text-[#1B1E32]">
              {category.editorialTitle}
            </h3>
            <p className="mt-2.5 text-[14px] leading-[1.7] text-[#4A4D62]">
              {category.editorialCopy}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#F4E3EC]">
            {category.craftPoints.map((pt, i) => (
              <div key={pt.title} className="space-y-1.5">
                <span className="text-[10.5px] font-semibold tracking-[0.18em] text-[#D95B8A] uppercase">
                  0{i + 1}
                </span>
                <h4 className="text-[15px] font-semibold text-[#1B1E32]">
                  {pt.title}
                </h4>
                <p className="text-[13px] text-[#6E5D78] leading-relaxed">
                  {pt.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Service Assurances */}
          <div className="mt-8 pt-6 border-t border-[#F4E3EC] grid grid-cols-1 sm:grid-cols-3 gap-4 text-[12.5px] text-[#4A4D62]">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#D95B8A]" />
              <span>Complimentary Delivery across India</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-[#7B65A8]" />
              <span>14-Day Effortless Size Exchange</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#B88467]" />
              <span>100% Protected Checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. LOWER COLOUR-TRANSITION & CATEGORY SWITCHER BAR + BACK TO WOMEN
         ===================================================================== */}
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <div
          style={{
            background:
              'linear-gradient(120deg, #FDEBF1 0%, #EFE6F8 50%, #FCF3EC 100%)',
          }}
          className="rounded-[24px] border border-[#F2DCE8] p-7 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
        >
          <div>
            <span className="block text-[10.5px] font-semibold tracking-[0.2em] text-[#D95B8A] uppercase mb-1.5">
              ASVÉRA WOMEN · {category.label}
            </span>
            <h3 className="font-editorial text-[26px] sm:text-[32px] font-semibold text-[#1B1E32]">
              Return to the Full ASVÉRA Women Collection
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {ambientMoods.map((mood, idx) => (
              <button
                key={mood.name}
                type="button"
                onClick={() => setAmbientMoodIndex(idx)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[11.5px] font-medium border transition-all duration-300 cursor-pointer ${
                  ambientMoodIndex === idx
                    ? 'bg-[#1B1E32] text-white border-[#1B1E32] shadow-sm scale-105'
                    : 'bg-white/90 text-[#1B1E32] border border-[#EBD6E3] hover:border-[#E3568B]'
                }`}
              >
                <span
                  style={{ backgroundColor: mood.hex }}
                  className="w-3 h-3 rounded-full border border-black/10"
                />
                <span>{mood.name}</span>
              </button>
            ))}

            <button
              type="button"
              onClick={onBackToWomen}
              className="group inline-flex items-center gap-2.5 bg-[#1B1E32] hover:bg-[#2B2F4A] text-white text-[12px] font-semibold tracking-[0.16em] uppercase px-6 py-3.5 rounded-full transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              <span>← BACK TO WOMEN</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SIZE GUIDE MODAL FOR THIS CATEGORY
         ===================================================================== */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1B1E32]/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-[24px] bg-[#FFFDFB] border border-[#F3DFEA] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#F4E3EC]">
              <div>
                <span className="text-[10px] font-semibold tracking-[0.18em] text-[#E3568B] uppercase">
                  ASVÉRA WOMEN FIT MATRIX
                </span>
                <h3 className="font-editorial text-[24px] font-semibold text-[#1B1E32]">
                  {category.label} Size Guide (Inches)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="w-8 h-8 rounded-full bg-[#FDEBF1] text-[#D95B8A] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-5 overflow-x-auto">
              <table className="w-full text-left text-[13px] border-collapse">
                <thead>
                  <tr className="border-b border-[#F3DFEA] text-[#6E5D78]">
                    <th className="py-2.5 font-semibold">Size</th>
                    <th className="py-2.5 font-semibold">Bust (in)</th>
                    <th className="py-2.5 font-semibold">Waist (in)</th>
                    <th className="py-2.5 font-semibold">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4E3EC] text-[#1B1E32]">
                  <tr>
                    <td className="py-2.5 font-semibold">XS</td>
                    <td className="py-2.5">31 – 32.5</td>
                    <td className="py-2.5">24 – 25.5</td>
                    <td className="py-2.5">
                      {categorySlug === 'baby-tee' ? '17.5' : '25.5'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">S</td>
                    <td className="py-2.5">33 – 34.5</td>
                    <td className="py-2.5">26 – 27.5</td>
                    <td className="py-2.5">
                      {categorySlug === 'baby-tee' ? '18.0' : '26.2'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">M</td>
                    <td className="py-2.5">35 – 36.5</td>
                    <td className="py-2.5">28 – 29.5</td>
                    <td className="py-2.5">
                      {categorySlug === 'baby-tee' ? '18.5' : '27.0'}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold">L</td>
                    <td className="py-2.5">37 – 39.0</td>
                    <td className="py-2.5">30 – 32.0</td>
                    <td className="py-2.5">
                      {categorySlug === 'baby-tee' ? '19.2' : '27.8'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={() => setShowSizeGuide(false)}
              className="w-full bg-[#1B1E32] text-white text-[12px] font-semibold tracking-[0.16em] uppercase py-3 rounded-full cursor-pointer"
            >
              Close Size Guide
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WomensCategoryExperience;
