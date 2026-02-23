import { Sidebar, SidebarContent, SidebarHeader } from "./ui/Sidebar"
import { DefaultHeader, DefaultContent } from "@/app/providers/SidebarContentProvider"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <DefaultHeader />
      </SidebarHeader>
      <SidebarContent className="no-scrollbar px-2">
        <DefaultContent />
      </SidebarContent>
    </Sidebar>
  )
}
