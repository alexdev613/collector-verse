import { IoClose } from "react-icons/io5";

import type { FigurePhoto } from "../../types/FigurePhoto";

type Props = {
  photo: FigurePhoto | null;
  onClose: () => void;

  // Usamos photo como estado de abertura: uma foto abre o modal e null o fecha,
  // evitando um estado separado apenas para controlar sua visibilidade.
}

export function FigurePhotoModal({ photo, onClose }: Props) {
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[90vh] bg-card rounded-xl border border-border p-2"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-10 bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition"
          aria-label="Fechar"
        >
          <IoClose size={24} />
        </button>

        <img
          src={photo.url}
          alt={photo.caption ?? "Foto da figure"}
          className="max-h-[85vh] max-w-full object-contain rounded-lg"
        />

      </div>

    </div>
  )
}
