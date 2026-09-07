import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

import type { FigurePhoto } from "../../types/FigurePhoto";

type Props = {
  photo: FigurePhoto | null;
  onClose: () => void;

  // Usamos photo como estado de abertura: uma foto abre o modal e null o fecha,
  // Assim não precisamos de um estado separado apenas para controlar a visibilidade do modal.
}

export function FigurePhotoModal({ photo, onClose }: Props) {
  // Controla o nível de zoom da imagem. 1 = tamanho original, 2 = zoom 2x, etc.
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setZoom(1); // Reseta o zoom para 100% sempre que uma nova foto é selecionada.
  }, [photo?.id]);

  // Aumenta o zoom em 25%, limitado a 300%.
  const zoomIn = () => {
    setZoom((currentZoom) => Math.min(currentZoom + 0.25, 3));
  };

  // Diminui o zoom em 25%, mas nunca abaixo de 100%.
  const zoomOut = () => {
    setZoom((currentZoom) => Math.max(currentZoom - 0.25, 1));
  };

  // Se não existe uma foto selecionada, não renderizamos o modal.
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] rounded-xl border border-border bg-card p-2 overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Área dos controlers do visualizador de fotos */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
          {/* Diminuir zoom */}
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= 1}
            className="flex items-center justify-center rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Diminuir zoom"
          >
            <FiZoomOut size={20} />
          </button>

          {/* Aumentar zoom */}
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= 3}
            className="flex items-center justify-center rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Aumentar zoom"
          >
            <FiZoomIn size={20} />
          </button>

          {/* Fechar modal */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center rounded-full bg-black/60 p-2 text-white transition hover:bg-black/80"
            aria-label="Fechar"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Área responsável por exibir a imagem */}
        <div className="flex max-h-[85vh] items-center justify-center overflow-auto">
          <img
            src={photo.url}
            alt={photo.caption ?? "Foto da figure"}
            className="max-h-[85vh] max-w-full rounded-lg object-contain transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
            // draggable={false}
          />
        </div>
      </div>
    </div>
  )
}
