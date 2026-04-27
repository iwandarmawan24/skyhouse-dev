import { Link, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    ChevronRight,
    LayoutDashboard,
    Image as ImageIcon,
    Images,
    Newspaper,
    FolderOpen,
    Layers,
    Calendar,
    Settings,
    Users,
    Mail,
    LogOut,
    Home,
    Package,
    FileText,
    MapPin,
    HelpCircle,
    Trophy,
    Briefcase,
    Award,
    HardHat,
    History,
    Info,
    Heart,
    Target,
    Sparkles,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
} from "@/Components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import { Toaster } from "@/Components/ui/sonner";

export default function AdminLayout({ children }) {
    const { auth, flash } = usePage().props;

    // Generic open state for all collapsible submenus, keyed by menu name
    const [openMenus, setOpenMenus] = useState({});

    // Show toast notifications for flash messages
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
        if (flash.info) {
            toast.info(flash.info);
        }
    }, [flash]);

    // Auto-open submenus based on current path
    useEffect(() => {
        const allSections = [
            ...navigation.website,
            ...navigation.content,
            ...navigation.marketing,
            ...navigation.settings,
        ];

        const newOpenMenus = {};
        allSections.forEach((item) => {
            if (item.hasSubmenu && item.submenu) {
                const isActive = item.submenu.some((sub) =>
                    window.location.pathname.startsWith(sub.href)
                );
                if (isActive) {
                    newOpenMenus[item.name] = true;
                }
            }
        });
        setOpenMenus(newOpenMenus);
    }, []);

    const toggleMenu = (name, value) => {
        setOpenMenus((prev) => ({ ...prev, [name]: value }));
    };

    const isSubmenuActive = (item) => {
        if (!item.submenu) return false;
        return item.submenu.some((sub) =>
            window.location.pathname.startsWith(sub.href)
        );
    };

    const handleLogout = () => {
        router.post("/admin/logout");
    };

    const isActiveUrl = (href) => {
        return (
            window.location.pathname === href ||
            window.location.pathname.startsWith(href + "/")
        );
    };

    // Helper function to check if user has required role
    const hasRole = (roles) => {
        if (!auth.user?.role) return false;
        return roles.includes(auth.user.role);
    };

    const navigation = {
        main: [
            {
                name: "Dashboard",
                href: "/admin/dashboard",
                icon: LayoutDashboard,
            },
        ],
        website: [
            {
                name: "Homepage",
                icon: Home,
                hasSubmenu: true,
                roles: ["superadmin", "admin", "staff"],
                submenu: [
                    {
                        name: "Hero Banners",
                        href: "/admin/hero-banners",
                        icon: ImageIcon,
                    },
                    {
                        name: "Awards",
                        href: "/admin/awards",
                        icon: Award,
                    },
                    {
                        name: "Construction Progress",
                        href: "/admin/construction-progress",
                        icon: HardHat,
                    },
                    {
                        name: "Virtual Tour Banner",
                        href: "/admin/virtual-tour-banner/edit",
                        icon: ImageIcon,
                    },
                ],
            },
            {
                name: "Products",
                icon: Package,
                hasSubmenu: true,
                roles: ["superadmin", "admin", "staff"],
                submenu: [
                    {
                        name: "All Products",
                        href: "/admin/products",
                        icon: Package,
                    },
                    {
                        name: "Page Information",
                        href: "/admin/project-page-info/edit",
                        icon: ImageIcon,
                    },
                    {
                        name: "Brochures",
                        href: "/admin/brochures/edit",
                        icon: FileText,
                    },
                ],
            },
            {
                name: "Facilities",
                icon: Layers,
                hasSubmenu: true,
                roles: ["superadmin", "admin", "staff"],
                submenu: [
                    {
                        name: "All Facilities",
                        href: "/admin/facilities",
                    },
                    {
                        name: "Sliders",
                        href: "/admin/facility-sliders",
                    },
                    {
                        name: "Page Information",
                        href: "/admin/facilities-page-info/edit",
                        icon: ImageIcon,
                    },
                ],
            },
            {
                name: "Location Map",
                href: "/admin/location-map/edit",
                icon: MapPin,
                roles: ["superadmin", "admin", "staff"],
            },
            {
                name: "About Us",
                icon: Info,
                hasSubmenu: true,
                roles: ["superadmin", "admin", "staff"],
                submenu: [
                    {
                        name: "Company Intro",
                        href: "/admin/about/company-intro/edit",
                        icon: FileText,
                    },
                    {
                        name: "Hero Section",
                        href: "/admin/about/hero/edit",
                        icon: Sparkles,
                    },
                    {
                        name: "Milestones",
                        href: "/admin/milestones",
                        icon: History,
                    },
                    {
                        name: "Core Values",
                        href: "/admin/about/values",
                        icon: Heart,
                    },
                    {
                        name: "Achievements",
                        href: "/admin/about/achievements",
                        icon: Trophy,
                    },
                    {
                        name: "Mission",
                        href: "/admin/about/mission/edit",
                        icon: Target,
                    },
                ],
            },
        ],
        content: [
            {
                name: "Articles",
                icon: Newspaper,
                hasSubmenu: true,
                roles: ["superadmin", "admin", "staff"],
                submenu: [
                    {
                        name: "All Articles",
                        href: "/admin/articles",
                    },
                    {
                        name: "Categories",
                        href: "/admin/article-categories",
                    },
                    {
                        name: "News Page",
                        href: "/admin/news-page-info/edit",
                        icon: ImageIcon,
                    },
                    {
                        name: "Media Outlets",
                        href: "/admin/media",
                    },
                    {
                        name: "Media Highlights",
                        href: "/admin/media-highlights",
                    },
                    {
                        name: "Media Highlights Page",
                        href: "/admin/media-highlights-page-info/edit",
                        icon: ImageIcon,
                    },
                ],
            },
            {
                name: "Events",
                icon: Calendar,
                hasSubmenu: true,
                roles: ["superadmin", "admin", "staff"],
                submenu: [
                    {
                        name: "All Events",
                        href: "/admin/events",
                        icon: Calendar,
                    },
                    {
                        name: "Page Information",
                        href: "/admin/events-page-info/edit",
                        icon: ImageIcon,
                    },
                ],
            },
            {
                name: "Gallery",
                href: "/admin/galleries",
                icon: Images,
                roles: ["superadmin", "admin", "staff"],
            },
            {
                name: "Instagram Gallery",
                href: "/admin/instagram-gallery",
                icon: ImageIcon,
                roles: ["superadmin", "admin", "staff"],
            },
        ],
        marketing: [
            {
                name: "Top Sales",
                href: "/admin/top-sales",
                icon: Trophy,
                roles: ["superadmin", "admin", "staff"],
            },
            {
                name: "Careers",
                icon: Briefcase,
                hasSubmenu: true,
                roles: ["superadmin", "admin", "staff"],
                submenu: [
                    {
                        name: "All Careers",
                        href: "/admin/careers",
                        icon: Briefcase,
                    },
                    {
                        name: "Settings",
                        href: "/admin/career-settings/edit",
                        icon: Settings,
                    },
                ],
            },
            {
                name: "FAQs",
                href: "/admin/faqs",
                icon: HelpCircle,
                roles: ["superadmin", "admin", "staff"],
            },
            {
                name: "Contacts",
                href: "/admin/contacts",
                icon: Mail,
                roles: ["superadmin", "admin"],
            },
        ],
        settings: [
            {
                name: "Media Library",
                href: "/admin/media-library",
                icon: FolderOpen,
                roles: ["superadmin", "admin", "staff"],
            },
            {
                name: "Policies",
                href: "/admin/policies",
                icon: FileText,
                roles: ["superadmin", "admin", "staff"],
            },
            {
                name: "Settings",
                href: "/admin/settings",
                icon: Settings,
                roles: ["superadmin"],
            },
            {
                name: "Users",
                href: "/admin/users",
                icon: Users,
                roles: ["superadmin"],
            },
        ],
    };

    const AppSidebar = () => (
        <Sidebar collapsible="none" className="border-r">
            <SidebarHeader className="bg-[#1153bdd9]">
                <Link href="/admin/dashboard" className="block">
                    <div className="flex h-16 items-center gap-3 px-4 border-b hover:bg-accent/50 transition-colors">
                        <img
                            src="https://www.skyhousealamsutera.id/wp-content/uploads/2020/12/logo.png"
                            alt="SkyHouse Property Logo"
                            className="h-10 w-auto"
                            onError={(e) => {
                                e.target.style.display = "none";
                            }}
                        />
                    </div>
                </Link>
            </SidebarHeader>

            <SidebarContent className="gap-0">
                {[
                    { label: "Main", items: navigation.main },
                    { label: "Website", items: navigation.website },
                    { label: "Content", items: navigation.content },
                    { label: "Marketing", items: navigation.marketing },
                    { label: "Settings", items: navigation.settings },
                ].map((section) => (
                    <SidebarGroup key={section.label}>
                        <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items
                                    .filter((item) => !item.roles || hasRole(item.roles))
                                    .map((item) => (
                                        <SidebarMenuItem key={item.name}>
                                            {item.hasSubmenu ? (
                                                <Collapsible
                                                    open={!!openMenus[item.name]}
                                                    onOpenChange={(value) => toggleMenu(item.name, value)}
                                                    className="group/collapsible"
                                                >
                                                    <CollapsibleTrigger asChild>
                                                        <SidebarMenuButton
                                                            isActive={isSubmenuActive(item)}
                                                        >
                                                            <item.icon className="h-4 w-4" />
                                                            <span>{item.name}</span>
                                                            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                                        </SidebarMenuButton>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <SidebarMenuSub>
                                                            {item.submenu.map((subitem) => (
                                                                <SidebarMenuSubItem key={subitem.name}>
                                                                    <SidebarMenuSubButton
                                                                        asChild
                                                                        isActive={isActiveUrl(subitem.href)}
                                                                    >
                                                                        <Link href={subitem.href}>
                                                                            {subitem.icon && <subitem.icon className="h-4 w-4" />}
                                                                            <span>{subitem.name}</span>
                                                                        </Link>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            ))}
                                                        </SidebarMenuSub>
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            ) : (
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={isActiveUrl(item.href)}
                                                >
                                                    <Link href={item.href}>
                                                        <item.icon className="h-4 w-4" />
                                                        <span>{item.name}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            )}
                                        </SidebarMenuItem>
                                    ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-2 px-2 py-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                                <span className="text-sm font-medium">
                                    {auth.user?.full_name?.charAt(0) ||
                                        auth.user?.name?.charAt(0) ||
                                        "A"}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col overflow-hidden">
                                <span className="truncate text-sm font-medium">
                                    {auth.user?.full_name || auth.user?.name}
                                </span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {auth.user?.email}
                                </span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            className="w-full"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );

    // Get current page title from URL
    const getPageTitle = () => {
        const path = window.location.pathname;
        const segments = path.split("/").filter(Boolean);

        if (segments.length === 2 && segments[1] === "dashboard") {
            return "Dashboard";
        }

        // Convert path segments to title
        const lastSegment = segments[segments.length - 1];
        return lastSegment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const getBreadcrumbs = () => {
        const path = window.location.pathname;
        const segments = path.split("/").filter(Boolean);

        if (segments.length === 2 && segments[1] === "dashboard") {
            return [
                { label: "Dashboard", href: "/admin/dashboard", current: true },
            ];
        }

        const breadcrumbs = [
            { label: "Dashboard", href: "/admin/dashboard", current: false },
        ];

        segments.slice(1).forEach((segment, index) => {
            const label = segment
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            const href = "/" + segments.slice(0, index + 2).join("/");
            const current = index === segments.length - 2;

            breadcrumbs.push({ label, href, current });
        });

        return breadcrumbs;
    };

    return (
        <SidebarProvider defaultOpen={true}>
            <div className="flex h-screen w-full overflow-hidden">
                <AppSidebar />
                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
            <Toaster />
        </SidebarProvider>
    );
}
