import { Link, usePage, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    ChevronDown,
    ChevronRight,
    LayoutDashboard,
    Image as ImageIcon,
    Images,
    Newspaper,
    FolderOpen,
    Megaphone,
    Layers,
    Calendar,
    Settings,
    Users,
    Mail,
    ExternalLink,
    LogOut,
    Home,
    Package,
    FileText,
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

    // Initialize state before any functions that use it
    const [articlesOpen, setArticlesOpen] = useState(false);
    const [facilitiesOpen, setFacilitiesOpen] = useState(false);

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

    // Set articlesOpen based on current path
    useEffect(() => {
        const articlePaths = [
            "/admin/articles",
            "/admin/article-categories",
            "/admin/media",
            "/admin/media-highlights",
        ];
        const isActive = articlePaths.some((path) =>
            window.location.pathname.startsWith(path)
        );
        setArticlesOpen(isActive);
    }, []);

    // Set facilitiesOpen based on current path
    useEffect(() => {
        const facilityPaths = [
            "/admin/facilities",
            "/admin/facility-sliders",
        ];
        const isActive = facilityPaths.some((path) =>
            window.location.pathname.startsWith(path)
        );
        setFacilitiesOpen(isActive);
    }, []);

    const isArticleSubmenuActive = () => {
        const articlePaths = [
            "/admin/articles",
            "/admin/article-categories",
            "/admin/media",
            "/admin/media-highlights",
        ];
        return articlePaths.some((path) =>
            window.location.pathname.startsWith(path)
        );
    };

    const isFacilitySubmenuActive = () => {
        const facilityPaths = [
            "/admin/facilities",
            "/admin/facility-sliders",
        ];
        return facilityPaths.some((path) =>
            window.location.pathname.startsWith(path)
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

    const navigation = {
        main: [
            {
                name: "Dashboard",
                href: "/admin/dashboard",
                icon: LayoutDashboard,
            },
            {
                name: "Hero Banners",
                href: "/admin/hero-banners",
                icon: ImageIcon,
            },
            {
                name: "Media Library",
                href: "/admin/media-library",
                icon: FolderOpen,
            },
            {
                name: "Products",
                href: "/admin/products",
                icon: Package,
            },
        ],
        content: [
            {
                name: "Articles",
                icon: Newspaper,
                hasSubmenu: true,
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
                        name: "Media Outlets",
                        href: "/admin/media",
                    },
                    {
                        name: "Media Highlights",
                        href: "/admin/media-highlights",
                    },
                ],
            },
            {
                name: "Events",
                href: "/admin/events",
                icon: Calendar,
            },
            {
                name: "Facilities",
                icon: Layers,
                hasSubmenu: true,
                submenu: [
                    {
                        name: "All Facilities",
                        href: "/admin/facilities",
                    },
                    {
                        name: "Sliders",
                        href: "/admin/facility-sliders",
                    },
                ],
            },
            {
                name: "Gallery",
                href: "/admin/galleries",
                icon: Images,
            },
            {
                name: "Instagram Gallery",
                href: "/admin/instagram-gallery",
                icon: ImageIcon,
            },
        ],
        system: [
            {
                name: "Contacts",
                href: "/admin/contacts",
                icon: Mail,
            },
            {
                name: "Policies",
                href: "/admin/policies",
                icon: FileText,
            },
            {
                name: "Settings",
                href: "/admin/settings",
                icon: Settings,
            },
            {
                name: "Users",
                href: "/admin/users",
                icon: Users,
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
                {/* Main Navigation */}
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.main.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActiveUrl(item.href)}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Content Management */}
                <SidebarGroup>
                    <SidebarGroupLabel>Content</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.content.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    {item.hasSubmenu ? (
                                        <Collapsible
                                            open={item.name === "Articles" ? articlesOpen : facilitiesOpen}
                                            onOpenChange={item.name === "Articles" ? setArticlesOpen : setFacilitiesOpen}
                                            className="group/collapsible"
                                        >
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    isActive={item.name === "Articles" ? isArticleSubmenuActive() : isFacilitySubmenuActive()}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.name}</span>
                                                    <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.submenu.map(
                                                        (subitem) => (
                                                            <SidebarMenuSubItem
                                                                key={
                                                                    subitem.name
                                                                }
                                                            >
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                    isActive={isActiveUrl(
                                                                        subitem.href
                                                                    )}
                                                                >
                                                                    <Link
                                                                        href={
                                                                            subitem.href
                                                                        }
                                                                    >
                                                                        <span>
                                                                            {
                                                                                subitem.name
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        )
                                                    )}
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

                {/* System */}
                <SidebarGroup>
                    <SidebarGroupLabel>System</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigation.system.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActiveUrl(item.href)}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
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
