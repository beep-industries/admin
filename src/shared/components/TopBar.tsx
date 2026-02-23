import { useLocation } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { SidebarTrigger } from "./ui/Sidebar"

export function TopBar() {
  const location = useLocation()
  const { t } = useTranslation()

  const getTitleFromPath = (pathname: string) => {
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length === 0) return t("sidebar.dashboard")

    const lastSegment = segments[segments.length - 1]
    const translationKey = `sidebar.${lastSegment}`

    return t(translationKey, lastSegment)
  }

  const title = getTitleFromPath(location.pathname)

  return (
    <div className="border-border bg-background flex items-center gap-4 border-b px-4 py-3">
      <SidebarTrigger />
      <h1 className="text-xl font-semibold">{title}</h1>
    </div>
  )
}
