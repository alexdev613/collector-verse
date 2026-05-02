import { useParams } from "react-router-dom";
import { CharacterForm } from "../../components/CharacterForm";
import { getCharacterById } from "../../lib/characterStorage";

export default function EditCharacterPage() {
  const { id } = useParams();

  if (!id) {
    return <div>Id inválido</div>;
  }

  const character = getCharacterById(id);

  if (!character) {
    return <div>Personagem não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <CharacterForm
        defaultValues={character}
        isEditing
      />
    </div>
  );
}