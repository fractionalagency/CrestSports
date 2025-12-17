"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/Header"

const noHeaderRoutes = ["/login", "/admin"]

export function HeaderWrapper() {
  const pathname = usePathname()
  
  const shouldHideHeader = noHeaderRoutes.some(route => pathname.startsWith(route))
  
  if (shouldHideHeader) {
    return null
  }
  
  return <Header />
}
