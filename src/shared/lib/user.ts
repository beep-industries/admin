export function getUserInitials({
  username,
  email,
  fallback,
}: {
  username?: string | null
  email?: string | null
  fallback?: string
}): string {
  const fromUsername = extractInitials(username)
  if (fromUsername) return fromUsername

  const emailPrefix = email?.split("@")[0] ?? ""
  const fromEmail = extractInitials(emailPrefix)
  if (fromEmail) return fromEmail

  const fallbackValue = fallback?.trim() ?? "AD"
  const fromFallback = extractInitials(fallbackValue)
  return fromFallback || "AD"
}

function extractInitials(value?: string | null): string {
  if (!value) return ""
  const parts = value.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ""

  return parts
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase()
    .slice(0, 2)
}
