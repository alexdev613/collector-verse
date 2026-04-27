import { Link } from "react-router-dom";
import { CharacterCard } from "../../../components/CharacterCard";

export const characters = [
  {
    id: "psylocke",
    name: "Psylocke",
    universe: "Marvel",
    image: "https://i.imgur.com/tyNU2eX.jpeg",
  },
  {
    id: "wolverine",
    name: "Wolverine",
    universe: "Marvel",
    image: "https://i.imgur.com/nMWk4IL.jpeg",
  },
  {
    id: "rogue",
    name: "Vampira (Rogue)",
    universe: "Marvel",
    image: "https://i.imgur.com/oabPXPW.gif",
  },
  {
    id: "jean-gray",
    name: "Jean Grey",
    universe: "Marvel",
    image: "https://i.imgur.com/JiGkliT_d.webp?maxwidth=760&fidelity=grand",
  },
  {
    id: "colossus",
    name: "Colossus",
    universe: "Marvel",
    image: "https://i.imgur.com/b2dXKgB.jpeg",
  },
  {
    id: "captain-america",
    name: "Capitão América",
    universe: "Marvel",
    image: "https://i.imgur.com/0AFaxPn.jpeg",
  },
  {
    id: "hulk",
    name: "Hulk",
    universe: "Marvel",
    image: "https://i.imgur.com/9RJjV7T.jpeg",
  },
  {
    id: "thanos",
    name: "Thanos",
    universe: "Marvel",
    image: "https://i.imgur.com/dHTCWrx.jpeg",
  },

];

// http://localhost:5173/dashboard/characters
export default function CharactersDashboard() {
  return (
    <div className="min-h-screen bg-background text-text px-6 py-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold mb-8">Personagens</h1>
      <Link to="/characters/new" className="mb-6 inline-block bg-primary px-4 py-2 rounded text-white">
        + Novo personagem
      </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
    </div>
  );
}