/** @format */
"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";

export default function DashboardSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  const isCollapsed = state === "collapsed";

  const navItems = [
    {
      href: "/",
      icon: LayoutGrid,
      label: "Dashboard",
    },
  ];

  return (
    <>
      {/* mobile menu button */}
      <div className="fixed top-4 left-4 z-40 md:hidden">
        <SidebarTrigger />
      </div>

      {/* Sidebar content goes here */}
      <Sidebar
        className="border-r-2 border-gray-300 bg-white rounded-r-2xl shadow-none"
        collapsible="icon"
      >
        <SidebarContent className="bg-white rounded-tr-xl shadow-none">
          <div
            className={`flex items-center justify-center px-0 md:px-2 py-6 relative ${
              isCollapsed ? "px-2" : "gap-2"
            }`}
          >
            <div className="flex gap-2">
              {isCollapsed ? (
                <div className="mt-2 flex items-center gap-2">
                  <Image src="/logo.png" alt="Logo" width={33} height={33} />
                </div>
              ) : (
                <div className="mt-2 flex items-center gap-2">
                  <Image src="/logo.png" alt="Logo" width={33} height={33} />{" "}
                  <h1 className="text-black text-3xl font-bold">AutoBizz</h1>
                </div>
              )}
            </div>
            {/* Toggle button for mobile */}

            {/* Collapse button for desktop */}
            <div
              className={`absolute top-2 hidden md:block ${
                isCollapsed ? "right-0" : "right-0"
              }`}
            >
              <SidebarTrigger />
            </div>
          </div>
          <SidebarMenu
            className={
              isCollapsed ? "px-2 space-y-4 items-center" : "md:px-6 space-y-4"
            }
          >
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={pathname === item.href || pathname === item.href + "/"}
                collapsed={isCollapsed}
              />
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed = false,
}: NavItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link
          href={href}
          className={cn(
            collapsed
              ? "flex items-center justify-center px-2 py-3 transition-colors rounded-full w-12 h-12 mx-auto"
              : "flex items-center gap-3 px-4 py-3 transition-colors rounded-md",
            active
              ? "bg-black text-white hover:bg-gray-900! hover:text-white! font-medium"
              : "bg-transparent text-black hover:bg-black-100!  font-medium"
          )}
        >
          <Icon size={collapsed ? 20 : 18} />
          {!collapsed && <span className="text-base">{label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
// ...existing code...
