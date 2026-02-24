import "@/i18n"
import "@/app/styles/App.css"
import ReactDOM from "react-dom/client"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "@/routeTree.gen"
import { ThemeProvider } from "@/app/providers/ThemeProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider, useAuth as useOidcAuth } from "react-oidc-context"
import { WebStorageStateStore, type User as OidcClientUser } from "oidc-client-ts"
import { type AuthState, mapOidcUserToUser } from "@/app/providers/KeycloakAuthProvider"
import { useCallback, useMemo } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
})

const keycloakAuthority = import.meta.env.VITE_KEYCLOAK_AUTHORITY
const keycloakClientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID

if (!keycloakAuthority || !keycloakClientId) {
  throw new Error(
    "Missing required Keycloak env vars: VITE_KEYCLOAK_AUTHORITY, VITE_KEYCLOAK_CLIENT_ID"
  )
}

const oidcConfig = {
  authority: keycloakAuthority,
  client_id: keycloakClientId,
  response_type: "code",
  redirect_uri: window.location.origin,
  post_logout_redirect_uri: window.location.origin,
  scope: "openid profile email",
  userStore: new WebStorageStateStore({ store: window.sessionStorage }),
  automaticSilentRenew: true,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname)
  },
}

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
  context: { auth: undefined! },
})

const rootElement = document.getElementById("root")!

function AuthenticatedRouter() {
  const oidcAuth = useOidcAuth()

  const subscribeToTokenRefresh = useCallback(
    (callback: (token: string) => void) => {
      const handler = (user: OidcClientUser | null) => {
        if (user?.access_token) {
          callback(user.access_token)
        }
      }
      oidcAuth.events.addUserLoaded(handler)
      return () => oidcAuth.events.removeUserLoaded(handler)
    },
    [oidcAuth.events]
  )

  const hasRole = useCallback(
    (role: string): boolean => {
      const user = mapOidcUserToUser(oidcAuth.user)
      return user?.roles?.includes(role) ?? false
    },
    [oidcAuth.user]
  )
  const user = useMemo(() => mapOidcUserToUser(oidcAuth.user), [oidcAuth.user])

  const auth: AuthState = useMemo(
    () => ({
      isAuthenticated: oidcAuth.isAuthenticated,
      isLoading: oidcAuth.isLoading,
      user,
      accessToken: oidcAuth.user?.access_token ?? null,
      login: () => oidcAuth.signinRedirect(),
      logout: () => oidcAuth.signoutRedirect(),
      signinSilent: async () => {
        const u = await oidcAuth.signinSilent()
        return u?.access_token ?? null
      },
      subscribeToTokenRefresh,
      error: oidcAuth.error ?? null,
      activeNavigator: oidcAuth.activeNavigator,
      hasRole,
      isAdmin: hasRole("admin"),
    }),
    [oidcAuth, user, subscribeToTokenRefresh, hasRole]
  )

  return (
    <RouterProvider
      router={router}
      context={{ auth }}
      key={`${oidcAuth.isLoading}-${oidcAuth.isAuthenticated}`}
    />
  )
}

function BaseProvider() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider {...oidcConfig}>
          <AuthenticatedRouter />
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<BaseProvider />)
}
