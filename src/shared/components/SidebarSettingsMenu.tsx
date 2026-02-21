import { Check, Globe, Moon, Settings, Sun } from "lucide-react"
import { useTranslation } from "react-i18next"

import { useTheme } from "@/app/providers/ThemeProvider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/components/ui/DropdownMenu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/Sidebar"

export function SidebarSettingsMenu() {
  const { theme, setTheme } = useTheme()
  const { t, i18n } = useTranslation()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip={t("userNav.settings")}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Settings className="h-8 w-8" />
              <span className="group-data-[collapsible=icon]:hidden">{t("userNav.settings")}</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="top"
            align="start"
            sideOffset={4}
          >
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-responsive-base!">
                {theme === "dark" ? <Moon className="h-8 w-8" /> : <Sun className="h-5 w-5" />}
                {t("userNav.theme")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className="text-responsive-base!"
                  >
                    {t("userNav.light")}
                    {theme === "light" && <Check className="ml-auto size-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className="text-responsive-base!"
                  >
                    {t("userNav.dark")}
                    {theme === "dark" && <Check className="ml-auto size-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className="text-responsive-base!"
                  >
                    {t("userNav.system")}
                    {theme === "system" && <Check className="ml-auto size-4" />}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-responsive-base!">
                <Globe className="h-8 w-8" />
                {t("userNav.language")}
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => i18n.changeLanguage("en")}
                    className="text-responsive-base!"
                  >
                    {t("userNav.english")}
                    {i18n.language === "en" && <Check className="ml-auto size-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => i18n.changeLanguage("fr")}
                    className="text-responsive-base!"
                  >
                    {t("userNav.french")}
                    {i18n.language === "fr" && <Check className="ml-auto size-4" />}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
