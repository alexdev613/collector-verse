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
    <div className="min-h-screen bg-background text-text p-6">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-card px-3 py-1 rounded-md border border-border"
      >
        ← Voltar
      </button>

      <h1 className="text-3xl font-bold mb-4">{figure.name}</h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* IMAGE */}
        <div className="bg-card rounded-xl border border-border p-4 flex items-center justify-center">
          {figure.image ? (
            <img
              src={figure.image}
              alt={figure.name}
              className="max-h-[400px] object-contain"
            />
          ) : (
            <span className="text-text-muted">Sem imagem</span>
          )}
        </div>

        {/* INFO */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          <p><strong>Marca:</strong> {figure.brand}</p>
          <p><strong>Linha:</strong> {figure.line}</p>
          {figure.wave && <p><strong>Wave:</strong> {figure.wave}</p>}
          <p><strong>Universo:</strong> {figure.universe}</p>

          {figure.variant && (
            <p><strong>Versão:</strong> {figure.variant}</p>
          )}

          {figure.releaseYear && (
            <p><strong>Ano:</strong> {figure.releaseYear}</p>
          )}

          {figure.scale && (
            <p><strong>Escala:</strong> {figure.scale}</p>
          )}

          <p>
            <strong>Status:</strong>{" "}
            {figure.inCollection ? "Na coleção" : "Não possui"}
          </p>

        </div>

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