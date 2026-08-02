import { useState } from "react";

import { getFigurePhotos } from "../../lib/figurePhotoStorage";

type Props = {
  figureId: string;
};

export function FigureGallery({ figureId }: Props) {
  const [photos] = useState(getFigurePhotos(figureId));

  return (
    <div className="space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Galeria</h2>

        <label
          htmlFor="gallery-upload"
          className="cursor-pointer bg-primary px-4 py-2 rounded text-white text-sm hover:opacity-90 transition"
        >
          + adicionar fotos
        </label>

      </div>

      <input
        type="file"
        id="gallery-upload"
        accept="image/*" // aceita apenas imagens
        multiple // possibilidade de selecionar várias fotos ao mesmo tempo
        capture="environment" // permitte que a câmera do celular seja aberta para tirar fotos
        className="hidden" // oculta o input, pois o label é quem vai disparar a ação de upload
      />

      {/* Grid de fotos */}

      {photos.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-xl p-10 text-center text-text-muted">
          Nenhuma foto cadastrada!
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="bg-card rounded-xl overflow-hidden border border-border"
            >

              <div className="relative">
                <img
                  src={photo.url}
                  alt={photo.caption ?? "Foto da figure"}
                  loading="lazy" // adia o carregamento da imagem até que ela esteja próxima da área visível da página
                  className="w-full h-40 object-cover"
                />
              </div>

              <div className="p-2">
                {photo.caption && (
                  <p className="text-xs">
                    {photo.caption}
                  </p>
                )}
              </div>

            </div>

          ))}
        </div>
      )}

    </div >
  );
}
