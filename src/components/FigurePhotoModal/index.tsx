import { useState, useRef, useEffect } from "react";

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

  // Guarda a posição atual da imagem dentro do viewport, x controla esq/dir e y controla cima/baixo.
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  // Indica se o usuário está segurando a imagem para arrastá-la.
  const [isDragging, setIsDragging] = useState(false);

  // Guarda a posição do mouse no momento em que o arraste começa.
  // Usamos useRef porque essa informação não precisa disparar re-renderizações do componente quando alterada.
  const dragStart = useRef({
    x: 0,
    y: 0,
  });

  // Sempre que uma foto for selecionada, voltamos o zoom para 100% e centralizamos a imagem.
  useEffect(() => {
    setZoom(1); // Reseta o zoom para 100% sempre que uma nova foto é selecionada.
    setPosition({ // Centraliza a imagem no viewport.
      x: 0,
      y: 0,
    });
  }, [photo?.id]);

  // Aumenta o zoom em 25%, limitado a 300%.
  const zoomIn = () => {
    setZoom((currentZoom) => Math.min(currentZoom + 0.25, 3));
  };

  // Diminui o zoom em 25%, mas nunca abaixo de 100%.
  const zoomOut = () => {
    setZoom((currentZoom) => {
      const newZoom = Math.max(currentZoom - 0.25, 1);

      // Se voltarmos para 100%, não existe mais necessidade de manter a imagem deslocada.
      if (newZoom === 1) {
        setPosition({
          x: 0,
          y: 0,
        });
      }

      return newZoom;
    });
  };

  // Executado quando o usuário pressiona o botão esquerdo do mouse sobre a imagem que está ampliada.
  const handleMouseDown = (event: React.MouseEvent<HTMLImageElement>) => {
    // Em 100% não permitimos arrastar a imagem.
    if (zoom <= 1) return;

    setIsDragging(true);

    // Guardamos a diferença entre a posição atual do mouse e a posição atual da imagem.
    dragStart.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  // Executado enquanto o usuário movimenta o mouse mantendo o botão pressionada.
  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    // Se o usuário não estiver arrastando a imagem, não fazemos nada.
    if (!isDragging) return;

    setPosition({
      x: event.clientX - dragStart.current.x,
      y: event.clientY - dragStart.current.y,
    });
  };

  // Executado quando o botão do mouse é solto.
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Caso o usuário arraste o mouse para fora da imagem, encerramos o estado de arraste
  // para evitar que a imagem continue se movendo mesmo com o mouse fora da área da imagem.
  const handleMouseLeave = () => {
    setIsDragging(false);
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
        {/* Área dos controles do visualizador de fotos */}
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
        {/*
          VIEWPORT - Esta é a "janela" através da qual enxergamos a imagem.

          A imagem pode ser maior que essa área quando estiver ampliada, mas o conteúdo que ultrapassar os limites do viewport ficará escondido.
        */}
        <div className="flex max-h-[85vh] items-center justify-center overflow-hidden">

          <img
            src={photo.url}
            alt={photo.caption ?? "Foto da figure"}

            /* O cursor muda conforme o estado do visualizador
              100% → cursor normal
              zoom > 1  → mão aberta
              arrastando  → mão fechada
            */
            className={`max-h-[85vh] max-w-full rounded-lg object-contain transition-transform duration-200 ${
              zoom > 1 ? isDragging ? "cursor-grabbing" : "cursor-grab" : "cursor-default"
            }`}

            /* Primeiro deslocamos a imagem. Depois aplicamos o zoom.
               translate = posição
               scale = tamanho
            */
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transition: isDragging
                ? "none"
                : "transform 200ms ease",
            }}

            /* Impede o comportamento nativo do navegador de arrastar a imagem. */
            draggable={false}

            // Início do arraste.
            onMouseDown={handleMouseDown}

            // Movimento durante o arraste.
            onMouseMove={handleMouseMove}

            // Fim do arraste.
            onMouseUp={handleMouseUp}

            // Segurança: caso o mouse saia da área da imagem, encerramos o arraste.
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  )
}
