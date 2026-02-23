import { useLocation } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { SidebarTrigger } from "./ui/Sidebar"
import { useAuth } from "@/app/providers/KeycloakAuthProvider"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import { LogOut, Shield, User } from "lucide-react"
import { getUserInitials } from "../lib/user"

export function TopBar() {
  const location = useLocation()
  const { user, logout, isAdmin } = useAuth()
  const { t } = useTranslation()

  const getTitleFromPath = (pathname: string) => {
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length === 0) return t("sidebar.dashboard")

    const lastSegment = segments[segments.length - 1]
    const translationKey = `sidebar.${lastSegment}`

    return t(translationKey, lastSegment)
  }

  const title = getTitleFromPath(location.pathname)
  const initials = getUserInitials({
    username: user?.username,
    email: user?.email,
    fallback: t("sidebar.adminRole"),
  })

  return (
    <div className="border-border bg-background flex items-center gap-4 border-b px-4 py-3">
      <SidebarTrigger />
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:ring-ring flex items-center gap-2 rounded-full focus:ring-2 focus:outline-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profilePicture} alt={user?.username} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col gap-1">
                <span className="font-medium">{user?.username}</span>
                <span className="text-muted-foreground text-xs">{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>
              <User className="mr-2 h-4 w-4" />
              <span>{t("topBar.profile")}</span>
            </DropdownMenuItem>
            {isAdmin && (
              <DropdownMenuItem disabled>
                <Shield className="mr-2 h-4 w-4" />
                <span className="text-primary font-medium">{t("topBar.administrator")}</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>{t("topBar.logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
