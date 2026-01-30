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
    name: 'Sarah Mitchell',
    location: 'Austin, TX',
    rating: 5,
    date: 'December 2025',
    text: 'They finished on time, stayed on budget, and the weekly updates kept us sane. Our home is exactly what we dreamed of.',
    project: 'Premium Build - 3BR Home',
    image: '/reviewer_portrait.jpg',
    verified: true
  },
  {
    id: 2,
    name: 'James & Linda Chen',
    location: 'Denver, CO',
    rating: 5,
    date: 'November 2025',
    text: 'The transparency was refreshing. We knew exactly what was happening every week. The quality exceeded our expectations.',
    project: 'Luxury Build - Custom Home',
    image: '/timeline_meeting.jpg',
    verified: true
  },
  {
    id: 3,
    name: 'Michael Torres',
    location: 'Phoenix, AZ',
    rating: 5,
    date: 'October 2025',
    text: 'As a first-time home builder, I was nervous. But their process made it so easy. Highly recommend!',
    project: 'Essential Build - Starter Home',
    image: '/pricing_worker.jpg',
    verified: true
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    location: 'Portland, OR',
    rating: 5,
    date: 'September 2025',
    text: 'The add-on system is genius. We started with the base and added modules as we went. No stress, no surprises.',
    project: 'Premium Build + Kitchen Upgrade',
    image: '/addons_kitchen.jpg',
    verified: true
  },
  {
    id: 5,
    name: 'David & Rachel Kim',
    location: 'Seattle, WA',
    rating: 5,
    date: 'August 2025',
    text: 'Best decision we made. The smart home add-on has transformed how we live. Everything just works.',
    project: 'Luxury Build + Smart Home',
    image: '/review_interior.jpg',
    verified: true
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
    answer: 'Yes, we encourage site visits! We schedule weekly walkthroughs with your project manager, and you can request additional visits anytime through your client portal. Safety equipment is provided, and we ask that visits be scheduled in advance.'
  },
  {
    question: 'What happens if weather delays work?',
    answer: 'Weather delays are built into our timeline buffer. If severe weather causes more than 3 days of delay, we\'ll adjust the schedule and keep you informed in real-time through our project management app.'
  },
  {
    question: 'How do change orders work?',
    answer: 'Change orders can be submitted through your client portal. We provide a fixed price quote within 24 hours, and work begins once approved. No hidden fees, ever. Changes after Week 6 may affect the timeline.'
  },
  {
    question: 'Do you handle permits?',
    answer: 'Absolutely. Permit acquisition is included in our base package. We handle all paperwork, inspections, and approvals with local authorities. You don\'t need to worry about a thing.'
  },
  {
    question: 'What\'s included in the base vs add-ons?',
    answer: 'The base includes structural work, electrical, plumbing, and basic finishes. Add-ons cover premium materials, smart home tech, custom cabinetry, luxury fixtures, and outdoor spaces. Each package page has a detailed breakdown.'
  },
  {
    question: 'What payment options do you offer?',
    answer: 'We offer flexible payment plans: 20% deposit to start, then monthly payments throughout construction, or pay-in-full for a 3% discount. We also partner with lenders for construction financing.'
  },
  {
    question: 'How long is the warranty?',
    answer: 'Warranty terms vary by package: Essential includes 1 year, Premium includes 2 years, and Luxury includes 5 years with annual maintenance. All warranties cover workmanship and materials.'
  },
  {
    question: 'Can I make changes after construction starts?',
    answer: 'Yes, changes can be made through Week 6 without affecting the timeline. After Week 6, changes may extend the completion date. All changes are quoted upfront with no surprises.'
  }
];

// Contact Info
export const contactInfo = {
  email: 'hello@homeconstruction.site',
  phone: '+1 (555) 014-2200',
  hours: 'Mon–Fri, 8am–6pm',
  address: '123 Builder Way, Austin, TX 78701',
  social: {
    instagram: '@homeconstruction',
    facebook: 'HomeConstructionSite',
    linkedin: 'homeconstruction-site'
  }
};
