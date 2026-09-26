import {
  CategoryInfo,
  Service,
  AddOn,
  TimeSlot,
  SlotPeriod,
  CityInfo,
  IndianCity,
} from '../types/booking';

export const CITIES: CityInfo[] = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    hubName: 'Indiranagar Sanctuary',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, KA 560038',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    hubName: 'Bandra West Suites',
    address: 'Pali Hill, Nargis Dutt Road, Bandra West, Mumbai, MH 400050',
  },
  {
    id: 'delhi',
    name: 'Delhi NCR',
    hubName: 'Horizon Pavilion',
    address: 'One Horizon Center, Golf Course Road, DLF Phase 5, Gurugram, HR 122002',
  },
];

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'ayurveda',
    name: 'Ayurveda & Spa',
    hindiName: 'आयुर्वेद एवं कायाकल्प',
    tagline: 'Authentic Abhyanga, Shirodhara & Himalayan herbal wellness',
    iconName: 'Sparkles',
  },
  {
    id: 'consulting',
    name: 'Advisory & Tech',
    hindiName: 'रणनीति एवं सलाह',
    tagline: 'Engineering architecture, startup scale & D2C advisory',
    iconName: 'Briefcase',
  },
  {
    id: 'grooming',
    name: 'Royal Grooming',
    hindiName: 'शाही ग्रूमिंग सैलून',
    tagline: 'Master bespoke cuts, beard sculpts & sandalwood facials',
    iconName: 'Scissors',
  },
  {
    id: 'rentals',
    name: 'Studio Rentals',
    hindiName: 'क्रिएटिव स्टूडियो',
    tagline: 'Dolby Atmos podcast suites, daylight lofts & boardrooms',
    iconName: 'Home',
  },
];

export const SERVICES: Service[] = [
  // Ayurveda & Spa
  {
    id: 'ayu-01',
    categoryId: 'ayurveda',
    name: 'Royal Shirodhara & Abhyanga Ritual',
    hindiTitle: 'शिरोधारा एवं अभ्यंग अनुष्ठान',
    tagline: 'Warm medicated herbal oil stream & synchronised tension release',
    description: 'A traditional 2-practitioner therapeutic experience starting with full-body warm Dhanwantharam thailam massage, followed by a continuous soothing stream of herbal oils on the third eye for deep neurological rest and sleep rejuvenation.',
    durationMinutes: 75,
    basePrice: 4200,
    rating: 4.98,
    reviewCount: 312,
    highlights: [
      'Pure organic Dhanwantharam oil',
      'Continuous warm herbal stream',
      'Private brass hydro suite & steam',
    ],
    badgeText: 'Signature Ritual',
  },
  {
    id: 'ayu-02',
    categoryId: 'ayurveda',
    name: 'Himalayan Salt & Sound Resonance',
    hindiTitle: 'हिमालयन साल्ट एवं नाद ध्यान',
    tagline: 'Tibetan singing bowls, pranayama & dry salt therapy',
    description: 'Immerse in a temperature-controlled pure pink Himalayan salt microclimate while master sound healers tune brass bowls and gongs to ease chronic mental fatigue and reset vagus nerve balance.',
    durationMinutes: 60,
    basePrice: 3200,
    rating: 4.95,
    reviewCount: 194,
    highlights: [
      'Micro-particle halotherapy',
      'Hand-hammered singing bowls',
      'Single-origin Nilgiri chamomile tea',
    ],
  },
  {
    id: 'ayu-03',
    categoryId: 'ayurveda',
    name: 'Potli Marma Decompression',
    hindiTitle: 'पोटली मर्म संवाहन',
    tagline: 'Warm herbal poultice massage for back & joint restoration',
    description: 'Heated muslin pouches packed with twelve wild-crafted Western Ghats herbs and therapeutic salts applied along vital marma channels to release chronic muscular spasms and stiffness.',
    durationMinutes: 60,
    basePrice: 3600,
    rating: 4.97,
    reviewCount: 148,
    highlights: [
      '12 wild-harvested herbs',
      'Customized pressure tailoring',
      'Herbal eucalyptus bath infusion',
    ],
    badgeText: 'High Demand',
  },

  // Consulting & Tech
  {
    id: 'cons-01',
    categoryId: 'consulting',
    name: 'Enterprise Architecture & Cloud Review',
    hindiTitle: 'सिस्टम आर्किटेक्चर एवं क्लाउड ऑडिट',
    tagline: 'Deep audit for scale, fault tolerance & distributed systems',
    description: '1-on-1 private advisory with a veteran Principal Architect. In-depth analysis of your database bottlenecks, Kubernetes clusters, latency profiling, and cost optimization across AWS/GCP.',
    durationMinutes: 90,
    basePrice: 12500,
    rating: 4.99,
    reviewCount: 226,
    highlights: [
      'Written architectural scorecard',
      'Cost reduction blueprint',
      '14-day direct follow-up channel',
    ],
    badgeText: 'Founder Favourite',
  },
  {
    id: 'cons-02',
    categoryId: 'consulting',
    name: 'D2C Growth & Unit Economics Sprint',
    hindiTitle: 'D2C विकास एवं यूनिट इकोनॉमिक्स',
    tagline: 'Retention loops, CAC-to-LTV levers & marketplace strategy',
    description: 'Tailored consulting session for Indian brand founders. Deep dive into Blinkit/Zepto quick-commerce margins, Shopify conversion funnels, and repeat purchase cohorts.',
    durationMinutes: 75,
    basePrice: 9500,
    rating: 4.94,
    reviewCount: 112,
    highlights: [
      'Cohort analytics spreadsheet',
      'Performance marketing rubric',
      'Packaging & shipping cost teardown',
    ],
  },
  {
    id: 'cons-03',
    categoryId: 'consulting',
    name: 'Product Design & UI/UX Teardown',
    hindiTitle: 'प्रोडक्ट डिज़ाइन एवं यूआई/यूएक्स ऑडिट',
    tagline: 'Heuristic evaluation, friction mapping & Figma makeover',
    description: 'Comprehensive design sprint reviewing mobile touch navigation, Indian payment UX conversions, vernacular clarity, and high-converting micro-interactions.',
    durationMinutes: 60,
    basePrice: 8500,
    rating: 4.96,
    reviewCount: 98,
    highlights: [
      'Loom video teardown',
      'Direct Figma component audit',
      'Checkout drop-off remediation',
    ],
  },

  // Royal Grooming
  {
    id: 'groom-01',
    categoryId: 'grooming',
    name: 'The Maharaja Royal Shave & Beard Sculpt',
    hindiTitle: 'महाराजा रॉयल शेव एवं दाढ़ी शिल्प',
    tagline: 'Feather-edge razor contouring, sandalwood steam & tonic',
    description: 'A regal grooming experience featuring Mysore sandalwood pre-shave oil, triple hot eucalyptus towel wraps, hand-stropped Japanese steel razor contouring, and cold rosewater close.',
    durationMinutes: 50,
    basePrice: 1850,
    rating: 4.98,
    reviewCount: 420,
    highlights: [
      'Authentic Mysore sandalwood balm',
      'Triple steam towel ritual',
      'Complimentary cold brew or Kashmiri Kahwa',
    ],
    badgeText: 'Top Rated',
  },
  {
    id: 'groom-02',
    categoryId: 'grooming',
    name: 'Bespoke Scissor Cut & Kesh Rejuvenation',
    hindiTitle: 'केयर हेयरकट एवं भृंगराज स्कैल्प थेरेपी',
    tagline: 'Precision haircut, Bhringraj scalp therapy & hot towel finish',
    description: 'Custom aesthetic styling based on facial proportions, followed by a warm cold-pressed Bhringraj and Amla scalp massage to stimulate hair follicles, finished with organic styling paste.',
    durationMinutes: 55,
    basePrice: 2200,
    rating: 4.96,
    reviewCount: 284,
    highlights: [
      'Warm Bhringraj oil infusion',
      'Neck & shoulder stress release',
      'Zero-paraben styling products',
    ],
  },
  {
    id: 'groom-03',
    categoryId: 'grooming',
    name: 'Kashmiri Saffron Clarifying Facial',
    hindiTitle: 'कश्मीरी केसर एवं मुल्तानी फेशियल',
    tagline: 'Deep detox with pure saffron, turmeric & lymphatic massage',
    description: 'Combat urban pollution with our signature herbal cleanse: Multani mitti clay, organic Kashmiri saffron extract, jade roller lymphatic drainage, and 24K gold foil hydration.',
    durationMinutes: 65,
    basePrice: 3400,
    rating: 4.99,
    reviewCount: 162,
    highlights: [
      'Kashmiri Grade-A saffron',
      'Jade stone contouring',
      'Hydrating cucumber eye compress',
    ],
    badgeText: 'Ultra Luxury',
  },

  // Rentals
  {
    id: 'rent-01',
    categoryId: 'rentals',
    name: 'Dolby Atmos Podcast & Broadcast Suite',
    hindiTitle: 'डॉलबी एटमॉस पॉडकास्ट एवं ब्रॉडकास्ट सुइट',
    tagline: 'Sound-treated private room with 4K multi-cam & Shure mics',
    description: 'Fully isolated broadcast-grade acoustic studio equipped with Shure SM7B microphones, Rodecaster Pro II, Blackmagic 4K studio cameras, and gigabit fiber for live streaming.',
    durationMinutes: 120,
    basePrice: 6500,
    rating: 4.98,
    reviewCount: 184,
    highlights: [
      'Seats 4 comfortably',
      'Instant multitrack SSD export',
      'Dedicated sound engineer assistance',
    ],
    badgeText: 'Pro Ready',
  },
  {
    id: 'rent-02',
    categoryId: 'rentals',
    name: 'Natural Daylight Creative Loft',
    hindiTitle: 'डेलाइट फोटो एवं वीडियो प्रोडक्शन लॉफ्ट',
    tagline: '1,500 sq ft industrial studio with motorized paper rolls & vanity',
    description: 'High-ceiling open daylight loft featuring huge North-facing windows, Aputure continuous lighting rigs, motorized Savage paper backdrops, and private bridal/styling suite.',
    durationMinutes: 180,
    basePrice: 11000,
    rating: 4.95,
    reviewCount: 106,
    highlights: [
      '1,500 sq ft uninterrupted floor',
      'Aputure 600d Pro light kits',
      'Dedicated makeup & green room',
    ],
  },
  {
    id: 'rent-03',
    categoryId: 'rentals',
    name: 'The Sovereign Boardroom & Salon',
    hindiTitle: 'सॉवरेन एग्जीक्यूटिव बोर्डरूम',
    tagline: 'Discreet pitch room with 85-inch 4K screen & barista service',
    description: 'A soundproofed executive sanctuary for investor pitches, confidential board deliberations, and client signings. Furnished with ergonomic Herman Miller seating.',
    durationMinutes: 90,
    basePrice: 5500,
    rating: 4.92,
    reviewCount: 78,
    highlights: [
      'Seats 10 at solid teak table',
      'Ultra-secure private VLAN network',
      'Unlimited Blue Tokai coffee & darjeeling tea',
    ],
  },
];

export const ADD_ONS: AddOn[] = [
  {
    id: 'addon-tea',
    name: 'Nilgiri White Tea & Saffron Elixir Flight',
    description: 'Hand-picked silver needle tea, saffron almond milk & organic dry fruits platter.',
    additionalPrice: 450,
    additionalDurationMinutes: 0,
    popular: true,
    icon: 'Coffee',
  },
  {
    id: 'addon-extended',
    name: 'Extended Session Time (+30 Min)',
    description: 'Add an extra 30 minutes of uninterrupted focused time to your booking.',
    additionalPrice: 1200,
    additionalDurationMinutes: 30,
    popular: true,
    icon: 'Clock',
  },
  {
    id: 'addon-scalp',
    name: 'Saffron & Bhringraj Head Therapy (+15 Min)',
    description: 'Intense marma pressure point head massage with warm Ayurvedic herbal infusions.',
    additionalPrice: 850,
    additionalDurationMinutes: 15,
    icon: 'Sparkles',
  },
  {
    id: 'addon-recording',
    name: 'Master Video/Audio Recording & Archive',
    description: 'Lossless audio and 4K camera capture delivered via secure cloud link within 2 hours.',
    additionalPrice: 1100,
    additionalDurationMinutes: 0,
    icon: 'Video',
  },
  {
    id: 'addon-concierge',
    name: 'Dedicated Private Host & Valet Service',
    description: 'Personal attendant for check-in greeting, reserved parking & express room prep.',
    additionalPrice: 650,
    additionalDurationMinutes: 0,
    icon: 'UserCheck',
  },
];

/**
 * Format Indian Rupee currency (e.g. ₹4,200)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Deterministically generates time slots for a given date in IST
 */
export function generateTimeSlotsForDate(dateStr: string): TimeSlot[] {
  const seed = dateStr.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0);

  const slotTemplates: Array<{
    time: string;
    period: SlotPeriod;
    defaultScarcity: boolean;
    defaultBooked: boolean;
  }> = [
    // Morning (प्रातः)
    { time: '08:30 AM', period: 'morning', defaultScarcity: false, defaultBooked: seed % 7 === 0 },
    { time: '09:45 AM', period: 'morning', defaultScarcity: seed % 3 === 0, defaultBooked: false },
    { time: '11:00 AM', period: 'morning', defaultScarcity: true, defaultBooked: seed % 5 === 0 },
    { time: '11:45 AM', period: 'morning', defaultScarcity: false, defaultBooked: false },

    // Afternoon (मध्याह्न)
    { time: '01:30 PM', period: 'afternoon', defaultScarcity: false, defaultBooked: seed % 4 === 0 },
    { time: '02:45 PM', period: 'afternoon', defaultScarcity: true, defaultBooked: false },
    { time: '04:00 PM', period: 'afternoon', defaultScarcity: false, defaultBooked: seed % 6 === 0 },
    { time: '05:15 PM', period: 'afternoon', defaultScarcity: seed % 2 === 0, defaultBooked: false },

    // Evening (संध्या)
    { time: '06:15 PM', period: 'evening', defaultScarcity: seed % 3 === 1, defaultBooked: false },
    { time: '07:15 PM', period: 'evening', defaultScarcity: true, defaultBooked: false },
    { time: '08:00 PM', period: 'evening', defaultScarcity: false, defaultBooked: seed % 8 === 0 },
    { time: '08:45 PM', period: 'evening', defaultScarcity: false, defaultBooked: false },
  ];

  return slotTemplates.map((template, index) => {
    let status: 'available' | 'scarce' | 'booked' = 'available';
    let availableCount = 3;

    if (template.defaultBooked) {
      status = 'booked';
      availableCount = 0;
    } else if (template.defaultScarcity) {
      status = 'scarce';
      availableCount = 1;
    }

    return {
      id: `slot-${index}-${template.time.replace(/[: ]/g, '')}`,
      time: template.time,
      period: template.period,
      status,
      availableCount,
    };
  });
}

/**
 * Calculates Indian GST financial breakdown:
 * 18% GST = 9% CGST + 9% SGST
 */
export function calculateBreakdown(service: Service | null, selectedAddOnIds: string[]) {
  const serviceBasePrice = service ? service.basePrice : 0;
  let addOnsPrice = 0;
  let additionalMinutes = 0;

  selectedAddOnIds.forEach((id) => {
    const found = ADD_ONS.find((a) => a.id === id);
    if (found) {
      addOnsPrice += found.additionalPrice;
      additionalMinutes += found.additionalDurationMinutes;
    }
  });

  const subtotal = serviceBasePrice + addOnsPrice;
  // 18% GST (CGST 9% + SGST 9%)
  const cgst = Math.round(subtotal * 0.09);
  const sgst = Math.round(subtotal * 0.09);
  const totalGst = cgst + sgst;
  const grandTotal = subtotal + totalGst;
  const totalDurationMinutes = (service ? service.durationMinutes : 0) + additionalMinutes;

  return {
    serviceBasePrice,
    addOnsPrice,
    subtotal,
    cgst,
    sgst,
    totalGst,
    grandTotal,
    totalDurationMinutes,
  };
}
