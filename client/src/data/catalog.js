// Real verified catalog for Rockstar Musical Instruments Shop, Multan
export const VERIFIED_BUSINESS = {
  name: "Rockstar Musical Instruments Shop",
  tagline: "MUSICAL INSTRUMENTS SHOP",
  category: "Musical Instruments / Music Equipment / Audio Equipment",
  phone: "+92 300 6303618",
  phoneRaw: "+923006303618",
  address: "Service Road, Peer Khurshid Colony, Chah Usman Wala, Multan, Punjab, Pakistan",
  city: "Multan",
  province: "Punjab",
  country: "Pakistan",
  priceNotice: "DEMO DATA — VERIFY BEFORE LAUNCH",
  disclaimer: "Catalog prices and models reflect standard market reference for store stock. All prices are to be verified with in-store stock before final transaction."
};

export const INITIAL_CATEGORIES = [
  {
    name: 'Guitars',
    slug: 'guitars',
    description: 'Acoustic, electric, and bass guitars from world-renowned makers.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop',
    count: 5
  },
  {
    name: 'Keyboards',
    slug: 'keyboards',
    description: 'Weighted 88-key stage pianos, portable keyboards, and synthesizers.',
    image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&auto=format&fit=crop',
    count: 3
  },
  {
    name: 'Drums',
    slug: 'drums',
    description: 'Acoustic drum sets, electronic mesh drums, cymbals, and hardware.',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop',
    count: 2
  },
  {
    name: 'Microphones',
    slug: 'microphones',
    description: 'Industry-standard dynamic vocal mics and precision studio condensers.',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop',
    count: 3
  },
  {
    name: 'Audio Equipment',
    slug: 'audio',
    description: 'Studio reference monitors, USB audio interfaces, and amplifiers.',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop',
    count: 4
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'High-purity instrument cables, strings, cases, stands, and tuners.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop',
    count: 2
  }
];

export const INITIAL_BRANDS = [
  { name: 'Yamaha', slug: 'yamaha', count: 5 },
  { name: 'Fender', slug: 'fender', count: 2 },
  { name: 'Ibanez', slug: 'ibanez', count: 2 },
  { name: 'Roland', slug: 'roland', count: 2 },
  { name: 'Shure', slug: 'shure', count: 2 },
  { name: 'Audio-Technica', slug: 'audio-technica', count: 2 },
  { name: 'Casio', slug: 'casio', count: 1 },
  { name: 'Behringer', slug: 'behringer', count: 1 },
  { name: 'Marshall', slug: 'marshall', count: 1 },
  { name: 'Tama', slug: 'tama', count: 1 },
  { name: 'Korg', slug: 'korg', count: 1 }
];

export const INITIAL_PRODUCTS = [
  {
    _id: 'prod_yam_f310',
    productId: 'PROD-YAM-F310',
    name: 'Yamaha F310 Acoustic Guitar',
    slug: 'yamaha-f310-acoustic-guitar',
    brand: 'Yamaha',
    category: 'Guitars',
    subcategory: 'Acoustic Guitars',
    description: 'The Yamaha F310 offers outstanding quality at an accessible price point. Built with a spruce top and meranti back and sides, this traditional dreadnought body provides balanced resonance, warm lows, and clean articulate highs. The slightly shorter scale length and comfortable nato neck with rosewood fingerboard ensure effortless playability.',
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
    stockStatus: 'in_stock',
    weight: '2.4 kg',
    dimensions: '104 cm x 40 cm x 12.5 cm',
    specifications: [
      { key: 'Top Material', value: 'Spruce' },
      { key: 'Back & Sides', value: 'Meranti' },
      { key: 'Neck Material', value: 'Nato' },
      { key: 'Fingerboard Material', value: 'Rosewood' },
      { key: 'Scale Length', value: '634 mm (25")' },
      { key: 'Nut Width', value: '43 mm' },
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
    reviewCount: 3,
    tags: ['Acoustic', 'Yamaha', 'Dreadnought', 'Spruce', 'Guitar'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_yam_pac012',
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
    stockStatus: 'in_stock',
    weight: '3.5 kg',
    dimensions: '99 cm x 33 cm x 6.5 cm',
    specifications: [
      { key: 'Body Material', value: 'Agathis / Alder' },
      { key: 'Neck Material', value: 'Maple (Satin Finish)' },
      { key: 'Fingerboard', value: 'Rosewood' },
      { key: 'Frets', value: '22 Medium' },
      { key: 'Scale Length', value: '648 mm (25.5")' },
      { key: 'Pickups', value: 'H-S-S (1 Humbucker, 2 Single-Coils)' },
      { key: 'Bridge', value: 'Vintage Style Tremolo with Block Saddles' }
    ],
    features: [
      'H-S-S pickup setup delivering sonic versatility across blues, rock, and jazz',
      'Vintage-style vibrato bridge with individual string height saddles',
      'Fast-playing slim profile maple neck with satin back finish',
      'Solid construction with high tuning stability'
    ],
    includedItems: ['Yamaha Pacifica 012 Guitar', 'Tremolo Arm', 'Truss Rod & Saddle Wrenches'],
    rating: 4.7,
    reviewCount: 2,
    tags: ['Electric Guitar', 'Yamaha', 'HSS', 'Pacifica', 'Solid Body'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_fen_strat_pl',
    name: 'Fender Player Stratocaster Electric Guitar',
    slug: 'fender-player-stratocaster-electric-guitar',
    brand: 'Fender',
    category: 'Guitars',
    subcategory: 'Electric Guitars',
    description: 'The inspiring sound of a Stratocaster is one of the foundations of Fender. Featuring bell-like high end, punchy mids, and robust low end combined with crystal-clear articulation, the Player Stratocaster is packed with authentic Fender feel and style. Equipped with Player Series Alnico 5 single-coil pickups, a modern "C"-shaped neck profile, and a 2-point tremolo bridge.',
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
    stockStatus: 'low_stock',
    weight: '3.6 kg',
    dimensions: '106 cm x 38 cm x 11 cm',
    specifications: [
      { key: 'Body Wood', value: 'Alder with Gloss Polyester Finish' },
      { key: 'Neck Profile', value: 'Modern "C"' },
      { key: 'Fretboard', value: 'Pau Ferro or Maple (9.5" Radius)' },
      { key: 'Frets', value: '22 Medium Jumbo' },
      { key: 'Pickups', value: '3x Player Series Alnico 5 Strat Single-Coil' },
      { key: 'Bridge', value: '2-Point Synchronized Tremolo with Bent Steel Saddles' }
    ],
    features: [
      'Player Series Alnico 5 single-coil pickups for authentic Fender sparkle and punch',
      'Modern "C"-shaped neck profile designed for ergonomic speed and comfort',
      '2-point synchronised tremolo bridge offering smooth pitch bends',
      'Dedicated bridge pickup tone control for expanded tonal sculpting'
    ],
    includedItems: ['Fender Player Stratocaster', 'Tremolo Arm', 'Adjustment Hex Keys'],
    rating: 4.9,
    reviewCount: 4,
    tags: ['Fender', 'Stratocaster', 'Alnico', 'Single Coil', 'Electric Guitar'],
    isFeatured: true,
    isNewProduct: true,
    isBestSeller: false,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_iba_grg121dx',
    name: 'Ibanez GRG121DX GIO Electric Guitar',
    slug: 'ibanez-grg121dx-gio-electric-guitar',
    brand: 'Ibanez',
    category: 'Guitars',
    subcategory: 'Electric Guitars',
    description: 'The Ibanez GRG121DX is purpose-built for fast riffing, heavy drop-tunings, and rock performances. Featuring an okoume body, slim GRG maple neck, bound purpleheart fretboard with aggressive sharktooth inlays, and dual IBZ-6 passive ceramic humbuckers wired to a fixed F106 hardtail bridge.',
    shortDescription: 'High-octane hardtail electric guitar with dual IBZ-6 humbuckers and sharktooth inlays.',
    images: [
      'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&auto=format&fit=crop'
    ],
    price: 58000,
    salePrice: 55000,
    currency: 'PKR',
    sku: 'IBA-GRG121DX-BKF',
    stock: 4,
    stockStatus: 'in_stock',
    weight: '3.3 kg',
    dimensions: '102 cm x 34 cm x 7 cm',
    specifications: [
      { key: 'Body Material', value: 'Okoume' },
      { key: 'Neck', value: 'GRG Maple Neck' },
      { key: 'Fretboard', value: 'Bound Purpleheart with Sharktooth Inlays' },
      { key: 'Frets', value: '24 Jumbo Frets' },
      { key: 'Bridge', value: 'F106 Fixed Bridge' },
      { key: 'Pickups', value: 'Dual IBZ-6 Humbuckers (Ceramic)' }
    ],
    features: [
      '24 jumbo frets on a bound purpleheart fretboard for extended soloing range',
      'F106 hardtail bridge increases sustain and stays stable during heavy palm muting',
      'Dual high-output ceramic humbuckers tailored for rock and metal clarity',
      'Ultra-thin GRG neck designed for fast shredding'
    ],
    includedItems: ['Ibanez GRG121DX Guitar', 'Truss Rod Hex Wrench', 'Instrument Cable'],
    rating: 4.7,
    reviewCount: 1,
    tags: ['Ibanez', 'GIO', 'Electric Guitar', 'Humbucker', 'Hardtail'],
    isFeatured: false,
    isNewProduct: true,
    isBestSeller: false,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_iba_gsr200',
    name: 'Ibanez GSR200 Soundgear 4-String Bass',
    slug: 'ibanez-gsr200-soundgear-4-string-bass',
    brand: 'Ibanez',
    category: 'Guitars',
    subcategory: 'Bass Guitars',
    description: 'The Ibanez GSR200 delivers legendary Soundgear sleekness, balance, and thunderous low end. Features an okoume body, slim GSR4 maple neck with purpleheart fretboard, Dynamix P split-coil neck pickup and Dynamix J single-coil bridge pickup, boosted by an active Phat II EQ circuit for deep punchy low frequencies.',
    shortDescription: 'Lightweight, ergonomic 4-string electric bass featuring active Phat II bass boost EQ.',
    images: [
      'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop'
    ],
    price: 68000,
    salePrice: 64500,
    currency: 'PKR',
    sku: 'IBA-GSR200-BK',
    stock: 3,
    stockStatus: 'in_stock',
    weight: '3.8 kg',
    dimensions: '115 cm x 35 cm x 7 cm',
    specifications: [
      { key: 'Body', value: 'Okoume' },
      { key: 'Neck Type', value: 'GSR4 Maple' },
      { key: 'Scale', value: '864 mm (34")' },
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
    reviewCount: 2,
    tags: ['Bass', 'Ibanez', 'Soundgear', '4 String', 'Active EQ'],
    isFeatured: false,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },

  // KEYBOARDS
  {
    _id: 'prod_rol_fp30x',
    name: 'Roland FP-30X Digital Piano',
    slug: 'roland-fp-30x-digital-piano',
    brand: 'Roland',
    category: 'Keyboards',
    subcategory: 'Digital Pianos',
    description: 'The sweet spot of Roland’s FP-X series, the FP-30X pairs an affordable price with authentic performance. Featuring Roland’s acclaimed PHA-4 Standard 88-key weighted hammer-action keyboard with escapement and Ivory Feel, backed by the SuperNATURAL Piano sound engine. Includes integrated stereo speakers, dual headphone outputs, and Bluetooth audio/MIDI connectivity.',
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
    stockStatus: 'in_stock',
    weight: '14.8 kg',
    dimensions: '130.0 cm x 28.4 cm x 15.1 cm',
    specifications: [
      { key: 'Keyboard', value: '88 Keys (PHA-4 Standard with Escapement & Ivory Feel)' },
      { key: 'Sound Engine', value: 'SuperNATURAL Piano' },
      { key: 'Polyphony', value: '256 Notes' },
      { key: 'Tones', value: 'Total 56 (Piano: 12, E.Piano: 20, Other: 24)' },
      { key: 'Speakers', value: '12 cm x 2 (22W Output)' },
      { key: 'Connectivity', value: 'Bluetooth Audio & MIDI, USB Type-B, 1/4" Line Outs' }
    ],
    features: [
      'PHA-4 Standard 88-key hammer action provides acoustic grand responsiveness and dynamic touch',
      'SuperNATURAL Piano sound engine with 256-note polyphony for unrestricted expression',
      'Onboard 22-watt stereo speaker system with room-filling acoustic projection',
      'Bluetooth audio streaming allows playing along with tracks from smart devices'
    ],
    includedItems: ['Roland FP-30X Piano', 'DP-2 Damper Pedal', 'Music Rest', 'AC Power Adaptor'],
    rating: 4.9,
    reviewCount: 3,
    tags: ['Roland', 'Digital Piano', '88 Keys', 'Weighted Hammer Action', 'Bluetooth'],
    isFeatured: true,
    isNewProduct: true,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_cas_cts300',
    name: 'Casio Casiotone CT-S300 Portable Keyboard',
    slug: 'casio-casiotone-ct-s300-portable-keyboard',
    brand: 'Casio',
    category: 'Keyboards',
    subcategory: 'Electronic Keyboards',
    description: 'The Casio CT-S300 features 61 full-size touch-responsive keys, an integrated carry handle, pitch bend wheel, 400 high-grade tones, 77 rhythms with full accompaniment, Dance Music Mode, and micro USB-to-Host for MIDI connectivity. Operates on 6 AA batteries or included AC adapter.',
    shortDescription: '61-key touch-sensitive portable keyboard with pitch bend wheel and USB MIDI.',
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop'
    ],
    price: 44000,
    salePrice: 41500,
    currency: 'PKR',
    sku: 'CAS-CTS300-BLK',
    stock: 6,
    stockStatus: 'in_stock',
    weight: '3.3 kg',
    dimensions: '93 cm x 25.6 cm x 7.3 cm',
    specifications: [
      { key: 'Keys', value: '61 Piano-Style Keys with 2 Levels Touch Response' },
      { key: 'Tones', value: '400 Built-in Tones' },
      { key: 'Rhythms', value: '77 Accompaniment Rhythms' },
      { key: 'Pitch Bend Wheel', value: 'Yes' },
      { key: 'Polyphony', value: '48 Notes' }
    ],
    features: [
      'Touch-responsive keys for expressive piano dynamics and nuanced performance',
      'Built-in pitch bend wheel ideal for expressive synth leads and pitch gliding',
      'Integrated top carry handle making travel and rehearsals completely effortless',
      'Dance Music Mode with 50 EDM patterns and vocal build-ups'
    ],
    includedItems: ['Casio CT-S300 Keyboard', 'Music Rest', 'AC Power Adaptor'],
    rating: 4.6,
    reviewCount: 2,
    tags: ['Casio', 'Casiotone', '61 Keys', 'Keyboard', 'Touch Sensitive'],
    isFeatured: false,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_yam_psre373',
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
    stockStatus: 'in_stock',
    weight: '4.6 kg',
    dimensions: '94.5 cm x 36.9 cm x 11.8 cm',
    specifications: [
      { key: 'Key Count', value: '61 Touch Sensitive' },
      { key: 'Tone Generator', value: 'AWM Stereo Sampling' },
      { key: 'Voices', value: '622 Voices' },
      { key: 'DSP Effects', value: '38 Types' },
      { key: 'Polyphony', value: '48 Notes' },
      { key: 'Connectivity', value: 'USB TO HOST (Audio + MIDI), Sustain, AUX IN, Phones/Output' }
    ],
    features: [
      'Super Articulation Lite reproduces natural string slides and body knocks',
      'Full USB 2-way audio and MIDI interface for recording directly to computer DAWs',
      'Keys to Success lesson system guides step-by-step masteries',
      'Dual voice layering and split keyboard capability'
    ],
    includedItems: ['Yamaha PSR-E373 Keyboard', 'Music Rest', 'Power Adaptor', 'Manual'],
    rating: 4.8,
    reviewCount: 2,
    tags: ['Yamaha', 'PSR-E373', 'Keyboard', 'USB Audio', 'Touch Sensitive'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: false,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },

  // DRUMS
  {
    _id: 'prod_tam_ip50h6',
    name: 'Tama Imperialstar 5-Piece Complete Drum Kit',
    slug: 'tama-imperialstar-5-piece-drum-kit',
    brand: 'Tama',
    category: 'Drums',
    subcategory: 'Drum Kits',
    description: 'Imperialstar is a complete acoustic drum kit incorporating 100% 6-ply 8mm poplar shells for full, dynamic resonance, precision bearing edges, Tama Accu-Tune bass drum hoops, and heavy-duty double-braced Stage Master hardware. Includes bass drum pedal, snare stand, hi-hat stand, and boom cymbal stands.',
    shortDescription: 'Complete 5-piece 100% poplar shell drum kit with double-braced hardware.',
    images: [
      'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop'
    ],
    price: 265000,
    salePrice: 255000,
    currency: 'PKR',
    sku: 'TAM-IP52KH6-BBO',
    stock: 2,
    stockStatus: 'low_stock',
    weight: '32.0 kg',
    dimensions: '22" Bass, 10" & 12" Toms, 16" Floor Tom, 14" Snare',
    specifications: [
      { key: 'Shell Material', value: '100% Poplar 6-ply / 8mm' },
      { key: 'Bass Drum', value: '22" x 16"' },
      { key: 'Mounted Toms', value: '10" x 7" & 12" x 8"' },
      { key: 'Floor Tom', value: '16" x 15"' },
      { key: 'Snare Drum', value: '14" x 5"' },
      { key: 'Hardware', value: 'Stage Master Double-Braced Hardware Pack' }
    ],
    features: [
      '6-ply 8mm poplar shells deliver powerful warm attack and open projection',
      'Tama Omnisphere double tom holder offers 360-degree ball-joint positioning',
      'Accu-Tune composite bass drum hoops ensure faster and more consistent head tuning',
      'Heavy-duty double-braced legs on all stands for maximum stability'
    ],
    includedItems: ['5 Drum Shells', 'Snare Stand', 'Hi-Hat Stand', 'Boom Cymbal Stand', 'Straight Cymbal Stand', 'Iron Cobra 200 Kick Pedal', 'Throne'],
    rating: 4.9,
    reviewCount: 3,
    tags: ['Tama', 'Imperialstar', 'Drum Kit', 'Acoustic Drums', 'Poplar'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_rol_td07kv',
    name: 'Roland TD-07KV V-Drums Electronic Drum Set',
    slug: 'roland-td-07kv-v-drums-electronic-drum-set',
    brand: 'Roland',
    category: 'Drums',
    subcategory: 'Electronic Drums',
    description: 'Compact and ideally suited for practicing at home, the TD-07KV V-Drums kit delivers superior expression and feel with all-mesh dual-layer drumheads for snare and toms. Equipped with the TD-07 sound module packed with customizable authentic acoustic drum sounds, integrated deep editing tools, and Bluetooth streaming.',
    shortDescription: 'All-mesh electronic drum kit with TD-07 module, Bluetooth audio streaming, and USB.',
    images: [
      'https://images.unsplash.com/photo-1525994886773-080587e161c2?w=800&auto=format&fit=crop'
    ],
    price: 320000,
    salePrice: 310000,
    currency: 'PKR',
    sku: 'ROL-TD07KV',
    stock: 2,
    stockStatus: 'low_stock',
    weight: '21.7 kg',
    dimensions: '120 cm x 110 cm x 120 cm',
    specifications: [
      { key: 'Drum Module', value: 'TD-07 with 25 Preset Kits & 25 User Kits' },
      { key: 'Snare Pad', value: 'PDX-8 (8-inch Dual-Mesh, Independent Rim Trigger)' },
      { key: 'Tom Pads', value: '3x PDX-6A (6.5-inch Dual-Mesh)' },
      { key: 'Cymbals', value: 'CY-5 Hi-Hat + CY-8 Crash and Ride with Choke' },
      { key: 'Bluetooth', value: 'Bluetooth 4.2 Audio & MIDI' }
    ],
    features: [
      'Dual-ply mesh drumheads provide realistic stick rebound and quiet acoustic noise',
      'Advanced TD-07 module allows modifying pitch, damping, and room acoustics',
      'Integrated Bluetooth allows streaming tracks directly from phone into headphones',
      'USB output supports multichannel digital audio recording straight into DAWs'
    ],
    includedItems: ['TD-07 Module', 'Pads & Cymbal Arms', 'MDS-Compact 4-Post Drum Rack', 'Cables', 'AC Adaptor'],
    rating: 4.9,
    reviewCount: 1,
    tags: ['Roland', 'V-Drums', 'Electronic Drums', 'Mesh Heads', 'Bluetooth'],
    isFeatured: true,
    isNewProduct: true,
    isBestSeller: false,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },

  // MICROPHONES
  {
    _id: 'prod_shu_sm58',
    name: 'Shure SM58 Cardioid Dynamic Vocal Microphone',
    slug: 'shure-sm58-dynamic-vocal-microphone',
    brand: 'Shure',
    category: 'Microphones',
    subcategory: 'Dynamic Microphones',
    description: 'The legendary Shure SM58 vocal microphone is engineered for professional vocal use in live performance, sound reinforcement, and studio recording. Its tailored vocal response for sound is a world standard for singing and speech. A highly effective, built-in spherical filter minimizes wind and breath "pop" noises, while the uniform cardioid pickup pattern isolates the main sound source.',
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
    stockStatus: 'in_stock',
    weight: '298 g',
    dimensions: '162 mm L x 51 mm W',
    specifications: [
      { key: 'Transducer Type', value: 'Dynamic (Moving Coil)' },
      { key: 'Polar Pattern', value: 'Cardioid' },
      { key: 'Frequency Response', value: '50 Hz – 15,000 Hz' },
      { key: 'Output Impedance', value: '300 Ω' },
      { key: 'Sensitivity', value: '-54.5 dBV/Pa (1.85 mV)' },
      { key: 'Connector', value: 'Three-Pin XLR Male' }
    ],
    features: [
      'Pneumatic shock-mount system cuts down handling noise drastically',
      'Built-in spherical wind and pop filter prevents plosive vocal bursts',
      'Cardioid polar pattern rejects off-axis stage sound and resists feedback',
      'Legendary roadworthy rugged construction withstands heavy stage touring'
    ],
    includedItems: ['Shure SM58 Microphone', 'A25D Break-Resistant Mic Clip', 'Thread Adapter', 'Zippered Bag'],
    rating: 4.9,
    reviewCount: 5,
    tags: ['Shure', 'SM58', 'Microphone', 'Dynamic', 'Live Vocal'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_at_at2020',
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
    stockStatus: 'in_stock',
    weight: '345 g',
    dimensions: '162 mm L x 52 mm Body Diameter',
    specifications: [
      { key: 'Element', value: 'Fixed-Charge Back Plate Condenser' },
      { key: 'Polar Pattern', value: 'Cardioid' },
      { key: 'Frequency Response', value: '20 Hz – 20,000 Hz' },
      { key: 'Impedance', value: '100 Ω' },
      { key: 'Max Input Sound Level', value: '144 dB SPL' },
      { key: 'Phantom Power Requirements', value: '48V DC, 2 mA' }
    ],
    features: [
      'Custom-engineered low-mass 16mm diaphragm delivers detailed transient response',
      'Handles exceptionally loud sound sources up to 144 dB SPL without distortion',
      'Cardioid polar pattern reduces pickup of sounds from sides and rear',
      'Pivoting threaded stand mount attaches securely for easy microphone positioning'
    ],
    includedItems: ['Audio-Technica AT2020 Microphone', 'Pivoting Stand Mount', '5/8"-27 to 3/8"-16 Adapter', 'Soft Pouch'],
    rating: 4.8,
    reviewCount: 3,
    tags: ['Audio-Technica', 'AT2020', 'Condenser', 'Studio Mic', 'XLR'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_shu_sm57',
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
    stockStatus: 'in_stock',
    weight: '284 g',
    dimensions: '157 mm L x 32 mm W',
    specifications: [
      { key: 'Type', value: 'Dynamic' },
      { key: 'Frequency Response', value: '40 Hz – 15,000 Hz' },
      { key: 'Polar Pattern', value: 'Cardioid' },
      { key: 'Output Impedance', value: '310 Ω' },
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
    reviewCount: 3,
    tags: ['Shure', 'SM57', 'Instrument Mic', 'Snare', 'Guitar Amp'],
    isFeatured: false,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },

  // AUDIO EQUIPMENT
  {
    _id: 'prod_beh_um2',
    name: 'Behringer U-Phoria UM2 USB Audio Interface',
    slug: 'behringer-u-phoria-um2-audio-interface',
    brand: 'Behringer',
    category: 'Audio Equipment',
    subcategory: 'Audio Interfaces',
    description: 'When it’s time to make recording history, you need the best audio interface you can get—and you need one you can count on. That’s why Behringer engineered the ultra-compact 2x2, 48 kHz USB interface with a studio-grade XENYX Mic Preamp, combination XLR/TRS input for your vocal or mic, and an additional 1/4" instrument input.',
    shortDescription: '2x2 USB audio interface featuring a studio-grade XENYX microphone preamp and 48 kHz resolution.',
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop'
    ],
    price: 21500,
    salePrice: 19800,
    currency: 'PKR',
    sku: 'BEH-UM2-USB',
    stock: 8,
    stockStatus: 'in_stock',
    weight: '300 g',
    dimensions: '128 mm x 118 mm x 46 mm',
    specifications: [
      { key: 'Converter Resolution', value: '48 kHz / 16-bit' },
      { key: 'Inputs', value: '1x XLR/TRS Combo, 1x 1/4" TRS Instrument' },
      { key: 'Preamp', value: '1x XENYX Preamp with +48V Phantom Power' },
      { key: 'Outputs', value: '2x RCA Stereo Outs, 1x 1/4" Headphone' },
      { key: 'Power', value: 'USB Bus Powered' }
    ],
    features: [
      'XENYX mic preamp with +48V phantom power for condenser vocal microphones',
      'Dedicated 1/4" instrument input designed specifically for electric guitars and basses',
      'Direct monitor toggle allows latency-free real-time monitoring of vocal performance',
      'Ultra-rugged impact-resistant composite chassis'
    ],
    includedItems: ['Behringer UM2 Interface', 'USB Cable', 'Quick Start Guide'],
    rating: 4.7,
    reviewCount: 3,
    tags: ['Behringer', 'Audio Interface', 'XENYX', 'USB', 'Home Studio'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_mar_mg15g',
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
    stockStatus: 'in_stock',
    weight: '7.6 kg',
    dimensions: '375 mm W x 370 mm H x 195 mm D',
    specifications: [
      { key: 'Power Output', value: '15 Watts RMS' },
      { key: 'Speaker Size', value: '1 x 8" Custom Marshall Voiced' },
      { key: 'Channels', value: '2 (Clean & Overdrive)' },
      { key: 'Controls', value: 'Clean Volume, Channel Select, OD Gain, OD Volume, 3-Band EQ' },
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
    reviewCount: 3,
    tags: ['Marshall', 'Guitar Amp', '15W', 'Overdrive', 'Combo Amp'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_yam_hs5',
    name: 'Yamaha HS5 Powered Studio Monitor (Pair)',
    slug: 'yamaha-hs5-powered-studio-monitor-pair',
    brand: 'Yamaha',
    category: 'Audio Equipment',
    subcategory: 'Studio Monitors',
    description: 'Yamaha HS5 active bi-amplified monitors feature 5" cone woofers and 1" dome tweeters driven by high-performance 70W power amplifiers. Built to deliver an exceptionally honest, uncolored sonic reference for mixing and production.',
    shortDescription: 'Pair of 70W 2-way bi-amplified nearfield studio monitors with iconic white cone woofer.',
    images: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop'
    ],
    price: 135000,
    salePrice: 128000,
    currency: 'PKR',
    sku: 'YAM-HS5-PAIR',
    stock: 2,
    stockStatus: 'low_stock',
    weight: '5.3 kg (each)',
    dimensions: '170 mm x 285 mm x 222 mm (each)',
    specifications: [
      { key: 'Configuration', value: '2-way Bi-amp Powered Studio Monitor' },
      { key: 'Low Frequency Driver', value: '5" White Cone Woofer' },
      { key: 'High Frequency Driver', value: '1" Dome Tweeter' },
      { key: 'Output Power', value: '70W Total (LF: 45W, HF: 25W)' },
      { key: 'Frequency Range', value: '54 Hz – 30 kHz (-10dB)' },
      { key: 'Inputs', value: 'XLR Balanced and 1/4" Balanced' }
    ],
    features: [
      'Honest flat frequency response reveals every flaw in a music mix for accurate translation',
      'Bi-amplified architecture provides separate dedicated power to both woofer and tweeter',
      'Room Control and High Trim switches tailor acoustic output to your specific room shape',
      'Dense MDF acoustic enclosure eliminates resonance'
    ],
    includedItems: ['2x Yamaha HS5 Active Monitors', '2x Power Cords', 'Cushion Pads', 'Manual'],
    rating: 4.9,
    reviewCount: 2,
    tags: ['Yamaha', 'HS5', 'Studio Monitor', 'Mixing', 'Reference Audio'],
    isFeatured: true,
    isNewProduct: true,
    isBestSeller: false,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_at_m50x',
    name: 'Audio-Technica ATH-M50x Professional Monitor Headphones',
    slug: 'audio-technica-ath-m50x-professional-monitor-headphones',
    brand: 'Audio-Technica',
    category: 'Audio Equipment',
    subcategory: 'Headphones',
    description: 'This is the most critically acclaimed model in the M-Series line, praised by top audio engineers and pro audio reviewers year after year. The ATH-M50x features 45 mm large-aperture drivers with rare earth magnets, exceptional sound isolation, and 90° swiveling earcups for easy monitoring.',
    shortDescription: 'Critically acclaimed closed-back studio reference headphones with 45mm proprietary drivers.',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop'
    ],
    price: 52000,
    salePrice: 48500,
    currency: 'PKR',
    sku: 'AT-ATH-M50X',
    stock: 5,
    stockStatus: 'in_stock',
    weight: '285 g',
    dimensions: 'Circumaural Closed-Back',
    specifications: [
      { key: 'Driver Diameter', value: '45 mm Neodymium' },
      { key: 'Frequency Response', value: '15 Hz – 28,000 Hz' },
      { key: 'Max Input Power', value: '1,600 mW at 1 kHz' },
      { key: 'Sensitivity', value: '99 dB' },
      { key: 'Impedance', value: '38 Ω' }
    ],
    features: [
      'Proprietary 45 mm large-aperture drivers deliver clarity across extended frequency range',
      'Circumaural design contours around the ears for acoustic isolation in loud environments',
      '90-degree swiveling earcups facilitate single-ear DJ and vocal booth monitoring',
      'Includes 3 detachable cables and carrying pouch'
    ],
    includedItems: ['ATH-M50x Headphones', '3 Detachable Cables', '6.3 mm (1/4") Adapter', 'Pouch'],
    rating: 4.9,
    reviewCount: 4,
    tags: ['Audio-Technica', 'M50x', 'Headphones', 'Studio', 'Mixing'],
    isFeatured: true,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },

  // ACCESSORIES
  {
    _id: 'prod_dad_exl110',
    name: "D'Addario EXL110 Regular Light Electric Guitar Strings",
    slug: 'daddario-exl110-regular-light-guitar-strings',
    brand: 'Fender',
    category: 'Accessories',
    subcategory: 'Guitar Strings',
    description: 'EXL110 is D’Addario’s best-selling electric guitar set. Nickel-wound strings are wound with nickelplated steel onto a carefully drawn hexagonal steel core. Gauges: .010, .013, .017, .026, .036, .046.',
    shortDescription: 'World’s favorite 10-46 nickel wound electric guitar strings offering bright tone and balanced tension.',
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop'
    ],
    price: 2600,
    salePrice: 2300,
    currency: 'PKR',
    sku: 'DAD-EXL110',
    stock: 25,
    stockStatus: 'in_stock',
    weight: '45 g',
    dimensions: 'Gauges: 10, 13, 17, 26, 36, 46',
    specifications: [
      { key: 'String Gauges', value: '.010, .013, .017, .026, .036, .046' },
      { key: 'Winding Material', value: 'Nickel-Plated Steel' },
      { key: 'Core Construction', value: 'High Carbon Hexagonal Steel Core' }
    ],
    features: [
      'Round wound with nickelplated steel for distinctive bright tone',
      'Hex core wire prevents string slippage and enhances tuning stability',
      'Corrosion resistant packaging keeps strings fresh from factory to guitar',
      'Optimal balance of comfortable bending and rich rhythmic bite'
    ],
    includedItems: ['6 Sealed Electric Guitar Strings (10-46)'],
    rating: 4.8,
    reviewCount: 2,
    tags: ['Strings', 'Electric Guitar', 'DAddario', '10-46', 'Accessories'],
    isFeatured: false,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  },
  {
    _id: 'prod_kor_tm60',
    name: 'Korg TM-60 Tuner & Metronome Combo',
    slug: 'korg-tm-60-tuner-metronome-combo',
    brand: 'Korg',
    category: 'Accessories',
    subcategory: 'Tuners & Metronomes',
    description: 'The Korg TM-60 allows you to use the tuner and metronome simultaneously. Featuring a newly designed backlit LCD display that is 1.3 times larger than previous models, the TM-60 shows tuning pitch and tempo indications together with exceptional clarity.',
    shortDescription: 'Simultaneous digital tuner and metronome with large backlit LCD screen.',
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop'
    ],
    price: 8500,
    salePrice: 7800,
    currency: 'PKR',
    sku: 'KOR-TM60-BK',
    stock: 12,
    stockStatus: 'in_stock',
    weight: '100 g',
    dimensions: '111 mm x 74 mm x 18 mm',
    specifications: [
      { key: 'Tuning Range', value: 'C1 (32.70 Hz) to C8 (4186.01 Hz)' },
      { key: 'Calibration', value: 'A4 = 410 to 480 Hz' },
      { key: 'Detection Accuracy', value: '+/- 1 cent' },
      { key: 'Tempo Range', value: '30 to 252 bpm' }
    ],
    features: [
      'Simultaneous tuner and metronome function for pitch and rhythm training',
      'High-speed needle response LCD screen with two-level backlight',
      'Sound Out and Sound Back modes generate pitch references for ear training',
      'Supports wide calibration from 410 Hz to 480 Hz'
    ],
    includedItems: ['Korg TM-60 Unit', '2x AAA Batteries', 'Instruction Manual'],
    rating: 4.8,
    reviewCount: 2,
    tags: ['Korg', 'Tuner', 'Metronome', 'Accessories', 'Pitch'],
    isFeatured: false,
    isNewProduct: false,
    isBestSeller: true,
    priceNotice: 'DEMO DATA — VERIFY BEFORE LAUNCH'
  }
];
