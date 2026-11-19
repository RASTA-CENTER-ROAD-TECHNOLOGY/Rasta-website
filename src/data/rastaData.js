// Complete RASTA data module compiled from RASTA Academic Brochure.pdf,
// RASTA Consulatncy Brochure_ 2025.pdf, and https://www.rastacentre.co.in/.
// All descriptive prose uses ASD-STE100 format with zero emojis.

export const INSTITUTE_INFO = {
  shortName: 'RASTA',
  fullName: 'RASTA - Center for Road Technology',
  acronymExpansion: 'Resource Centre for Asphalt and Soil Training Academy',
  tagline: 'Better roads begin with better knowledge',
  heroSubtitle: 'Total Solutions Provider in Highway Technology',
  foundedYear: 2002,
  founderNote:
    'Founded in 2002 by (late) Prof. C. E. G. Justo in association with M/s Ingersoll-Rand India Ltd.',
  governanceNote:
    'An initiative by the Volvo Group, India, managed by an Independent Trust of Volvo India Pvt Ltd within the Volvo Construction Equipment (VCE) campus at Peenya, Bengaluru.',
  preamble:
    'RASTA integrates academics, research, training, and consultancy for roads, buildings, and civil infrastructure. The institute bridges the gap between academic study and industry requirements with practical laboratory and field training.',
  vision:
    'To be the Centre of Excellence in road and infrastructure research and practice in the country.',
  mission:
    'To be the Knowledge Centre that will help students and professionals to disseminate the latest knowledge in Road and Infrastructure Technology.',
  accreditations: [
    'Approved by All India Council for Technical Education (AICTE), New Delhi',
    'Extension and Research Centre of Visvesvaraya Technological University (VTU), Belgaum',
    'NABL Accredited Testing Laboratory in accordance with ISO/IEC 17025:2017',
    'State Technical Agency (STA) for Pradhan Mantri Gram Sadak Yojana (PMGSY) in Karnataka',
    'Technical Partner to Public Awareness Centre (PAC) for World Bank Citizen Monitoring of PMGSY Rural Roads in Assam, Jharkhand, Karnataka, Meghalaya, Odisha, Rajasthan, and Uttarakhand',
    'Faculty representation on technical committees of Indian Roads Congress (IRC) and Bureau of Indian Standards (BIS)',
  ],
  metrics: [
    { value: '25+', label: 'Years of Experience', detail: 'Established in Bengaluru in 2002' },
    { value: '50+', label: 'Faculty and Industry Experts', detail: 'Full-time faculty and guest specialists' },
    { value: '150+', label: 'Education and Training Programs', detail: 'Campus and on-site engineering workshops' },
    { value: '5,000+', label: 'Graduates and Trainees', detail: 'Includes 3,300+ practicing engineers and ~1,000 M.Tech graduates' },
    { value: '62', label: 'NABL and Field Tests', detail: 'ISO/IEC 17025:2017 accredited material and field testing' },
    { value: '150+', label: 'Consultancy and R&D Projects', detail: 'Ongoing, completed, and funded engineering works' },
  ],
};

export const FOUR_PILLARS = [
  {
    code: '01',
    title: 'Academics',
    summary:
      'VTU Extension Center that trains highway and infrastructure engineers for industry requirements.',
    items: [
      'Two-year M.Tech in Highway Technology',
      'Two-year M.Tech in Infrastructure Engineering and Management',
      'One-year P.G. Diploma in Highway Technology',
      'Six-month P.G. Certificate Course in Road Technology',
    ],
    link: '/academics',
  },
  {
    code: '02',
    title: 'Training',
    summary:
      'Specialized 1-day to 15-day programs for government departments, contractors, and consultants.',
    items: [
      'More than 3,300 engineers trained across India',
      'Campus sessions in Bengaluru and on-site job training',
      '14 technical subjects from materials to road safety audits',
      'Joint RASTA and VTU certificates for continuing education',
    ],
    link: '/training',
  },
  {
    code: '03',
    title: 'Research and Development',
    summary:
      'VTU affiliated research center for Ph.D. and M.Sc. Engg. candidates working on sponsored highway projects.',
    items: [
      'Ph.D. in Faculty of Civil Engineering Sciences (3 Ph.D. degrees awarded)',
      'Funded projects with NRIDA, KSHIP, KRIDL, KSCST, Volvo, ACC, Saint Gobain',
      'Center of Excellence for Digital Infrastructure Innovation Hub with Bentley Systems',
      'Publications in IRC Indian Highways, Springer, ASTM, and TRB',
    ],
    link: '/research',
  },
  {
    code: '04',
    title: 'Consultancy and Testing',
    summary:
      'Independent technical audits, pavement design, DPR preparation, failure studies, and NABL lab testing.',
    items: [
      'State Technical Agency (STA) for PMGSY in Karnataka',
      'NABL Accredited Soil, Aggregate, Cement, Concrete, and Bitumen Labs',
      'Mobile Laboratory Van and NDT field investigation team',
      'Ongoing and completed highway, airport, metro, and industrial projects',
    ],
    link: '/consultancy',
  },
];

export const CAROUSEL_SLIDES = [
  {
    src: '/images/hero-highway.png',
    alt: 'Modern multi-lane highway corridor showing geometric alignment and lane markings',
    title: 'Highway Corridor Engineering',
    subtitle: 'Geometric design, overlay rehabilitation, and technical audits',
    category: 'campus',
  },
  {
    src: '/images/computer-lab.jpg',
    alt: 'Modern CAD simulation and digital highway infrastructure computer lab at RASTA',
    title: 'Computer & Simulation Laboratory',
    subtitle: 'Bentley digital infrastructure training, traffic simulation, and pavement modeling',
    category: 'campus',
  },
  {
    src: '/images/brochure/acad_p3_6_964x630.jpeg',
    alt: 'M.Tech Highway Technology students in modern RASTA classroom',
    title: 'Postgraduate Academic Programs',
    subtitle: 'VTU M.Tech in Highway Technology and Infrastructure Management',
    category: 'campus',
  },
  {
    src: '/images/brochure/acad_p2_1_1356x1033.jpeg',
    alt: 'RASTA Center for Road Technology campus entrance at Peenya, Bengaluru',
    title: 'RASTA Peenya Campus',
    subtitle: 'Volvo Construction Equipment Campus, Bengaluru',
    category: 'campus',
  },
  {
    src: '/images/brochure/cons_p5_1_349x219.jpeg',
    alt: 'NABL accredited Soil and Aggregate testing laboratory at RASTA',
    title: 'Soil and Aggregate Laboratory',
    subtitle: 'NABL ISO/IEC 17025:2017 accredited testing facility',
    category: 'labs',
  },
  {
    src: '/images/brochure/cons_p5_6_228x144.jpeg',
    alt: 'Bitumen and modified binder laboratory instrumentation',
    title: 'Bitumen and Mixes Laboratory',
    subtitle: 'Marshall stability, rutting, viscosity, and binder rheology',
    category: 'labs',
  },
  {
    src: '/images/brochure/cons_p5_7_348x219.jpeg',
    alt: 'Automatic Compression Testing Machine 3000 kN in Concrete Laboratory',
    title: 'Concrete Testing Laboratory',
    subtitle: '3000 kN compression and 600 kN UTM equipment',
    category: 'labs',
  },
  {
    src: '/images/brochure/cons_p11_1_348x288.jpeg',
    alt: 'Field engineers conducting Benkelman Beam Deflection studies on highway',
    title: 'Benkelman Beam Deflection Study',
    subtitle: 'Structural pavement evaluation and overlay design',
    category: 'field',
  },
  {
    src: '/images/brochure/cons_p11_4_348x288.jpeg',
    alt: 'Engineer operating MERLIN roughness measurement apparatus on road surface',
    title: 'MERLIN Roughness Survey',
    subtitle: 'Functional unevenness evaluation across highway stretches',
    category: 'field',
  },
  {
    src: '/images/brochure/cons_p11_2_348x288.jpeg',
    alt: 'Core cutting tests on bituminous pavement layers in the field',
    title: 'Bituminous Core Extraction',
    subtitle: 'Layer thickness and field density verification',
    category: 'field',
  },
  {
    src: '/images/brochure/cons_p5_4_348x219.jpeg',
    alt: 'RASTA Mobile Laboratory vehicle for on-site road quality testing',
    title: 'Mobile Testing Laboratory',
    subtitle: 'On-site field investigations and NDT capability',
    category: 'field',
  },
];

export const TECHNICAL_ADVISORS_HISTORY = [
  {
    name: 'Prof. C. E. G. Justo',
    tenure: 'Founder and First Technical Advisor (2002)',
    role: 'Former Professor and Dean - Faculty of Engineering, Bangalore University',
    bio: 'Icon in Road Technology and Founder of RASTA in 2002 in association with M/s Ingersoll-Rand India Ltd.',
    image: '/images/brochure/acad_p3_3_976x710.jpeg',
  },
  {
    name: 'Prof. B. R. Srinivasamurthy',
    tenure: 'Second Technical Advisor (2007 - 2017)',
    role: 'Former Professor, Indian Institute of Science (IISc), Bengaluru',
    bio: 'Renowned Professor of Civil Engineering who guided RASTA research, laboratory expansion, and academic standards for a decade.',
    image: '/images/brochure/acad_p3_2_969x710.jpeg',
  },
  {
    name: 'Prof. A. Veeraragavan',
    tenure: 'Technical Advisor (2018 onwards) and Advisory Council Chairman',
    role: 'Former Professor, Department of Civil Engineering, IIT Madras, Chennai',
    bio: 'Distinguished highway engineering specialist leading RASTA technical advisory, research excellence, and IRC/BIS initiatives.',
    image: '/images/brochure/acad_p3_1_969x710.jpeg',
  },
];

export const MANAGEMENT_TRUSTEES = [
  {
    name: 'Mr. Dimitrov Krishnan',
    title: 'Chairperson / Trustee - RASTA',
    affiliation: 'Managing Director and Head - Region India, Volvo Construction Equipment',
    summary:
      'Brings over 30 years of construction equipment industry leadership, Chairman of Infrastructure Equipment Skill Council, and Past President of iCEMA.',
  },
  {
    name: 'Mr. Kamal Bali',
    title: 'Trustee - RASTA',
    affiliation: 'President and Managing Director - Volvo Group India',
    summary:
      'IIT Roorkee alumnus with over four decades of engineering leadership, recipient of the Bharat Ratna Sir M. Visvesvaraya Award (2023) and Sweden Royal Order of the Polar Star.',
  },
  {
    name: 'Mr. Dharmendra Pandey',
    title: 'Trustee - RASTA',
    affiliation: 'Head of Operations and General Manager - Volvo Construction Equipment, India',
    summary:
      'Operations and supply chain leader with over 20 years of experience, Six Sigma Black Belt, and PMP certified specialist.',
  },
  {
    name: 'Dr. Anil Kashyap',
    title: 'Trustee - RASTA',
    affiliation: 'Former Director General NICMAR | President and Chancellor, NICMAR University',
    summary:
      'Urban planning and governance leader with a Ph.D. from Ulster University, executive education at Harvard University, and RICS International Land Measurement Standards Committee membership.',
  },
  {
    name: 'Mr. Ravishankar Vaidyanathan',
    title: 'Managing Trustee - RASTA',
    affiliation: 'Head - Used Equipment, Volvo Construction Equipment',
    summary:
      'Over 30 years of experience in product support, technical training, dealer capability development, and business operations.',
  },
  {
    name: 'Mr. B. Sridhar',
    title: 'Trust Administrator',
    affiliation: 'RASTA - Center for Road Technology',
    summary:
      'Oversees institutional trust administration, national training coordination, and strategic partnerships such as the NITTTR Kolkata MOU.',
  },
];

export const ADVISORY_COUNCIL_2024_25 = [
  { sl: 1, name: 'Dr. A. Veeraragavan', designation: 'Former Professor, Dept. of Civil Engineering, IIT Madras, Chennai and Technical Advisor, RASTA (Chairman)' },
  { sl: 2, name: 'Dr. V. Ramachandra', designation: 'Professor and Director, RASTA, Center for Road Technology, Bengaluru (Member Secretary)' },
  { sl: 3, name: 'Dr. P. K. Sikdar', designation: 'Former Director, Central Road Research Institute (CRRI), New Delhi; President at ICT Pvt Ltd (Member)' },
  { sl: 4, name: 'Sri R. K. Pandey', designation: 'Member - Tech (Retd), NHAI (Member)' },
  { sl: 5, name: 'Dr. K. P. Isaac', designation: 'Former Vice Chancellor of Kerala Technological University (Member)' },
  { sl: 6, name: 'Capt. R. R. Doddihal', designation: 'Former GM (Tech) and Chief Engineer (Member)' },
  { sl: 7, name: 'Sri Bidur Kant Jha', designation: 'Director, New Technology for Highway Development, MoRTH (Member)' },
  { sl: 8, name: 'Sri Mohan Ramanathan', designation: 'Managing Director, M/s Advanced Construction Technologies (P) Ltd, Chennai (Member)' },
  { sl: 9, name: 'Dr. Manamohan R. Kalgal', designation: 'Former President, ICI (Member)' },
  { sl: 10, name: 'Sri Venkata Chunduru', designation: 'Director, Arcadis (Member)' },
  { sl: 11, name: 'Dr. Vijay Gopal Kovvali', designation: 'Research Professor, CISTUP (Member)' },
  { sl: 12, name: 'Sri Vijay Kumar', designation: 'CEO, Infrastructure Equipment Skill Council (IESC) (Member)' },
  { sl: 13, name: 'Mr. Sadashivam', designation: 'Joint General Manager and Head of EDRC Designs, L&T Construction, Chennai (Member)' },
  { sl: 14, name: 'Dr. Samson Mathews', designation: 'Director - NATPAC (Member)' },
  { sl: 15, name: 'Dr. G. L. Sivakumar Babu', designation: 'Professor, Dept. of Civil Engineering, IISc, Bengaluru (Member)' },
  { sl: 16, name: 'Mr. Rathnakar Reddy', designation: 'Managing Director, Infra Support Engineering Consultants Pvt. Ltd., Bengaluru (Member)' },
];

export const OUTREACH_MILESTONES = [
  {
    year: '2002',
    title: 'Foundation of RASTA in Bengaluru',
    detail: 'Founded by Prof. C. E. G. Justo in association with M/s Ingersoll-Rand India Ltd. to bridge academic study and road construction practice.',
    image: '/images/brochure/acad_p2_1_1356x1033.jpeg',
  },
  {
    year: '2008',
    title: 'Inauguration of RASTA Facility and Launch of ROADTECH',
    detail: 'Inaugurated by Prof. H. P. Khincha, Former Vice Chancellor of VTU. Launch of the annual two-day ROADTECH national student conference.',
    image: '/images/brochure/acad_p4_1_1147x819.jpeg',
  },
  {
    year: '2008',
    title: 'National Conference Organised by RASTA - Road Tech',
    detail: 'First national technical paper presentation and seminar event organized by M.Tech students.',
    image: '/images/brochure/acad_p5_3_902x559.jpeg',
  },
  {
    year: '2011',
    title: 'Knowledge Dissemination Sessions - Road Tech 2011',
    detail: 'Keynote session by Mr. Praveen Sood, IPS and expert lectures by Late Dr. L. R. Kadiyali.',
    image: '/images/brochure/acad_p5_4_902x559.jpeg',
  },
  {
    year: '2012',
    title: 'PWD Training Program',
    detail: 'Specialized highway engineering workshop addressed by Prof. M. S. Amarnath, Bangalore University.',
    image: '/images/brochure/acad_p5_6_906x559.jpeg',
  },
  {
    year: '2019',
    title: 'Infra Road Tech and EXCON Equal Opportunity Award',
    detail: 'Hosted Infra Road Tech 2019 and received the EXCON Women Building India Equal Opportunity Award.',
    image: '/images/brochure/acad_p5_1_902x559.jpeg',
  },
  {
    year: '2022',
    title: 'RASTA at MANTHAN Expo by NHAI',
    detail: 'Showcased highway research, NABL laboratory capabilities, and field evaluation technologies at NHAI MANTHAN Expo.',
    image: '/images/brochure/acad_p5_2_906x559.jpeg',
  },
];

export const ACADEMIC_PROGRAMS = [
  {
    code: 'M.Tech (CHT)',
    title: 'M.Tech in Highway Technology',
    duration: 'Two-Year Full-Time Postgraduate Degree (VTU Affiliated, AICTE Approved)',
    objectives:
      'Equip civil engineering graduates with advanced skills in highway design, construction, maintenance, and asset management.',
    scope:
      'Covers pavement materials, highway geometric design, traffic engineering, transportation planning, AI applications, data analytics, climate resilience, and sustainable practices.',
  },
  {
    code: 'M.Tech (CIM)',
    title: 'M.Tech in Infrastructure Engineering and Management',
    duration: 'Two-Year Full-Time Postgraduate Degree (VTU Affiliated, AICTE Approved)',
    objectives:
      'Provide a comprehensive understanding of infrastructure planning, design, execution, risk management, and sustainable project delivery.',
    scope:
      'Covers transportation systems, urban infrastructure, project management, smart cities, life-cycle cost analysis, and contract administration.',
  },
  {
    code: 'PG Diploma',
    title: 'One-Year P.G. Diploma in Highway Technology',
    duration: 'One-Year Specialized Postgraduate Program',
    objectives:
      'Deliver focused practical instruction in pavement material characterization, construction quality control, and highway evaluation.',
    scope:
      'Designed for graduates and working engineers seeking applied skills in road construction supervision and laboratory testing.',
  },
  {
    code: 'PG Certificate',
    title: 'Six-Month P.G. Certificate Course in Road Technology',
    duration: 'Six-Month Intensive Certificate Program',
    objectives:
      'Build core proficiency in asphalt and concrete road construction, field testing, and highway maintenance practices.',
    scope:
      'Supports rapid industry onboarding with direct hands-on exposure inside NABL-accredited testing laboratories.',
  },
  {
    code: 'Ph.D. / M.Sc. Engg.',
    title: 'Ph.D. and M.Sc. (Engg.) in Faculty of Civil Engineering Sciences',
    duration: 'VTU Affiliated Research Center Programs',
    objectives:
      'Advance original applied research in transportation engineering, highway materials, pavement performance, and construction management.',
    scope:
      'Provides research scholars with NABL lab instrumentation, funded project grants, and guidance toward international journal publications.',
  },
];

export const FACULTY_ROSTER = {
  leadership: [
    {
      name: 'Dr. V. Ramachandra',
      role: 'Professor and Director - RASTA (Infrastructure Engineering & Management Division)',
      email: 'ramachandra@rastaindia.com',
      image: '/images/faculty/dr-v-ramachandra.jpg',
    },
    {
      name: 'Dr. G. Kavitha',
      role: 'Professor and Head of Institution (Highway Technology Division)',
      email: 'gkavitha@rastaindia.com',
      image: '/images/faculty/dr-g-kavitha.jpg',
    },
    {
      name: 'Vijay Kumar M.',
      role: 'Chief Operating Officer (COO), RASTA',
      email: '',
      image: '/images/faculty/vijay-kumar-m.jpg',
    },
    {
      name: 'Mr. P. M. Hiremath',
      role: 'Business Development Consultant',
      email: '',
      image: '/images/faculty/mr-p-m-hiremath.jpg',
    },
  ],
  teaching: [
    {
      name: 'Dr. K. M. Mallesha',
      division: 'Highway Technology Division',
      role: 'Professor',
      email: 'kmm@rastaindia.com',
      image: '/images/faculty/dr-k-m-mallesha.jpg',
    },
    {
      name: 'Dr. M. A. Jayaram',
      division: 'Infrastructure Engineering & Management Division',
      role: 'Professor',
      email: 'jayaram@rastaindia.com',
      image: '/images/faculty/dr-m-a-jayaram.jpg',
    },
    {
      name: 'Dhruva Theja',
      division: 'Highway Technology Division',
      role: 'Assistant Professor',
      email: '',
      image: '/images/faculty/dhruva-theja.jpg',
    },
    {
      name: 'Dr. Reshma E. K.',
      division: 'Highway Technology Division',
      role: 'Assistant Professor',
      email: '',
      image: '/images/faculty/dr-reshma-e-k.jpg',
    },
  ],
  guestFaculty: [
    { name: 'Dr. Gangaboraiah', role: 'Guest Faculty Professor' },
    { name: 'Mr. Arunkumar Shambu', role: 'Guest Faculty - Industry Expert' },
  ],
  supportStaff: [
    { name: 'Mrs. Jayanthi Manoj', role: 'Accounts', contact: 'accounts@rastaindia.com' },
    { name: 'Mrs. Laxmi C. Naik', role: 'General Information', contact: '' },
    { name: 'Mr. Francis Domello', role: 'Lab Technician', contact: 'francisdomelo@gmail.com' },
    { name: 'Mr. H. S. Sudhakar', role: 'Lab Technician', contact: 'sudhakar4rasta@gmail.com' },
    { name: 'Mr. Shankarappa', role: 'Lab Technician', contact: '' },
  ],
};

export const ACADEMIC_INFRASTRUCTURE = {
  library: {
    summary:
      'Approximately 1,000 volumes of reference texts, 2,000 books on Highway Technology and Infrastructure Management, and 800 IRC codes, Special Publications, and BIS standards.',
    bullets: [
      'Publications from IRC, BIS, ASCE, ARRB, TRB, and ICI',
      'Road construction instructional videos from IRF and Asphalt Institute',
      'Highway engineering software including HDM4, Matlab, and AutoCAD',
      'National Digital Library (NDL) membership and VTU KNIMBUS online access',
      'Open-source analytics tools including R, WEKA, NeuroIntelligence, and RapidMiner',
    ],
  },
  classrooms:
    'Spacious classrooms and seminar halls equipped with modern projection systems, plus dedicated tutorial rooms for focused small-group technical sessions.',
  computerLab:
    'Dedicated computer laboratory configured for highway modeling, pavement design simulation, traffic data analysis, and Bentley digital infrastructure training.',
};

export const TRAINING_TOPICS = [
  'Road materials',
  'Soil engineering and ground improvement techniques',
  'Pavement evaluation and design',
  'Economic evaluation',
  'Construction and maintenance',
  'Plants and equipment for road construction',
  'Construction planning and management',
  'Project Management',
  'Contract Management',
  'Road Safety and Audit',
  'Quality Assurance',
  'Pavement failures and Remedial measures',
  'Concrete roads',
  'Advancements and trends in Road Technology',
];

export const TRAINING_CALENDAR_2025_26 = [
  { sl: 1, title: 'Finishing School', duration: '3 months', schedule: 'October' },
  { sl: 2, title: 'Technical Enrichment Program', duration: '15 days', schedule: 'October' },
  { sl: 3, title: 'Internship Program', duration: '3 months', schedule: 'October' },
  { sl: 4, title: 'GIS Training', duration: '2 days', schedule: 'October 8 and 9' },
  { sl: 5, title: 'AI Driven Sustainable Highway Construction', duration: '3 months', schedule: 'November' },
  { sl: 6, title: 'Data Analytics for Core Engineering', duration: '40 hrs (7 weeks @ 6 hrs/week)', schedule: 'November' },
  { sl: 7, title: 'AI and its application in civil engineering for senior engineers', duration: '2 days', schedule: 'October 15 and 16' },
  { sl: 8, title: 'Bituminous Concrete mix design - challenges and solutions', duration: '2 days', schedule: 'October' },
];

export const WORKSHOPS_AND_EVENTS = [
  { date: 'Sep 21 - 22, 2026', title: 'Pattern Recognition Through Clustering', category: 'Workshop' },
  { date: 'Aug 31, 2026', title: 'Webinar for Civil Engineering Students', category: 'Webinar Series' },
  { date: 'Sep 22 - 26, 2025', title: 'Pattern Recognition and Applications in Civil Engineering', category: 'FDP / Workshop' },
  { date: 'Aug 30, 2025', title: 'Future of Civil Engineering Career Paths and Success Strategies', category: 'Webinar' },
  { date: 'Jan 20 - 24, 2025', title: 'Faculty Development Programme on AI and Its Applications in Civil Engineering', category: 'FDP' },
  { date: 'Oct 24 - 25, 2024', title: 'Two Days Symposium on Blue Print to Reality', category: 'Symposium' },
  { date: 'Sep 4, 2024', title: 'One Day Training on Basic Life Support', category: 'Training' },
  { date: 'Sep 2, 2024', title: 'One Day Seminar on Concrete Mix Design', category: 'Seminar' },
  { date: 'Aug 8 - 9, 2024', title: 'Two Days Workshop on Machine Learning for Civil Engineers - Series 4', category: 'Workshop' },
  { date: 'Aug 10 - 11, 2023', title: 'Two Days Workshop on Artificial Neural Networks in Civil Engineering', category: 'Workshop' },
  { date: 'Apr 29, 2023', title: 'One-Day National Workshop on Durability of Concrete', category: 'National Workshop' },
  { date: 'Apr 25 - 26, 2023', title: '2 Days Workshop on Fuzzy Logic and Civil Engineering Applications', category: 'Workshop' },
  { date: 'Feb 2 - 4, 2023', title: '3 Days Workshop on Machine Learning for Civil Engineers - Series 01', category: 'Workshop' },
];

export const RESOURCE_PERSONS = [
  { name: 'Dr. Gopal Krishna Sharma', role: 'Professor of Data Science, Dayananda Sagar College of Engineering, Bengaluru; Former Director, Fiserv India Ltd.' },
  { name: 'Dr. M. A. Jayaram', role: 'Professor, RASTA Bengaluru; 37 years academic experience, 100+ papers, 17 authored textbooks.' },
  { name: 'Dr. Seelam Srikanth', role: 'Associate Professor, School of Civil Engineering, REVA University, Bengaluru; traffic flow modeling and AI specialist.' },
  { name: 'Dr. Manu Santhanam', role: 'Professor, Building Technology and Construction Management Division and Associate Dean (ICSR), IIT Madras.' },
  { name: 'Shri V. R. Kulkarni', role: 'Former President of ICI, Former Head - R&D, ACC Cements Ltd., Author of ICI Handbook on Concrete Durability.' },
  { name: 'Dr. Shivakumar K.', role: 'Emeritus Professor and Senior Research Scholar, University of Cape Town, South Africa; Former President, RILEM.' },
  { name: 'Shri Mark Alexander', role: 'Specialist in concrete durability design for civil and nuclear infrastructure facilities.' },
  { name: 'Dr. R. V. Ranganath', role: 'Professor, Dept. of Civil Engineering, BMS College of Engineering, Bengaluru; Former Principal, BMSIT.' },
  { name: 'Dr. Manamohan R. Kalgal', role: 'Independent Structural Consultant, Former Technical Advisor - UltraTech Cement Ltd., Former President, ICI.' },
];

export const FUNDED_RESEARCH_BROCHURE = [
  {
    title: 'Quantification and Characterization of Demolished Brick Masonry Waste as a Potential source of Construction Material',
    sponsor: 'Karnataka State Council for Science & Technology (KSCST)',
    period: '2020-21 (12 months) - Completed',
    value: '0.05 Lakhs',
  },
  {
    title: 'Performance Assessment Of Roads Constructed Using Waste Plastic In Karnataka Under PMGSY',
    sponsor: 'National Rural Infrastructure Development Agency (NRIDA), New Delhi',
    period: '09/2019 (18 months) - Completed',
    value: '20.50 Lakhs',
  },
  {
    title: 'Test track expansion design project for VOLVO group, Hoskote',
    sponsor: 'VOLVO Group, Hoskote',
    period: '02/2020 - Completed',
    value: '4.30 Lakhs',
  },
  {
    title: 'Studies On Effectiveness of Crack Sealing Treatment with GlasGrid on Devihalli Hassan Road executed by Saint Gobain Adfors',
    sponsor: 'Saint Gobain India Pvt Ltd / M/s L&T Infrastructure Development Projects Ltd.',
    period: '07/2021 (18 months) - Completed',
    value: '23.04 Lakhs',
  },
  {
    title: 'Performance Evaluation of Cement Concrete Rural Roads Constructed under PMGSY in Karnataka',
    sponsor: 'National Rural Infrastructure Development Agency (NRIDA), New Delhi',
    period: '03/2021 (12 months)',
    value: '22.64 Lakhs',
  },
  {
    title: 'Laboratory Studies on Use of High-Volume Fly ash Cement in Pavement Layers',
    sponsor: 'M/s ACC Limited / National Rural Infrastructure Development Agency (NRIDA)',
    period: '05/2014 - Completed',
    value: '12.00 Lakhs',
  },
];

export const FUNDED_RESEARCH_EXTENDED = [
  {
    sl: 1,
    title: 'Performance Evaluation of Roads Constructed Using Jute Geo-Textiles in the State of Karnataka (Two Cycles)',
    sector: 'Central Govt.',
    sponsor: 'National Rural Infrastructure Development Agency (NRIDA), Ministry of Rural Development, GOI',
    sanction: '04/2023 (18 months)',
    value: '26.14 Lakhs',
  },
  {
    sl: 2,
    title: 'Performance Evaluation of PMGSY Roads Constructed Using Terrazyme in the State of Karnataka',
    sector: 'Central Govt.',
    sponsor: 'National Rural Infrastructure Development Agency (NRIDA), Ministry of Rural Development, GOI',
    sanction: '04/2023 (18 months)',
    value: '16.90 Lakhs',
  },
  {
    sl: 3,
    title: 'Laboratory and Field Performance Investigation of Rural Roads Stabilised with RBI Grade-81',
    sector: 'Central Govt.',
    sponsor: 'National Rural Infrastructure Development Agency (NRIDA), Ministry of Rural Development, GOI',
    sanction: '04/2023 (18 months)',
    value: '26.14 Lakhs',
  },
  {
    sl: 4,
    title: 'Performance Evaluation of Plastic Cell Filled Concrete Pavements (PCCBP) and Roller Compacted Concrete Pavements (RCCP) in Rural Roads of Karnataka',
    sector: 'Central Govt.',
    sponsor: 'National Rural Infrastructure Development Agency (NRIDA), Ministry of Rural Development, GOI',
    sanction: '06/2023 (24 months)',
    value: '26.43 Lakhs',
  },
  {
    sl: 5,
    title: 'Performance Evaluation of Cement Concrete Pavements in Rural Roads',
    sector: 'Central Govt.',
    sponsor: 'National Rural Infrastructure Development Agency (NRIDA), Ministry of Rural Development, GOI',
    sanction: '03/2021 (12 months)',
    value: '22.64 Lakhs',
  },
  {
    sl: 6,
    title: 'Studies on Effectiveness of Crack Sealing Treatment with GlasGrid on Devihalli Hassan Road Executed by Saint Gobain Adfors',
    sector: 'Industry',
    sponsor: 'M/s L&T Infrastructure Development Projects Ltd. / Saint Gobain India Pvt Ltd',
    sanction: '07/2021 (18 months)',
    value: '23.04 Lakhs',
  },
  {
    sl: 7,
    title: 'Quantification and Characterization of Demolished Brick Masonry Waste as a Potential Source of Construction Material',
    sector: 'State Govt.',
    sponsor: 'Karnataka State Council for Science & Technology (KSCST)',
    sanction: '2020-21 (12 months)',
    value: '0.05 Lakhs',
  },
  {
    sl: 8,
    title: 'Test Track Expansion - Design Requirement',
    sector: 'Industry',
    sponsor: 'VOLVO, Hoskote',
    sanction: '02/2020',
    value: '4.30 Lakhs',
  },
  {
    sl: 9,
    title: 'Performance Assessment of Roads Constructed Using Waste Plastic in Karnataka under PMGSY',
    sector: 'Central Govt.',
    sponsor: 'National Rural Infrastructure Development Agency (NRIDA), Ministry of Rural Development, GOI',
    sanction: '09/2019 (18 months)',
    value: '20.50 Lakhs',
  },
  {
    sl: 10,
    title: 'Development of SCC Mixes as per CED 02 (11290) by Utilizing Construction and Demolition Waste for Sustainable Construction',
    sector: 'State Govt.',
    sponsor: 'Karnataka State Council for Science & Technology (KSCST)',
    sanction: '07/2019',
    value: '0.05 Lakhs',
  },
  {
    sl: 11,
    title: 'Road Safety Audit and Black Spot Studies for Bangalore City',
    sector: 'State Govt.',
    sponsor: 'PRAMC, PWP&IWTD',
    sanction: '10/2019',
    value: '3.65 Lakhs',
  },
  {
    sl: 12,
    title: 'Citizen Monitoring of PMGSY Rural Roads in Seven States (Assam, Jharkhand, Karnataka, Meghalaya, Odisha, Rajasthan, Uttarakhand)',
    sector: 'NGO / World Bank',
    sponsor: 'NRIDA and Public Awareness Centre (PAC)',
    sanction: '08/2016',
    value: '2.00 Lakhs',
  },
  {
    sl: 13,
    title: 'Laboratory Studies of Use of High Volume Flyash Cement in Pavement Layers',
    sector: 'Industry',
    sponsor: 'M/s ACC Limited',
    sanction: '05/2014',
    value: '12.00 Lakhs',
  },
  {
    sl: 14,
    title: 'Laboratory Studies on Properties of Soils Treated with Stabilig Stabiliser',
    sector: 'Industry',
    sponsor: 'Stabilig Road Solutions Pvt Ltd',
    sanction: '06/2012',
    value: '4.00 Lakhs',
  },
  {
    sl: 15,
    title: 'Soil Compaction Project',
    sector: 'Industry',
    sponsor: 'Ingersoll Rand (I) Pvt Ltd.',
    sanction: '03/2003',
    value: '5.00 Lakhs',
  },
];

export const PUBLICATIONS = [
  'Dr. Aakash Gupta, Prajwal M. G., Sachin Gowda, and Jaya R. S. (Jan 2024). Development of Correlation Between Indirect Tensile Strength and Resilient Modulus for VG-40 Bituminous Concrete. Indian Highways, Vol. 52, No. 01, ISSN 0376-7256, Indian Roads Congress.',
  'Sachin Gowda, C. S. Nandan, M. A. Jayaram, Aakash Gupta, and R. Shinganmakki Jaya (2024). Unsupervised Clustering of Asphalt Pavement Conditions Using Fuzzy C-Means Algorithm with Principal Component Analysis Aided Dimensionality Reduction. Lecture Notes in Networks and Systems, Springer.',
  'Sachin Gowda M. K., Nandan C. S., M. A. Jayaram, Aakash Gupta, Sampath Kumar Pasupunuri, and Jaya R. Shinganmakki (2024). Machine Learning-Based Ensemble Techniques for Optimal Prediction of Pavement Condition. TRBAM-24-01561, 103rd TRB Annual Meeting, Washington DC.',
  'T. R. Suhas, Pradeep Kumar, and Sampath Kumar (2023). Evaluation of Pavement Surface Distress Using Image Processing and Artificial Neural Network. ASTM Journal of Testing and Evaluation, JTE-2022-0259.R2.',
  'M. A. Jayaram and M. Chandana (2023). Design of Flexible Pavements Through Fuzzy Inference System with Genetic Algorithm Optimized Rule Base. International Journal of Transportation Science and Technology (Q1), Elsevier.',
  'Prahallad B. S., Jaya R. Shinganmakki, and Mohan M. (2023). Determination of Air Voids in Asphalt Mixes by Image Processing Technique. International Journal of Engineering Research & Technology (IJERT), Vol. 12, Issue 07.',
  'Prahallad B. S., Jaya R. Shinganmakki, Swathi J., Karthik K. N., and Mohan M. (2023). A Study of Air Voids (Vv) Variation with Compactive Effort in Asphalt Mixes. Nanoworld Journal, Scopus Indexed.',
  'Nischal Suresh K. and Jaya R. Shinganamakki (2023). Updating Vehicle Operating Cost Based on Wholesale Price Index. IJERT, Vol. 12, Issue 07.',
];

export const ACTIVE_MOUS = [
  {
    partner: 'Bentley Systems India Pvt. Ltd.',
    logo: '/logos/bentley.svg',
    detail: 'Inauguration of Centre of Excellence for Digital Infrastructure Innovation Hub and software education partnership.',
  },
  {
    partner: 'National Institute of Technical Teachers Training & Research (NITTTR), Kolkata',
    logo: '/logos/nitttr.png',
    detail: 'Formalized MOU for joint technical education, faculty training, and highway technology innovation.',
  },
  {
    partner: 'National Rural Infrastructure Development Agency (NRIDA), Government of India',
    logo: '/logos/nrida-pmgsy.svg',
    detail: 'Research and performance evaluation of sustainable rural road pavements in Karnataka.',
  },
  {
    partner: 'UltraTech Cement Limited',
    logo: '/logos/ultratech.webp',
    detail: 'Collaborative research on concrete pavement engineering and durability.',
  },
  {
    partner: 'Infra Support Engineering Consultants Private Limited',
    logo: '/logos/infra-support.png',
    detail: 'Joint technical consultancy and highway investigation programs.',
  },
  {
    partner: 'Smart Infra Innovations',
    logo: '/logos/smart-infra.svg',
    detail: 'Applied digital and smart infrastructure engineering collaboration.',
  },
  {
    partner: 'Street Matrix Private Limited and Streets Consultants',
    logo: '/logos/street-matrix.png',
    detail: 'Traffic safety, pavement evaluation, and urban mobility engineering.',
  },
];

export const CONSULTANCY_DOMAINS = [
  {
    title: 'Road Construction and Quality Control',
    services: [
      'Project Management Consultancy',
      'Third Party Inspection and monitoring of quality of construction',
      'Quality Control and assurance of road construction',
      'Construction Quality Management',
    ],
  },
  {
    title: 'Pavement Design',
    services: [
      'Alternative designs based on life cycle cost analysis',
      'Highway Geometric Design',
      'Highway Facilities Design',
      'Runway and Taxiways - Design, Testing and Evaluation',
      'Overlay Design for Flexible, Composite and Rigid Pavements',
    ],
  },
  {
    title: 'Traffic Engineering and Management',
    services: [
      'Classified Traffic Volume Count (Metro Count, Videographic Method)',
      'Spot Speed Studies',
      'Speed and Delay Studies',
      'Origin and Destination survey',
      'Accident / Blackspot Studies',
      'Traffic Remedial Measures',
      'Junction Improvement',
      'Pedestrian Safety Studies',
    ],
  },
  {
    title: 'Road Asset Management',
    services: [
      'Technical Audit of Highway Pavements',
      'Premature Failure Investigation of pavements',
      'Pavement Evaluation and Rehabilitation Design',
      'Estimation of Bill of Quantities, Rate Analysis and Cost Estimation',
      'Project Cost Estimation',
      'Road Safety Audit - Design stage and during operations stage',
      'Pavement Structural and Functional Evaluation',
      'Pavement Condition Surveys',
      'Highway Maintenance and Management',
      'New material characterization',
    ],
  },
  {
    title: 'Material Testing and Characterization (NABL Accredited)',
    services: [
      'Soil',
      'Aggregates',
      'Bitumen',
      'Cement',
      'Concrete',
      'Steel',
      'Bitumen Emulsion',
      'Non-Destructive Testing',
      'Concrete Mix Design',
      'Mix Design of sub-base, base and bituminous layers (GSB, WMM, DBM, BC, SMA, Micro Surfacing)',
    ],
  },
  {
    title: 'Field Investigations',
    services: [
      'Pavement Performance evaluation',
      'Premature Pavement failure investigation',
      'Road Inventory Survey',
      'Unevenness measurement using MERLIN and Bump Integrator',
      'Falling Weight Deflectometer (FWD) Studies',
      'Benkelman Beam Deflection (BBD) Studies',
      'Field Permeability Tests',
      'Friction Test using British Pendulum Tester (BPN)',
      'Micro and Macro Texture Measurement of Pavement Surfaces',
      'Dynamic Cone Penetration Test',
      'Pavement Condition Evaluation using Go-PRO',
      'Field Density and Gradation Tests on constructed pavement layers',
      'Core Extraction Tests',
    ],
  },
  {
    title: 'Preparation of Detailed Project Report (DPR)',
    services: [
      'Reconnaissance Survey',
      'Soil Investigation',
      'Engineering Surveys and Investigations',
      'Traffic Survey and Forecast',
      'Pavement Engineering Studies and Design',
      'Rate analysis and Cost estimate',
      'Drawings and Report preparation',
    ],
  },
];

export const TESTING_FACILITIES = [
  {
    category: 'Tests on Soil',
    tests: [
      'Wet and Dry Sieve Analysis',
      'California Bearing Ratio (CBR) Test',
      'Atterberg Limits',
      'Free Swell Index',
      'Light and Heavy Compaction',
      'Moisture Content',
      'Specific Gravity',
      'Direct Shear Test',
      'Triaxial Test',
      'Hydrometer Analysis',
      'Permeability Test',
    ],
  },
  {
    category: 'Tests on Aggregates',
    tests: [
      'Gradation',
      'Impact Value',
      'Crushing Value',
      'Shape Test (Flakiness and Elongation Index)',
      'Los Angeles Abrasion',
      'Specific Gravity',
      'Water Absorption',
      'Polished Stone Value',
      'Bulk Density',
    ],
  },
  {
    category: 'Tests on Cement',
    tests: [
      'Normal Consistency',
      'Initial and Final Setting Time',
      'Fineness by Blaine Air Permeability',
      'Compressive Strength',
      'Soundness',
      'Density by Lechatelier apparatus',
    ],
  },
  {
    category: 'Tests on Concrete',
    tests: [
      'Compressive Strength',
      'Split Tensile Strength',
      'Flexural Strength',
      'Workability by Slump Test',
      'Workability by Vee Bee Consistometer',
      'Workability by Compaction Factor Test',
      'Permeability',
      'Flow Table Test',
    ],
  },
  {
    category: 'Tests on Bitumen',
    tests: [
      'Ductility',
      'Penetration',
      'Softening Point',
      'Thin Film Oven Test',
      'Flash and Fire Point Test',
      'Viscosity by Brookfield / Say Bolt Viscometer',
      'Specific Gravity',
      'Residue by Evaporation of Bituminous Emulsion',
    ],
  },
  {
    category: 'Tests on Bituminous Mixes',
    tests: [
      'Marshall Stability',
      'Rutting',
      'Skid Resistance',
      'Fatigue Test',
      'Indirect Tensile Strength',
      'Bitumen Extraction',
    ],
  },
  {
    category: 'Field Tests',
    tests: [
      'Falling Weight Deflectometer Studies',
      'Benkelman Beam Test',
      'Plate load test',
      'Ultrasonic Pulse Velocity Test',
      'Rebound Hammer Test',
      'Roughness by Bump Integrator and MERLIN',
      'Skid Resistance',
      'Field Density by Sand Replacement and Core Cutter Method',
      'Gradation of Pavement Layers',
      'Moisture Content by Rapid Moisture Meter',
      'Bitumen Extraction',
      'Camber',
      'Micro and Macro Texture of Pavement',
      'Dynamic Cone Penetration Test',
    ],
  },
];

export const LABORATORY_DIVISIONS = [
  {
    name: 'Soil and Aggregate Laboratory',
    image: '/images/brochure/cons_p5_1_349x219.jpeg',
    equipment: [
      'CBR Apparatus and Moulds',
      'Casagrande Atterberg Limits Apparatus',
      'Digital and Analog Direct Shear Apparatus',
      'Triaxial Testing Machine',
      'Proctor and Modified Auto Compactor',
      'Los Angeles Abrasion and Aggregate Impact Testers',
      'GI and Brass Sieve Sets (90 mm down to 0.045 mm)',
      'Non-nuclear Density Gauge and Rapid Moisture Meter',
    ],
  },
  {
    name: 'Universal Testing and Concrete Laboratory',
    image: '/images/brochure/cons_p5_5_348x219.jpeg',
    equipment: [
      'Fully Automatic Compression Testing Machine - 3000 kN',
      'Compression Testing Machine - 2000 kN',
      'Universal Testing Machine (UTM) - 600 kN',
      'Flexure Testing Machine - 100 kN',
      'U-Box, V-Funnel, and J-Ring for Self-Compacting Concrete',
      'PROCEQ Rebound Hammer, Profometer, and Ultrasonic Pulse Velocity Tester',
      'Automatic Air Blaine Apparatus and Concrete Permeability Rig',
    ],
  },
  {
    name: 'Bitumen and Bituminous Mix Laboratory',
    image: '/images/brochure/cons_p5_6_228x144.jpeg',
    equipment: [
      'Marshall Stability Test Apparatus and Auto Compactor',
      'Wheel Rut Shaper and Wheel Rut Tester',
      'Ductility / Elastic Recovery and Ring & Ball Apparatus',
      'Standard Penetrometer with Digital Timer',
      'Pensky-Martens Flash & Fire Point and Thin Film Oven Equipment',
      'Saybolt Furol, Digital Tar, and Capillary Viscometers',
      'Repeated Load Tester and Stone Polishing Value Apparatus',
    ],
  },
  {
    name: 'Mobile Lab and Field Testing Equipment',
    image: '/images/brochure/cons_p5_4_348x219.jpeg',
    equipment: [
      'RASTA Mobile Testing Laboratory Vehicle (KA02AJ8741)',
      'Falling Weight Deflectometer (FWD) and Benkelman Beam Apparatus',
      'Bump Integrator (Fifth Wheel) and MERLIN Roughness Meter',
      'British Pendulum Portable Skid Resistance Tester',
      'Portable Wheel Weigh Bridge and Digital Camber Board',
      'Core Extraction Rig and Plate Load Test Assembly',
    ],
  },
];

export const ONGOING_PROJECTS = [
  { sl: 1, client: 'BREN Sports City Pvt Ltd.', services: 'Quality Control and Assurance of Racetrack and other roads at BREN Sports City, Doddaballapura' },
  { sl: 2, client: 'SHDP', services: 'Project Management Consultancy at Hassan District' },
  { sl: 3, client: 'Bengaluru Traffic Police', services: 'Improvement of 16 critical junctions in Bengaluru City' },
  { sl: 4, client: 'KIADB', services: 'Project Management Consultancy at Bhavanahalli, Nandur, Chamarajanagar Industrial Areas' },
  { sl: 5, client: 'APMC', services: 'Project Management Consultancy at Bengaluru Urban & Rural (Zone I) and Kolar, Chikkaballapur & Ramanagara' },
  { sl: 6, client: 'Agratha Mega Food Park Pvt. Ltd.', services: 'Project Management Consultancy, Nelamangala' },
  { sl: 7, client: 'KRIDL', services: 'Third Party Inspection at Ramanagar, Kolar & Bangalore' },
];

export const ACADEMIC_BROCHURE_CONSULTANCY = [
  { sl: 1, title: 'Project Management and quality management works (PMC & QMC) conducted at different districts of Karnataka.', client: 'KIADB, GoK' },
  { sl: 2, title: 'Laboratory Studies On Properties of Soils Treated With "Stabilig" Stabilizer', client: 'Stabilig Road Solutions Pvt Ltd, Delhi' },
  { sl: 3, title: 'Laboratory Studies of "Use of High Volume Flyash Cement in Pavement Layers"', client: 'M/s ACC Limited, Mumbai' },
  { sl: 4, title: 'Material Testing for improvement of NH 214 & NH 4', client: 'Feedback Ventures Pvt. Ltd, Bangalore' },
  { sl: 5, title: 'Visiting the site from 175 to 229.6+600 km NH-7, Submitting Report with suggestions.', client: 'M/s. SOMA Enterprises Ltd, Adilabad Project' },
  { sl: 6, title: 'Study of failure of Road Stretch at Thopur Ghat and Recommendations.', client: 'L&T Krishnagiri Thopur Toll Road Ltd' },
  { sl: 7, title: 'Consultancy and Site Visit, Material Testing at site and lab and submitting report with suggestions.', client: 'M/s. Feedback Infrastructure Services Pvt.Ltd, Unit-Bangalore unit' },
  { sl: 8, title: 'Conducting Bump Integrator Survey (Roughness Studies) for Nelmangala - Tumkur Section.', client: 'M/s. Consulting Engineering Services (India) Pvt Ltd (CES), Cunningham Road, Bangalore 560 052' },
  { sl: 9, title: 'Black Spot Studies for selected locations in Bangalore and recommendations for improvement', client: 'PRAMC, PWP & IWTD, K.R Circle, Bangalore' },
  { sl: 10, title: 'Design verification and Technical consultancy services', client: 'Toyota Kirloskar Motors Pvt Ltd, Bidadi' },
  { sl: 11, title: 'Empanelment of Third-Party Evaluators for Technical Evaluation of Mahatma Gandhi National Rural Employment Guarantee scheme', client: 'MGNREGS' },
  { sl: 12, title: 'Empanelment of Third party inspection, Quality Assurance and Quality Control (QA&QC) services for the works of KRIDL', client: 'KRIDL' },
];

export const COMPLETED_PROJECTS = [
  { sl: 1, client: 'KIADB', services: 'Project Management Consultancy at Bengaluru, Dharwad, Vijayapura, Tumkur, Belagavi, Koppal, Mysuru, Kolar, Dakshina Kannada, Ramanagara and many other Industrial Areas' },
  { sl: 2, client: 'Volvo CSR', services: 'Improvements of 4 critical junctions near Hoskote.' },
  { sl: 3, client: 'Intel', services: 'Project Management Consultancy, Bellandur' },
  { sl: 4, client: 'APMC', services: 'Axle Load Survey and Rigid Pavement Design, Mysore' },
  { sl: 5, client: 'KRIDL', services: 'Third Party Inspection in Bangalore Urban & Rural, Ramanagara, Kolar, Hassan, Chitradurga' },
  { sl: 6, client: 'MGNREGA', services: 'Third Party Inspection in Bangalore Urban & Rural, Kolar, Tumkur, Chitradurga, Mysore, Chamarajanagar, Gadag, Dharwad' },
  { sl: 7, client: 'PRAMC', services: 'Black Spot Studies, Bengaluru' },
  { sl: 8, client: 'Lomash Slurry Tech', services: 'Pavement Surface Texture test, Koppal Aerodrome' },
  { sl: 9, client: 'Ground Reality (Pothole Raja)', services: 'Performance Evaluation of Pavement constructed using grid mat, Bellandur' },
  { sl: 10, client: 'Gap Avia Pvt Ltd., Haryana', services: 'Consultancy works of Hisar Airport, Haryana' },
  { sl: 11, client: 'S S Alur Construction Company, Vijayapur', services: 'Development of Greenfield Airport for ATR 72 for Day VFR Operation at Vijayapur in Karnataka state (Package-1)' },
  { sl: 12, client: 'ACME Constructions, Bengaluru', services: 'Lab testing & Consultancy towards near Press Road works' },
  { sl: 13, client: 'National Constructions, Shivamogga', services: 'Consultancy services of Airport construction, Shivamogga' },
  { sl: 14, client: 'Vedha Engineers, Nagarabhavi', services: 'Lab testing & Consultancy towards Bus yard and road works' },
  { sl: 15, client: 'Toyota Kirloskar Motors Ltd., Bidadi', services: 'Consultancy - Design Verification and quality control of Commutation Yard works' },
  { sl: 16, client: 'Toyota Kirloskar Motors Ltd., Bidadi', services: 'Technical Services for P-1 Road work' },
  { sl: 17, client: 'Toyota Kirloskar Motors Ltd., Bidadi', services: 'Technical Consultancy for Sub track Works' },
  { sl: 18, client: 'Toyota Kirloskar Motors Ltd., Bidadi', services: 'Technical Services for D22 CBU Yard Additional Road Widening and Parking area' },
  { sl: 19, client: 'Toyota Kirloskar Motors Ltd., Bidadi', services: 'Technical Consultancy Services for Plant -1 Road Abnormality Counter Measures' },
  { sl: 20, client: 'Toyota Kirloskar Motors Ltd., Bidadi', services: 'Third Party Lab Testing of Materials for D22 CBU Yard. Lab testing of Materials Including Mix Designing and Material testing of Subgrade Soil, GSB, WMM, DBM, BC/SMA, DLC, PQC, as per Standards & specification in the beginning of the Projects.' },
  { sl: 21, client: 'Toyota Kirloskar Motors Ltd., Bidadi', services: 'Technical Consultancy Services for Design, Verification and Quality Control of CBU Yard' },
  { sl: 22, client: 'BMRCL', services: 'Design of new service road from Jalahalli metro station to Nagasandra Metro station to be taken up by BMRCL & consultancy services and material testing during construction' },
  { sl: 23, client: 'Stabilig Road Solution, Delhi', services: 'Conducting tests on soil stabilizing' },
  { sl: 24, client: 'ACC Cement Mumbai', services: 'ACC Sponsored work for use of high volume flyash cement in sub base & base layers' },
  { sl: 25, client: 'Task Force for Quality Assurance in public Constructions, GOK', services: 'Consultancy' },
  { sl: 26, client: 'Feedback Ventures Pvt. Ltd. No.93, Opp KSRTC Central Off, KH Road, Bangalore', services: 'Consultancy-field Survey and testing' },
  { sl: 27, client: 'Volvo India Private Limited Yalachalli Village, Tavarekere Post, Hoskote Taluk, Bangalore 562 122', services: 'Consultancy-Site visit by RASTA experts and giving suggestions and construction support to the site engineers and submitting site visit reports' },
  { sl: 28, client: 'M/s. Consulting Engineering Services India Pvt. Ltd. (CES), Cunningham Road, Bangalore', services: 'Consultancy - Conducting Bump Integrator Survey (Roughness Studies) for Nelamangala - Tumkur Section 2' },
  { sl: 29, client: 'Executive Engineer, Project Division, Byatarayanapura, Yelahanka Zone, BBMP, Bangalore 560 092', services: 'Consultancy - Conducting Benkelman Beam Deflection studies for the two roads: (a) M.S. Palya Junction to Yelahanka - 6 km, (b) Kogilu cross to Bangalore - 2.5 km' },
  { sl: 30, client: 'S R Ravishankar Class - 1, Contractor No.80, 1st main road, 65, Chamarajpet Bangalore 560 018', services: 'Consultancy - Material and field-testing for Road works at Jigani' },
  { sl: 31, client: 'Pixel Softek Pvt. Ltd. (Survey and GIS Division), Hudson Circle, Bangalore 560 027', services: 'Consultancy - Road Survey total 3 km' },
  { sl: 32, client: 'Other Private firms such as Silver Shine, Veeraraju Constructions, Jatti, East Coast Construction, Vinyas etc.', services: 'Consultancy and testing for PMGSY and Metro and other works' },
  { sl: 33, client: 'M/s. SOMA Enterprises Ltd, Adilabad Project', services: 'Consultancy - Visiting the site from 175 to 229.6+600 km NH-7, Submitting Report with suggestions' },
  { sl: 34, client: 'L&T Krishnagiri Thopur Toll Road Ltd', services: 'Consultancy - Study of failure of Road Stretch at Thapur Ghat and Suggestions' },
  { sl: 35, client: 'L&T Ramboll Consulting Engineers Pvt.Ltd, Anna Salai, Chennai-600035', services: 'Consultancy - Carrying out roughness survey on both wheel paths using fifth wheel type bump integrator equipment and suggesting' },
  { sl: 36, client: 'M/s. Feedback Infrastructure Services Pvt. Ltd, Unit-Bangalore unit', services: 'Consultancy and Site Visit, testing at site and lab' },
  { sl: 37, client: 'TATA Advanced Materials, Ltd. Jigani', services: 'Consultancy' },
  { sl: 38, client: 'Task Force for Quality Assurance in public Constructions, GOK', services: 'Consultancy - Extraction of core and analysis' },
  { sl: 39, client: 'BBIPL Infrastructure India Pvt. Ltd. through RITES', services: 'Consultancy work towards mix design for DBM etc.' },
  { sl: 40, client: 'KRIDC Ltd. (old Land Army)', services: 'Consultancy and Testing' },
  { sl: 41, client: 'Other Private firms such as Jatti, East Coast Construction, Vinyas etc.', services: 'Consultancy, Testing' },
  { sl: 42, client: 'Bangalore Metro Rail Corporation Ltd. (BMRCL)', services: 'DPR Preparation, Testing of Materials and consultancy' },
  { sl: 43, client: 'National Rural Road Development Agency (NRRDA) - New Delhi', services: 'Scrutiny of Estimates, Consultancy and testing' },
  { sl: 44, client: 'KRRDA, Bangalore and Agencies', services: 'Consultancy and testing' },
  { sl: 45, client: 'Public Awareness Centre, Bangalore', services: 'Consultancy Services' },
  { sl: 46, client: 'Task Force for Quality Assurance in public Constructions, GOK', services: 'Quality Assurance and Consultancy Services for BBMP Roads' },
  { sl: 47, client: 'M/s. Feedback Infrastructure Services Pvt. Ltd., Unit - Bangalore-27', services: 'Consultancy and testing' },
  { sl: 48, client: 'GMR Infrastructure Ltd., IBC Knowledge Park, Bannerghatta Road, Bangalore - 560029', services: 'Consultancy and study on different soil mixed with stabilizers' },
  { sl: 49, client: 'Legend Surface Developers Pvt. Ltd-RBI_81 and local agents M/s. Shivananda Vijaya', services: 'Consultancy and testing materials' },
  { sl: 50, client: 'EE. National Highways', services: 'Consultancy and Testing' },
  { sl: 51, client: 'CGGC SOMAJV, Anantapur', services: 'Consultancy and Design Mix' },
  { sl: 52, client: 'E I Technologies Pvt. Ltd, Bangalore', services: 'Consultancy and Strategic Traffic Survey' },
  { sl: 53, client: 'Pixel Softeck Pvt. Ltd, Bangalore', services: 'Consultancy and testing materials for PMGSY works' },
  { sl: 54, client: 'M/s NYSE Infrastructure Pvt. Ltd, Kovur, Nellore District', services: 'Failure Investigation and consultancy' },
  { sl: 55, client: 'Land Army and other construction organizations', services: 'Consultancy and testing for PMGSY and Metro works' },
  { sl: 56, client: 'Bangalore Metro Rail Corporation Ltd (BMRCL), Bangalore', services: 'Detailed surveying, Investigation and preparation of DPR for the road from Soap factory to Railway station' },
  { sl: 57, client: 'National Rural Road Development Agency (NRRDA) New Delhi', services: 'Scrutiny of Estimates and Technical guidance to PMGSY Works' },
  { sl: 58, client: 'KRRDA, PMGSY', services: 'Q.C Tests for PMGSY' },
  { sl: 59, client: 'Legend Surface Developers Pvt. Ltd. RBI_81', services: 'Lab Studies on the Soil stabilizer and reporting' },
  { sl: 60, client: 'Feedback Ventures Pvt. Ltd Bangalore unit', services: 'Field Studies and lab studies' },
  { sl: 61, client: 'Infra Support Engineering Consultants', services: 'Testing materials and fields studies' },
  { sl: 62, client: 'Consulting Engineering Services, (CES) Bangalore Unit', services: 'Field studies and testing of materials' },
  { sl: 63, client: 'Volvo India Private Ltd, Bangalore', services: 'Site visit and quality monitoring' },
  { sl: 64, client: 'Brigade Enterprises', services: 'Consultancy of Puttenahally Road works' },
  { sl: 65, client: 'M/s. Feedback Infrastructure Services Pvt. Ltd., Unit-Bangalore-27', services: 'Field Testing and Material Testing' },
  { sl: 66, client: 'L&T, Krishnagiri Unit, Tamilnadu', services: 'Field Studies and recommendations' },
  { sl: 67, client: 'NRRDA (National Rural Road Development Agency) works and KRRDA works', services: 'Project scrutiny, site visit and recommendations' },
  { sl: 68, client: 'Karnataka Housing Board, Bangalore', services: 'Pavement design and Consultancy' },
  { sl: 69, client: 'Assistant Registrar, Centre for Industrial Consultancy, IIT-Madras', services: 'DPR Preparation, Testing of Materials and consultancy' },
  { sl: 70, client: 'Public Awareness Centre (PAC), Bangalore', services: 'Consultancy Services' },
  { sl: 71, client: 'Erin Reddy and other construction Companies', services: 'Consultancy Services, field tests and material testing' },
  { sl: 72, client: 'Volvo India Pvt. Ltd, Bangalore unit', services: 'Consultancy, Testing of materials and field testing' },
  { sl: 73, client: 'M/s. Ingersoll India Pvt. Ltd. Bangalore Unit', services: 'Consultancy, Testing of materials and field testing' },
  { sl: 74, client: 'Infra Structure Services Pvt. Ltd. Bangalore', services: 'Material Testing and consultancy' },
  { sl: 75, client: 'M/s Scott Wilson Kirkpatrik & Co Ltd. Bangalore', services: 'Soil Testing for M-33 Package of Karnataka State Highway Improvement Project Road' },
  { sl: 76, client: 'M/s Scott Wilson Kirkpatrik & Co Ltd. Bangalore', services: 'Soil Testing for Gujarat Port limited' },
  { sl: 77, client: 'M/s KNR - Patel Constructions, Bangalore', services: 'Soil Testing for Improvement of City Roads under KMR Project in Bangalore' },
  { sl: 78, client: 'M/s Venkatesh Educational Society, Armstrong Road, Bangalore-560001', services: 'Technical Audit of Road works at MVJ medical college, hospital and Engineering College premises, Hoskote, Bangalore' },
  { sl: 79, client: 'M/s Venkatesh Educational Society, Armstrong Road, Bangalore-560001', services: 'Site Visit and quality Monitoring Works of their Medical and Engineering College' },
  { sl: 80, client: 'M/s. Feedback Infrastructure Services Pvt. Ltd. Unit - Bangalore-27', services: 'Benkelman Deflection Survey and Soil Investigations for ADB funded KUIDFC urban infrastructure project on identified roads in Puttur, Ullal and Mangalore towns in Karnataka' },
  { sl: 81, client: 'M/s Dalal Consultants and Engineers Limited, Chennai', services: 'Soil testing for PMGSY Roads near Nelamangala, Bangalore' },
  { sl: 82, client: 'Panchayat Raj Engineering Department, Bangalore Rural Division', services: 'Roughness / Unevenness Survey of 165 km NH 48 between Nelamangala and Hassan' },
  { sl: 83, client: 'M/s Secon Surveys Pvt. Limited, Bangalore', services: 'Failure Investigations of a Pavement Stretch of National Highway in Karnataka' },
  { sl: 84, client: 'M/s Afcons Constructions and Indian Institute of Technology, Chennai', services: 'Material Testing for four Laning Project of NH 4A from Panaji - Belgaum' },
  { sl: 85, client: 'M/s Wilbur Smith Associates Pvt. Ltd, Bangalore', services: 'Investigations and Design of Pavement for an Urban Road Stretch in Bangalore' },
  { sl: 86, client: 'M/s Brigade Enterprises Pvt. Ltd, Bangalore', services: 'Pavement Failure Investigations and Remedial Measures for Roads in Service station near Hassan' },
  { sl: 87, client: 'M/s Reliance Industries Limited, Bangalore', services: 'Field studies and testing of materials' },
];

export const ESTEEMED_CLIENTS = [
  { name: 'National Highways Authority of India (NHAI)', logo: '/logos/nhai.svg' },
  { name: 'State Highway Development Project (SHDP)', logo: '/logos/pwd.png' },
  { name: 'Volvo India Private Limited', logo: '/logos/volvo.png' },
  { name: 'BREN Sports City Pvt. Ltd.', logo: '/logos/bren.png' },
  { name: 'Larsen & Toubro Pvt. Ltd. (L&T)', logo: '/logos/lt.png' },
  { name: 'Bangalore International Airport Limited (BIAL)', logo: '/logos/bial.png' },
  { name: 'UltraTech Cements', logo: '/logos/ultratech.webp' },
  { name: 'GMR Group', logo: '/logos/gmr-group.svg' },
  { name: 'Saint Gobain Pvt Ltd', logo: '/logos/saint-gobain.webp' },
  { name: 'Public Works Department (PWD Karnataka)', logo: '/logos/pwd.png' },
  { name: 'Toyota Motors (Toyota Kirloskar Motors)', logo: '/logos/toyota.png' },
  { name: 'Intel Engineering Pvt Ltd', logo: '/logos/intel.svg' },
  { name: 'Bengaluru Traffic Police', logo: '/logos/bengaluru-traffic-police.png' },
  { name: 'Karnataka Industrial Area Development Board (KIADB)', logo: '/logos/kiadb.png' },
  { name: 'Bengaluru Metro Rail Corporation Limited (BMRCL / Namma Metro)', logo: '/logos/namma-metro.png' },
  { name: 'Bruhat Bengaluru Mahanagara Palike (BBMP)', logo: '/logos/bbmp.png' },
  { name: 'Karnataka Rural Infrastructure Development Limited (KRIDL)', logo: '/logos/kridl.png' },
  { name: 'Karnataka Rural Road Development Agency (KRRDA)', logo: '/logos/krrda.png' },
  { name: 'Karnataka Road Development Corporation Limited (KRDCL)', logo: '/logos/krdcl.png' },
  { name: 'Rural Development & Panchayat Raj (RDPR), Govt. of Karnataka', logo: '/logos/rdpr_logo.png' },
  { name: 'EI Technologies', logo: '/logos/ei-technologies.png' },
  { name: 'Skanska Cementation India Pvt Ltd.', logo: '/logos/skanska.svg' },
  { name: 'Consulting Engineering Services (CES)', logo: '/logos/ces.svg' },
  { name: 'Feedback Ventures', logo: '/logos/feedback-ventures.svg' },
  { name: 'National Rural Infrastructure Development Agency (NRIDA)', logo: '/logos/nrida-pmgsy.svg' },
  { name: 'MGNREGA', logo: '/logos/mgnrega.png' },
  { name: 'Bengaluru Smart City', logo: '/logos/bengaluru-smart-city.png' },
  { name: 'Karnataka State Highways Improvement Project (KSHIP)', logo: '/logos/karnataka-seal.svg' },
];

export const PARTNER_LOGOS = [
  { name: 'Larsen & Toubro (L&T)', src: '/logos/lt.png' },
  { name: 'Volvo India Private Limited', src: '/logos/volvo.png' },
  { name: 'UltraTech Cement', src: '/logos/ultratech.webp' },
  { name: 'Kempegowda International Airport Bengaluru (BIAL)', src: '/logos/bial.png' },
  { name: 'Bengaluru Metro Rail Corporation Limited (Namma Metro)', src: '/logos/namma-metro.png' },
  { name: 'Toyota Motors', src: '/logos/toyota.png' },
  { name: 'Public Works Department (PWD Karnataka)', src: '/logos/pwd.png' },
  { name: 'GMR Group', src: '/logos/gmr-group.svg' },
  { name: 'Bruhat Bengaluru Mahanagara Palike (BBMP)', src: '/logos/bbmp.png' },
  { name: 'Bengaluru Traffic Police', src: '/logos/bengaluru-traffic-police.png' },
  { name: 'Saint-Gobain', src: '/logos/saint-gobain.webp' },
  { name: 'Karnataka Industrial Area Development Board (KIADB)', src: '/logos/kiadb.png' },
  { name: 'Karnataka Rural Infrastructure Development Limited (KRIDL)', src: '/logos/kridl.png' },
  { name: 'Karnataka Rural Road Development Agency (KRRDA)', src: '/logos/krrda.png' },
  { name: 'Rural Development & Panchayat Raj (RDPR)', src: '/logos/rdpr_logo.png' },
  { name: 'EI Technologies (A Cognizant Company)', src: '/logos/ei-technologies.png' },
  { name: 'Consulting Engineering Services (CES)', src: '/logos/ces.svg' },
];

export const ALUMNI_STORIES = [
  {
    name: 'Amrutha D.',
    batch: 'M.Tech Highway Engineering (2023 - 2025) - Gold Medalist',
    position: 'Traffic Engineer at Arcadis',
    summary:
      'Gained practical highway engineering experience through site visits, internships, technical workshops, and exposure to Artificial Intelligence and Machine Learning in transportation.',
  },
  {
    name: 'Sachin Gowda',
    batch: 'M.Tech Highway Technology (2016 - 2018)',
    position: 'Scientist at Central Road Research Institute (CRRI), New Delhi',
    summary:
      'Built strong applied testing and research capabilities at RASTA, leading to research publications with TRB and Springer and selection as a Scientist at CRRI.',
  },
  {
    name: 'Abhishek M. K.',
    batch: 'M.Tech Highway Technology (2023 - 2025)',
    position: 'Highway and Transportation Engineering Professional',
    summary:
      'Completed advanced highway modeling projects, field surveys, and industry-guided coursework bridging academic principles and infrastructure execution.',
  },
];

export const CONTACT_DETAILS = {
  address: 'VOLVO Construction Equipment Campus, # 7 & 8, Phase 1, Peenya Industrial Area, Bengaluru - 560058, Karnataka, India',
  landlines: ['080 22192500', '080 22192699', '080 22192705', '080 22192706', '080 22192642'],
  primaryMobile: '+91 96063 26161',
  trainingHelplines: ['+91 98805 49544', '+91 97313 39914', '+91 93435 09933', '+91 98862 78478'],
  email: 'group.rasta@rastaindia.com',
  website: 'www.rastacentre.co.in',
  social: {
    instagram: 'https://www.instagram.com/rastacenterforroadtechnology',
    linkedin: 'https://www.linkedin.com/in/rasta-center-for-road-technology-456070297',
  },
  people: [
    { name: 'Mr. B. Sridhar', role: 'Trust Administrator / Administration', phone: '+91 98450 36377', email: 'group.rasta@rastaindia.com' },
    { name: 'Dr. K. M. Mallesha', role: 'Consultancy Services and Testing', phone: '+91 99009 23722', email: 'kmm@rastaindia.com' },
    { name: 'Dr. G. Kavitha', role: 'Academics, Training and R&D', phone: '+91 97313 39914', email: 'gkavitha@rastaindia.com' },
    { name: 'Mrs. Jayanthi Manoj', role: 'Accounts Department', phone: '+91 99166 82206', email: 'accounts@rastaindia.com' },
    { name: 'Mrs. Laxmi C. Naik', role: 'General Information and Admissions', phone: '+91 96063 26161', email: 'group.rasta@rastaindia.com' },
  ],
};
