// Fictional interface fixtures, not offers, actual projects, or customer results.
// Base Packages Data
export const basePackages = [
  {
    id: 'essential',
    name: 'Essential Build',
    price: 32000,
    description: 'Perfect for first-time homeowners looking for a solid foundation with quality finishes.',
    features: [
      'Complete structural work',
      'Standard electrical & plumbing',
      'Basic flooring (laminate/tile)',
      'Standard kitchen cabinets',
      'Full bathroom fixtures',
      'Interior painting',
      '12-week timeline',
      'Weekly progress updates',
      '1-year warranty'
    ],
    notIncluded: [
      'Premium materials',
      'Custom cabinetry',
      'Smart home features',
      'Landscaping'
    ],
    image: '/plan_construction.jpg',
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Build',
    price: 58000,
    description: 'Our most popular choice. Elevated finishes with premium materials and custom options.',
    features: [
      'Everything in Essential',
      'Premium hardwood flooring',
      'Quartz countertops',
      'Custom kitchen design',
      'Upgraded bathroom fixtures',
      'Recessed lighting package',
      'Energy-efficient windows',
      '10-week timeline',
      'Daily photo updates',
      '2-year warranty',
      'Priority support'
    ],
    notIncluded: [
      'Smart home system',
      'Outdoor kitchen',
      'Pool construction'
    ],
    image: '/gallery_kitchen.jpg',
    popular: true
  },
  {
    id: 'luxury',
    name: 'Luxury Build',
    price: 95000,
    description: 'The ultimate home building experience with bespoke finishes and white-glove service.',
    features: [
      'Everything in Premium',
      'Marble & natural stone',
      'Custom millwork throughout',
      'Chef\'s kitchen with appliances',
      'Spa-like master bath',
      'Smart home integration',
      'Custom lighting design',
      '8-week timeline',
      'Dedicated project manager',
      '5-year warranty',
      'Annual maintenance included'
    ],
    notIncluded: [],
    image: '/gallery_living.jpg',
    popular: false
  }
];

// Add-ons Data
export const addOns = [
  {
    id: 'kitchen-upgrade',
    name: 'Kitchen Upgrade',
    category: 'Interior',
    price: 8500,
    description: 'Premium appliances, custom island, and designer lighting package.',
    features: [
      'Stainless steel appliance package',
      'Custom kitchen island',
      'Under-cabinet lighting',
      'Pot filler faucet',
      'Walk-in pantry build-out'
    ],
    image: '/addons_kitchen.jpg',
    compatible: ['essential', 'premium', 'luxury']
  },
  {
    id: 'bath-module',
    name: 'Bath Module',
    category: 'Interior',
    price: 6200,
    description: 'Transform your bathroom into a spa-like retreat.',
    features: [
      'Freestanding soaking tub',
      'Rain shower head system',
      'Heated flooring',
      'Custom vanity',
      'LED mirror'
    ],
    image: '/gallery_bath.jpg',
    compatible: ['essential', 'premium', 'luxury']
  },
  {
    id: 'smart-home',
    name: 'Smart Home',
    category: 'Technology',
    price: 4800,
    description: 'Full home automation with voice control and security.',
    features: [
      'Smart thermostat',
      'Automated lighting',
      'Video doorbell',
      'Smart locks',
      'Security cameras (4)',
      'Voice assistant integration'
    ],
    image: '/review_interior.jpg',
    compatible: ['premium', 'luxury']
  },
  {
    id: 'outdoor-living',
    name: 'Outdoor Living',
    category: 'Exterior',
    price: 12000,
    description: 'Extend your living space outdoors with a complete deck and patio.',
    features: [
      'Composite deck (400 sq ft)',
      'Outdoor lighting',
      'Built-in seating',
      'Pergola',
      'Fire pit area'
    ],
    image: '/final_handshake.jpg',
    compatible: ['premium', 'luxury']
  },
  {
    id: 'garage-workshop',
    name: 'Garage Workshop',
    category: 'Exterior',
    price: 7500,
    description: 'Convert your garage into a functional workspace.',
    features: [
      'Epoxy flooring',
      'Overhead storage',
      'Workbench installation',
      'Additional outlets',
      'Insulation upgrade'
    ],
    image: '/pricing_interior.jpg',
    compatible: ['essential', 'premium', 'luxury']
  },
  {
    id: 'home-office',
    name: 'Home Office',
    category: 'Interior',
    price: 5500,
    description: 'Professional workspace designed for productivity.',
    features: [
      'Built-in desk',
      'Shelving system',
      'Soundproofing',
      'Enhanced lighting',
      'Cable management'
    ],
    image: '/reviewer_portrait.jpg',
    compatible: ['essential', 'premium', 'luxury']
  }
];

// Gallery Projects
export const galleryProjects = [
  {
    id: 1,
    title: 'Modern Living Room',
    category: 'Living Space',
    location: 'Austin, TX',
    description: 'Open-concept living area with floor-to-ceiling windows and polished concrete floors.',
    image: '/gallery_living.jpg',
    tags: ['Modern', 'Open Concept'],
    year: '2025'
  },
  {
    id: 2,
    title: 'Gourmet Kitchen',
    category: 'Kitchen',
    location: 'Denver, CO',
    description: 'Chef-inspired kitchen with marble island and professional appliances.',
    image: '/gallery_kitchen.jpg',
    tags: ['Luxury', 'Chef\'s Kitchen'],
    year: '2025'
  },
  {
    id: 3,
    title: 'Spa Master Bath',
    category: 'Bathroom',
    location: 'Seattle, WA',
    description: 'Tranquil retreat with freestanding tub and heated marble floors.',
    image: '/gallery_bath.jpg',
    tags: ['Spa', 'Modern'],
    year: '2024'
  },
  {
    id: 4,
    title: 'Scandinavian Interior',
    category: 'Full Home',
    location: 'Portland, OR',
    description: 'Clean lines and natural materials throughout this family home.',
    image: '/plan_interior.jpg',
    tags: ['Scandinavian', 'Family Home'],
    year: '2024'
  },
  {
    id: 5,
    title: 'Industrial Loft',
    category: 'Living Space',
    location: 'Brooklyn, NY',
    description: 'Converted warehouse space with exposed beams and brick.',
    image: '/pricing_interior.jpg',
    tags: ['Industrial', 'Loft'],
    year: '2024'
  },
  {
    id: 6,
    title: 'Craftsman Detail',
    category: 'Interior Detail',
    location: 'Charleston, SC',
    description: 'Traditional craftsmanship meets modern comfort.',
    image: '/addons_detail.jpg',
    tags: ['Craftsman', 'Traditional'],
    year: '2025'
  }
];

// Reviews Data
export const reviews = [
  {
    id: 1,
    name: 'Sample Homeowner A',
    location: 'Austin, TX',
    rating: 5,
    date: 'December 2025',
    text: 'They finished on time, stayed on budget, and the weekly updates kept us sane. Our home is exactly what we dreamed of.',
    project: 'Premium Build - 3BR Home',
    image: '/reviewer_portrait.jpg',
    verified: false
  },
  {
    id: 2,
    name: 'Sample Homeowner B',
    location: 'Denver, CO',
    rating: 5,
    date: 'November 2025',
    text: 'The transparency was refreshing. We knew exactly what was happening every week. The quality exceeded our expectations.',
    project: 'Luxury Build - Custom Home',
    image: '/timeline_meeting.jpg',
    verified: false
  },
  {
    id: 3,
    name: 'Sample Homeowner C',
    location: 'Phoenix, AZ',
    rating: 5,
    date: 'October 2025',
    text: 'As a first-time home builder, I was nervous. But their process made it so easy. Highly recommend!',
    project: 'Essential Build - Starter Home',
    image: '/pricing_worker.jpg',
    verified: false
  },
  {
    id: 4,
    name: 'Sample Homeowner D',
    location: 'Portland, OR',
    rating: 5,
    date: 'September 2025',
    text: 'The add-on system is genius. We started with the base and added modules as we went. No stress, no surprises.',
    project: 'Premium Build + Kitchen Upgrade',
    image: '/addons_kitchen.jpg',
    verified: false
  },
  {
    id: 5,
    name: 'Sample Homeowner E',
    location: 'Seattle, WA',
    rating: 5,
    date: 'August 2025',
    text: 'Best decision we made. The smart home add-on has transformed how we live. Everything just works.',
    project: 'Luxury Build + Smart Home',
    image: '/review_interior.jpg',
    verified: false
  }
];

// How It Works Steps
export const howItWorksSteps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'We discuss your vision, budget, and timeline. This free 30-minute call helps us understand your needs.',
    duration: '30 minutes'
  },
  {
    number: '02',
    title: 'Site Assessment',
    description: 'Our team visits your property to evaluate the site and take measurements for accurate planning.',
    duration: '1-2 hours'
  },
  {
    number: '03',
    title: 'Custom Proposal',
    description: 'You receive a detailed proposal with 3D renderings, timeline, and transparent pricing.',
    duration: '48 hours'
  },
  {
    number: '04',
    title: 'Design Finalization',
    description: 'We refine the plans together, select materials, and finalize every detail before breaking ground.',
    duration: '1-2 weeks'
  },
  {
    number: '05',
    title: 'Construction Begins',
    description: 'Your dedicated project manager oversees every phase. You get weekly updates and photo logs.',
    duration: '8-12 weeks'
  },
  {
    number: '06',
    title: 'Final Walkthrough',
    description: 'We do a comprehensive inspection together, address any concerns, and hand over your keys.',
    duration: '2-3 hours'
  }
];

// Timeline Data
export const timelineWeeks = [
  {
    week: 'Week 1-2',
    phase: 'Prep & Permits',
    tasks: [
      'Site preparation and cleanup',
      'Permit acquisition',
      'Utility marking',
      'Material delivery scheduling'
    ],
    milestone: 'Permits Approved'
  },
  {
    week: 'Week 3-4',
    phase: 'Foundation & Framing',
    tasks: [
      'Foundation work',
      'Structural framing',
      'Roof installation',
      'Window & door openings'
    ],
    milestone: 'Structure Complete'
  },
  {
    week: 'Week 5-6',
    phase: 'Systems Installation',
    tasks: [
      'Electrical rough-in',
      'Plumbing installation',
      'HVAC ductwork',
      'Insulation'
    ],
    milestone: 'Systems In Place'
  },
  {
    week: 'Week 7-8',
    phase: 'Interior Finishes',
    tasks: [
      'Drywall installation',
      'Flooring installation',
      'Interior painting',
      'Trim work'
    ],
    milestone: 'Interior Complete'
  },
  {
    week: 'Week 9-10',
    phase: 'Kitchen & Bath',
    tasks: [
      'Cabinet installation',
      'Countertop installation',
      'Fixture installation',
      'Appliance hookup'
    ],
    milestone: 'Kitchen & Bath Done'
  },
  {
    week: 'Week 11-12',
    phase: 'Final Touches',
    tasks: [
      'Final electrical',
      'Final plumbing',
      'Cleanup & detailing',
      'Final inspection'
    ],
    milestone: 'Project Complete'
  }
];

// FAQ Data
export const faqData = [
  {
    question: 'Can I visit the site during the build?',
    answer: 'This interface has no real construction site, site visits, project manager, or connected client portal. The workflow is illustrative.'
  },
  {
    question: 'What happens if weather delays work?',
    answer: 'The timeline is static demonstration content. This prototype does not track weather, manage a construction schedule, or send project alerts.'
  },
  {
    question: 'How do change orders work?',
    answer: 'There is no connected change-order portal. The prototype does not submit changes, issue prices, approve work, or amend a contract.'
  },
  {
    question: 'Do you handle permits?',
    answer: 'No permits, applications, inspections, or approvals are handled by this interface. Package descriptions are fictional examples.'
  },
  {
    question: 'What\'s included in the base vs add-ons?',
    answer: 'The sample packages demonstrate configurable interface cards. Selecting add-ons changes an illustrative calculator total, not a real scope of work or quote.'
  },
  {
    question: 'What payment options do you offer?',
    answer: 'None in this prototype. It does not process payments, accept deposits, arrange financing, or connect to a lender. Package prices are illustrative calculator values, not offers.'
  },
  {
    question: 'How long is the warranty?',
    answer: 'No actual warranty is offered. Warranty labels in the sample packages are fictional interface content, not coverage, guarantees, or contract terms.'
  },
  {
    question: 'Can I make changes after construction starts?',
    answer: 'No construction or change requests are managed here. Timeline and process examples do not establish actual availability or delivery commitments.'
  }
];

// Contact Info
export const contactInfo = {
  email: 'No inbox connected',
  phone: 'No phone connected',
  hours: 'No operating hours; interface study only',
  address: 'No physical office; fictional demonstration',
  social: {
    instagram: '',
    facebook: '',
    linkedin: ''
  }
};
