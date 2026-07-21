export const categories = [
  { id: 'pizza', label: 'Pizza', emoji: '🍕' },
  { id: 'burger', label: 'Burger', emoji: '🍔' },
  { id: 'cafe', label: 'Cafe', emoji: '☕' },
  { id: 'desserts', label: 'Desserts', emoji: '🍮' },
  { id: 'chinese', label: 'Chinese', emoji: '🥡' },
  { id: 'south-indian', label: 'South Indian', emoji: '🥘' },
  { id: 'drinks', label: 'Drinks', emoji: '🥤' },
  { id: 'bakery', label: 'Bakery', emoji: '🥐' },
]

export const studentOffers = [
  { id: 1, title: '10% OFF with College ID', subtitle: 'Valid at 40+ partner spots' },
  { id: 2, title: 'Buy 2 Get 1 Free', subtitle: 'On select cafe items' },
  { id: 3, title: 'Free Dessert after Review', subtitle: 'Leave a photo review to redeem' },
]

export const restaurants = [
  {
    id: 'brew-corner',
    name: 'Brew Corner',
    cuisine: 'Cafe · Continental',
    category: 'cafe',
    rating: 4.7,
    distance: '0.4 km',
    avgCost: 300,
    isOpen: true,
    banner: 'https://picsum.photos/seed/brewcorner/1200/700',
    gallery: [
      'https://picsum.photos/seed/brew1/600/600',
      'https://picsum.photos/seed/brew2/600/600',
      'https://picsum.photos/seed/brew3/600/600',
    ],
    description:
      'A quiet third-wave cafe tucked behind the main market — filter coffee, slow mornings, and a menu that changes with the season.',
    hours: '8:00 AM – 10:00 PM',
    contact: '+91 98450 11223',
    menu: [
      { id: 'm1', name: 'Cold Coffee', price: 150 },
      { id: 'm2', name: 'French Fries', price: 100 },
      { id: 'm3', name: 'Tiramisu', price: 220 },
      { id: 'm4', name: 'Avocado Toast', price: 210 },
    ],
  },
  {
    id: 'street-flame',
    name: 'Street Flame',
    cuisine: 'Street Food · North Indian',
    category: 'chinese',
    rating: 4.5,
    distance: '0.7 km',
    avgCost: 150,
    isOpen: true,
    banner: 'https://picsum.photos/seed/streetflame/1200/700',
    gallery: [
      'https://picsum.photos/seed/sf1/600/600',
      'https://picsum.photos/seed/sf2/600/600',
      'https://picsum.photos/seed/sf3/600/600',
    ],
    description:
      'A tiny stall famous with the night crowd for its smoke-charred noodles and a chilli garlic sauce nobody will explain.',
    hours: '5:00 PM – 1:00 AM',
    contact: '+91 90080 44112',
    menu: [
      { id: 'm1', name: 'Veg Burger', price: 180 },
      { id: 'm2', name: 'Chilli Garlic Noodles', price: 140 },
      { id: 'm3', name: 'Momos (8pc)', price: 120 },
    ],
  },
  {
    id: 'south-tiffin',
    name: 'South Tiffin House',
    cuisine: 'South Indian',
    category: 'south-indian',
    rating: 4.8,
    distance: '1.1 km',
    avgCost: 120,
    isOpen: false,
    banner: 'https://picsum.photos/seed/tiffin/1200/700',
    gallery: [
      'https://picsum.photos/seed/ti1/600/600',
      'https://picsum.photos/seed/ti2/600/600',
      'https://picsum.photos/seed/ti3/600/600',
    ],
    description:
      'Family-run since 1994. The filter coffee alone is worth the walk, and the podi idli sells out most mornings by 10.',
    hours: '7:00 AM – 11:30 AM, 6:00 PM – 9:30 PM',
    contact: '+91 99020 55671',
    menu: [
      { id: 'm1', name: 'Podi Idli (4pc)', price: 80 },
      { id: 'm2', name: 'Masala Dosa', price: 90 },
      { id: 'm3', name: 'Filter Coffee', price: 40 },
    ],
  },
  {
    id: 'sweet-theory',
    name: 'Sweet Theory',
    cuisine: 'Bakery · Desserts',
    category: 'desserts',
    rating: 4.6,
    distance: '1.4 km',
    avgCost: 200,
    isOpen: true,
    banner: 'https://picsum.photos/seed/sweettheory/1200/700',
    gallery: [
      'https://picsum.photos/seed/st1/600/600',
      'https://picsum.photos/seed/st2/600/600',
      'https://picsum.photos/seed/st3/600/600',
    ],
    description:
      'A one-woman bakery working out of a converted garage. Small batches, sold out by evening, worth planning around.',
    hours: '11:00 AM – 8:00 PM',
    contact: '+91 91234 66789',
    menu: [
      { id: 'm1', name: 'Basque Cheesecake Slice', price: 180 },
      { id: 'm2', name: 'Croissant', price: 90 },
      { id: 'm3', name: 'Cold Brew', price: 130 },
    ],
  },
]

export const coupons = [
  { id: 'c1', title: 'Student Discount', detail: '10% off with valid college ID', code: 'STUDENT10' },
  { id: 'c2', title: 'First Order', detail: '10% off your first ZUTO order', code: 'WELCOME10' },
  { id: 'c3', title: 'Review Reward', detail: 'Free dessert after your first review', code: 'REVIEWSWEET' },
]