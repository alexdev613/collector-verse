import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="bg-background min-h-screen">
      <header className="bg-surface border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">CollectorVerse</h1>

        <span className="text-sm text-text-muted">
          Sua coleção pessoal
        </span>
      </header>

      {/* Conteúdo */}
      <main>
        <Outlet />
      </main>
    </div>
  )
}