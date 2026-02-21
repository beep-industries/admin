import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import type { AuthState } from "@/app/providers/KeycloakAuthProvider"
import AppLayout from "@/layouts/AppLayout"
import { Loader2, ShieldAlert } from "lucide-react"
import { useEffect, useRef } from "react"
import { hasAuthParams } from "react-oidc-context"
import { useTranslation } from "react-i18next"

interface AppContext {
  auth: AuthState
}

function RootComponent() {
  const { auth } = Route.useRouteContext()
  const hasTriedSignin = useRef(false)
  const { t } = useTranslation()

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (auth.isAuthenticated) {
      hasTriedSignin.current = false
    }
  }, [auth.isAuthenticated])

  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !hasTriedSignin.current
    ) {
      hasTriedSignin.current = true
      auth.login()
    }
  }, [auth])

  if (auth.isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
      </div>
    )
  }

  // Check if user has admin role
  if (!auth.hasRole("admin")) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <ShieldAlert className="text-destructive h-16 w-16" />
        <h1 className="text-2xl font-bold">{t("auth.accessDenied")}</h1>
        <p className="text-muted-foreground max-w-md text-center">
          {t("auth.noPermission")}
          <br />
          {t("auth.contactAdmin")}
        </p>
        <button
          onClick={() => auth.logout()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-4 py-2"
        >
          {t("auth.logoutButton")}
        </button>
      </div>
    )
  }

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

export const Route = createRootRouteWithContext<AppContext>()({
  component: RootComponent,
})
