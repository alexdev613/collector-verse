import { Link } from "react-router-dom";
import type { Figure } from "../types/Figure";

type Props = {
  figure: Figure;
}

export function FigureCard({ figure }: Props) {

  return (
    <Link
      to={`/figures/${figure.id}`}
      className="relative group bg-card rounded-xl border border-border overflow-hidden 
      hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 transition cursor-pointer"
      title={figure.name}
    >
      {figure.inCollection ? (
        <span className="absolute top-2 right-2
          opacity-0 group-hover:opacity-100 transition
          bg-green-600 text-white text-xs px-2 py-1 rounded">
          Na coleção
        </span>
      ) : (
        <span className="absolute top-2 right-2
          opacity-0 group-hover:opacity-100 transition
          bg-gray-600 text-white text-xs px-2 py-1 rounded">
          Não possui
        </span>
      )}

      {/* IMAGE */}
      <div className="w-full h-40 bg-surface flex items-center justify-center overflow-hidden">
        {figure.image ? (
          <img
            src={figure.image}
            alt={figure.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-text-muted text-xs">
            <span>📦</span>
            <span>Sem imagem</span>
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="p-3">
        <p className="text-sm font-medium mb-1">{figure.name || "Figura sem nome"}</p>

        <hr className="border-border/50 my-1" />

        {/* BRAND + LINE */}
        {(figure.brand || figure.line) && (
          <p className="mt-1 text-xs text-text-muted">
            {[figure.brand, figure.line].filter(Boolean).join(" • ")}
          </p>
        )}

        {/* YEAR + SCALE */}
        {[figure.releaseYear, figure.scale].some(Boolean) && (
          <p className="text-xs text-text-muted">
            {figure.releaseYear && <>Ano: {figure.releaseYear}</>}
            {figure.releaseYear && figure.scale && " • "}
            {figure.scale && <>Escala: {figure.scale}</>}
          </p>
        )}

      </div>

    </Link>
  )
}


// ✔️ Reutilização real

// Agora podemos usar FigureCard em:

// CharacterPage
// Dashboard futuro de figures
// Favoritos
// Busca
// Packs

/* 
Badge aparece apenas no hover.

- O container usa `relative` + `group`
- O badge usa `absolute` para posicionamento
- Começa invisível com `opacity-0`
- Fica visível com `group-hover:opacity-100`

👉 `group-hover` funciona porque o elemento pai tem a classe `group`
👉 `group-hover` reage ao hover do elemento pai (`group`)
*/