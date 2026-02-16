import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: IndexPage,
})

function IndexPage() {
  return (
    <section className="p-8">
      <p className="text-muted-foreground mt-2 text-sm">
        Start building your admin features from here.
      </p>
    </section>
  )
}
