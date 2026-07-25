// Ported from the original SmartSafar script.js — expanded and typed.

export interface RouteOption {
  from: string
  to: string
  mode: 'bus' | 'train' | 'flight' | 'car'
  provider: string
  time: string
  fare: number
  safety: 'High' | 'Medium' | 'N/A' | 'Check'
  note: string
  fallback?: boolean
}

export const routesData: RouteOption[] = [
  { from: 'Islamabad', to: 'Hunza', mode: 'bus', provider: 'Intercity coach + Gilgit local shuttle', time: '14-18 hrs', fare: 6500, safety: 'Medium', note: 'Scenic northern route. Check weather and landslide alerts before departure.' },
  { from: 'Islamabad', to: 'Hunza', mode: 'car', provider: 'Private car / 4x4 via N-35 Karakoram Highway', time: '11-14 hrs', fare: 32000, safety: 'Medium', note: 'Best for family/group travel; daytime travel recommended.' },
  { from: 'Islamabad', to: 'Hunza', mode: 'flight', provider: 'Flight to Gilgit + local shuttle', time: '3-5 hrs', fare: 26000, safety: 'High', note: 'Fastest route but weather dependent.' },
  { from: 'Islamabad', to: 'Hunza', mode: 'train', provider: 'No direct train', time: 'N/A', fare: 0, safety: 'N/A', note: 'Use road/flight because Hunza has no direct train connection.', fallback: true },
  { from: 'Islamabad', to: 'Skardu', mode: 'bus', provider: 'Coach / tourist bus via northern route', time: '18-24 hrs', fare: 8000, safety: 'Medium', note: 'Long scenic route; check mountain road condition.' },
  { from: 'Islamabad', to: 'Skardu', mode: 'flight', provider: 'Direct domestic flight', time: '1.5 hrs', fare: 30000, safety: 'High', note: 'Fastest route; weather may affect flights.' },
  { from: 'Islamabad', to: 'Skardu', mode: 'car', provider: 'Private car / 4x4', time: '16-20 hrs', fare: 40000, safety: 'Medium', note: 'Flexible but tiring; recommended with experienced driver.' },
  { from: 'Islamabad', to: 'Skardu', mode: 'train', provider: 'No direct train', time: 'N/A', fare: 0, safety: 'N/A', note: 'Use flight or road transport; no direct railway to Skardu.', fallback: true },
  { from: 'Lahore', to: 'Islamabad', mode: 'bus', provider: 'Daewoo / Faisal Movers', time: '4.5-5 hrs', fare: 2500, safety: 'High', note: 'Reliable motorway route.' },
  { from: 'Lahore', to: 'Islamabad', mode: 'train', provider: 'Pakistan Railways', time: '5-6 hrs', fare: 1800, safety: 'High', note: 'Good budget option.' },
  { from: 'Lahore', to: 'Islamabad', mode: 'car', provider: 'Self drive / ride share', time: '4-4.5 hrs', fare: 9000, safety: 'High', note: 'Fast but fuel/toll cost higher.' },
  { from: 'Lahore', to: 'Islamabad', mode: 'flight', provider: 'Domestic airline', time: '1 hr', fare: 16000, safety: 'High', note: 'Fast but airport time adds delay.' },
  { from: 'Islamabad', to: 'Lahore', mode: 'bus', provider: 'Daewoo / Faisal Movers', time: '4.5-5 hrs', fare: 2500, safety: 'High', note: 'Reliable motorway route.' },
  { from: 'Islamabad', to: 'Lahore', mode: 'train', provider: 'Pakistan Railways', time: '5-6 hrs', fare: 1800, safety: 'High', note: 'Good budget option.' },
  { from: 'Lahore', to: 'Karachi', mode: 'train', provider: 'Green Line Express', time: '18-20 hrs', fare: 6500, safety: 'High', note: 'Comfortable overnight option.' },
  { from: 'Lahore', to: 'Karachi', mode: 'flight', provider: 'Domestic airline', time: '1.8 hrs', fare: 24000, safety: 'High', note: 'Fastest option.' },
  { from: 'Lahore', to: 'Karachi', mode: 'bus', provider: 'Intercity bus', time: '20-24 hrs', fare: 7000, safety: 'Medium', note: 'Budget but tiring.' },
  { from: 'Lahore', to: 'Karachi', mode: 'car', provider: 'Private car', time: '16-18 hrs', fare: 42000, safety: 'Medium', note: 'Good for group only.' },
  { from: 'Islamabad', to: 'Murree', mode: 'car', provider: 'Private car / van', time: '1.5-2 hrs', fare: 3500, safety: 'Medium', note: 'Check snow/fog alerts.' },
  { from: 'Islamabad', to: 'Murree', mode: 'bus', provider: 'Local coach', time: '2-3 hrs', fare: 900, safety: 'Medium', note: 'Cheapest.' },
  { from: 'Islamabad', to: 'Murree', mode: 'train', provider: 'No direct train', time: 'N/A', fare: 0, safety: 'N/A', note: 'Use bus/car because Murree has no direct train.', fallback: true },
  { from: 'Karachi', to: 'Islamabad', mode: 'flight', provider: 'Domestic airline', time: '2 hrs', fare: 25000, safety: 'High', note: 'Fastest option between the two cities.' },
  { from: 'Karachi', to: 'Lahore', mode: 'train', provider: 'Green Line Express', time: '18-20 hrs', fare: 6500, safety: 'High', note: 'Comfortable overnight option.' },
  { from: 'Islamabad', to: 'Swat', mode: 'car', provider: 'Private car via Swat Expressway', time: '3-4 hrs', fare: 8000, safety: 'High', note: 'Swat Expressway makes this a smooth ride.' },
  { from: 'Islamabad', to: 'Swat', mode: 'bus', provider: 'Local coach to Mingora', time: '4-5 hrs', fare: 1500, safety: 'High', note: 'Budget friendly route to the Switzerland of Pakistan.' },
  { from: 'Islamabad', to: 'Naran', mode: 'car', provider: 'Private car / jeep via N-15', time: '6-7 hrs', fare: 15000, safety: 'Medium', note: 'Seasonal route — closed in heavy winter snow.' },
  { from: 'Islamabad', to: 'Naran', mode: 'bus', provider: 'Tourist coach (seasonal)', time: '7-8 hrs', fare: 2800, safety: 'Medium', note: 'Summer season only; verify road status.' },
]

export interface HotelOption {
  city: string
  name: string
  budget: 'budget' | 'mid' | 'premium'
  price: number
  rating: number
  area: string
}

export const hotelsData: HotelOption[] = [
  { city: 'Islamabad', name: 'Serena Hotel', budget: 'premium', price: 36000, rating: 4.6, area: 'Khayaban-e-Suharwardy' },
  { city: 'Islamabad', name: 'Hotel One Blue Area', budget: 'mid', price: 13000, rating: 4.0, area: 'Blue Area' },
  { city: 'Islamabad', name: 'Capital Guest House', budget: 'budget', price: 5000, rating: 3.7, area: 'G-9' },
  { city: 'Lahore', name: 'Pearl Continental Lahore', budget: 'premium', price: 28000, rating: 4.5, area: 'Mall Road' },
  { city: 'Lahore', name: 'Hotel One Gulberg', budget: 'mid', price: 12000, rating: 4.1, area: 'Gulberg' },
  { city: 'Lahore', name: 'Budget Inn Lahore', budget: 'budget', price: 5500, rating: 3.8, area: 'Railway Station' },
  { city: 'Hunza', name: "Eagle's Nest Hunza", budget: 'premium', price: 22000, rating: 4.5, area: 'Duikar Viewpoint' },
  { city: 'Hunza', name: 'Karimabad Guest House', budget: 'budget', price: 6500, rating: 4.0, area: 'Karimabad Bazaar' },
  { city: 'Hunza', name: 'Hunza Serena Inn', budget: 'mid', price: 14000, rating: 4.3, area: 'Karimabad' },
  { city: 'Skardu', name: 'Shangrila Resort Skardu', budget: 'premium', price: 30000, rating: 4.6, area: 'Lower Kachura Lake' },
  { city: 'Skardu', name: 'Mountain Lodge Skardu', budget: 'mid', price: 11000, rating: 4.1, area: 'Skardu City' },
  { city: 'Skardu', name: 'Baltistan Backpackers', budget: 'budget', price: 4500, rating: 3.9, area: 'Yadgar Chowk' },
  { city: 'Karachi', name: 'Mövenpick Karachi', budget: 'premium', price: 27000, rating: 4.4, area: 'Club Road' },
  { city: 'Karachi', name: 'Hotel Mehran', budget: 'mid', price: 12000, rating: 4.0, area: 'Shahrah-e-Faisal' },
  { city: 'Murree', name: 'Hotel One Mall Road Murree', budget: 'mid', price: 12500, rating: 4.0, area: 'Mall Road' },
  { city: 'Murree', name: 'Shangrila Resort Murree', budget: 'premium', price: 21000, rating: 4.3, area: 'Kashmir Point' },
  { city: 'Swat', name: 'Swat Serena Hotel', budget: 'premium', price: 24000, rating: 4.5, area: 'Saidu Sharif' },
  { city: 'Swat', name: 'Rock City Resort', budget: 'mid', price: 13000, rating: 4.2, area: 'Fizagat' },
  { city: 'Naran', name: 'Pine Top Hotel Naran', budget: 'mid', price: 12000, rating: 4.0, area: 'Naran Bazaar' },
  { city: 'Naran', name: 'Fairy Land Hotel', budget: 'budget', price: 6000, rating: 3.8, area: 'Main Naran' },
]

export const alertsEn = [
  'Northern routes may close during snow, rain or landslides.',
  'Motorway fog can affect Lahore-Islamabad travel.',
  'Keep CNIC, cash, water and power bank.',
  'Use daytime travel for Hunza, Skardu and mountain routes.',
]

export const alertsUr = [
  'پہاڑی راستے برف یا لینڈ سلائیڈ سے بند ہو سکتے ہیں۔',
  'لاہور اسلام آباد موٹروے پر دھند سفر متاثر کر سکتی ہے۔',
  'شناختی کارڈ، نقدی، پانی اور پاور بینک ساتھ رکھیں۔',
  'شمالی علاقوں میں دن کے وقت سفر بہتر ہے۔',
]

export const emergencyContacts = [
  { key: 'police', label: 'Police', number: '15' },
  { key: 'rescue', label: 'Rescue', number: '1122' },
  { key: 'motorway', label: 'Motorway Police', number: '130' },
  { key: 'tourist', label: 'Tourist Helpline', number: '1422' },
]

export interface Destination {
  slug: string
  name: string
  region: string
  tagline: string
  description: string
  image: string
  highlights: string[]
  bestSeason: string
}

export const destinationsData: Destination[] = [
  {
    slug: 'hunza',
    name: 'Hunza Valley',
    region: 'Gilgit-Baltistan',
    tagline: 'The crown jewel of the Karakoram',
    description:
      'Home to Rakaposhi views, Baltit and Altit forts, apricot orchards and the turquoise Attabad Lake. Hunza is Pakistan\u2019s most beloved mountain valley, offering unmatched hospitality and epic Karakoram Highway journeys.',
    image: '/images/hunza.png',
    highlights: ['Baltit Fort', 'Attabad Lake', 'Eagle\u2019s Nest viewpoint', 'Passu Cones', 'Khunjerab Pass'],
    bestSeason: 'April – October',
  },
  {
    slug: 'skardu',
    name: 'Skardu',
    region: 'Gilgit-Baltistan',
    tagline: 'Gateway to the mighty peaks',
    description:
      'The basecamp of K2 expeditions, Skardu offers Shangrila Resort, Sheosar Lake, Deosai Plains and cold desert landscapes. A paradise for trekkers, photographers and adventurers.',
    image: '/images/skardu.jpg',
    highlights: ['Shangrila Resort', 'Deosai National Park', 'Sheosar Lake', 'Kharpocho Fort', 'Sarfaranga Cold Desert'],
    bestSeason: 'May – September',
  },
  {
    slug: 'fairy-meadows',
    name: 'Fairy Meadows',
    region: 'Gilgit-Baltistan',
    tagline: 'A grassland beneath Nanga Parbat',
    description:
      'One of the world\u2019s most scenic camping spots, Fairy Meadows offers a direct view of Nanga Parbat, the ninth highest mountain on Earth. Reached by a thrilling jeep track and hike.',
    image: '/images/fairy-meadows.png',
    highlights: ['Nanga Parbat view', 'Alpine camping', 'Beyal Camp trek', 'Raikot Bridge jeep ride'],
    bestSeason: 'May – September',
  },
  {
    slug: 'naran-kaghan',
    name: 'Naran Kaghan',
    region: 'Khyber Pakhtunkhwa',
    tagline: 'Valley of lakes and legends',
    description:
      'Saif-ul-Malook, the lake of fairytales, crowns this alpine valley. Naran and Kaghan offer riverside resorts, trout fishing, and the dramatic Babusar Pass crossing.',
    image: '/images/naran-kaghan.png',
    highlights: ['Lake Saif-ul-Malook', 'Babusar Pass', 'Lulusar Lake', 'Trout fishing on the Kunhar'],
    bestSeason: 'June – September',
  },
  {
    slug: 'swat',
    name: 'Swat Valley',
    region: 'Khyber Pakhtunkhwa',
    tagline: 'The Switzerland of Pakistan',
    description:
      'Green meadows, the Swat River, Malam Jabba ski resort and ancient Buddhist heritage. Swat combines natural beauty with a rich Gandhara past.',
    image: '/images/swat.png',
    highlights: ['Malam Jabba ski resort', 'Kalam Valley', 'Mahodand Lake', 'Buddhist stupas of Gandhara'],
    bestSeason: 'Year-round (snow in winter)',
  },
  {
    slug: 'murree',
    name: 'Murree',
    region: 'Punjab',
    tagline: 'The classic hill station escape',
    description:
      'Just two hours from Islamabad, Murree\u2019s Mall Road, pine forests and cable cars make it Pakistan\u2019s most visited hill resort — magical under winter snow.',
    image: '/images/murree.png',
    highlights: ['Mall Road', 'Patriata chairlift', 'Kashmir Point', 'Pindi Point'],
    bestSeason: 'Year-round',
  },
  {
    slug: 'neelum-valley',
    name: 'Neelum Valley',
    region: 'Azad Kashmir',
    tagline: 'Emerald river, wooden villages',
    description:
      'The Neelum River winds through Keran, Sharda and Arang Kel — wooden villages perched above emerald water, connected by footbridges and hiking trails.',
    image: '/images/neelum-valley.png',
    highlights: ['Arang Kel', 'Sharda ruins', 'Keran riverside', 'Ratti Gali Lake'],
    bestSeason: 'April – October',
  },
  {
    slug: 'islamabad',
    name: 'Islamabad',
    region: 'Capital Territory',
    tagline: 'The green capital',
    description:
      'Faisal Mosque, Margalla Hills trails, Daman-e-Koh viewpoints and modern dining. Islamabad is the calm, organized gateway to the northern areas.',
    image: '/images/islamabad.png',
    highlights: ['Faisal Mosque', 'Margalla Hills trails', 'Daman-e-Koh', 'Pakistan Monument', 'Lok Virsa Museum'],
    bestSeason: 'Year-round',
  },
  {
    slug: 'lahore',
    name: 'Lahore',
    region: 'Punjab',
    tagline: 'The heart of Pakistan',
    description:
      'Lahore Fort, Badshahi Mosque, Shalimar Gardens and legendary food streets. Lahore is Pakistan\u2019s cultural capital — Mughal grandeur meets modern energy.',
    image: '/images/lahore.png',
    highlights: ['Lahore Fort', 'Badshahi Mosque', 'Shalimar Gardens', 'Walled City', 'Food Street Gawalmandi'],
    bestSeason: 'October – March',
  },
  {
    slug: 'karachi',
    name: 'Karachi',
    region: 'Sindh',
    tagline: 'The city of lights by the sea',
    description:
      'Clifton Beach, Mazar-e-Quaid, Port Grand and a food scene that never sleeps. Karachi is Pakistan\u2019s biggest metropolis and its gateway to the Arabian Sea.',
    image: '/images/karachi.png',
    highlights: ['Clifton Beach', 'Mazar-e-Quaid', 'Frere Hall', 'Port Grand', 'French Beach'],
    bestSeason: 'November – February',
  },
  {
    slug: 'gwadar',
    name: 'Gwadar',
    region: 'Balochistan',
    tagline: 'Hammerhead of the Arabian Sea',
    description:
      'Dramatic cliffs, the Hingol National Park moonscapes, Princess of Hope, and pristine beaches along the Makran Coastal Highway.',
    image: '/images/gwadar.png',
    highlights: ['Gwadar Port viewpoint', 'Hingol National Park', 'Princess of Hope', 'Kund Malir beach'],
    bestSeason: 'October – March',
  },
  {
    slug: 'mohenjo-daro',
    name: 'Mohenjo-daro',
    region: 'Sindh',
    tagline: '4,500 years of history',
    description:
      'One of the world\u2019s earliest major cities and a UNESCO World Heritage Site. Walk the streets of the Indus Valley Civilization, see the Great Bath and the famous Priest-King.',
    image: '/images/mohenjo-daro.png',
    highlights: ['Great Bath', 'Stupa mound', 'On-site museum', 'Indus Valley streets'],
    bestSeason: 'November – February',
  },
]

export const cultureCards = [
  { key: 'truckArt', titleKey: 'truckArt', descKey: 'truckArtDesc' },
  { key: 'sufi', titleKey: 'sufiHeritage', descKey: 'sufiDesc' },
  { key: 'crafts', titleKey: 'handicrafts', descKey: 'craftsDesc' },
  { key: 'food', titleKey: 'foodStreets', descKey: 'foodDesc' },
] as const
