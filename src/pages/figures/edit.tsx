import { useParams } from "react-router-dom";
import { FigureForm } from "../../components/FigureForm";
import { getFigureById } from "../../lib/figureStorage";

export default function EditFigurePage() {
  const { id } = useParams();

  if (!id) return <div>Id inválido!</div>

  const figure = getFigureById(id);

  if (!figure) return <div>Figure não encontrada!</div>

  return (
    <div className="min-h-screen bg-background text-text p-6">
      <FigureForm defaultValues={figure} isEditing />
    </div>
  )
}
