import { Link } from "react-router-dom";
import { CharacterCard } from "../../../components/CharacterCard";
import { getCharacters } from "../../../lib/characterStorage"; // função para pegar os personagens salvos no localStorage.

// http://localhost:5173/dashboard/characters
export default function CharactersDashboard() {
  const characters = getCharacters(); // getCharacters para listar os personagens, tanto mockados quanto criados editados pelo usuário

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
