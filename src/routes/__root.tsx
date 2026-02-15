import { createRootRoute, Outlet } from "@tanstack/react-router"
import AppLayout from "@/layouts/AppLayout"

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
