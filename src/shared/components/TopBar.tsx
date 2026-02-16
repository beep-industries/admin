import { useLocation } from "@tanstack/react-router"
import { SidebarTrigger } from "./ui/Sidebar"

export function TopBar() {
  const location = useLocation()

  const getTitleFromPath = (pathname: string) => {
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length === 0) return "Dashboard"

    const lastSegment = segments[segments.length - 1]
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).toLowerCase()
  }

  const title = getTitleFromPath(location.pathname)

  return (
    <div className="border-border bg-background flex items-center gap-4 border-b px-4 py-3">
      <SidebarTrigger />
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  )
}
