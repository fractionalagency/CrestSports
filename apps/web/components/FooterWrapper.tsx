"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

const noFooterRoutes = ["/login", "/admin", "/dashboard"];

export function FooterWrapper() {
  const pathname = usePathname();
  const shouldHideFooter = noFooterRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}
