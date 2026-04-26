import { useParams, useNavigate } from "react-router-dom";
import { figuresByCharacter } from "../../data/figures";
import type { Figure } from "../../types/Figure";

// NÃO BUISCA POR PERSONAGEM, BUSCA GLOBALMENTE POR FIGURE!! Porque /figures/:id é uma entidade própria 👉 independe de onde o usuário veio

export default function FigurePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 🔥 transforma tudo em uma lista única com todas as figures
  const allFigures: Figure[] = Object.values(figuresByCharacter).flat();

  // Procura a figure pelo id, independente do personagem
  const figure = allFigures.find((fig) => fig.id === id);

  if (!figure) {
    return (
      <div className="p-6 text-text">
        Figura não encontrada!
      </div>
    );
  }

  return (
    <div className="bg-background text-text min-h-screen">

      {/* HERO */}
      <div className="relative h-[320px] w-full overflow-hidden rounded-b-3xl">
        {/* background blur */}
        {figure.image && (
          <img
            src={figure.image}
            alt={figure.name}
            className="absolute w-full h-full object-cover blur-xl scale-110"
          />
        )}

        {/* imagem principal */}
        {figure.image && (
          <img
            src={figure.image}
            className="relative w-full h-full object-contain"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />

        {/* botão voltar */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-md text-sm hover:bg-black/70"
        >
          ← Voltar
        </button>

        {/* Título */}
        <div className="absolute bottom-6 left-6">
          <h1 className="text-3xl font-bold">
            {figure.name || "Figura sem nome"}
          </h1>
          <p className="text-text-muted">
            {figure.brand} • {figure.line}
          </p>
        </div>

        {/* bagde */}
        <span className={`absolute top-4 right-4 text-xs px-3 py-1 rounded ${figure.inCollection ? "bg-green-600" : "bg-gray-600"}`}>
          {figure.inCollection ? "Na coleção ✓" : "Não possui ✗"}
        </span>
      </div>

      {/* CONTEÚDO */}
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* INFO CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-text-muted">Ano</p>
            <p className="text-lg font-semibold">
              {figure.releaseYear ?? "—"}
            </p>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-text-muted">Escala</p>
            <p className="text-lg font-semibold">
              {figure.scale ?? "—"}
            </p>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-text-muted">Linha</p>
            <p className="text-lg font-semibold">
              {figure.line}
            </p>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-text-muted">Wave</p>
            <p className="text-lg font-semibold">
              {figure.wave ?? "—"}
            </p>
          </div>

        </div>

        {/* FICHA TÉCNICA */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-xl font-semibold mb-4">Ficha técnica</h2>

          <div className="space-y-2 text-sm">

            <p><span className="text-text-muted">Personagem:</span> {figure.characterId}</p>
            <p><span className="text-text-muted">Universo:</span> {figure.universe}</p>

            {figure.variant && (
              <p><span className="text-text-muted">Versão:</span> {figure.variant}</p>
            )}

          </div>
        </div>

        {/* GALERIA (mock) */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Galeria</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-surface rounded-xl border border-border flex items-center justify-center text-xs text-text-muted"
              >
                Foto {i}
              </div>
            ))}
          </div>
        </div>

        {/* PACK */}
        {figure.pack && (
          <div className="bg-card p-6 rounded-xl border border-border">
            <h2 className="text-xl font-semibold mb-4">Pack</h2>

            <p className="text-sm">
              {figure.pack.name} ({figure.pack.type})
            </p>
          </div>
        )}

      </div>

    </div>
  )
}

// Evolui no fututo:

// criar getFigureById(id) (helper)
// separar figures em estrutura flat
// adicionar:
// pack info
// galeria de fotos do usuário
// histórico (teve/vendeu)