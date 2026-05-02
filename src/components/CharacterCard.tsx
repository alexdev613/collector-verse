import { Link, useNavigate } from "react-router-dom";

import type { Character } from "../types/Character";
import { BsTrash } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";

type PropsCharacter = {
  character: Character
}

// Card do Dashboard
export function CharacterCard({ character }: PropsCharacter) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/characters/${character.id}`)}
      className="group bg-card rounded-2xl overflow-hidden cursor-pointer
      hover:scale-[1.02] transition-all duration-300 border border-border
      hover:border-primary hover:shadow-lg hover:shadow-black/30"
    >
      <div className="relative w-full overflow-hidden rounded-t-2xl ">
        <button
          onClick={(e) => { e.stopPropagation(); alert("Deletar personagem? (função não implementada ainda!)") }}
          className="absolute z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center left-2 top-2 drop-shadow transition"
        >
          <BsTrash size={12} color="#222" />
        </button>
        <Link
          to={`/characters/${character.id}/edit`}
          onClick={(e) => e.stopPropagation()}
          className="absolute z-10 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
        >
          <FaPencil size={12} color="#222" />
        </Link>

        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{character.name}</h3>

        <p className="text-sm text-text-muted">{character.universe}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-secondary">{character.id} figuras</span>

          <span className="text-xs text-accent">
            Ver mais →
          </span>
        </div>
      </div>

    </div>
  )
}