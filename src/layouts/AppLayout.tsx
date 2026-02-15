import type { PropsWithChildren } from "react"
import { AppSidebar } from "@/shared/components/AppSidebar"
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/Sidebar"

type AppLayoutProps = PropsWithChildren

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex-1 overflow-auto">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
