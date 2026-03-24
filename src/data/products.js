// All images use Pexels CDN with verified heavy construction equipment content

const IMG = {
  jcb_backhoe:      'https://images.pexels.com/photos/2252060/pexels-photo-2252060.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  backhoe_side:     'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  backhoe_site:     'https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  excavator_dig:    'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  excavator_rocky:  'https://images.pexels.com/photos/259618/pexels-photo-259618.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  compactor:        'https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  heavy_machine:    'https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  site_wide:        'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  excavator_large:  'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  bulldozer:        'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
}

export const products = [
  {
    id: 1,
    name: "2024 JCB 3DX",
    category: "Backhoe Loader",
    brand: "JCB",
    year: 2024,
    condition: "Used",
    price: 48000,
    hours: "Low (Under 500)",
    transmission: "4-Speed Synchro",
    location: "Delhi NCR, India",
    badge: "USED",
    image: IMG.jcb_backhoe,
    specs: { Year: 2024, Brand: "JCB", Model: "3DX", Condition: "Used", "Hours Used": "Low (Under 500)", Transmission: "4-Speed Synchro" },
    description: "The 2024 JCB 3DX continues to set the standard for efficiency and versatility in the backhoe loader market. Engineered for maximum productivity, featuring the latest fuel-efficient engine and ergonomic cabin.",
    features: ["EcoMax Engine for 10% higher fuel efficiency", "Heavy-duty boom and dipper for maximum durability", "LiveLink telematics for remote monitoring"],
    maintenance: ["Full service records from JCB Authorized Center", "Recently performed 250-hour inspection and fluid change"]
  },
  {
    id: 2,
    name: "2024 CASE 770EX",
    category: "Backhoe Loader",
    brand: "CASE",
    year: 2024,
    condition: "Used",
    price: 45000,
    hours: "Certified",
    location: "Delhi NCR, India",
    badge: "USED",
    image: IMG.backhoe_side,
    specs: { Year: 2024, Brand: "CASE", Model: "770EX", Condition: "Used", Usage: "Certified" },
    description: "The CASE 770EX is a powerful backhoe loader built for demanding construction environments with proven reliability and strong performance specs.",
    features: ["FPT Industrial engine for high torque", "Pilot-operated hydraulic controls", "Extendable dipper for extra reach"],
    maintenance: ["Recently serviced at CASE authorized dealer", "All hydraulic seals replaced"]
  },
  {
    id: 3,
    name: "2024 CASE 570SV",
    category: "Backhoe Loader",
    brand: "CASE",
    year: 2024,
    condition: "New",
    price: 60000,
    hours: "0",
    location: "Delhi NCR, India",
    badge: "NEW",
    image: IMG.backhoe_site,
    specs: { Year: 2024, Brand: "CASE", Model: "570SV", Condition: "New", Hours: "0 (Brand New)" },
    description: "Brand new 2024 CASE 570SV straight from the factory. Ideal for construction and agricultural operations with best-in-class loader capacity.",
    features: ["Industry-leading 8.5T operating weight", "Powershift transmission", "Integrated LED lighting package"],
    maintenance: ["Full factory warranty included", "First service at 500 hours complimentary"]
  },
  {
    id: 4,
    name: "2021 Caterpillar 323D3",
    category: "Tracked Excavator",
    brand: "Caterpillar",
    year: 2021,
    condition: "Used",
    price: 80000,
    hours: "4,500 hrs",
    location: "Delhi NCR, India",
    badge: "USED",
    image: IMG.excavator_dig,
    specs: { Year: 2021, Brand: "Caterpillar", Model: "323D3", Condition: "Used", Hours: "4,500", "Track Width": "Standard" },
    description: "The CAT 323D3 is a mid-size excavator offering ideal balance of productivity and fuel efficiency. Well-maintained with 4,500 hours and ready for immediate deployment.",
    features: ["Cat C7.1 ACERT engine", "Advanced hydraulic system", "Grade control ready"],
    maintenance: ["Full CAT service history available", "Undercarriage inspected — 80% remaining life"]
  },
  {
    id: 5,
    name: "2024 Hyundai R215",
    category: "Tracked Excavator",
    brand: "Hyundai",
    year: 2024,
    condition: "Used",
    price: 23144,
    hours: "Refurbished",
    location: "Delhi NCR, India",
    badge: "USED",
    image: IMG.excavator_rocky,
    specs: { Year: 2024, Brand: "Hyundai", Model: "R215", Condition: "Refurbished" },
    description: "Hyundai R215 fully refurbished excavator, ideal for mining and infrastructure projects. Excellent value with full inspection certificate.",
    features: ["Smart Power Control system", "Bluetooth telematics module", "Reinforced bucket teeth"],
    maintenance: ["Full refurbishment completed 2024", "New hydraulic pump installed"]
  },
  {
    id: 6,
    name: "2024 CASE 1107EX-D",
    category: "Compactor",
    brand: "CASE",
    year: 2024,
    condition: "New",
    price: 62000,
    drumType: "Smooth",
    location: "Delhi NCR, India",
    badge: "NEW",
    image: IMG.compactor,
    specs: { Year: 2024, Brand: "CASE", Model: "1107EX-D", Condition: "New", "Drum Type": "Smooth" },
    description: "The CASE 1107EX-D soil compactor delivers best-in-class compaction performance for road building and large area compaction projects.",
    features: ["11-ton drum for high compaction force", "Dual-amplitude vibration system", "Ergonomic ROPS/FOPS certified cabin"],
    maintenance: ["Factory new with full warranty", "Delivered with operator training"]
  }
]

export const categories = [
  { name: "Backhoe Loaders",    count: 4,  image: IMG.jcb_backhoe,     slug: "backhoe-loader" },
  { name: "Tracked Excavators", count: 5,  image: IMG.excavator_dig,   slug: "tracked-excavator" },
  { name: "Telehandlers",       count: 2,  image: IMG.heavy_machine,   slug: "telehandler" },
  { name: "Soil Compactors",    count: 1,  image: IMG.compactor,       slug: "compactor" },
  { name: "Mining Excavators",  count: 3,  image: IMG.excavator_rocky, slug: "mining-excavator" },
  { name: "Used Equipment",     count: 10, image: IMG.site_wide,       slug: "used" }
]

export const testimonials = [
  {
    name: "Piyush Kumar",
    location: "Russia",
    rating: 5,
    text: "Seamless export process. Infinite Trade Solutions handled the entire logistics from Faridabad to Russia without a single hitch. The excavator quality exceeded our expectations.",
    product: "JCB Excavator"
  },
  {
    name: "Adapala",
    location: "Guntur, Andhra Pradesh",
    rating: 4,
    text: "Best dealership in North India. We have sourced three backhoes for our projects in Andhra Pradesh. Their response rate and transparency are unmatched.",
    product: "CASE Backhoe Loader"
  }
]

export const shipments = [
  { model: "JCB 3DX",    destination: "Russia",         flag: "🇷🇺" },
  { model: "CASE 770EX", destination: "Andhra Pradesh", flag: "🇮🇳" },
  { model: "CAT 323D",   destination: "Africa",         flag: "🌍" },
  { model: "HAMM 211",   destination: "Gujarat",        flag: "🇮🇳" }
]
