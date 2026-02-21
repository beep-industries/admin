import { LayoutDashboard, Users, Server, Shield, LogOut } from "lucide-react"
import { useTranslation } from "react-i18next"
import { SidebarSettingsMenu } from "@/shared/components/SidebarSettingsMenu"
import { Link } from "@tanstack/react-router"
import { useAuth } from "@/app/providers/KeycloakAuthProvider"
import { getUserInitials } from "@/shared/lib/user"
import { Button } from "@/shared/components/ui/Button"

const navItems = [
  { label: "dashboard", path: "/", icon: LayoutDashboard },
  { label: "users", path: "/users", icon: Users },
  { label: "servers", path: "/servers", icon: Server },
  { label: "moderation", path: "/moderation", icon: Shield },
]

function DefaultHeader() {
  const { t } = useTranslation()
  const { user } = useAuth()

  const initials = getUserInitials({
    username: user?.username,
    email: user?.email,
    fallback: t("sidebar.adminRole"),
  })

  return (
    <div className="flex items-center gap-3 text-sm transition">
      <div className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-white">
        {initials}
      </div>
      <div className="flex flex-col group-data-[collapsible=icon]:hidden">
        <span className="text-sm font-semibold">
          {user?.username || user?.email || t("sidebar.adminRole")}
        </span>
        <span className="text-muted-foreground text-xs">{t("sidebar.adminRole")}</span>
      </div>
    </div>
  )
}

function DefaultContent() {
  const { t } = useTranslation()
  const { logout } = useAuth()

  return (
    <div className="flex h-full flex-col justify-between">
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group flex items-center gap-3 rounded p-2 text-sm transition"
              activeProps={{
                className: "bg-sidebar-accent text-sidebar-accent-foreground",
              }}
            >
              <Icon className="shrink-0" size={16} />
              <span className="group-data-[collapsible=icon]:hidden">
                {t(`sidebar.${item.label}`)}
              </span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto flex flex-col gap-2">
        <SidebarSettingsMenu />
        <div className="p-2">
          <Button
            onClick={() => logout()}
            variant="outline"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive w-full justify-start gap-2"
          >
            <LogOut className="h-5 w-5" />
            <span className="group-data-[collapsible=icon]:hidden">{t("topBar.logout")}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export { DefaultHeader, DefaultContent }
