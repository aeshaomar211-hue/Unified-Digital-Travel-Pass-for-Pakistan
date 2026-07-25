import type { Itinerary } from './itinerary-schema'

// Real destination data for Pakistan's top destinations
const destinationData: Record<
  string,
  {
    region: string
    bestTime: string
    costPerDay: number
    highlights: Array<{ name: string; cost: number; description: string }>
    breakfasts: string[]
    lunches: string[]
    dinners: string[]
    hotels: string[]
    summary: string
    alerts: string[]
    packing: string[]
    tips: string[]
  }
> = {
  hunza: {
    region: 'Gilgit-Baltistan',
    bestTime: 'May to October (Cherry blossom in April)',
    costPerDay: 4500,
    highlights: [
      { name: 'Baltit Fort – 700-year-old royal fort with panoramic views', cost: 300, description: 'Explore the ancient Karimabad fort, a UNESCO-nominated site with breathtaking mountain vistas.' },
      { name: 'Attabad Lake – turquoise blue glacial lake by kayak or boat', cost: 600, description: 'Take a boat ride on the stunning turquoise lake formed by the 2010 landslide.' },
      { name: 'Altit Fort – older than Baltit with Hunza River gorge views', cost: 200, description: 'Visit one of the oldest surviving buildings in the region, dating back 900 years.' },
      { name: 'Eagle\'s Nest viewpoint – sunrise over Rakaposhi and Ultar', cost: 0, description: 'Hike to the famous viewpoint at 3,600m for a jaw-dropping sunrise panorama.' },
      { name: 'Duikar Village – terrace-farm hamlet above Karimabad', cost: 100, description: 'Walk through ancient apricot orchards and stone-paved lanes of a traditional village.' },
      { name: 'Passu Cones – iconic cathedral-like rock towers', cost: 0, description: 'Trek around the dramatic Passu Cathedral peaks reflected in the Passu lake.' },
    ],
    breakfasts: ['Chapshuro (meat-stuffed flatbread) at Café de Hunza', 'Apricot jam with local bread at Serena Hunza', 'Walnut pancakes with honey at Old Hunza Inn'],
    lunches: ['Tumuro (wild rose tea) and trout at Hunza Serena Inn', 'Dawdo (noodle soup) at local dhaba on Karimabad Bazaar', 'Diram Phitti (rice porridge) with dried fruits'],
    dinners: ['Harissa (wheat and meat porridge) at Marco Polo Inn', 'Chicken karahi at Karimabad Restaurant', 'Fresh mountain trout grilled at Old Hunza Inn'],
    hotels: ['Serena Hunza (luxury)', 'Old Hunza Inn (mid-range)', 'Karimabad Guest House (budget)'],
    summary: 'Hunza Valley is one of Pakistan\'s most breathtaking destinations, nestled between the Karakoram giants. Turquoise lakes, centuries-old forts, terraced apricot orchards, and the legendary hospitality of the Hunzai people make this an unforgettable Himalayan escape.',
    alerts: [
      'Karakoram Highway closures: Check the KKH status before departure — landslides can block the road between Gilgit and Hunza, especially in July–August.',
      'Altitude adjustment: Karimabad sits at 2,400m. Spend Day 1 acclimatizing; avoid strenuous hikes on arrival day.',
      'Mobile connectivity: Jazz/Zong networks work in Karimabad town but disappear on remote treks. Download offline maps before heading out.',
      'Cash only: ATMs in Hunza are unreliable. Bring sufficient PKR from Gilgit or Islamabad.',
      'Passport check-points: Carry original CNIC/passport at all times — there are security checkpoints at Raikot Bridge and Sost.',
    ],
    packing: ['Warm fleece jacket (temperature drops to 5°C at night)', 'Sunscreen SPF 50+ (high altitude UV)', 'Trekking boots with ankle support', 'Cash in PKR', 'Offline maps (Maps.me or Google Maps offline)', 'Reusable water bottle', 'Rain poncho (afternoon showers June–August)', 'Power bank (load-shedding in remote areas)'],
    tips: [
      'The best viewpoint is Eagle\'s Nest — start the hike before 5 AM for a sunrise nobody forgets.',
      'Local micro-bus from Aliabad to Karimabad costs PKR 30. Taxis charge PKR 500+ — always agree on price first.',
      'Dress modestly when visiting forts and villages; shoulders and knees covered is appreciated.',
      'Try the local apricot oil — it\'s sold at the Karimabad bazaar and makes an excellent, lightweight souvenir.',
      'Inform your hotel before returning late from hikes. Local guides charge PKR 1,500–2,500/day and are worth every rupee for safety.',
    ],
  },
  skardu: {
    region: 'Gilgit-Baltistan',
    bestTime: 'June to September (K2 base camp season)',
    costPerDay: 5000,
    highlights: [
      { name: 'Shangrila Resort (Lower Kachura Lake) – emerald lake in the desert', cost: 500, description: 'Visit the legendary "paradise on earth" lake surrounded by mountains and fruit gardens.' },
      { name: 'Deosai National Park – world\'s second-highest plateau', cost: 800, description: 'Drive across the vast 3,000m plateau blooming with wildflowers, home to Himalayan brown bears.' },
      { name: 'Skardu Fort (Kharpocho) – 16th-century fort above Skardu town', cost: 100, description: 'Climb to the ancient fort perched on a rocky ridge for sweeping views of the Indus River.' },
      { name: 'Satpara Lake – deep-blue glacial lake 8km from Skardu', cost: 200, description: 'Enjoy boating on the crystal-clear high-altitude lake surrounded by snow peaks.' },
      { name: 'Shigar Fort Palace – restored Mughal-era fort converted to heritage hotel', cost: 300, description: 'Explore the beautifully restored 17th-century fort and its traditional wooden architecture.' },
      { name: 'Cold Desert Safari – unique desert sand dunes at 2,200m', cost: 1500, description: 'Experience one of the world\'s highest deserts with jeep safari and camel rides.' },
    ],
    breakfasts: ['Lahori-style omelette with naan at Masherbrum Hotel', 'Kashmiri chai with local bread at Shangrila', 'Fruit plate (apricots, apples) from Skardu bazaar'],
    lunches: ['Wazwan (multi-course feast) at Shingo La Restaurant', 'Mutton karahi at Concordia Restaurant', 'Chicken steam at local dhaba near Karakoram Bazaar'],
    dinners: ['Grilled river trout at K2 Motel', 'Sajji (whole roasted lamb) at Skardu Palace Hotel', 'Dal makhani with roti at Masherbrum Restaurant'],
    hotels: ['Shigar Fort Heritage Hotel (luxury)', 'K2 Motel (mid-range)', 'Concordia Guest House (budget)'],
    summary: 'Skardu is the gateway to K2 and the Karakoram giants, offering some of the most dramatic high-altitude scenery on earth. From the mystical Deosai Plains to emerald lakes and vast deserts — all above 2,000 metres — this valley delivers raw, awe-inspiring Pakistan.',
    alerts: [
      'Flight cancellations: PIA Skardu flights cancel frequently due to bad weather. Book the road route as a backup and allow 2 extra buffer days.',
      'Deosai Park closes mid-November to May due to snowfall — verify access dates before planning.',
      'Altitude sickness risk: Deosai is at 4,114m. Symptoms include headache, nausea, dizziness. Descend immediately if severe.',
      'No ATMs beyond Skardu town. Carry all the cash you need before leaving Islamabad.',
      'Hire a local Jeep with driver for Deosai and remote areas — standard sedans cannot handle the tracks.',
    ],
    packing: ['Layered clothing (temperature swings 30°C in one day)', 'Waterproof trekking boots', 'Altitude sickness medicine (Diamox)', 'High SPF sunscreen', 'Warm sleeping bag (if camping Deosai)', 'Cash in PKR', 'Satellite communicator for K2 base camp treks', 'First aid kit'],
    tips: [
      'Book Shigar Fort Heritage Hotel 3 months in advance for peak season (July–August) — it sells out.',
      'The Skardu bazaar has the best dried fruit and nut shops in Pakistan — stock up on apricots and almonds.',
      'Local jeep hire to Deosai costs PKR 6,000–8,000 for the day. Split with fellow travelers to reduce cost.',
      'Do not swim in Satpara or Kachura lakes — water is glacial cold and currents are deceptive.',
      'Respect wildlife in Deosai — Himalayan brown bear sightings are possible; maintain safe distance and never feed them.',
    ],
  },
  lahore: {
    region: 'Punjab',
    bestTime: 'October to March (Winter is pleasant)',
    costPerDay: 3500,
    highlights: [
      { name: 'Badshahi Mosque – 17th-century Mughal masterpiece', cost: 0, description: 'Marvel at one of the world\'s largest mosques, built by Aurangzeb in 1673, with courtyard for 100,000 worshippers.' },
      { name: 'Lahore Fort & Sheesh Mahal – UNESCO World Heritage Site', cost: 500, description: 'Walk through the magnificent Mughal royal fort, home to the Mirror Palace with thousands of inlaid glass pieces.' },
      { name: 'Shalimar Gardens – UNESCO-listed Mughal garden', cost: 100, description: 'Stroll through the 17th-century tiered garden of Shah Jahan, with fountains and marble pavilions.' },
      { name: 'Food Street, Gawalmandi – Lahore\'s legendary open-air dining', cost: 800, description: 'Experience Lahore\'s famous food street with heritage havelis illuminated at night and every Punjabi dish imaginable.' },
      { name: 'Data Ganj Baksh Shrine – 11th-century Sufi dargah', cost: 0, description: 'Visit the most sacred Sufi shrine in South Asia, open 24 hours, with qawwali music on Thursday nights.' },
      { name: 'Wazir Khan Mosque – finest Mughal tile work in Pakistan', cost: 200, description: 'Explore the exquisite 1634 mosque covered in intricate faience tile work and frescoes.' },
    ],
    breakfasts: ['Halwa Puri with chana at Waris Nihari on McLeod Road', 'Lahori Nashta (Paye, Nehari, Halwa Puri) at Butt Karahi', 'Khagina (egg omelette) at Fort Road Food Street'],
    lunches: ['Anarkali Bazaar food stalls – seekh kebab and naan', 'Butt Karahi for legendary chicken karahi', 'Desi ghee saag with makki ki roti near Shalimar Gardens'],
    dinners: ['Cooco\'s Den for rooftop Lahori dinner with Mughal fort view', 'Fort Road Food Street – Lahori cuisine al fresco', 'Haveli Restaurant for traditional Punjabi thali'],
    hotels: ['Pearl Continental Lahore (luxury)', 'Avari Towers (mid-range)', 'Hotel One Mall Road (budget)'],
    summary: 'Lahore is the cultural heartbeat of Pakistan — a city where Mughal grandeur, Sikh heritage, and modern energy collide. Every narrow alley in the Walled City tells a thousand-year story, and the food here is the undisputed best in Pakistan.',
    alerts: [
      'Smog season: Lahore ranks among the world\'s most polluted cities in November–January. Pack an N95 mask if you have respiratory issues.',
      'Traffic congestion is extreme during morning (8–10 AM) and evening (5–8 PM) rush hours — plan museum visits accordingly.',
      'Petty theft in crowded bazaars (Anarkali, Landa Bazaar): keep phones in front pockets and bags zipped.',
      'Heat advisory: April–June temperatures exceed 40°C. Stay hydrated and plan outdoor sightseeing before 10 AM.',
      'Friday closures: Badshahi Mosque and Lahore Fort close to tourists during Friday prayer time (11:30 AM–2 PM).',
    ],
    packing: ['Comfortable walking shoes (extensive cobblestone areas)', 'N95 mask (winter smog)', 'Modest clothing for mosques and shrines', 'Dupatta/scarf for women visiting religious sites', 'Sunscreen and hat for summer', 'Cash (many old city vendors do not accept cards)', 'Hand sanitizer for bazaar visits'],
    tips: [
      'Hire a local guide in the Walled City (PKR 1,500–2,000) — the alleys are a labyrinth and the stories are priceless.',
      'Friday night at Data Ganj Baksh Shrine for live qawwali is one of the most extraordinary experiences in Pakistan.',
      'Rickshaw fare from Lahore Fort to Anarkali Bazaar should be PKR 80–120, not more — agree before boarding.',
      'The best time to photograph Badshahi Mosque is sunrise or golden hour — the marble turns gold.',
      'Try Lahori Rabri at a kulfa stall after dinner — it is the city\'s most beloved dessert.',
    ],
  },
  islamabad: {
    region: 'Federal Territory',
    bestTime: 'October to April (Spring blooms in March)',
    costPerDay: 4000,
    highlights: [
      { name: 'Faisal Mosque – largest mosque in South Asia', cost: 0, description: 'Visit the stunning contemporary mosque designed by Vedat Dalokay, set against the Margalla Hills backdrop.' },
      { name: 'Margalla Hills National Park – hiking trails above the capital', cost: 0, description: 'Trek Trail 3 or Trail 5 through forest to viewpoints overlooking the entire city grid below.' },
      { name: 'Pakistan Monument – lotus-shaped marble monument to national unity', cost: 150, description: 'Explore the striking monument and its museum tracing Pakistan\'s 5,000-year history.' },
      { name: 'Lok Virsa Museum – Pakistan\'s folk and heritage museum', cost: 200, description: 'Browse exceptional traditional crafts, textiles, musical instruments, and regional art from all provinces.' },
      { name: 'Saidpur Village – 500-year-old Hindu-era village turned arts hub', cost: 0, description: 'Wander through the beautifully restored ancient village now home to galleries, restaurants, and temples.' },
      { name: 'Daman-e-Koh – hillside garden with city panorama', cost: 50, description: 'Drive up to this PTDC viewpoint for the best panoramic photograph of Islamabad\'s grid layout.' },
    ],
    breakfasts: ['Nirala Sweets for fresh samosas and parathas', 'Café Aylanto for continental breakfast', 'Fatima Jinnah Park kiosk for chai and bun kebab'],
    lunches: ['Savour Foods for Islamabad\'s most famous chicken karahi', 'Tuscany Courtyard for grilled sandwiches', 'Monal Restaurant on Margalla Hills – with panoramic view'],
    dinners: ['Monal Restaurant – Islamabad\'s most scenic dinner spot at 1,100m', 'Chaaye Khana for Pakistani high tea and dinner', 'Kohsar Market Food Street for diverse options'],
    hotels: ['Serena Hotel Islamabad (luxury)', 'Islamabad Hotel (mid-range)', 'Holiday Inn Express Blue Area (budget)'],
    summary: 'Islamabad is Pakistan\'s planned capital — clean, green, and surprisingly peaceful. Set against the Margalla Hills with a disciplined grid layout, it is the perfect base for exploring the north, combining modern amenities with quick access to Taxila\'s ancient ruins and Murree\'s pine hills.',
    alerts: [
      'Protest disruptions: Islamabad is frequently affected by sit-ins and protests that close the Blue Area and Constitution Avenue. Check local news before planning city-centre visits.',
      'Margalla Hills leopard advisory: Rare but confirmed leopard sightings on Trail 5 after dark — do not hike alone after 5 PM.',
      'Diplomatic Enclave is a restricted area — do not photograph embassies or security installations.',
      'Smog in winter (December–February) is less severe than Lahore but still present. N95 mask recommended for sensitive individuals.',
    ],
    packing: ['Comfortable walking shoes for hill trails', 'Light jacket for Margalla Hills evenings', 'Sunscreen and sunglasses', 'Modest clothing for Faisal Mosque visit', 'Camera (photogenic city)', 'Cash and Visa/Mastercard (well-accepted in F-6/F-7 markets)'],
    tips: [
      'Monal Restaurant requires a reservation 2–3 days ahead for weekends — book online or call before arriving.',
      'Trail 3 on Margalla Hills is a 1.5-hour loop — go early morning (6–8 AM) for cooler air and bird-watching.',
      'Daewoo Express from Islamabad to Lahore (PKR 950) is comfortable, punctual, and far better than the train for this route.',
      'Best mobile coverage: Jazz and Telenor both work well across the city; internet is fast at hotels.',
      'The Sunday Bazaar in F-6 is one of Pakistan\'s best flea markets — early morning before 9 AM for the best finds.',
    ],
  },
  karachi: {
    region: 'Sindh',
    bestTime: 'November to February (Monsoon July–August)',
    costPerDay: 4000,
    highlights: [
      { name: 'Mazar-e-Quaid – white marble mausoleum of Pakistan\'s founder', cost: 0, description: 'Visit the iconic 43m-high marble monument and the museum housing Jinnah\'s personal belongings.' },
      { name: 'Clifton Beach (Sea View) – Karachi\'s iconic seaside promenade', cost: 200, description: 'Walk the busy beachfront, enjoy camel rides and sugarcane juice, and watch the sunset over the Arabian Sea.' },
      { name: 'Mohatta Palace Museum – pink sandstone Indo-Saracenic palace', cost: 200, description: 'Tour the beautifully preserved 1927 palace and its art exhibitions in the heart of Clifton.' },
      { name: 'Empress Market – British-era Victorian covered bazaar', cost: 0, description: 'Explore the 1889 colonial market with its distinctive clock tower and labyrinthine bazaars.' },
      { name: 'Manora Island – historic island with 200-year-old lighthouse', cost: 400, description: 'Take a 20-minute boat ride to the peaceful island with a colonial lighthouse and unspoiled beach.' },
      { name: 'Burns Road Food Street – Karachi\'s legendary food district', cost: 600, description: 'Experience the most famous food street in Pakistan, known for nihari, haleem, and seekh kebab.' },
    ],
    breakfasts: ['Nihari and naan at Waheed Nihari, Burns Road', 'Halwa Puri at Iqbal Bakery, Saddar', 'Bun kebab at any street cart near Empress Market'],
    lunches: ['Bundoo Khan Restaurant for legendary seekh kebab', 'Burns Road for haleem and paya', 'Kolachi Restaurant on the waterfront for fish and seafood'],
    dinners: ['Kolachi for fresh arabian sea fish with beach view', 'Village Restaurant for Sindhi mutton curry', 'Bar.B.Q Tonight for open-air BBQ karahi'],
    hotels: ['Pearl Continental Karachi (luxury)', 'Movenpick Karachi (mid-range)', 'Hotel Faran Clifton (budget)'],
    summary: 'Karachi is Pakistan\'s megacity — chaotic, vibrant, and endlessly fascinating. The City of Lights packs the country\'s finest food, oldest colonial architecture, a booming art scene, and the Arabian Sea shoreline into one relentless, never-sleeping urban adventure.',
    alerts: [
      'Traffic and road safety: Karachi traffic is aggressive. Use Careem or InDrive app instead of negotiating with individual rickshaws or taxis for safety and fixed fares.',
      'Beach safety: Karachi beaches have strong undercurrents. Do NOT swim at Sea View/Clifton or Sandspit — multiple drownings occur each year. Stay on the shore.',
      'Heat: May–August temperatures exceed 38°C with high humidity. Plan outdoor activities before 10 AM or after 5 PM.',
      'Manora ferry: Boats from Keamari to Manora can be rough in monsoon season (July–August) — confirm weather before booking.',
      'Burns Road is busiest and safest from 7 PM–11 PM. Avoid isolated streets after midnight.',
    ],
    packing: ['Light cotton clothing for humid heat', 'Sunscreen SPF 50+', 'Insect repellent for beach areas', 'Comfortable sandals for beach and bazaar walking', 'Cash and debit card (both widely accepted in Clifton area)', 'N95 mask for traffic areas', 'Umbrella (monsoon season)'],
    tips: [
      'Book Kolachi Restaurant for sunset dinner — the view of the port and Arabian Sea is spectacular from 6–7 PM.',
      'Karachi has Pakistan\'s best contemporary art galleries — Canvas Gallery and VM Art Gallery in Clifton are free to enter.',
      'The cheapest and most authentic food experience is Burns Road — budget PKR 300–500 for a full nihari breakfast.',
      'Careem/InDrive app is essential — never take an unmetered taxi in Karachi.',
      'Empress Market vendors operate on aggressive bargaining — start at 40% of first quoted price.',
    ],
  },
  swat: {
    region: 'Khyber Pakhtunkhwa',
    bestTime: 'April to October (Skiing at Malam Jabba December–February)',
    costPerDay: 2800,
    highlights: [
      { name: 'Malam Jabba Ski Resort – Pakistan\'s premier ski destination', cost: 1200, description: 'Pakistan\'s highest ski resort with slopes for all levels, chairlift rides, and snow activities.' },
      { name: 'Swat Museum – Gandhara civilization artifacts', cost: 100, description: 'Browse one of Pakistan\'s finest archaeological collections with 2,500-year-old Buddhist Gandhara sculptures.' },
      { name: 'Fizagat Park – riverside park with waterfalls and pine forest', cost: 50, description: 'Relax in the shaded riverside park with pools, walking trails, and a mini zoo.' },
      { name: 'Kalam Valley – Switzerland of Pakistan at 2,000m', cost: 0, description: 'Drive 3 hours north to the lush green meadows, crystal rivers, and alpine lakes of upper Swat.' },
      { name: 'Udegram – ancient Hindu Shahi ruins above Mingora', cost: 100, description: 'Hike to the ruins of the 9th-century Hindu Shahi capital with panoramic Swat Valley views.' },
      { name: 'Mahodand Lake – remote alpine lake at 3,000m in Ushu Valley', cost: 500, description: 'Trek or jeep to one of KP\'s most beautiful emerald lakes, surrounded by wildflower meadows.' },
    ],
    breakfasts: ['Freshly caught trout fried with naan at Kalam riverside dhaba', 'Honey and bread at a local Mingora bakery', 'Chapli kebab breakfast at GT Road dhaba'],
    lunches: ['Trout with rice at PTDC Motel Kalam', 'Chapli kebab and naan at Mingora bazaar', 'Chicken karahi at Palace Swat Hotel'],
    dinners: ['Rainbow Trout Restaurant, Kalam for river-fresh trout', 'Swat Serena for traditional Pashto cuisine', 'Local grill house in Mingora for sajji'],
    hotels: ['Swat Serena Hotel (luxury)', 'PTDC Motel Kalam (mid-range)', 'Hotel Rose Palace Mingora (budget)'],
    summary: 'Swat Valley — the "Switzerland of Asia" — offers lush green valleys, crystal rivers, ancient Buddhist ruins, and the thrill of Pakistan\'s only ski resort. Long recovered and thriving, Swat is once again one of Pakistan\'s most welcoming and gorgeous destinations.',
    alerts: [
      'Security clearance: Foreign visitors require an NOC (No Objection Certificate) from the district government before entering Swat. Arrange at least 5 days in advance through your embassy or a local travel agent.',
      'Road closures: The Swat Expressway is excellent, but mountain roads to Kalam and Mahodand are rough. A 4WD vehicle is essential beyond Bahrain.',
      'Kalam Valley road floods during monsoon (July–August). Check road status with PTDC Kalam Motel before travelling.',
      'Mobile network: Jazz/Zong works in Mingora. Coverage disappears completely beyond Bahrain. Download offline maps.',
      'Malam Jabba weather: Ski season is December–February. Snow depth varies — check Malam Jabba Resort website before booking ski packages.',
    ],
    packing: ['Warm fleece jacket (cool evenings even in summer)', 'Trekking boots for Kalam and Mahodand', 'Rain jacket (afternoon showers common June–August)', 'Modest clothing (conservative Pashtun culture)', 'Cash only (no ATMs beyond Mingora)', 'Offline maps', 'NOC document printout (foreign travelers)'],
    tips: [
      'The drive from Mingora to Kalam (3 hrs) is itself spectacular — sit on the left side of the vehicle for river views.',
      'Book trout at a riverside dhaba in Kalam and ask them to cook it while you wait — freshest fish you will ever taste.',
      'Mahodand Lake requires a jeep from Kalam (PKR 4,000 round trip) — share with other travelers at the Kalam jeep stand.',
      'Swat Museum in Saidu Sharif is free on Fridays and has some of the finest Gandharan Buddhist art in the world.',
      'Shop for handmade Swati embroidery in Mingora bazaar — far cheaper and more authentic than Islamabad shops.',
    ],
  },
  murree: {
    region: 'Punjab (Rawalpindi Division)',
    bestTime: 'December to February (snow) and April to June (spring)',
    costPerDay: 3000,
    highlights: [
      { name: 'Mall Road – Murree\'s colonial-era hilltop promenade', cost: 0, description: 'Stroll the iconic British-era Mall Road lined with Victorian-style shops, food stalls, and mountain views.' },
      { name: 'Pindi Point – cable car ride above pine forest', cost: 400, description: 'Take the scenic chairlift above the Murree pines for sweeping Himalayan panoramas.' },
      { name: 'Patriata (New Murree) – chairlift to 2,200m summit', cost: 500, description: 'Ride Pakistan\'s longest chairlift to the New Murree plateau with 360-degree Himalayan views.' },
      { name: 'Kashmir Point – sunset viewpoint above the city', cost: 0, description: 'The best sunset viewpoint in Murree, overlooking the Jhelum Valley and distant Kashmir peaks.' },
      { name: 'Bhurban – luxury hilltop resort village 10km from Murree', cost: 300, description: 'Visit the exclusive Bhurban plateau for forest walks, PCH golf course, and mountain views.' },
    ],
    breakfasts: ['Aloo paratha with desi ghee at Mall Road dhaba', 'Halwa Puri at Kashmir Bakers on Mall Road', 'Warm cornmeal porridge at a local hotel'],
    lunches: ['Chicken karahi at Lintott\'s Restaurant', 'Grilled corn and chestnuts from Mall Road street vendors', 'Murree Brewery signature lamb chops at Bhurban PCH'],
    dinners: ['Ceret Restaurant at Pearl Continental Bhurban', 'Traditional Pahari cuisine at Murree Hills Hotel', 'Barbecue at a Mall Road roadside restaurant'],
    hotels: ['Pearl Continental Bhurban (luxury)', 'Lockwood Hotel Mall Road (mid-range)', 'Hotel Hill View Mall Road (budget)'],
    summary: 'Murree is Pakistan\'s most beloved hill station — just 60km from Islamabad, it offers pine-scented mountain air, Victorian-era charm, snow-covered peaks in winter, and cool summer retreats. The Mall Road buzz and the sweeping views towards Kashmir are timeless.',
    alerts: [
      'Road blockage in snowfall: The Islamabad–Murree motorway can close without warning during heavy snowfall. Monitor NHMP alerts and carry tyre chains in winter.',
      'Extreme overcrowding: Murree receives 100,000+ visitors on winter weekends. Book hotels 2+ weeks in advance for December–January and avoid driving up on Sundays.',
      'Snow stranding incident: 2022 saw 1,000 vehicles stranded in snowfall. Check weather forecast — if snowfall is predicted, reschedule to a weekday.',
      'Mall Road pickpocketing: Very crowded in peak season — keep valuables secured and bags zipped.',
    ],
    packing: ['Heavy winter coat and thermal underlayers (winter)', 'Non-slip snow boots (winter)', 'Light jacket and comfortable shoes (spring/summer)', 'Gloves and wool hat (December–February)', 'Cash (ATMs often run out on busy weekends)', 'Snow chains if driving your own car in winter'],
    tips: [
      'Patriata chairlift is open 9 AM–5 PM — arrive before 11 AM to avoid 2-hour queues on weekends.',
      'The freshest and cheapest corn on the cob in Pakistan is on Mall Road in autumn — PKR 50 for a roasted cob.',
      'Book Bhurban PCH for weekday stay — 30–40% cheaper than weekends and you get the mountain views to yourself.',
      'Murree to Nathia Gali (1 hr drive) for a quieter, more forested experience without the Mall Road crowds.',
      'The 6 AM mist on Mall Road is magical and completely crowd-free — early risers are rewarded.',
    ],
  },
}

function getDestData(destination: string) {
  const key = destination.toLowerCase().replace(/\s+/g, '').replace('valley', '').replace('hills', '').trim()
  for (const [slug, data] of Object.entries(destinationData)) {
    if (key.includes(slug) || slug.includes(key)) return { data, slug }
  }
  // Default to Hunza if destination not found
  return { data: destinationData.hunza, slug: 'hunza' }
}

export function generateFallbackItinerary(
  destination: string,
  days: number,
  budget: number | undefined,
  travelers: number,
  interests: string[],
): Itinerary {
  const { data } = getDestData(destination)
  const costPerDay = budget ? Math.floor(budget / Math.max(days, 1)) : data.costPerDay
  const totalCost = costPerDay * days

  // Build activities per day by rotating highlights based on interests
  const highlightsCopy = [...data.highlights]
  // Reorder if interests match
  const interestKeywords: Record<string, string[]> = {
    History: ['fort', 'museum', 'monument', 'ruins', 'mausoleum', 'palace', 'mosque', 'shrine'],
    Culture: ['bazaar', 'village', 'market', 'street', 'food'],
    Adventure: ['trek', 'hike', 'ski', 'safari', 'desert', 'lake', 'camp'],
    Nature: ['park', 'garden', 'plateau', 'valley', 'hills', 'lake', 'beach'],
    Food: ['food street', 'burns road', 'restaurant', 'nihari', 'karahi'],
    Photography: ['view', 'panoram', 'sunset', 'sunrise', 'point', 'mosque'],
    Mountains: ['peak', 'glacier', 'karakoram', 'deosai', 'meadow'],
  }

  const scored = highlightsCopy.map((h) => {
    let score = 0
    interests.forEach((interest) => {
      const keywords = interestKeywords[interest] || []
      if (keywords.some((kw) => h.name.toLowerCase().includes(kw) || h.description.toLowerCase().includes(kw))) score++
    })
    return { ...h, score }
  })
  scored.sort((a, b) => b.score - a.score)

  const dayPlans = Array.from({ length: days }, (_, i) => {
    const h1 = scored[i * 2 % scored.length]
    const h2 = scored[(i * 2 + 1) % scored.length]
    const breakfast = data.breakfasts[i % data.breakfasts.length]
    const lunch = data.lunches[i % data.lunches.length]
    const dinner = data.dinners[i % data.dinners.length]

    const activities = [
      {
        time: '8:00 AM',
        title: 'Morning Check-in & Breakfast',
        description: breakfast,
        estimatedCost: Math.floor(costPerDay * 0.1),
      },
      {
        time: '10:00 AM',
        title: h1.name.split('–')[0].trim(),
        description: h1.description,
        estimatedCost: h1.cost,
      },
      {
        time: '1:00 PM',
        title: 'Lunch Break',
        description: lunch,
        estimatedCost: Math.floor(costPerDay * 0.15),
      },
      {
        time: '3:00 PM',
        title: h2.name.split('–')[0].trim(),
        description: h2.description,
        estimatedCost: h2.cost,
      },
      {
        time: '7:00 PM',
        title: 'Dinner & Evening Stroll',
        description: dinner,
        estimatedCost: Math.floor(costPerDay * 0.18),
      },
    ]

    return {
      day: i + 1,
      title: i === 0
        ? `Arrival & First Impressions of ${destination}`
        : i === days - 1
          ? `Final Day – Hidden Gems & Departure`
          : `Day ${i + 1} – ${h1.name.split('–')[0].trim()}`,
      location: destination,
      activities,
      meals: [breakfast, lunch, dinner],
      accommodation: data.hotels[Math.min(i, data.hotels.length - 1)],
    }
  })

  return {
    summary: data.summary,
    bestTimeToVisit: data.bestTime,
    totalEstimatedCost: totalCost,
    currency: 'PKR' as const,
    days: dayPlans,
    packingList: data.packing,
    travelTips: [...data.tips, ...data.alerts.slice(0, 2)],
  }
}
