"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";

import data from "./data.json";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/status");
        const data = await response.json();

        if (!data.authenticated) {
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("admin_authenticated");
      router.push("/login");
    } catch (err) {
      // Even if API call fails, clear local state
      localStorage.removeItem("admin_authenticated");
      router.push("/login");
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
