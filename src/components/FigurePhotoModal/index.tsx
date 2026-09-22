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

  // Guarda a posição do ponteiro no momento em que o arraste começa.
  // Usamos useRef porque essa informação não precisa provocar uma nova renderização quando o componente é alterado.
  const dragStart = useRef({
    x: 0,
    y: 0,
  });

  // Referência para a área que funciona como viewport da imagem. Usamos para calcular limites de arraste.
  const viewportRef = useRef<HTMLDivElement>(null); // viewportRef nos diz quanto espaço a área de visualização ocupa na tela.

  // Referência para a própria imagem. Usamos para calcular limites de arraste.
  const imageRef = useRef<HTMLImageElement>(null); // imageRef nos diz quanto a imagem ocupa de espaço na tela.

  // Sempre que uma foto for selecionada, voltamos o zoom para 100% e centralizamos a imagem.
  useEffect(() => {
    setZoom(1); // Reseta o zoom para 100% sempre que uma nova foto é selecionada.
    setPosition({ // Centraliza a imagem no viewport.
      x: 0,
      y: 0,
    });
  }, [photo?.id]);

  // Limita a posição da imagem para impedir que ela seja arrastada para fora do viewport.
  const clampPosition = (x: number, y: number) => {
    // Se ainda não temos acesso ao viewport ou à imagem, mantemos a posição original.
    if (!viewportRef.current || !imageRef.current) {
      return { x, y };
    }

    // Mede o tamanho disponível do viewport.
    const viewportRect = viewportRef.current.getBoundingClientRect();

    // Mede o tamanho renderizado da imagem antes das transformações de zoom e deslocamento.
    const imageWidth = imageRef.current.offsetWidth;
    const imageHeight = imageRef.current.offsetHeight;

    // Calcula o tamanho visual da imagem após aplicar o zoom.
    const scaledWidth = imageWidth * zoom;
    const scaledHeight = imageHeight * zoom;

    // Calcula quanto a imagem pode ultrapassar o viewport horizontalmente e verticalmente.
    const maxX = Math.max(0, (scaledWidth - viewportRect.width) / 2);
    const maxY = Math.max(0, (scaledHeight - viewportRect.height) / 2);

    // Impede que a posição ultrapasse os limites calculados.
    const limitedX = Math.min(Math.max(x, -maxX), maxX);
    const limitedY = Math.min(Math.max(y, -maxY), maxY);

    return {
      x: limitedX,
      y: limitedY,
    };
  };

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
        setPosition({ x: 0, y: 0, });
        return newZoom;
      }

      // Ajusta a posição caso ela tenha ultrapassado os limites permitidos pelo novo zoom.
      const imageWidth = imageRef.current?.offsetWidth ?? 0;
      const imageHeight = imageRef.current?.offsetHeight ?? 0;
      const viewportWidth = viewportRef.current?.clientWidth ?? 0;
      const viewportHeight = viewportRef.current?.clientHeight ?? 0;

      const scaledWidth = imageWidth * newZoom;
      const scaledHeight = imageHeight * newZoom;

      const maxX = Math.max(0, (scaledWidth - viewportWidth) / 2);

      const maxY = Math.max(0, (scaledHeight - viewportHeight) / 2);

      setPosition((currentPosition) => ({
        x: Math.min(Math.max(currentPosition.x, -maxX), maxX),
        y: Math.min(Math.max(currentPosition.y, -maxY), maxY),
      }));

      return newZoom;
    });
  };

  // Inicia o arraste quando o usuário pressiona ou toca na imagem ampliada.
  const handlePointerDown = (event: React.PointerEvent<HTMLImageElement>) => {
    // Em 100% não permitimos arrastar a imagem.
    if (zoom <= 1) return;

    setIsDragging(true);

    // Mantém o elemento recebendo os eventos deste ponteiro mesmo que ele saia da área da imagem.
    event.currentTarget.setPointerCapture(event.pointerId);

    // Guardamos a diferença entre a posição atual do ponteiro e a posição atual da imagem.
    dragStart.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  // Atualiza a posição da imagem enquanto o usuário realiza o arraste.
  const handlePointerMove = (event: React.PointerEvent<HTMLImageElement>) => {
    // Se o usuário não estiver arrastando a imagem, não fazemos nada.
    if (!isDragging) return;

    const newPosition = clampPosition(
      event.clientX - dragStart.current.x,
      event.clientY - dragStart.current.y
    );

    setPosition(newPosition);
  };

  // Finaliza o arraste quando o ponteiro é liberado.
  const handlePointerUp = (event: React.PointerEvent<HTMLImageElement>) => {
    setIsDragging(false);

    // Libera a captura deste ponteiro após o arraste.
    event.currentTarget.releasePointerCapture(event.pointerId);
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
        <div
          ref={viewportRef}
          className="flex max-h-[85vh] items-center justify-center overflow-hidden"
        >
          <img
            ref={imageRef}
            src={photo.url}
            alt={photo.caption ?? "Foto da figure"}

            /* O cursor muda conforme o estado do visualizador
              100% → cursor normal
              zoom > 1  → mão aberta
              arrastando  → mão fechada
            */
            className={`max-h-[85vh] max-w-full rounded-lg object-contain transition-transform duration-200 ${zoom > 1 ? isDragging ? "cursor-grabbing" : "cursor-grab" : "cursor-default"
              }`}

            /* Primeiro deslocamos a imagem. Depois aplicamos o zoom.
               translate = posição
               scale = tamanho
            */
            style={{
              touchAction: "none",
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transition: isDragging
                ? "none"
                : "transform 200ms ease",
            }}

            /* Impede o comportamento nativo do navegador de arrastar a imagem. */
            draggable={false}

            // Inicia o arraste.
            onPointerDown={handlePointerDown}

            // Atualiza a posição durante o arraste.
            onPointerMove={handlePointerMove}

            // Finaliza o arraste.
            onPointerUp={handlePointerUp}

            // Cancela o arraste caso o navegador interrompa o ponteiro.
            onPointerCancel={handlePointerUp}
          />
        </div>
      </div>
    </div>
  )
}
