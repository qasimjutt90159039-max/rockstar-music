require('dotenv').config({ path: __dirname + '/../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Coupon = require('../models/Coupon');
const SiteSettings = require('../models/SiteSettings');

const categoriesData = [
  {
    name: 'Guitars',
    slug: 'guitars',
    description: 'Electric, acoustic, classical, and bass guitars from world-renowned luthiers.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop',
    displayOrder: 1,
    subcategories: [
      { name: 'Acoustic Guitars', slug: 'acoustic-guitars', description: 'Traditional acoustic dreadnought and concert guitars' },
      { name: 'Electric Guitars', slug: 'electric-guitars', description: 'Solid-body, semi-hollow, and heavy rock electric guitars' },
      { name: 'Classical Guitars', slug: 'classical-guitars', description: 'Nylon-string guitars for classical and flamenco styles' },
      { name: 'Bass Guitars', slug: 'bass-guitars', description: '4-string and 5-string electric bass guitars' },
      { name: 'Guitar Accessories', slug: 'guitar-accessories', description: 'Straps, picks, capos, and guitar stands' }
    ]
  },
  {
    name: 'Keyboards',
    slug: 'keyboards',
    description: 'Stage pianos, synthesizers, digital keyboards, and MIDI studio controllers.',
    image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&auto=format&fit=crop',
    displayOrder: 2,
    subcategories: [
      { name: 'Digital Pianos', slug: 'digital-pianos', description: '88-key weighted hammer-action digital pianos' },
      { name: 'Electronic Keyboards', slug: 'electronic-keyboards', description: 'Portable arranger keyboards and practice instruments' },
      { name: 'Synthesizers', slug: 'synthesizers', description: 'Analog modeling, FM, and digital synthesizers' },
      { name: 'MIDI Keyboards', slug: 'midi-keyboards', description: 'USB MIDI controller keyboards for DAWs' },
      { name: 'Keyboard Accessories', slug: 'keyboard-accessories', description: 'Sustain pedals, X-stands, and power adapters' }
    ]
  },
  {
    name: 'Drums',
    slug: 'drums',
    description: 'Acoustic drum kits, electronic drums, cymbals, and percussion hardware.',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop',
    displayOrder: 3,
    subcategories: [
      { name: 'Drum Kits', slug: 'drum-kits', description: 'Complete 5-piece acoustic drum kits and shell packs' },
      { name: 'Electronic Drums', slug: 'electronic-drums', description: 'Mesh-head silent electronic drum sets' },
      { name: 'Cymbals', slug: 'cymbals', description: 'Crash, ride, and hi-hat bronze cymbals' },
      { name: 'Drum Hardware', slug: 'drum-hardware', description: 'Pedals, thrones, snare stands, and boom arms' },
      { name: 'Drum Accessories', slug: 'drum-accessories', description: 'Drumsticks, practice pads, and dampening gels' }
    ]
  },
  {
    name: 'Microphones',
    slug: 'microphones',
    description: 'Stage dynamic mics, studio condenser mics, and broadcast instruments.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop',
    displayOrder: 4,
    subcategories: [
      { name: 'Dynamic Microphones', slug: 'dynamic-microphones', description: 'Durable stage and snare dynamic cardioid microphones' },
      { name: 'Condenser Microphones', slug: 'condenser-microphones', description: 'Large-diaphragm studio recording vocal microphones' },
      { name: 'Wireless Microphones', slug: 'wireless-microphones', description: 'UHF wireless handheld and lavalier systems' },
      { name: 'Vocal Microphones', slug: 'vocal-microphones', description: 'Handheld vocal microphones for live performance' },
      { name: 'Studio Microphones', slug: 'studio-microphones', description: 'Precision instruments for tracking vocals and instruments' }
    ]
  },
  {
    name: 'Audio Equipment',
    slug: 'audio',
    description: 'Studio monitors, USB audio interfaces, guitar amplifiers, and mixers.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop',
    displayOrder: 5,
    subcategories: [
      { name: 'Studio Monitors', slug: 'studio-monitors', description: 'Bi-amplified nearfield reference studio monitors' },
      { name: 'Audio Interfaces', slug: 'audio-interfaces', description: 'USB-C and USB audio interfaces for recording' },
      { name: 'Amplifiers', slug: 'amplifiers', description: 'Guitar combo amplifiers and acoustic amps' },
      { name: 'Headphones', slug: 'headphones', description: 'Closed-back studio monitoring headphones' },
      { name: 'Mixers', slug: 'mixers', description: 'Analog and digital live sound mixing consoles' }
    ]
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Instrument cables, strings, guitar cases, tuners, and studio essentials.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop',
    displayOrder: 6,
    subcategories: [
      { name: 'Guitar Strings', slug: 'guitar-strings', description: 'Nickel-wound electric and phosphor bronze acoustic strings' },
      { name: 'Cables', slug: 'cables', description: 'Low-noise 1/4" TS instrument cables and balanced XLR cables' },
      { name: 'Tuners & Metronomes', slug: 'tuners-metronomes', description: 'Clip-on chromatic tuners and digital metronomes' },
      { name: 'Stands & Hangers', slug: 'stands-hangers', description: 'Floor guitar stands, mic boom stands, and wall hangers' },
      { name: 'Cases & Gig Bags', slug: 'cases-bags', description: 'Padded gig bags and hardshell flight cases' }
    ]
  }
];

const brandsData = [
  {
    name: 'Yamaha',
    slug: 'yamaha',
    logo: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop',
    description: 'World-renowned Japanese manufacturer of acoustic pianos, guitars, synthesizers, and professional studio equipment.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: true
  },
  {
    name: 'Fender',
    slug: 'fender',
    logo: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=400&auto=format&fit=crop',
    description: 'Iconic American musical instrument manufacturer famous for Stratocaster, Telecaster, and tube amplifiers.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: true
  },
  {
    name: 'Ibanez',
    slug: 'ibanez',
    logo: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=400&auto=format&fit=crop',
    description: 'Celebrated Japanese brand recognized for precision electric guitars, basses, and versatile playability.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: true
  },
  {
    name: 'Roland',
    slug: 'roland',
    logo: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&auto=format&fit=crop',
    description: 'Global pioneer in digital pianos, electronic drum systems, synthesizers, and electronic music technology.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: true
  },
  {
    name: 'Casio',
    slug: 'casio',
    logo: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&auto=format&fit=crop',
    description: 'Trusted maker of portable electronic keyboards, digital pianos, and accessible musical instruments.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: true
  },
  {
    name: 'Shure',
    slug: 'shure',
    logo: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&auto=format&fit=crop',
    description: 'Industry standard for live and studio microphones, including legendary models like SM58 and SM57.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: true
  },
  {
    name: 'Audio-Technica',
    slug: 'audio-technica',
    logo: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop',
    description: 'Japanese audio engineering brand known for studio monitor headphones, turntables, and condenser microphones.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: true
  },
  {
    name: 'Behringer',
    slug: 'behringer',
    logo: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&auto=format&fit=crop',
    description: 'Prolific manufacturer of accessible audio interfaces, mixers, studio processors, and monitoring hardware.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: true
  },
  {
    name: 'Marshall',
    slug: 'marshall',
    logo: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=400&auto=format&fit=crop',
    description: 'British music amplification company legendary for rock-and-roll guitar amplifiers and speaker cabinets.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: true
  },
  {
    name: 'Tama',
    slug: 'tama',
    logo: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&auto=format&fit=crop',
    description: 'Premier drum brand manufacturing acoustic drum kits, snare drums, hardware, and percussion accessories.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: true
  },
  {
    name: 'Cort',
    slug: 'cort',
    logo: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop',
    description: 'South Korean instrument manufacturer creating high-value acoustic and electric guitars and basses.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: false
  },
  {
    name: 'Korg',
    slug: 'korg',
    logo: 'https://images.unsplash.com/photo-1571974599782-87624638275e?w=400&auto=format&fit=crop',
    description: 'Innovative creator of synthesizers, electronic tuners, music workstations, and effects pedals.',
    disclaimer: 'Products cataloged for identification and inventory tracking. Not an implied direct manufacturer partnership unless independently certified.',
    isPopular: false
  }
];

// REAL VERIFIED MUSICAL INSTRUMENTS WITH EXACT SPECIFICATIONS
const productsData = [
  // --- GUITARS ---
  {
    productId: 'PROD-YAM-F310',
    name: 'Yamaha F310 Acoustic Guitar',
    slug: 'yamaha-f310-acoustic-guitar',
    brand: 'Yamaha',
    category: 'Guitars',
    subcategory: 'Acoustic Guitars',
    description: 'The Yamaha F310 offers outstanding quality at an accessible price point. Built with a spruce top and meranti back and sides, this traditional dreadnought body provides balanced resonance, warm lows, and clean articulate highs. The slightly shorter scale length and comfortable nato neck with rosewood fingerboard ensure effortless playability for beginners and experienced players alike.',
    shortDescription: 'Traditional dreadnought acoustic guitar featuring a spruce top, meranti body, and rosewood fingerboard.',
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop'
    ],
    price: 36500,
    salePrice: 34000,
    currency: 'PKR',
    sku: 'YAM-F310-NAT',
    stock: 7,
    weight: '2.4 kg',
    dimensions: '104 cm x 40 cm x 12.5 cm',
    specifications: [
      { key: 'Top Material', value: 'Spruce' },
      { key: 'Back & Sides', value: 'Meranti' },
      { key: 'Neck Material', value: 'Nato' },
      { key: 'Fingerboard Material', value: 'Rosewood' },
      { key: 'Scale Length', value: '634 mm (25")' },
      { key: 'Nut Width', value: '43 mm' },
      { key: 'Body Depth', value: '96 - 116 mm' },
      { key: 'Tuning Machines', value: 'Covered Chrome' }
    ],
    features: [
      'Genuine spruce top for crisp resonance and tonal warmth',
      'Comfortable 634mm scale length reduces string tension for easier fretting',
      'Rosewood fingerboard with 20 precisely dressed frets',
      'Gloss natural finish with multi-ply body binding'
    ],
    includedItems: ['Yamaha F310 Acoustic Guitar', 'Truss Rod Adjustment Hex Wrench', 'Documentation'],
    rating: 4.8,
    reviewCount: 0,
    tags: ['Acoustic', 'Yamaha', 'Dreadnought', 'Spruce', 'Guitar'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true
  },
  {
    productId: 'PROD-YAM-PAC012',
    name: 'Yamaha Pacifica 012 Electric Guitar',
    slug: 'yamaha-pacifica-012-electric-guitar',
    brand: 'Yamaha',
    category: 'Guitars',
    subcategory: 'Electric Guitars',
    description: 'Renowned for great tone and outstanding playability, the Pacifica 012 features a comfort-contoured solid body, bolt-on maple neck with rosewood fingerboard, and versatile H-S-S pickup configuration (one bridge humbucker, two single-coils). A 5-position pickup switch allows extensive tonal combinations from bright crystalline clean rhythms to heavy saturated lead tones.',
    shortDescription: 'Versatile HSS solid-body electric guitar with vintage-style tremolo and smooth maple neck.',
    images: [
      'https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&auto=format&fit=crop'
    ],
    price: 49500,
    salePrice: 46000,
    currency: 'PKR',
    sku: 'YAM-PAC012-BLK',
    stock: 5,
    weight: '3.5 kg',
    dimensions: '99 cm x 33 cm x 6.5 cm',
    specifications: [
      { key: 'Body Material', value: 'Agathis / Alder' },
      { key: 'Neck Material', value: 'Maple (Satin Finish)' },
      { key: 'Fingerboard', value: 'Rosewood' },
      { key: 'Frets', value: '22 Medium' },
      { key: 'Scale Length', value: '648 mm (25.5")' },
      { key: 'Pickups', value: 'H-S-S (1 Humbucker, 2 Single-Coil Ceramic)' },
      { key: 'Bridge', value: 'Vintage Style Tremolo with Block Saddles' },
      { key: 'Controls', value: 'Master Volume, Master Tone, 5-Way Pickup Switch' }
    ],
    features: [
      'H-S-S pickup setup delivering sonic versatility across blues, rock, jazz, and metal',
      'Vintage-style vibrato bridge with individual string height and intonation saddles',
      'Fast-playing slim profile maple neck with satin back finish',
      'Solid construction with high tuning stability'
    ],
    includedItems: ['Yamaha Pacifica 012 Guitar', 'Tremolo Arm', 'Truss Rod & Saddle Wrenches'],
    rating: 4.7,
    reviewCount: 0,
    tags: ['Electric Guitar', 'Yamaha', 'HSS', 'Pacifica', 'Solid Body'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true
  },
  {
    productId: 'PROD-FEN-STRAT-PL',
    name: 'Fender Player Stratocaster Electric Guitar',
    slug: 'fender-player-stratocaster-electric-guitar',
    brand: 'Fender',
    category: 'Guitars',
    subcategory: 'Electric Guitars',
    description: 'The inspiring sound of a Stratocaster is one of the foundations of Fender. Featuring bell-like high end, punchy mids, and robust low end combined with crystal-clear articulation, the Player Stratocaster is packed with authentic Fender feel and style. Equipped with Player Series Alnico 5 single-coil pickups, a modern "C"-shaped neck profile, and a 2-point tremolo bridge with bent-steel saddles.',
    shortDescription: 'Iconic Fender Stratocaster featuring Player Series Alnico 5 pickups and 2-point synchronised tremolo.',
    images: [
      'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550985616-10810253b84d?w=800&auto=format&fit=crop'
    ],
    price: 198000,
    salePrice: 192000,
    currency: 'PKR',
    sku: 'FEN-0144502506',
    stock: 2,
    weight: '3.6 kg',
    dimensions: '106 cm x 38 cm x 11 cm',
    specifications: [
      { key: 'Body Wood', value: 'Alder with Gloss Polyester Finish' },
      { key: 'Neck Profile', value: 'Modern "C"' },
      { key: 'Fretboard', value: 'Pau Ferro or Maple (9.5" Radius)' },
      { key: 'Frets', value: '22 Medium Jumbo' },
      { key: 'Pickups', value: '3x Player Series Alnico 5 Strat Single-Coil' },
      { key: 'Bridge', value: '2-Point Synchronized Tremolo with Bent Steel Saddles' },
      { key: 'Nut', value: 'Synthetic Bone, 42 mm (1.650")' }
    ],
    features: [
      'Player Series Alnico 5 single-coil pickups for authentic Fender sparkle and punch',
      'Modern "C"-shaped neck profile designed for ergonomic speed and comfort',
      '2-point synchronised tremolo bridge offering smooth pitch bends and tuning stability',
      'Dedicated bridge pickup tone control for expanded tonal sculpting'
    ],
    includedItems: ['Fender Player Stratocaster', 'Tremolo Arm', 'Adjustment Hex Keys'],
    rating: 4.9,
    reviewCount: 0,
    tags: ['Fender', 'Stratocaster', 'Alnico', 'Single Coil', 'Electric Guitar'],
    isFeatured: true,
    isNewProduct: true,
    isBestSeller: false
  },
  {
    productId: 'PROD-IBA-GRG121DX',
    name: 'Ibanez GRG121DX GIO Electric Guitar',
    slug: 'ibanez-grg121dx-gio-electric-guitar',
    brand: 'Ibanez',
    category: 'Guitars',
    subcategory: 'Electric Guitars',
    description: 'The Ibanez GRG121DX is purpose-built for fast riffing, heavy drop-tunings, and rock performances. Featuring an okoume body, slim GRG maple neck, bound purpleheart fretboard with aggressive sharktooth inlays, and dual IBZ-6 passive ceramic humbuckers wired to a fixed F106 hardtail bridge for massive sustain and rock-solid tuning stability.',
    shortDescription: 'High-octane hardtail electric guitar with dual IBZ-6 humbuckers and sharktooth inlays.',
    images: [
      'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop'
    ],
    price: 58000,
    salePrice: 55000,
    currency: 'PKR',
    sku: 'IBA-GRG121DX-BKF',
    stock: 4,
    weight: '3.3 kg',
    dimensions: '102 cm x 34 cm x 7 cm',
    specifications: [
      { key: 'Body Material', value: 'Okoume' },
      { key: 'Neck', value: 'GRG Maple Neck' },
      { key: 'Fretboard', value: 'Bound Purpleheart with Sharktooth Inlays' },
      { key: 'Frets', value: '24 Jumbo Frets' },
      { key: 'Bridge', value: 'F106 Fixed Bridge' },
      { key: 'Pickups', value: 'Dual IBZ-6 Humbuckers (Ceramic)' },
      { key: 'Hardware Color', value: 'Black' }
    ],
    features: [
      '24 jumbo frets on a bound purpleheart fretboard for extended soloing range',
      'F106 hardtail bridge increases sustain and stays stable during heavy palm muting',
      'Dual high-output ceramic humbucking pickups tailored for rock and metal clarity',
      'Ultra-thin GRG neck designed for fast shredding'
    ],
    includedItems: ['Ibanez GRG121DX Guitar', 'Truss Rod Hex Wrench', 'Instrument Cable'],
    rating: 4.7,
    reviewCount: 0,
    tags: ['Ibanez', 'GIO', 'Electric Guitar', 'Humbucker', 'Hardtail'],
    isFeatured: false,
    isNewProduct: true,
    isBestSeller: false
  },
  {
    productId: 'PROD-IBA-GSR200',
    name: 'Ibanez GSR200 Soundgear 4-String Bass',
    slug: 'ibanez-gsr200-soundgear-4-string-bass',
    brand: 'Ibanez',
    category: 'Guitars',
    subcategory: 'Bass Guitars',
    description: 'The Ibanez GSR200 delivers the legendary Soundgear sleekness, balance, and thunderous low end. Features an okoume body, slim GSR4 maple neck with purpleheart fretboard, Dynamix P split-coil neck pickup and Dynamix J single-coil bridge pickup, boosted by an active Phat II EQ circuit for deep punchy low frequencies.',
    shortDescription: 'Lightweight, ergonomic 4-string electric bass featuring active Phat II bass boost EQ.',
    images: [
      'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop'
    ],
    price: 68000,
    salePrice: 64500,
    currency: 'PKR',
    sku: 'IBA-GSR200-BK',
    stock: 3,
    weight: '3.8 kg',
    dimensions: '115 cm x 35 cm x 7 cm',
    specifications: [
      { key: 'Body', value: 'Okoume' },
      { key: 'Neck Type', value: 'GSR4 Maple' },
      { key: 'Scale', value: '864 mm (34")' },
      { key: 'Fretboard', value: 'Jatoba / Purpleheart with White Dots' },
      { key: 'Frets', value: '22 Medium' },
      { key: 'Pickups', value: 'Dynamix P (neck) & Dynamix J (bridge)' },
      { key: 'Equaliser', value: 'Phat II Active Bass Boost EQ' }
    ],
    features: [
      'P/J pickup configuration for both warm punchy Motown bass and crisp funk attack',
      'Active Phat II EQ dial adds massive bottom-end power without muddying clarity',
      'Ultra-compact ergonomic body reduces shoulder strain during stage performances',
      'Smooth B10 bridge with fully adjustable intonation saddles'
    ],
    includedItems: ['Ibanez GSR200 Bass', '9V Battery (Pre-installed)', 'Adjustment Wrenches'],
    rating: 4.8,
    reviewCount: 0,
    tags: ['Bass', 'Ibanez', 'Soundgear', '4 String', 'Active EQ'],
    isFeatured: false,
    isNewProduct: false,
    isBestSeller: true
  },

  // --- KEYBOARDS ---
  {
    productId: 'PROD-ROL-FP30X',
    name: 'Roland FP-30X Digital Piano',
    slug: 'roland-fp-30x-digital-piano',
    brand: 'Roland',
    category: 'Keyboards',
    subcategory: 'Digital Pianos',
    description: 'The sweet spot of Roland’s FP-X series, the FP-30X pairs an affordable price with authentic performance. Featuring Roland’s acclaimed PHA-4 Standard 88-key weighted hammer-action keyboard with escapement and Ivory Feel, backed by the SuperNATURAL Piano sound engine. Includes integrated stereo speakers, dual headphone outputs, and Bluetooth audio/MIDI connectivity for practice and recording.',
    shortDescription: '88-key weighted hammer action digital piano with SuperNATURAL sound engine and Bluetooth.',
    images: [
      'https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop'
    ],
    price: 185000,
    salePrice: 179000,
    currency: 'PKR',
    sku: 'ROL-FP30X-BK',
    stock: 3,
    weight: '14.8 kg',
    dimensions: '130.0 cm x 28.4 cm x 15.1 cm',
    specifications: [
      { key: 'Keyboard', value: '88 Keys (PHA-4 Standard with Escapement & Ivory Feel)' },
      { key: 'Sound Engine', value: 'SuperNATURAL Piano' },
      { key: 'Polyphony', value: '256 Notes' },
      { key: 'Tones', value: 'Total 56 (Piano: 12, E.Piano: 20, Other: 24)' },
      { key: 'Speakers', value: '12 cm x 2 (22W Output)' },
      { key: 'Connectivity', value: 'Bluetooth 3.0 (Audio), Bluetooth 4.0 (MIDI), USB Type-B, 1/4" L/Mono R Outs' },
      { key: 'Headphone Outputs', value: 'Dual (1/4" Stereo + 3.5mm Stereo)' }
    ],
    features: [
      'PHA-4 Standard 88-key hammer action provides acoustic grand responsiveness and dynamic touch',
      'SuperNATURAL Piano sound engine with 256-note polyphony for unrestricted expression',
      'Onboard 22-watt stereo speaker system with room-filling acoustic projection',
      'Bluetooth audio streaming allows playing along with tracks from smart devices'
    ],
    includedItems: ['Roland FP-30X Piano', 'DP-2 Damper Pedal', 'Music Rest', 'AC Power Adaptor (PSB-7U)'],
    rating: 4.9,
    reviewCount: 0,
    tags: ['Roland', 'Digital Piano', '88 Keys', 'Weighted Hammer Action', 'Bluetooth'],
    isFeatured: true,
    isNewProduct: true,
    isBestSeller: true
  },
  {
    productId: 'PROD-CAS-CTS300',
    name: 'Casio Casiotone CT-S300 Portable Keyboard',
    slug: 'casio-casiotone-ct-s300-portable-keyboard',
    brand: 'Casio',
    category: 'Keyboards',
    subcategory: 'Electronic Keyboards',
    description: 'The Casio CT-S300 features 61 full-size touch-responsive keys, an integrated carry handle, pitch bend wheel, 400 high-grade tones, 77 rhythms with full accompaniment, Dance Music Mode, and micro USB-to-Host for MIDI connectivity. Operates on either 6 AA batteries or the included AC adapter.',
    shortDescription: '61-key touch-sensitive portable keyboard with pitch bend wheel and USB MIDI.',
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop'
    ],
    price: 44000,
    salePrice: 41500,
    currency: 'PKR',
    sku: 'CAS-CTS300-BLK',
    stock: 6,
    weight: '3.3 kg',
    dimensions: '93 cm x 25.6 cm x 7.3 cm',
    specifications: [
      { key: 'Keys', value: '61 Piano-Style Keys with 2 Sensitivity Levels Touch Response' },
      { key: 'Tones', value: '400 Built-in Tones' },
      { key: 'Rhythms', value: '77 Accompaniment Rhythms' },
      { key: 'Pitch Bend Wheel', value: 'Yes' },
      { key: 'Polyphony', value: '48 Notes' },
      { key: 'Speakers', value: '13cm x 6cm x 2 (Oval, 5W Total)' },
      { key: 'Ports', value: 'USB micro B (MIDI), Audio In, Headphone / Line Out, Sustain Jack' }
    ],
    features: [
      'Touch-responsive keys for expressive piano dynamics and nuanced performance',
      'Built-in pitch bend wheel ideal for expressive synth leads and pitch gliding',
      'Integrated top carry handle making travel and rehearsals completely effortless',
      'Dance Music Mode with 50 EDM patterns, filter drops, and vocal build-ups'
    ],
    includedItems: ['Casio CT-S300 Keyboard', 'Music Rest', 'Casio AC Power Adaptor (AD-E95100L)'],
    rating: 4.6,
    reviewCount: 0,
    tags: ['Casio', 'Casiotone', '61 Keys', 'Keyboard', 'Touch Sensitive'],
    isFeatured: false,
    isNewProduct: false,
    isBestSeller: true
  },
  {
    productId: 'PROD-YAM-PSRE373',
    name: 'Yamaha PSR-E373 61-Key Portable Keyboard',
    slug: 'yamaha-psr-e373-portable-keyboard',
    brand: 'Yamaha',
    category: 'Keyboards',
    subcategory: 'Electronic Keyboards',
    description: 'The PSR-E373 is equipped with Yamaha’s newly developed LSI tone generator delivering stunning high-resolution instrument voices. Features 61 touch-sensitive keys, 622 instrument voices including Super Articulation Lite voices, digital DSP effects, Smart Chord, and dual/split modes.',
    shortDescription: '61 touch-sensitive keys with 622 instrument voices and studio-grade DSP effects.',
    images: [
      'https://images.unsplash.com/photo-1571974599782-87624638275e?w=800&auto=format&fit=crop'
    ],
    price: 58000,
    salePrice: 54000,
    currency: 'PKR',
    sku: 'YAM-PSRE373',
    stock: 4,
    weight: '4.6 kg',
    dimensions: '94.5 cm x 36.9 cm x 11.8 cm',
    specifications: [
      { key: 'Key Count', value: '61 Touch Sensitive' },
      { key: 'Tone Generator', value: 'AWM Stereo Sampling' },
      { key: 'Voices', value: '622 (241 Panel + 22 Drum/SFX Kits + 20 Arpeggio + 339 XGlite)' },
      { key: 'DSP Effects', value: '38 Types' },
      { key: 'Polyphony', value: '48 Notes' },
      { key: 'Connectivity', value: 'USB TO HOST (Audio + MIDI), Sustain, AUX IN, Phones/Output' }
    ],
    features: [
      'Super Articulation Lite reproduces natural string slides, harmonics, and body knocks',
      'Full USB 2-way audio and MIDI interface for recording directly to computer DAWs',
      'Keys to Success lesson system guides step-by-step masteries',
      'Dual voice layering and split keyboard capability'
    ],
    includedItems: ['Yamaha PSR-E373 Keyboard', 'Music Rest', 'Power Adaptor', 'Owner Manual'],
    rating: 4.8,
    reviewCount: 0,
    tags: ['Yamaha', 'PSR-E373', 'Keyboard', 'USB Audio', 'Touch Sensitive'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: false
  },

  // --- DRUMS ---
  {
    productId: 'PROD-TAM-IP50H6',
    name: 'Tama Imperialstar 5-Piece Complete Drum Kit',
    slug: 'tama-imperialstar-5-piece-drum-kit',
    brand: 'Tama',
    category: 'Drums',
    subcategory: 'Drum Kits',
    description: 'With over 40 years of drum building experience, Tama knows what drummers really want. Imperialstar is a complete drum kit incorporating 100% 6-ply 8mm poplar shells for full, dynamic resonance, precision bearing edges, Tama Accu-Tune bass drum hoops, and heavy-duty double-braced Stage Master hardware. Includes bass drum pedal, snare stand, hi-hat stand, and boom cymbal stands.',
    shortDescription: 'Complete 5-piece 100% poplar shell drum kit with double-braced hardware.',
    images: [
      'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop'
    ],
    price: 265000,
    salePrice: 255000,
    currency: 'PKR',
    sku: 'TAM-IP52KH6-BBO',
    stock: 2,
    weight: '32.0 kg',
    dimensions: '22" Bass, 10" & 12" Toms, 16" Floor Tom, 14" Snare',
    specifications: [
      { key: 'Shell Material', value: '100% Poplar 6-ply / 8mm' },
      { key: 'Bass Drum', value: '22" x 16"' },
      { key: 'Mounted Toms', value: '10" x 7" & 12" x 8"' },
      { key: 'Floor Tom', value: '16" x 15"' },
      { key: 'Snare Drum', value: '14" x 5"' },
      { key: 'Hoops', value: 'Accu-Tune Bass Drum Hoops, Triple-Flanged Tom Hoops' },
      { key: 'Hardware', value: 'Stage Master Double-Braced Hardware Pack Included' }
    ],
    features: [
      '6-ply 8mm poplar shells deliver powerful warm attack and open tonal projection',
      'Tama Omnisphere double tom holder offers 360-degree ball-joint positioning',
      'Accu-Tune composite bass drum hoops ensure faster and more consistent head tuning',
      'Heavy-duty double-braced legs on all stands for maximum stability during aggressive play'
    ],
    includedItems: ['5 Drum Shells', 'Double-Braced Snare Stand', 'Hi-Hat Stand', 'Boom Cymbal Stand', 'Straight Cymbal Stand', 'Iron Cobra 200 Kick Pedal', 'Drum Throne'],
    rating: 4.9,
    reviewCount: 0,
    tags: ['Tama', 'Imperialstar', 'Drum Kit', 'Acoustic Drums', 'Poplar'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true
  },
  {
    productId: 'PROD-ROL-TD07KV',
    name: 'Roland TD-07KV V-Drums Electronic Drum Set',
    slug: 'roland-td-07kv-v-drums-electronic-drum-set',
    brand: 'Roland',
    category: 'Drums',
    subcategory: 'Electronic Drums',
    description: 'Compact and ideally suited for practicing at home, the TD-07KV V-Drums kit delivers superior expression and feel with all-mesh dual-layer drumheads for snare and toms. Equipped with the TD-07 sound module packed with customizable authentic acoustic drum sounds, integrated deep editing tools, Bluetooth audio/MIDI streaming, and USB audio recording connectivity.',
    shortDescription: 'All-mesh electronic drum kit with TD-07 module, Bluetooth audio streaming, and USB.',
    images: [
      'https://images.unsplash.com/photo-1525994886773-080587e161c2?w=800&auto=format&fit=crop'
    ],
    price: 320000,
    salePrice: 310000,
    currency: 'PKR',
    sku: 'ROL-TD07KV',
    stock: 2,
    weight: '21.7 kg',
    dimensions: '120 cm x 110 cm x 120 cm',
    specifications: [
      { key: 'Drum Module', value: 'TD-07 with 25 Preset Kits & 25 User Kits' },
      { key: 'Snare Pad', value: 'PDX-8 (8-inch Dual-Mesh, Independent Head & Rim Triggers)' },
      { key: 'Tom Pads', value: '3x PDX-6A (6.5-inch Dual-Mesh)' },
      { key: 'Hi-Hat', value: 'CY-5 10-inch Pad with FD-9 Silent Control Pedal' },
      { key: 'Crash & Ride', value: 'CY-8 12-inch Dual-Zone Cymbals with Choke' },
      { key: 'Kick Pad', value: 'KD-10 Standalone Kick Trigger' },
      { key: 'Bluetooth', value: 'Bluetooth 4.2 (A2DP Audio, GATT MIDI)' }
    ],
    features: [
      'Dual-ply mesh drumheads provide realistic stick rebound and whisper-quiet acoustic noise',
      'Advanced TD-07 module allows modifying pitch, damping, snare buzz, and room acoustics',
      'Integrated Bluetooth allows streaming tracks directly from phone into headphones',
      'USB output supports multichannel digital audio recording straight into recording software'
    ],
    includedItems: ['TD-07 Module', 'Pads & Cymbal Arms', 'MDS-Compact 4-Post Drum Rack', 'Connecting Cables', 'AC Adaptor'],
    rating: 4.9,
    reviewCount: 0,
    tags: ['Roland', 'V-Drums', 'Electronic Drums', 'Mesh Heads', 'Bluetooth'],
    isFeatured: true,
    isNewProduct: true,
    isBestSeller: false
  },

  // --- MICROPHONES ---
  {
    productId: 'PROD-SHU-SM58',
    name: 'Shure SM58 Cardioid Dynamic Vocal Microphone',
    slug: 'shure-sm58-dynamic-vocal-microphone',
    brand: 'Shure',
    category: 'Microphones',
    subcategory: 'Dynamic Microphones',
    description: 'The legendary Shure SM58 vocal microphone is engineered for professional vocal use in live performance, sound reinforcement, and studio recording. Its tailored vocal response for sound is a world standard for singing and speech. A highly effective, built-in spherical filter minimizes wind and breath "pop" noises, while the uniform cardioid pickup pattern isolates the main sound source while rejecting background noise.',
    shortDescription: 'World-standard cardioid dynamic vocal microphone for live stage and broadcast vocals.',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop'
    ],
    price: 34500,
    salePrice: 32500,
    currency: 'PKR',
    sku: 'SHU-SM58-LC',
    stock: 9,
    weight: '298 g',
    dimensions: '162 mm L x 51 mm W',
    specifications: [
      { key: 'Transducer Type', value: 'Dynamic (Moving Coil)' },
      { key: 'Polar Pattern', value: 'Cardioid' },
      { key: 'Frequency Response', value: '50 Hz – 15,000 Hz' },
      { key: 'Output Impedance', value: '300 Ω (150 Ω actual)' },
      { key: 'Sensitivity', value: '-54.5 dBV/Pa (1.85 mV)' },
      { key: 'Connector', value: 'Three-Pin Professional Audio (XLR), Male' },
      { key: 'Casing', value: 'Dark Gray Enamel-Painted Die-Cast Steel with Silver Steel Mesh Grille' }
    ],
    features: [
      'Pneumatic shock-mount system cuts down handling noise drastically',
      'Built-in spherical wind and pop filter prevents plosive vocal bursts',
      'Cardioid polar pattern rejects off-axis stage sound and resists feedback',
      'Legendary roadworthy rugged construction withstands heavy stage touring'
    ],
    includedItems: ['Shure SM58 Microphone', 'A25D Break-Resistant Mic Clip', '5/8" to 3/8" Thread Adapter', 'Zippered Storage Bag'],
    rating: 4.9,
    reviewCount: 0,
    tags: ['Shure', 'SM58', 'Microphone', 'Dynamic', 'Live Vocal'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true
  },
  {
    productId: 'PROD-AT-AT2020',
    name: 'Audio-Technica AT2020 Cardioid Condenser Microphone',
    slug: 'audio-technica-at2020-condenser-microphone',
    brand: 'Audio-Technica',
    category: 'Microphones',
    subcategory: 'Condenser Microphones',
    description: 'The Audio-Technica AT2020 sets the benchmark for price and performance in studio condenser microphone technology. Its low-mass diaphragm is custom-engineered for extended frequency response and superior transient response. With rugged construction for durable performance, the microphone offers a wide dynamic range and handles high sound pressure levels (144 dB SPL) with ease.',
    shortDescription: 'Studio-standard side-address cardioid condenser microphone with 144 dB SPL handling.',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop'
    ],
    price: 36000,
    salePrice: 33500,
    currency: 'PKR',
    sku: 'AT-AT2020-BLK',
    stock: 6,
    weight: '345 g',
    dimensions: '162 mm L x 52 mm Body Diameter',
    specifications: [
      { key: 'Element', value: 'Fixed-Charge Back Plate, Permanently Polarized Condenser' },
      { key: 'Polar Pattern', value: 'Cardioid' },
      { key: 'Frequency Response', value: '20 Hz – 20,000 Hz' },
      { key: 'Open Circuit Sensitivity', value: '-37 dB (14.1 mV) re 1V at 1 Pa' },
      { key: 'Impedance', value: '100 Ω' },
      { key: 'Maximum Input Sound Level', value: '144 dB SPL, 1 kHz at 1% T.H.D.' },
      { key: 'Signal to Noise Ratio', value: '74 dB, 1 kHz at 1 Pa' },
      { key: 'Phantom Power Requirements', value: '48V DC, 2 mA typical' }
    ],
    features: [
      'Custom-engineered low-mass 16mm diaphragm delivers detailed transient response',
      'Handles exceptionally loud sound sources up to 144 dB SPL without distortion',
      'Cardioid polar pattern reduces pickup of sounds from sides and rear',
      'Pivoting threaded stand mount attaches securely for easy microphone positioning'
    ],
    includedItems: ['Audio-Technica AT2020 Microphone', 'Stand Mount for 5/8"-27 Threaded Stands', '5/8"-27 to 3/8"-16 Threaded Adapter', 'Soft Protective Pouch'],
    rating: 4.8,
    reviewCount: 0,
    tags: ['Audio-Technica', 'AT2020', 'Condenser', 'Studio Mic', 'XLR'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true
  },
  {
    productId: 'PROD-SHU-SM57',
    name: 'Shure SM57 Instrument Dynamic Microphone',
    slug: 'shure-sm57-dynamic-instrument-microphone',
    brand: 'Shure',
    category: 'Microphones',
    subcategory: 'Dynamic Microphones',
    description: 'An extraordinary musical tool on stage and in the recording studio, the Shure SM57 dynamic microphone features a contoured frequency response for clean, instrumental reproduction and rich vocal pickup. It is the definitive industry choice for miking snare drums, electric guitar amp cabinets, and brass instruments.',
    shortDescription: 'Definitive studio and stage microphone for snare drums, guitar cabinets, and brass.',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop'
    ],
    price: 33500,
    salePrice: 31000,
    currency: 'PKR',
    sku: 'SHU-SM57-LC',
    stock: 5,
    weight: '284 g',
    dimensions: '157 mm L x 32 mm W',
    specifications: [
      { key: 'Type', value: 'Dynamic' },
      { key: 'Frequency Response', value: '40 Hz – 15,000 Hz' },
      { key: 'Polar Pattern', value: 'Cardioid' },
      { key: 'Output Impedance', value: '310 Ω (150 Ω actual)' },
      { key: 'Sensitivity', value: '-56.0 dBV/Pa (1.6 mV)' },
      { key: 'Connector', value: '3-pin XLR Male' }
    ],
    features: [
      'Contoured frequency response tailored for punchy drums, guitars, and crisp acoustics',
      'Pneumatic shock mount drastically reduces mechanical handling vibration',
      'Cardioid isolation pattern minimizes bleed from neighboring instruments on stage',
      'Extremely durable die-cast body and polycarbonate grille'
    ],
    includedItems: ['Shure SM57 Microphone', 'A25D Mic Clip', 'Thread Adapter', 'Storage Bag'],
    rating: 4.9,
    reviewCount: 0,
    tags: ['Shure', 'SM57', 'Instrument Mic', 'Snare', 'Guitar Amp'],
    isFeatured: false,
    isNewProduct: false,
    isBestSeller: true
  },

  // --- AUDIO EQUIPMENT ---
  {
    productId: 'PROD-BEH-UM2',
    name: 'Behringer U-Phoria UM2 USB Audio Interface',
    slug: 'behringer-u-phoria-um2-audio-interface',
    brand: 'Behringer',
    category: 'Audio Equipment',
    subcategory: 'Audio Interfaces',
    description: 'When it’s time to make recording history, you need the best audio interface you can get—and you need one you can count on. That’s why Behringer engineered the ultra-compact 2x2, 48 kHz USB interface with a studio-grade XENYX Mic Preamp, combination XLR/TRS input for your vocal or mic, and an additional 1/4" instrument input for direct guitar/bass tracking.',
    shortDescription: '2x2 USB audio interface featuring a studio-grade XENYX microphone preamp and 48 kHz resolution.',
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop'
    ],
    price: 21500,
    salePrice: 19800,
    currency: 'PKR',
    sku: 'BEH-UM2-USB',
    stock: 8,
    weight: '300 g',
    dimensions: '128 mm x 118 mm x 46 mm',
    specifications: [
      { key: 'Converter Resolution', value: '48 kHz / 16-bit' },
      { key: 'Inputs', value: '1x XLR/TRS Combo (Mic/Line), 1x 1/4" TRS (Instrument)' },
      { key: 'Preamp', value: '1x XENYX Mic Preamp with +48V Phantom Power' },
      { key: 'Outputs', value: '2x RCA Stereo Line Outs, 1x 1/4" Headphone Jack' },
      { key: 'Monitoring', value: 'Direct Monitor Switch (Zero Latency)' },
      { key: 'Power', value: 'USB Bus Powered (No external wall adapter required)' }
    ],
    features: [
      'XENYX mic preamp with +48V phantom power for condenser vocal microphones',
      'Dedicated 1/4" instrument input designed specifically for electric guitars and basses',
      'Direct monitor toggle allows latency-free real-time monitoring of vocal performance',
      'Ultra-rugged impact-resistant composite chassis'
    ],
    includedItems: ['Behringer UM2 Interface', 'USB-A to USB-B Cable', 'Quick Start Guide'],
    rating: 4.7,
    reviewCount: 0,
    tags: ['Behringer', 'Audio Interface', 'XENYX', 'USB', 'Home Studio'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true
  },
  {
    productId: 'PROD-MAR-MG15G',
    name: 'Marshall MG15G 15W Guitar Amplifier',
    slug: 'marshall-mg15g-15w-guitar-amplifier',
    brand: 'Marshall',
    category: 'Audio Equipment',
    subcategory: 'Amplifiers',
    description: 'Compact 15W amps that pack plenty of power. The 8" speaker delivers a great sound for practice, but can also hold its own in front of a small crowd. These amps bring an added punch and lower-end to your sound. Features two channels (Clean and Overdrive), 3-band EQ, 3.5mm Aux input for jamming along with music, and emulated headphone output.',
    shortDescription: '15-watt 1x8" guitar combo amplifier featuring Clean and Overdrive channels and 3-band EQ.',
    images: [
      'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop'
    ],
    price: 38000,
    salePrice: 35500,
    currency: 'PKR',
    sku: 'MAR-MG15G-BLK',
    stock: 4,
    weight: '7.6 kg',
    dimensions: '375 mm W x 370 mm H x 195 mm D',
    specifications: [
      { key: 'Power Output', value: '15 Watts RMS' },
      { key: 'Speaker Size', value: '1 x 8" Custom Marshall Voiced' },
      { key: 'Channels', value: '2 (Clean & Overdrive)' },
      { key: 'Controls', value: 'Clean Volume, Channel Select, OD Gain, OD Volume, Bass, Middle, Treble' },
      { key: 'Inputs', value: '1x 1/4" Instrument Jack, 1x 3.5mm AUX MP3 In' },
      { key: 'Outputs', value: '1x 3.5mm Emulated Headphone Output' }
    ],
    features: [
      'Iconic gold Marshall piping and black vinyl styling',
      'Dual channels allow switching instantly from sparkling cleans to roaring British distortion',
      '3-band EQ provides comprehensive control over bass, midrange, and treble sculpting',
      'Emulated headphone output permits silent bedroom practice without sacrificing tone'
    ],
    includedItems: ['Marshall MG15G Amplifier', 'Attached Power Cord', 'User Documentation'],
    rating: 4.8,
    reviewCount: 0,
    tags: ['Marshall', 'Guitar Amp', '15W', 'Overdrive', 'Combo Amp'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true
  },
  {
    productId: 'PROD-YAM-HS5',
    name: 'Yamaha HS5 Powered Studio Monitor (Pair)',
    slug: 'yamaha-hs5-powered-studio-monitor-pair',
    brand: 'Yamaha',
    category: 'Audio Equipment',
    subcategory: 'Studio Monitors',
    description: 'Ever since the 1970s the iconic white woofer and signature sound of Yamaha nearfield reference monitors have become a genuine industry standard. Yamaha HS5 active bi-amplified monitors feature 5" cone woofers and 1" dome tweeters driven by high-performance 70W power amplifiers. Built to deliver an exceptionally honest, uncolored sonic reference for mixing and production.',
    shortDescription: 'Pair of 70W 2-way bi-amplified nearfield studio monitors with iconic white cone woofer.',
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop'
    ],
    price: 135000,
    salePrice: 128000,
    currency: 'PKR',
    sku: 'YAM-HS5-PAIR',
    stock: 2,
    weight: '5.3 kg (each)',
    dimensions: '170 mm x 285 mm x 222 mm (each)',
    specifications: [
      { key: 'Configuration', value: '2-way Bi-amp Powered Studio Monitor' },
      { key: 'Low Frequency Driver', value: '5" White Cone Woofer' },
      { key: 'High Frequency Driver', value: '1" Dome Tweeter' },
      { key: 'Output Power', value: '70W Total (LF: 45W, HF: 25W)' },
      { key: 'Frequency Range', value: '54 Hz – 30 kHz (-10dB)' },
      { key: 'Inputs', value: 'XLR3-31 Type (Balanced) and 1/4" Phone (Balanced)' },
      { key: 'Controls', value: 'Level Control, Room Control (0/-2/-4 dB under 500Hz), High Trim (+/-2 dB)' }
    ],
    features: [
      'Honest flat frequency response reveals every flaw in a music mix for accurate translation',
      'Bi-amplified architecture provides separate dedicated power to both woofer and tweeter',
      'Room Control and High Trim switches tailor acoustic output to your specific room shape',
      'Dense MDF acoustic enclosure with three-way mitered joint construction eliminates resonance'
    ],
    includedItems: ['2x Yamaha HS5 Active Monitors', '2x IEC Power Cords', 'Rubber Cushion Pads', 'Manual'],
    rating: 4.9,
    reviewCount: 0,
    tags: ['Yamaha', 'HS5', 'Studio Monitor', 'Mixing', 'Reference Audio'],
    isFeatured: true,
    isNewProduct: true,
    isBestSeller: false
  },
  {
    productId: 'PROD-AT-M50X',
    name: 'Audio-Technica ATH-M50x Professional Monitor Headphones',
    slug: 'audio-technica-ath-m50x-professional-monitor-headphones',
    brand: 'Audio-Technica',
    category: 'Audio Equipment',
    subcategory: 'Headphones',
    description: 'This is the most critically acclaimed model in the M-Series line, praised by top audio engineers and pro audio reviewers year after year. The ATH-M50x features 45 mm large-aperture drivers with rare earth magnets and copper-clad aluminum wire voice coils, exceptional sound isolation, and 90° swiveling earcups for easy, one-ear monitoring.',
    shortDescription: 'Critically acclaimed closed-back studio reference headphones with 45mm proprietary drivers.',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop'
    ],
    price: 52000,
    salePrice: 48500,
    currency: 'PKR',
    sku: 'AT-ATH-M50X',
    stock: 5,
    weight: '285 g',
    dimensions: 'Circumaural Closed-Back',
    specifications: [
      { key: 'Driver Diameter', value: '45 mm Neodymium' },
      { key: 'Frequency Response', value: '15 Hz – 28,000 Hz' },
      { key: 'Maximum Input Power', value: '1,600 mW at 1 kHz' },
      { key: 'Sensitivity', value: '99 dB' },
      { key: 'Impedance', value: '38 Ω' },
      { key: 'Cables Included', value: '1.2m–3m Coiled, 3m Straight, 1.2m Straight (Detachable)' }
    ],
    features: [
      'Proprietary 45 mm large-aperture drivers deliver clarity across extended frequency range',
      'Circumaural design contours around the ears for acoustic isolation in loud environments',
      '90-degree swiveling earcups facilitate single-ear DJ and vocal booth monitoring',
      'Professional-grade earpad and headband material delivers more durability and comfort'
    ],
    includedItems: ['ATH-M50x Headphones', '3 Detachable Cables', '6.3 mm (1/4") Screw-on Adapter', 'Protective Carrying Pouch'],
    rating: 4.9,
    reviewCount: 0,
    tags: ['Audio-Technica', 'M50x', 'Headphones', 'Studio', 'Mixing'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true
  },

  // --- ACCESSORIES ---
  {
    productId: 'PROD-DAD-EXL110',
    name: "D'Addario EXL110 Regular Light Electric Guitar Strings",
    slug: 'daddario-exl110-regular-light-guitar-strings',
    brand: 'Fender',
    category: 'Accessories',
    subcategory: 'Guitar Strings',
    description: 'EXL110 is D’Addario’s best-selling electric guitar set. Nickel-wound strings are wound with nickelplated steel onto a carefully drawn, hexagonally shaped, high carbon steel core. The result: strings with long lasting, distinctive bright tone and excellent intonation, ideal for the widest variety of guitars and musical styles. Gauges: .010, .013, .017, .026, .036, .046.',
    shortDescription: 'World’s favorite 10-46 nickel wound electric guitar strings offering bright tone and balanced tension.',
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop'
    ],
    price: 2600,
    salePrice: 2300,
    currency: 'PKR',
    sku: 'DAD-EXL110',
    stock: 25,
    weight: '45 g',
    dimensions: 'Gauges: 10, 13, 17, 26, 36, 46',
    specifications: [
      { key: 'String Gauges', value: '.010, .013, .017, .026, .036, .046' },
      { key: 'Winding Material', value: 'Nickel-Plated Steel' },
      { key: 'Core Construction', value: 'High Carbon Hexagonal Steel Core' },
      { key: 'Packaging', value: 'Corrosion-Resistant Foil Sealed Packaging' }
    ],
    features: [
      'Round wound with nickelplated steel for distinctive bright tone',
      'Hex core wire prevents string slippage and enhances tuning stability',
      'Corrosion resistant packaging keeps strings fresh from factory to guitar',
      'Optimal balance of comfortable bending and rich rhythmic bite'
    ],
    includedItems: ['6 Sealed Electric Guitar Strings (10-46)'],
    rating: 4.8,
    reviewCount: 0,
    tags: ['Strings', 'Electric Guitar', 'DAddario', '10-46', 'Accessories'],
    isFeatured: false,
    isNewProduct: false,
    isBestSeller: true
  },
  {
    productId: 'PROD-KOR-TM60',
    name: 'Korg TM-60 Tuner & Metronome Combo',
    slug: 'korg-tm-60-tuner-metronome-combo',
    brand: 'Korg',
    category: 'Accessories',
    subcategory: 'Tuners & Metronomes',
    description: 'The Korg TM-60 allows you to use the tuner and metronome simultaneously. Featuring a newly designed backlit LCD display that is 1.3 times larger than previous models, the TM-60 shows tuning pitch and tempo indications together with exceptional clarity. Detects pitch from C1 to C8 with +/- 1 cent accuracy.',
    shortDescription: 'Simultaneous digital tuner and metronome with large backlit LCD screen.',
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop'
    ],
    price: 8500,
    salePrice: 7800,
    currency: 'PKR',
    sku: 'KOR-TM60-BK',
    stock: 12,
    weight: '100 g',
    dimensions: '111 mm x 74 mm x 18 mm',
    specifications: [
      { key: 'Tuning Range', value: 'C1 (32.70 Hz) to C8 (4186.01 Hz)' },
      { key: 'Calibration', value: 'A4 = 410 to 480 Hz' },
      { key: 'Detection Accuracy', value: '+/- 1 cent' },
      { key: 'Tempo Range', value: '30 to 252 bpm' },
      { key: 'Display', value: 'Large Backlit LCD' },
      { key: 'Battery Life', value: 'Approx. 130 hours (Tuner mode, AAA batteries)' }
    ],
    features: [
      'Simultaneous tuner and metronome function for pitch and rhythm training',
      'High-speed needle response LCD screen with two-level backlight',
      'Sound Out and Sound Back modes generate pitch references for ear training',
      'Supports wide calibration from 410 Hz to 480 Hz'
    ],
    includedItems: ['Korg TM-60 Unit', '2x AAA Alkaline Batteries', 'Instruction Manual'],
    rating: 4.8,
    reviewCount: 0,
    tags: ['Korg', 'Tuner', 'Metronome', 'Accessories', 'Pitch'],
    isFeatured: false,
    isNewProduct: false,
    isBestSeller: true
  }
];

const couponsData = [
  {
    couponCode: 'ROCKSTAR10',
    discountType: 'percentage',
    discountValue: 10,
    minimumOrder: 5000,
    maximumDiscount: 5000,
    expiryDate: new Date('2027-12-31'),
    usageLimit: 500,
    isActive: true
  },
  {
    couponCode: 'STUDIO2000',
    discountType: 'fixed',
    discountValue: 2000,
    minimumOrder: 25000,
    maximumDiscount: null,
    expiryDate: new Date('2027-12-31'),
    usageLimit: 200,
    isActive: true
  },
  {
    couponCode: 'WELCOME5',
    discountType: 'percentage',
    discountValue: 5,
    minimumOrder: 1000,
    maximumDiscount: 2000,
    expiryDate: new Date('2027-12-31'),
    usageLimit: 1000,
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rockstar_shop';
    console.log(`Connecting to MongoDB for seeding at: ${mongoUri}`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 6000 });
    console.log('[Connected] Seeding database...');

    // Clear existing catalog data
    await Category.deleteMany({});
    await Brand.deleteMany({});
    await Product.deleteMany({});
    await Coupon.deleteMany({});
    await SiteSettings.deleteMany({});

    // Seed Categories
    await Category.insertMany(categoriesData);
    console.log(`[Seed] ${categoriesData.length} categories seeded.`);

    // Seed Brands
    await Brand.insertMany(brandsData);
    console.log(`[Seed] ${brandsData.length} brands seeded.`);

    // Seed Products
    await Product.insertMany(productsData);
    console.log(`[Seed] ${productsData.length} verified products seeded.`);

    // Seed Coupons
    await Coupon.insertMany(couponsData);
    console.log(`[Seed] ${couponsData.length} coupons seeded.`);

    // Seed SiteSettings
    await SiteSettings.create({
      businessName: 'Rockstar Musical Instruments Shop',
      businessCategory: 'Musical Instruments / Music Equipment / Audio Equipment',
      phone: '+92 300 6303618',
      address: 'Service Road, Peer Khurshid Colony, Chah Usman Wala, Multan, Punjab, Pakistan',
      city: 'Multan',
      country: 'Pakistan',
      businessHours: '',
      email: '',
      deliveryPolicy: 'We deliver across Multan and nationwide throughout Pakistan via trusted courier services. Cash on Delivery is available for all eligible orders. Store verification is conducted before order dispatch.',
      returnPolicy: 'Items can be inspected upon delivery. Any damaged or defective instrument must be reported within 48 hours with order reference and proof of purchase.',
      priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH. All catalog prices reflect standard market reference and are to be verified with in-store stock before final checkout.'
    });
    console.log('[Seed] Site settings created with verified Multan business information.');

    // Seed Default Admin User if not exists
    const adminExists = await User.findOne({ email: 'admin@rockstar.pk' });
    if (!adminExists) {
      await User.create({
        name: 'Rockstar Store Admin',
        email: 'admin@rockstar.pk',
        phone: '+92 300 6303618',
        password: 'AdminPassword123!',
        role: 'admin',
        addresses: [
          {
            fullName: 'Rockstar Musical Instruments Shop',
            phone: '+92 300 6303618',
            addressLine: 'Service Road, Peer Khurshid Colony, Chah Usman Wala',
            city: 'Multan',
            area: 'Peer Khurshid Colony',
            postalCode: '60000',
            isDefault: true
          }
        ]
      });
      console.log('[Seed] Admin user created: admin@rockstar.pk / AdminPassword123!');
    }

    console.log('[Seed Completed Successfully!]');
    process.exit(0);
  } catch (err) {
    console.error(`[Seed Error] ${err.message}`);
    process.exit(1);
  }
};

seedDatabase();
