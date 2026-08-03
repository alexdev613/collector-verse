import { useState } from "react";

import { getFigurePhotos, saveFigurePhoto } from "../../lib/figurePhotoStorage";
import type { FigurePhoto } from "../../types/FigurePhoto";

type Props = {
  figureId: string;
};

export function FigureGallery({ figureId }: Props) {
  const [photos, setPhotos] = useState(getFigurePhotos(figureId));

  function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = event.target.files;

    if (!files) return;

    Array.from(files).forEach((file) => {
      const imageUrl = URL.createObjectURL(file);

      const photo: FigurePhoto = {
        id: crypto.randomUUID(),

        figureId,

        url: imageUrl,

        caption: null,

        isPrimary: false,

        createdAt: new Date().toISOString(),
      };

      saveFigurePhoto(photo);
    });

    // Atualiza o estado apenas uma vez, após salvar todas as fotos
    setPhotos(getFigurePhotos(figureId));

    // Limpa o input para permitir selecionar novamente a mesma imagem
    event.target.value = "";
  }

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
        onChange={handleUpload} // chama a função handleUpload quando o usuário seleciona arquivos
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

              <div className="p-0"> {/* Espaço para legenda, se houver - poder criar um modal pra poder criar ou editar */}
                {photo.caption && (
                  <p className="text-xs">
                    {photo.caption} olá mundo
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
