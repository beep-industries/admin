import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/moderation")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/moderation"!</div>
}
