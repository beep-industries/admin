import { Sidebar, SidebarContent, SidebarHeader } from "./ui/Sidebar"
import { useSidebarContent } from "@/app/providers/SidebarContentProvider"

export function AppSidebar() {
  const { header, content } = useSidebarContent()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>{header}</SidebarHeader>
      <SidebarContent className="no-scrollbar px-2">{content}</SidebarContent>
    </Sidebar>
  )
}
