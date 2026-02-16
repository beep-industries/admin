import { createContext, useContext, useState, type ReactNode } from "react"
import { LayoutDashboard, Users, Server, Shield, Settings } from "lucide-react"

const currentUser = {
  name: "Isalyne LLINARES",
  email: "admin@beep.app",
  avatar: "",
}

const navItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Users", path: "/users", icon: Users },
  { label: "Servers", path: "/servers", icon: Server },
  { label: "Moderation", path: "/moderation", icon: Shield },
  { label: "Settings", path: "/settings", icon: Settings },
]

const defaultHeader = (
  <div className="flex items-center gap-3">
    <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white">
      IL
    </div>
    <div className="flex flex-col group-data-[collapsible=icon]:hidden">
      <span className="text-sm font-semibold">{currentUser.name}</span>
      <span className="text-muted-foreground text-xs">Administrator</span>
    </div>
  </div>
)

const defaultContent = (
  <nav className="flex flex-col gap-1 space-y-2">
    {navItems.map((item) => {
      const Icon = item.icon
      return (
        <a
          key={item.path}
          href={item.path}
          className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group flex items-center gap-3 rounded px-3 py-2 text-sm transition"
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
        </a>
      )
    })}
  </nav>
)

interface SidebarContentContextProps {
  header: ReactNode
  setHeader: (header: ReactNode) => void
  content: ReactNode
  setContent: (content: ReactNode) => void
}

const SidebarContentContext = createContext<SidebarContentContextProps | null>(null)

export function SidebarContentProvider({ children }: { children: ReactNode }) {
  const [header, setHeader] = useState<ReactNode>(defaultHeader)
  const [content, setContent] = useState<ReactNode>(defaultContent)

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

export const defaultCurrentUser = currentUser
