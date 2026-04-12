import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold text-primary mb-4">
        CollectorVerse
      </h1>

      <p className="text-text-muted mb-8 text-center max-w-md">
        Seu espaço para organizar action figures, livros e coleções com estilo.
      </p>

      <Link
        to="/dashboard/figures"
        className="bg-primary px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
      >
        Explorar coleção
      </Link>
    </div>
  );
}