import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: IndexPage,
})

function IndexPage() {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      <p className="mt-2 text-sm text-white/50">
        Start building your admin features from here.
      </p>
    </section>
  )
}
