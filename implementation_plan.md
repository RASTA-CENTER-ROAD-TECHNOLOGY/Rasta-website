# Implementation Plan: RASTA Center for Road Technology Website

## 1. Purpose and Compliance Standards

This plan defines the architecture, components, data model, visual styling, and deliverables for the RASTA (Resource Centre for Asphalt and Soil Training Academy - Center for Road Technology) multi-page website and downloadable college brochure PDF.

### 1.1 Mandatory Standards
1. **ASD-STE100 Language Standard**: Write all website copy, user interface labels, navigation items, descriptions, legal text, and PDF brochure content in ASD-STE100 (Simplified Technical English). Use active voice, concise sentences, and unambiguous technical words. Keep official proper nouns, course titles, person names, client names, and project titles unchanged.
2. **Zero Emojis**: Do not place emojis in any source file, user interface component, documentation file, or generated PDF.
3. **Architectural Academic Styling**: Do not use rounded rectangles, bright glowing outlines, pill badges, or gradient hero text. Use sharp 0px structural corners (`--cn-radius: 2px` on CardNav only, `cornerRadius={0}` on CircularCarousel, `radius={0}` on DepthCarousel), hairline structural borders (`1px solid #CBD5E1`), solid datum bars (`2px solid #0F3D7A`), and dashed highway lane dividers (`1px dashed #64748B`).
4. **Initial Screen-Size Detection**: Read `window.innerWidth` synchronously when the user opens the website (`useInitialScreenMode.js`). Load desktop modules (`<CardNav />` and `<CircularCarousel />`) when width is `768px` or greater, or load mobile modules (`<Sidebar />` and `<DepthCarousel />`) when width is less than `768px`.

---

## 2. Technical Architecture and File Structure

### 2.1 Dependencies
- `react`, `react-dom`, `react-router-dom`
- `gsap` (for `<DepthCarousel />`)
- `@hugeicons/react` and `@hugeicons/core-free-icons` (for `<CardNav />`)
- `lucide-react` (for `<Sidebar />` and technical icons)
- `vite`, `@vitejs/plugin-react`

### 2.2 Workspace Layout
```text
c:\Users\lapto\Desktop\demo\Rasta\
├── public\
│   ├── images\
│   │   └── brochure\
│   └── RASTA_Complete_College_Brochure_2026.pdf
├── src\
│   ├── hooks\
│   │   └── useInitialScreenMode.js
│   ├── components\
│   │   ├── nav\
│   │   │   ├── CardNav.jsx
│   │   │   ├── CardNav.css
│   │   │   ├── DesktopNavBar.jsx
│   │   │   ├── AppSidebar.jsx
│   │   │   └── ResponsiveNavigation.jsx
│   │   ├── ui\
│   │   │   ├── sidebar.jsx
│   │   │   └── sidebar.css
│   │   ├── carousel\
│   │   │   ├── CircularCarousel.jsx
│   │   │   ├── CircularCarousel.css
│   │   │   ├── DepthCarousel.jsx
│   │   │   ├── DepthCarousel.css
│   │   │   └── RoadShowcaseCarousel.jsx
│   │   └── layout\
│   │       ├── Footer.jsx
│   │       └── PageHeader.jsx
│   ├── data\
│   │   └── rastaData.js
│   ├── pages\
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Academics.jsx
│   │   ├── Training.jsx
│   │   ├── Research.jsx
│   │   ├── Consultancy.jsx
│   │   ├── Laboratories.jsx
│   │   ├── Projects.jsx
│   │   ├── Alumni.jsx
│   │   ├── Contact.jsx
│   │   └── Terms.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── RASTA_Complete_College_Brochure_2026.pdf
├── generate_brochure_pdf.py
├── index.html
├── package.json
└── vite.config.js
```

---

## 3. Navigation Specification (`rastacentre.co.in` Tab Parity)

### 3.1 Desktop and Laptop Navigation (`>= 768px`)
- Dynamically load `<CardNav />` (`theme="light"`, `surface="solid"`, `cardEffect="rise"`, `openOn="click"`, `maxWidth={1240}`, `accentColor="#0F3D7A"`).
- Display the exact official RASTA logo (`/images/rasta-logo.png`) fetched from `https://www.rastacentre.co.in/`.
- Provide direct top strip links matching `rastacentre.co.in`: Home, About Us, Academic, Training, R&D, Consultancy, Laboratories, Projects, Alumni, Contact Us, and Download Brochure PDF.
- Configure four `<CardNav />` panels:
  1. **About Us and Alumni**: About RASTA (`/about`), Management Trustees (`/about#management`), RASTA Advisory Council (`/about#advisory-council`), Outreach Milestones (`/about#outreach`), Alumni Network (`/alumni`).
  2. **Academic**: Affiliation (`/academics#affiliation`), Programs (`/academics#programs`), Faculty (`/academics#faculty`), Infrastructure (`/academics#infrastructure`), E-Resources (`/academics#e-resources`), Placement (`/academics#placement`), Announcements (`/academics#announcements`).
  3. **Training and R&D**: Training Programs (`/training#programs`), Training Calendar 2025-2026 (`/training#calendar`), Resource Persons (`/training#resource-persons`), Workshops Conducted (`/training#workshops`), R&D Overview (`/research#overview`), Funded Research Projects (`/research#projects`), Publications (`/research#publications`), MOUs (`/research#mous`).
  4. **Consultancy, Labs and Legal**: Consultancy Services (`/consultancy`), NABL Laboratories (`/laboratories`), 62 Testing Facilities (`/laboratories#testing-facilities`), Projects Portfolio (`/projects`), Contact Us (`/contact`), Terms and Conditions (`/terms`).

### 3.2 Mobile Side Pane (`< 768px`)
- Dynamically load composable `<Sidebar />` primitives in `src/components/ui/sidebar.jsx`: `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubItem`, `SidebarMenuSubButton`, `SidebarFooter`, `SidebarRail`, `SidebarInset`, `SidebarTrigger`, and `useSidebar`.
- Include a mobile header with `<SidebarTrigger />`, official RASTA logo, and direct call/brochure access.

---

## 4. Carousel Integration

- **Desktop (`>= 768px`)**: Dynamically load `<CircularCarousel />` (`preset="cylinder"`, `intro="rise"`, `cardWidth={240}`, `aspectRatio={1.2}`, `speed={12}`, `cornerRadius={0}`, `fadeColor="#F8FAFC"`, `captions`).
- **Mobile (`< 768px`)**: Dynamically load `<DepthCarousel />` (`cardWidth={260}`, `cardHeight={330}`, `radius={0}`, `depth={210}`, `spread={72}`, `tilt={20}`, `autoplay`, `loop`).

---

## 5. Complete Data Sources and Brochure Generation

1. Combine every record from:
   - `RASTA Academic Brochure.pdf`
   - `RASTA Consulatncy Brochure_ 2025.pdf`
   - `https://www.rastacentre.co.in/` (Management Trustees, 16-member RASTA Advisory Council 2024-25, Faculty roster and non-teaching staff, E-Resources, 2025-26 Training Calendar, Resource Persons, Publications, MOUs including NITTTR Kolkata and NRIDA, Alumni RSP 2023-2027, Events, and Contacts).
2. Generate `RASTA_Complete_College_Brochure_2026.pdf` with Python `reportlab` using official RASTA logos, extracted photographs, light academic tables, sharp corners, ASD-STE100 prose, and zero emojis.
3. Verify the rendered desktop and mobile layouts in a live browser.
