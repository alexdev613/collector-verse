import { useParams, useNavigate } from "react-router-dom";
import { characters } from "../dashboard/characters";
import { InfoSection } from "../../components/InfoSection";
import { characterDetails } from "../../data/characterDetails";
import { figuresByCharacter } from "../../data/figures";

import { FigureCard } from "../../components/FigureCard";

// Relação 1 personagem → N figures
// Página do Personagem:
export default function CharacterPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const character = characters.find((c) => c.id === id) ?? null;

  if (!character) {
    return (
      <div className="p-6 text-text">
        Personagem não encontrado!
      </div>
    );
  }

  const info = id ? characterDetails[id as keyof typeof characterDetails] : null;

  // if (!info) {
  //   return <div className="p-6">Sem detalhes ainda...</div>
  // }

  const figures = id ? figuresByCharacter[id as keyof typeof figuresByCharacter] ?? [] : [];

  return (
    <div className="bg-background text-text min-h-screen">

      {/* HERO */}
      <div className="relative h-[320px] w-full overflow-hidden rounded-b-3xl">

        {/* BACKGROUND BLUR */}
        <img
          src={character.image}
          alt={character.name}
          className="absolute w-full h-full object-cover blur-xl scale-110 opacity-100"
        />

        {/* IMAGE PRINCIPAL */}
        <img
          src={character.image}
          className="relative w-full h-full object-contain"
        />
        <div className="absolute inset-0 bg-black/60" />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-md text-sm hover:bg-black/70"
        >
          ← Voltar
        </button>

        <div className="absolute bottom-6 left-6">
          <h1 className="text-4xl font-bold">{character.name}</h1>
          <p className="text-text-muted">{character.universe}</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">

        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-8">

          {/* INFO CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card p-4 rounded-xl border border-border">
              <p className="text-xs text-text-muted">Figuras</p>
              <p className="text-lg font-semibold">{figures.length}</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <p className="text-xs text-text-muted">Universo</p>
              <p className="text-lg font-semibold">{character.universe}</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <p className="text-xs text-text-muted">Status</p>
              <p className="text-lg font-semibold text-secondary">Na coleção</p>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <p className="text-xs text-text-muted">Raridade</p>
              <p className="text-lg font-semibold text-accent">Alta</p>
            </div>
          </div>

          {/* BIO */}
          <div className="bg-card p-6 rounded-xl border border-border">
            <h2 className="text-xl font-semibold mb-4">Biografia</h2>

            <p className="text-text-muted leading-relaxed">
              Aqui você vai poder escrever a história completa do personagem,
              incluindo origem, poderes alianças e curiosidades.
            </p>
          </div>

          {/* Figures Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Action Figures</h2>

            {figures.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-6 text-center text-text-muted">
                Não há registro de action figures para este personagem!
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                
                {figures.map((figure) => (
                  <FigureCard key={figure.id} figure={figure} />
                ))}
                
              </div>
            )}

          </div>
        </div>

        {/* SIDEBAR */}
        {info && (
          <div className="space-y-6 sticky top-6">
            {info.general && (
              <InfoSection title="Informações gerais" data={info.general} />
            )}
            {info.personal && (
              <InfoSection title="Informações pessoais" data={info.personal} />
            )}
            {info.powers && (
              <InfoSection title="Poderes e habilidades" data={info.powers} />
            )}
            {info.relations && (
              <InfoSection title="Relacionamentos" data={info.relations} />
            )}
          </div>
        )}

      </div>

    </div>
  )
}
