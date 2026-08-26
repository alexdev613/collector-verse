import { useState } from "react";

import {
  getFigurePhotos,
  saveFigurePhoto,
  deleteFigurePhoto,
  setPrimaryPhoto,
  removePrimaryPhoto
} from "../../lib/figurePhotoStorage";
import type { FigurePhoto } from "../../types/FigurePhoto";
import { FigurePhotoModal } from "../FigurePhotoModal";

import { BsStar, BsStarFill, BsTrash } from "react-icons/bs";

type Props = {
  figureId: string;
  onPhotosChange?: () => void;
};

export function FigureGallery({ figureId, onPhotosChange }: Props) {
  const [photos, setPhotos] = useState(getFigurePhotos(figureId));

  const [selectedPhoto, setSelectedPhoto] = useState<FigurePhoto | null>(null);

  function resizeAndCompressImage(
    file: File,
    maxWidth = 1280,
    quality = 0.8
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const image = new Image();

      const imageUrl = URL.createObjectURL(file);

      image.onload = () => {
        // Obtém as dimensões originais da imagem
        let { width, height } = image;

        // Redimensiona apenas se a imagem ultrapassar a largura máxima
        if (width > maxWidth) {
          const ratio = maxWidth / width;

          width = maxWidth;
          height = Math.round(height * ratio);
        }

        // Cria um canvas temporário para processar a imagem
        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          URL.revokeObjectURL(imageUrl);

          reject(new Error("Não foi possível processar a imagem."));
          return;
        }

        // Desenha a imagem redimensionada no canvas
        context.drawImage(image, 0, 0, width, height);

        // Converte a imagem para JPEG comprimido
        const compressedImage = canvas.toDataURL(
          "image/jpeg",
          quality
        );

        // Libera a URL temporária da memória
        URL.revokeObjectURL(imageUrl);

        resolve(compressedImage);
      };

      image.onerror = () => {
        URL.revokeObjectURL(imageUrl);

        reject(new Error("Não foi possível carregar a imagem."));
      };

      // Carrega o arquivo selecionado para processamento
      image.src = imageUrl;
    });
  }

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = event.target.files;

    console.log("Arquivos recebidos: ", files);

    if (!files) return;

    try {
      for (const file of Array.from(files)) {
        console.log("Processando arquivo: ", file);

        const imageUrl = await resizeAndCompressImage(file);

        console.log("Imagem convertida!");

        const photo: FigurePhoto = {
          id: crypto.randomUUID(),
          figureId,
          url: imageUrl,
          caption: null,
          isPrimary: false,
          createdAt: new Date().toISOString(),
        };

        saveFigurePhoto(photo);

        console.log("Foto salva: ", photo);
      };

      console.log("Atualizando galeria...");

      // Atualiza o estado apenas uma vez, após salvar todas as fotos
      setPhotos(getFigurePhotos(figureId));

    } catch (error) {
      console.error(
        "erro ao processar a imagem",
        error
      );
    }

    // Limpa o input para permitir selecionar novamente a mesma imagem
    event.target.value = "";
  }

  // Função pra deletar foto
  function handleDeletePhoto(photoId: string) {

    const photoToDelete = photos.find(
      (photo) => photo.id === photoId
    );

    // Impede a exclusão da foto principal enquanto houver outras fotos disponíveis para serem definidas como principal
    if (photoToDelete?.isPrimary && photos.length > 1) {
      alert(
        "Não é possível excluir a foto principal. " +
        "Defina outra foto como principal antes de excluí-la."
      );

      return;
    }
    const confirmed = confirm(
      "Deseja realmente excluir esta foto?"
    );

    if (!confirmed) return;

    // Remove a foto da camada de armazenamento
    deleteFigurePhoto(photoId);

    // Atualiza as fotos exibidas na galeria
    setPhotos(getFigurePhotos(figureId));

    // Fecha o modal caso a foto excluída esteja aberta
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(null);
    }
  }

  // Função para definir foto principal para a figura.
  function handleSetPrimaryPhoto(photoId: string) {

    const selectedPhoto = photos.find(
      (photo) => photo.id === photoId
    );

    if (!selectedPhoto) return;

    if (selectedPhoto.isPrimary) {

      removePrimaryPhoto(figureId);

    } else {

      setPrimaryPhoto(figureId, photoId);

    }

    setPhotos(getFigurePhotos(figureId));

    // Informa ao componente pai que a galeria mudou
    onPhotosChange?.();

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

      <FigurePhotoModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />

      <input
        type="file"
        id="gallery-upload"
        accept="image/*" // aceita apenas imagens
        multiple // possibilidade de selecionar várias fotos ao mesmo tempo
        // capture="environment" // permitte que a câmera do celular seja aberta para tirar fotos
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
                  onClick={() => setSelectedPhoto(photo)} // abre o modal ao clicar na foto
                  loading="lazy" // adia o carregamento da imagem até que ela esteja próxima da área visível da página
                  className="w-full h-40 object-cover cursor-pointer"
                />

                {/* Ações da foto */}
                <div className="absolute top-2 right-2 flex gap-2">
                  {/* Definir a foto como principal */}
                  <button
                    type="button"
                    onClick={() => handleSetPrimaryPhoto(photo.id)}
                    className="bg-black/60 text-white rounded-full p-2 hover:bg-black/80 transition"
                    aria-label={photo.isPrimary ? "Foto principal" : "Definir como foto principal"}
                    title={photo.isPrimary ? "Foto principal" : "Definir como foto principal"}
                  >
                    {photo.isPrimary ? (<BsStarFill color="gold" size={16} />) : (<BsStar size={16} />)}
                  </button>

                  {/* Exclui a foto */}
                  <button
                    type="button"
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="bg-red-600/90 text-white rounded-full p-2 hover:bg-red-700 transition"
                    aria-label="Excluir foto"
                    title="Excluir foto"
                  >
                    <BsTrash size={16} />
                  </button>

                </div>

                {/* Indica visualmente a foto principal */}
                {photo.isPrimary && (
                  <span className="absolute bottom-2 left-2 bg-primary px-2 py-1 rounded text-xs text-white">
                    Principal
                  </span>
                )}

              </div>
              <div className="p-0"> {/* Espaço para legenda, se houver - poder criar um modal pra poder criar ou editar */}
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
