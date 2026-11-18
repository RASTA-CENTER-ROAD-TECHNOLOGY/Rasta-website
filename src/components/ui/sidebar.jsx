import React, {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PanelLeft } from 'lucide-react';
import './sidebar.css';

const SIDEBAR_COOKIE_NAME = 'rasta_sidebar_state';
const SIDEBAR_WIDTH = '18rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

const SidebarContext = createContext(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function renderWithSlot(renderProp, defaultTag, props) {
  if (renderProp && isValidElement(renderProp)) {
    const existingClass = renderProp.props?.className;
    return cloneElement(renderProp, {
      ...props,
      className: cn(props.className, existingClass),
    });
  }
  const Tag = defaultTag;
  return <Tag {...props} />;
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  isMobileViewport = true,
  className,
  style,
  children,
  ...props
}) {
  const [openState, setOpenState] = useState(defaultOpen);
  const [openMobile, setOpenMobile] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = useCallback(
    (value) => {
      const nextValue = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(nextValue);
      } else {
        setOpenState(nextValue);
      }
      try {
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${nextValue}; path=/; max-age=604800`;
      } catch {}
    },
    [open, setOpenProp]
  );

  const toggleSidebar = useCallback(() => {
    if (isMobileViewport) {
      setOpenMobile((prev) => !prev);
    } else {
      setOpen((prev) => !prev);
    }
  }, [isMobileViewport, setOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? 'expanded' : 'collapsed';

  const contextValue = useMemo(
    () => ({
      state,
      open,
      setOpen,
      isMobile: isMobileViewport,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobileViewport, openMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        data-state={state}
        style={{
          '--sidebar-width': SIDEBAR_WIDTH,
          '--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE,
          ...style,
        }}
        className={cn('rasta-sidebar-wrapper', className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  dir = 'ltr',
  className,
  children,
  ...props
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <aside
        data-slot="sidebar"
        data-side={side}
        data-variant={variant}
        dir={dir}
        className={cn('rasta-sidebar rasta-sidebar--static', className)}
        {...props}
      >
        {children}
      </aside>
    );
  }

  if (isMobile) {
    return (
      <div
        data-slot="sidebar-mobile-root"
        data-mobile="true"
        data-open={openMobile ? 'true' : 'false'}
        data-side={side}
        dir={dir}
        aria-hidden={!openMobile}
      >
        {openMobile && (
          <div
            className="rasta-sidebar-backdrop"
            onClick={() => setOpenMobile(false)}
            aria-hidden="true"
          />
        )}
        <aside
          data-slot="sidebar"
          data-sidebar="sidebar"
          data-mobile="true"
          data-side={side}
          data-state={openMobile ? 'open' : 'closed'}
          dir={dir}
          className={cn('rasta-sidebar rasta-sidebar--mobile', className)}
          {...props}
        >
          <div data-slot="sidebar-container" data-side={side} className="rasta-sidebar-inner">
            {children}
          </div>
        </aside>
      </div>
    );
  }

  return (
    <div
      data-slot="sidebar"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      dir={dir}
      className={cn('rasta-sidebar rasta-sidebar--desktop', className)}
      {...props}
    >
      <div data-slot="sidebar-container" data-side={side} className="rasta-sidebar-inner">
        {children}
      </div>
    </div>
  );
}

export function SidebarTrigger({ className, onClick, ...props }) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      type="button"
      data-slot="sidebar-trigger"
      aria-label="Toggle Sidebar"
      className={cn('rasta-sidebar-trigger', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft className="rasta-sidebar-trigger-icon rtl:rotate-180" size={18} strokeWidth={1.8} />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}

export function SidebarRail({ className, ...props }) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      type="button"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn('rasta-sidebar-rail', className)}
      {...props}
    />
  );
}

export function SidebarInset({ className, children, ...props }) {
  return (
    <div data-slot="sidebar-inset" className={cn('rasta-sidebar-inset', className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarHeader({ className, children, ...props }) {
  return (
    <div data-slot="sidebar-header" className={cn('rasta-sidebar-header', className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarFooter({ className, children, ...props }) {
  return (
    <div data-slot="sidebar-footer" className={cn('rasta-sidebar-footer', className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarContent({ className, children, ...props }) {
  return (
    <div data-slot="sidebar-content" className={cn('rasta-sidebar-content', className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroup({ className, children, ...props }) {
  return (
    <div data-slot="sidebar-group" className={cn('rasta-sidebar-group', className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarGroupLabel({ render, className, children, ...props }) {
  return renderWithSlot(render, 'div', {
    'data-slot': 'sidebar-group-label',
    className: cn('rasta-sidebar-group-label', className),
    children,
    ...props,
  });
}

export function SidebarGroupAction({ render, className, children, ...props }) {
  return renderWithSlot(render, 'button', {
    'data-slot': 'sidebar-group-action',
    className: cn('rasta-sidebar-group-action', className),
    children,
    ...props,
  });
}

export function SidebarGroupContent({ className, children, ...props }) {
  return (
    <div data-slot="sidebar-group-content" className={cn('rasta-sidebar-group-content', className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarMenu({ className, children, ...props }) {
  return (
    <ul data-slot="sidebar-menu" className={cn('rasta-sidebar-menu', className)} {...props}>
      {children}
    </ul>
  );
}

export function SidebarMenuItem({ className, children, ...props }) {
  return (
    <li data-slot="sidebar-menu-item" className={cn('rasta-sidebar-menu-item', className)} {...props}>
      {children}
    </li>
  );
}

export function SidebarMenuButton({ render, isActive = false, className, children, ...props }) {
  return renderWithSlot(render, 'button', {
    'data-slot': 'sidebar-menu-button',
    'data-active': isActive ? 'true' : 'false',
    className: cn('rasta-sidebar-menu-button', isActive && 'is-active', className),
    children,
    ...props,
  });
}

export function SidebarMenuAction({ render, className, children, ...props }) {
  return renderWithSlot(render, 'button', {
    'data-slot': 'sidebar-menu-action',
    className: cn('rasta-sidebar-menu-action', className),
    children,
    ...props,
  });
}

export function SidebarMenuBadge({ className, children, ...props }) {
  return (
    <span data-slot="sidebar-menu-badge" className={cn('rasta-sidebar-menu-badge', className)} {...props}>
      {children}
    </span>
  );
}

export function SidebarMenuSkeleton({ className, ...props }) {
  return <div data-slot="sidebar-menu-skeleton" className={cn('rasta-sidebar-menu-skeleton', className)} {...props} />;
}

export function SidebarMenuSub({ className, children, ...props }) {
  return (
    <ul data-slot="sidebar-menu-sub" className={cn('rasta-sidebar-menu-sub', className)} {...props}>
      {children}
    </ul>
  );
}

export function SidebarMenuSubItem({ className, children, ...props }) {
  return (
    <li data-slot="sidebar-menu-sub-item" className={cn('rasta-sidebar-menu-sub-item', className)} {...props}>
      {children}
    </li>
  );
}

export function SidebarMenuSubButton({ render, isActive = false, className, children, ...props }) {
  return renderWithSlot(render, 'a', {
    'data-slot': 'sidebar-menu-sub-button',
    'data-active': isActive ? 'true' : 'false',
    className: cn('rasta-sidebar-menu-sub-button', isActive && 'is-active', className),
    children,
    ...props,
  });
}
