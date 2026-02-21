import { createContext, useContext, useState, type ReactNode } from "react"
import { LayoutDashboard, Users, Server, Shield } from "lucide-react"
import { useTranslation } from "react-i18next"
import { SidebarSettingsMenu } from "@/shared/components/SidebarSettingsMenu"
import { Link } from "@tanstack/react-router"

const currentUser = {
  name: "Admin User",
  email: "admin@beep.app",
  avatar: "",
}

const navItems = [
  { label: "dashboard", path: "/", icon: LayoutDashboard },
  { label: "users", path: "/users", icon: Users },
  { label: "servers", path: "/servers", icon: Server },
  { label: "moderation", path: "/moderation", icon: Shield },
]

function DefaultHeader() {
  const { t } = useTranslation()

  const initials = currentUser.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex items-center gap-3 px-2 py-2 text-sm transition">
      <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white">
        {initials}
      </div>
      <div className="flex flex-col group-data-[collapsible=icon]:hidden">
        <span className="text-sm font-semibold">{currentUser.name}</span>
        <span className="text-muted-foreground text-xs">{t("sidebar.adminRole")}</span>
      </div>
    </div>
  )
}

function DefaultContent() {
  const { t } = useTranslation()

  return (
    <div className="flex h-full flex-col justify-between">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group flex items-center gap-3 rounded px-3 py-2 text-sm transition"
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden">
                {t(`sidebar.${item.label}`)}
              </span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto">
        <SidebarSettingsMenu />
      </div>
    </div>
  )
}

interface SidebarContentContextProps {
  header: ReactNode
  setHeader: (header: ReactNode) => void
  content: ReactNode
  setContent: (content: ReactNode) => void
}

const SidebarContentContext = createContext<SidebarContentContextProps | null>(null)

export function SidebarContentProvider({ children }: { children: ReactNode }) {
  const [header, setHeader] = useState<ReactNode>(<DefaultHeader />)
  const [content, setContent] = useState<ReactNode>(<DefaultContent />)

  return (
    <SidebarContentContext.Provider value={{ header, setHeader, content, setContent }}>
      {children}
    </SidebarContentContext.Provider>
  )
}

export function useSidebarContent() {
  const context = useContext(SidebarContentContext)
  if (!context) {
    throw new Error("useSidebarContent must be used within a SidebarContentProvider")
  }
  return context
}
