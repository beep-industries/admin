import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import type { AuthState } from "@/app/providers/KeycloakAuthProvider"
import AppLayout from "@/layouts/AppLayout"
import { Loader2, ShieldAlert } from "lucide-react"
import { useEffect, useRef } from "react"
import { hasAuthParams } from "react-oidc-context"
import { useTranslation } from "react-i18next"
import { Button } from "@/shared/components/ui/Button"

interface AppContext {
  auth: AuthState
}

function RootComponent() {
  const { auth } = Route.useRouteContext()
  const hasTriedSignin = useRef(false)
  const loginAttempts = useRef(0)
  const maxLoginAttempts = 1
  const { t } = useTranslation()

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (auth.isAuthenticated) {
      hasTriedSignin.current = false
      loginAttempts.current = 0
    }
  }, [auth.isAuthenticated])

  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading &&
      !auth.error &&
      !hasTriedSignin.current &&
      loginAttempts.current < maxLoginAttempts
    ) {
      hasTriedSignin.current = true
      loginAttempts.current += 1
      auth.login()
    }
  }, [auth])

  if (auth.error) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <ShieldAlert className="text-destructive h-16 w-16" />
        <h1 className="text-2xl font-bold">{t("auth.loginErrorTitle")}</h1>
        <p className="text-muted-foreground max-w-md text-center">
          {t("auth.loginErrorDescription")}
        </p>
        <Button
          onClick={() => {
            hasTriedSignin.current = false
            loginAttempts.current = 0
            auth.login()
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-4 py-2"
        >
          {t("auth.retryLogin")}
        </Button>
      </div>
    )
  }

  if (auth.isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {auth.isSigningIn && <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />}
      </div>
    )
  }

  if (!auth.isAuthenticated) {
    const isSigningIn = hasAuthParams() || Boolean(auth.activeNavigator)

    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
        <h1 className="text-2xl font-bold">
          {isSigningIn ? t("auth.signingInTitle") : t("auth.signInTitle")}
        </h1>
        <p className="text-muted-foreground max-w-md text-center">
          {isSigningIn ? t("auth.signingInDescription") : t("auth.signInDescription")}
        </p>
        {!isSigningIn && (
          <Button
            onClick={() => auth.login()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-4 py-2"
          >
            {t("auth.signInButton")}
          </Button>
        )}
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
        <Button
          onClick={() => auth.logout()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-4 py-2"
        >
          {t("auth.logoutButton")}
        </Button>
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
