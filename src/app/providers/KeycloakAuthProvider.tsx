import type { User } from "@/shared/models/user"
import { type User as OidcUser } from "oidc-client-ts"
import { useRouteContext } from "@tanstack/react-router"

interface KeycloakProfile {
  sub?: string
  email?: string
  preferred_username?: string
  picture?: string
  email_verified?: boolean
  realm_access?: {
    roles?: string[]
  }
  resource_access?: {
    [key: string]: {
      roles?: string[]
    }
  }
  roles?: string[]
}

export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  accessToken: string | null
  login: () => void
  logout: () => void
  signinSilent: () => Promise<string | null>
  subscribeToTokenRefresh: (callback: (token: string) => void) => () => void
  error: Error | null
  activeNavigator: string | undefined
  hasRole: (role: string) => boolean
  isAdmin: boolean
}

// Extract roles from Keycloak token
function extractRoles(oidcUser: OidcUser | null | undefined): string[] {
  if (!oidcUser?.profile) return []

  const profile = oidcUser.profile as KeycloakProfile

  // Check realm_access roles (common in Keycloak)
  const realmRoles = profile.realm_access?.roles || []

  // Check resource_access roles for specific client
  const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID
  const clientRoles = clientId ? (profile.resource_access?.[clientId]?.roles ?? []) : []

  // Check for roles in the profile itself
  const profileRoles = profile.roles || []

  // Combine all roles and remove duplicates
  return [...new Set([...realmRoles, ...clientRoles, ...profileRoles])]
}

export function mapOidcUserToUser(oidcUser: OidcUser | null | undefined): User | null {
  if (!oidcUser?.profile) return null

  const profile = oidcUser.profile as KeycloakProfile
  const roles = extractRoles(oidcUser)

  if (!profile.sub) return null
  if (!profile.email && !profile.preferred_username) return null

  return {
    id: profile.sub,
    email: profile.email ?? "",
    username: profile.preferred_username ?? profile.email ?? "",
    profilePicture: profile.picture,
    roles,
    verifiedAt: profile.email_verified ? new Date() : null,
  }
}

export function useAuth() {
  const { auth } = useRouteContext({ from: "__root__" })
  return auth
}
