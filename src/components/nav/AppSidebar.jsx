import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Building2,
  Compass,
  FileText,
  FlaskConical,
  FolderKanban,
  GraduationCap,
  Home,
  Microscope,
  Phone,
  Scale,
  Users,
  X,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from '../ui/sidebar';

const navGroups = [
  {
    label: 'Institute',
    items: [
      { title: 'Home', to: '/', icon: Home },
      {
        title: 'About Us',
        to: '/about',
        icon: Building2,
        subItems: [
          { title: 'Genesis, Vision and Mission', to: '/about#genesis' },
          { title: 'Management Trustees', to: '/about#management' },
          { title: 'RASTA Advisory Council', to: '/about#advisory-council' },
          { title: 'Technical Advisors', to: '/about#experts' },
          { title: 'Outreach and ROADTECH', to: '/about#outreach' },
        ],
      },
      { title: 'Alumni', to: '/alumni', icon: Users },
    ],
  },
  {
    label: 'Academics and Training',
    items: [
      {
        title: 'Academic',
        to: '/academics',
        icon: GraduationCap,
        badge: 'VTU',
        subItems: [
          { title: 'Affiliation', to: '/academics#affiliation' },
          { title: 'PG Programs', to: '/academics#programs' },
          { title: 'Faculty', to: '/academics#faculty' },
          { title: 'Infrastructure and E-Resources', to: '/academics#infrastructure' },
          { title: 'Placement and Announcements', to: '/academics#placement' },
        ],
      },
      {
        title: 'Training',
        to: '/training',
        icon: BookOpen,
        badge: '3300+',
        subItems: [
          { title: '14 Core Topics', to: '/training#topics' },
          { title: 'Training Calendar 2025-26', to: '/training#calendar' },
          { title: 'Resource Persons', to: '/training#resource-persons' },
          { title: 'Workshops Conducted', to: '/training#workshops' },
        ],
      },
      {
        title: 'Research and Development',
        to: '/research',
        icon: Microscope,
        badge: '6 R&D',
        subItems: [
          { title: 'Overview and VTU Center', to: '/research#overview' },
          { title: 'Funded Projects', to: '/research#funded-projects' },
          { title: 'Publications', to: '/research#publications' },
          { title: 'Active MOUs', to: '/research#mous' },
        ],
      },
    ],
  },
  {
    label: 'Consultancy and Laboratories',
    items: [
      { title: 'Consultancy Services', to: '/consultancy', icon: Compass, badge: '7 Areas' },
      { title: 'NABL Laboratories', to: '/laboratories', icon: FlaskConical, badge: '62 Tests' },
      { title: 'Projects Portfolio', to: '/projects', icon: FolderKanban, badge: '112' },
    ],
  },
  {
    label: 'Connect and Legal',
    items: [
      { title: 'Contact Us', to: '/contact', icon: Phone },
      { title: 'Terms and Conditions', to: '/terms', icon: Scale },
    ],
  },
];

export default function AppSidebar() {
  const location = useLocation();
  const { setOpenMobile } = useSidebar();

  const closeDrawer = () => setOpenMobile(false);

  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
      <SidebarHeader>
        <div className="mobile-sidebar-brand">
          <Link to="/" onClick={closeDrawer} className="mobile-sidebar-logo-link">
            <img src="/images/rasta-logo.png" alt="RASTA Center for Road Technology" />
          </Link>
          <button
            type="button"
            className="mobile-sidebar-close"
            aria-label="Close navigation menu"
            onClick={closeDrawer}
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        </div>
        <div className="mobile-sidebar-meta">
          ISO/IEC 17025:2017 NABL | VTU Research Center
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.to;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={active}
                        render={<Link to={item.to} onClick={closeDrawer} />}
                      >
                        <Icon size={16} strokeWidth={1.8} />
                        <span>{item.title}</span>
                        {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                      </SidebarMenuButton>

                      {item.subItems && (
                        <SidebarMenuSub>
                          {item.subItems.map((sub) => (
                            <SidebarMenuSubItem key={sub.title}>
                              <SidebarMenuSubButton
                                render={<Link to={sub.to} onClick={closeDrawer} />}
                              >
                                {sub.title}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarGroup>
          <SidebarGroupLabel>Documents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <a
                      href="/RASTA_Academic_Brochure.pdf"
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeDrawer}
                    />
                  }
                >
                  <FileText size={16} strokeWidth={1.8} />
                  <span>Academic Brochure PDF</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <a
                      href="/RASTA_Consultancy_Brochure_2025.pdf"
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeDrawer}
                    />
                  }
                >
                  <FileText size={16} strokeWidth={1.8} />
                  <span>Consultancy Brochure PDF</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="mobile-sidebar-footer-text">
          <div>Volvo Construction Equipment Campus, Peenya, Bengaluru - 560058</div>
          <div>Phone: +91 96063 26161</div>
          <div>Email: group.rasta@rastaindia.com</div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
