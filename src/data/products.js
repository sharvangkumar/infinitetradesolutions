// Product photos and listings mirror the company's real IndiaMart/TradeIndia catalog.
// Images are self-hosted copies of the company's own listing photos (public/images/products/).

const IMG = {
  case_compactor:      '/images/products/case-1107ex-d-compactor.jpg',
  case_770ex:           '/images/products/case-770ex-backhoe.jpg',
  jcb_js215lc:           '/images/products/jcb-js215lc-excavator.jpg',
  hyundai_r215l:         '/images/products/hyundai-r215l-excavator.jpg',
  jcb_telehandler_5t:    '/images/products/jcb-telehandler-5ton.jpg',
  case_570sv:            '/images/products/case-570sv-backhoe.jpg',
  cat_320d3:             '/images/products/caterpillar-320d3-excavator.jpg',
  jcb_53070_telehandler: '/images/products/jcb-530-70-telehandler.jpg',
}

export const products = [
  {
    id: 1,
    name: "CASE 770EX Backhoe Loader",
    category: "Backhoe Loader",
    brand: "CASE",
    year: 2024,
    condition: "New",
    location: "Faridabad, Haryana, India",
    badge: "NEW",
    image: IMG.case_770ex,
    specs: { Brand: "CASE", Model: "770EX", "Engine Power": "74 HP", Condition: "New", Availability: "In Stock" },
    description: "The CASE 770EX is a powerful backhoe loader built for demanding construction and earthmoving environments, offering proven reliability and strong performance for Indian and export markets.",
    features: ["74 HP engine for high torque output", "Pilot-operated hydraulic controls", "Extendable dipper for extra digging reach"],
    maintenance: ["Multi-point quality inspection before dispatch", "Backed by manufacturer-authorized service network"]
  },
  {
    id: 2,
    name: "CASE 570SV Backhoe Loader",
    category: "Backhoe Loader",
    brand: "CASE",
    year: 2024,
    condition: "New",
    location: "Faridabad, Haryana, India",
    badge: "NEW",
    image: IMG.case_570sv,
    specs: { Brand: "CASE", Model: "570SV", "Bucket Capacity": "0.40 m³", "Dig Depth": "5200 mm", "Operating Weight": "10,000 kg", Condition: "New" },
    description: "The CASE 570SV combines a compact footprint with best-in-class loader capacity, ideal for construction and infrastructure projects that need reach and reliability.",
    features: ["0.40 m³ bucket capacity", "5200 mm maximum dig depth", "10,000 kg operating weight for strong stability"],
    maintenance: ["Multi-point quality inspection before dispatch", "Backed by manufacturer-authorized service network"]
  },
  {
    id: 3,
    name: "JCB JS 215LC Excavator",
    category: "Tracked Excavator",
    brand: "JCB",
    year: 2024,
    condition: "New",
    location: "Faridabad, Haryana, India",
    badge: "NEW",
    image: IMG.jcb_js215lc,
    specs: { Brand: "JCB", Model: "JS 215LC", "Operating Weight": "23,850 kg", "Bucket Capacity": "1.02 m³", Application: "Material Handling", Condition: "New" },
    description: "The JCB JS 215LC is a heavy-duty tracked excavator built for material handling and large-scale earthmoving, offering excellent digging force and stability on site.",
    features: ["23,850 kg operating weight", "1.02 m³ bucket capacity", "Reinforced undercarriage for tough terrain"],
    maintenance: ["Multi-point quality inspection before dispatch", "Backed by manufacturer-authorized service network"]
  },
  {
    id: 4,
    name: "Hyundai R215L Smart Plus Mining Excavator",
    category: "Tracked Excavator",
    brand: "Hyundai",
    year: 2025,
    condition: "New",
    location: "Faridabad, Haryana, India",
    badge: "NEW",
    image: IMG.hyundai_r215l,
    specs: { Brand: "Hyundai", Model: "R215L Smart Plus", Application: "Mining & Infrastructure", Condition: "New" },
    description: "The Hyundai R215L Smart Plus is engineered for mining and infrastructure projects, delivering strong digging performance with Hyundai's Smart Plus control system.",
    features: ["Smart Power Control system", "Reinforced bucket teeth for abrasive terrain", "Optimized fuel efficiency for long shifts"],
    maintenance: ["Multi-point quality inspection before dispatch", "Backed by manufacturer-authorized service network"]
  },
  {
    id: 5,
    name: "JCB Telehandler 5 Ton",
    category: "Telehandler",
    brand: "JCB",
    year: 2024,
    condition: "New",
    location: "Faridabad, Haryana, India",
    badge: "NEW",
    image: IMG.jcb_telehandler_5t,
    specs: { Brand: "JCB", "Lift Capacity": "5 Ton", Condition: "New", Availability: "In Stock" },
    description: "The JCB 5 Ton Telehandler offers versatile material handling for construction and warehousing sites, with the reach and lift capacity to move heavy loads safely.",
    features: ["5-ton maximum lift capacity", "All-terrain tyres for job-site mobility", "Ergonomic cabin with clear boom visibility"],
    maintenance: ["Multi-point quality inspection before dispatch", "Backed by manufacturer-authorized service network"]
  },
  {
    id: 6,
    name: "JCB 530-70 Telescopic Telehandler",
    category: "Telehandler",
    brand: "JCB",
    year: 2024,
    condition: "New",
    location: "Faridabad, Haryana, India",
    badge: "NEW",
    image: IMG.jcb_53070_telehandler,
    specs: { Brand: "JCB", Model: "530-70", "Max Lift Capacity": "3 Ton", "Max Lift Height": "7 m", Condition: "New" },
    description: "The JCB 530-70 Telescopic Telehandler delivers a 7-metre lift height and 3-tonne capacity, suited for construction sites that need precise, elevated material placement.",
    features: ["3-ton maximum lift capacity", "7-metre maximum lift height", "Telescopic boom for precise placement"],
    maintenance: ["Multi-point quality inspection before dispatch", "Backed by manufacturer-authorized service network"]
  },
  {
    id: 7,
    name: "Caterpillar 320D3 GC Medium Excavator",
    category: "Tracked Excavator",
    brand: "Caterpillar",
    year: 2024,
    condition: "New",
    location: "Faridabad, Haryana, India",
    badge: "NEW",
    image: IMG.cat_320d3,
    specs: { Brand: "Caterpillar", Model: "320D3 GC", "Bucket Capacity": "2.0 m³", "Gross Power": "400 HP", "Operating Weight": "80 Ton", Condition: "New" },
    description: "The Caterpillar 320D3 GC is a medium excavator built for demanding earthmoving and mining applications, combining high gross power with a large bucket capacity.",
    features: ["2.0 m³ bucket capacity", "400 HP gross power", "80-ton operating weight for maximum stability"],
    maintenance: ["Multi-point quality inspection before dispatch", "Backed by manufacturer-authorized service network"]
  },
  {
    id: 8,
    name: "CASE 1107 EX-D Soil Compactor",
    category: "Compactor",
    brand: "CASE",
    year: 2024,
    condition: "New",
    drumType: "Smooth",
    location: "Faridabad, Haryana, India",
    badge: "NEW",
    image: IMG.case_compactor,
    specs: { Brand: "CASE", Model: "1107 EX-D", "Operating Weight": "20–25 Ton", "Drum Type": "Smooth", Condition: "New" },
    description: "The CASE 1107 EX-D soil compactor delivers best-in-class compaction performance for road building and large-area compaction projects.",
    features: ["20–25 ton operating weight for high compaction force", "Dual-amplitude vibration system", "ROPS/FOPS certified operator cabin"],
    maintenance: ["Multi-point quality inspection before dispatch", "Backed by manufacturer-authorized service network"]
  }
]

export const categories = [
  { name: "Backhoe Loaders",    count: products.filter(p => p.category === "Backhoe Loader").length,    image: IMG.case_770ex,   slug: "backhoe-loader" },
  { name: "Tracked Excavators", count: products.filter(p => p.category === "Tracked Excavator").length, image: IMG.jcb_js215lc,  slug: "tracked-excavator" },
  { name: "Telehandlers",       count: products.filter(p => p.category === "Telehandler").length,       image: IMG.jcb_telehandler_5t, slug: "telehandler" },
  { name: "Soil Compactors",    count: products.filter(p => p.category === "Compactor").length,         image: IMG.case_compactor, slug: "compactor" },
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
  { model: "CAT 320D3",  destination: "Africa",         flag: "🌍" },
  { model: "HAMM 211",   destination: "Gujarat",        flag: "🇮🇳" }
]
