import { useParams } from "react-router-dom";
import { FigureForm } from "../../components/FigureForm";

export default function CreateFigurePage() {
  const { characterId } = useParams();

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <FigureForm presetCharacterId={characterId}/>
    </div>
  );
}
