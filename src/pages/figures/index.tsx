import { useReducer } from "react"; // useReducer é um Hook do React utilizado para controlar um estado através de uma função chamada reducer.
import { useParams, useNavigate } from "react-router-dom";
import { getFigures, deleteFigure } from "../../lib/figureStorage";
import { BsTrash } from "react-icons/bs";

import { FigureGallery } from "../../components/FigureGallery";

import { getFigurePhotos } from "../../lib/figurePhotoStorage";

// NÃO BUSCA POR PERSONAGEM, BUSCA GLOBALMENTE POR FIGURE!! Porque /figures/:id é uma entidade própria 👉 independe de onde o usuário veio

export default function FigurePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Cria uma função para forçar uma nova renderização quando alguma alteração acontecer na galeria.
  // Ignoramos o estado atual porque precisamos apenas da função refreshGallery para disparar a atualização.
  const [, refreshGallery] = useReducer(
    (version) => version + 1,
    0
  )

  // 🔥 agora vem da storage layer
  const allFigures = getFigures();

  // procura figure pelo id
  const figure = allFigures.find((fig) => fig.id === id);

  if (!figure) {
    return (
      <div className="p-6 text-text">
        Figura não encontrada!
      </div>
    );
  }

  // Procura a foto marcada como principal na galeria
  const primaryPhoto = getFigurePhotos(figure.id).find(
    (photo) => photo.isPrimary
  );

  // Usa a foto principal da galeria. Se não existir, utiliza a imagem original da figure(aquela escolhida inicialmente para criar a figure).
  const heroImage = primaryPhoto?.url ?? figure.image;

  return (
    <div className="bg-background text-text min-h-screen">

      {/* HERO */}
      <div className="relative h-[320px] w-full overflow-hidden rounded-b-3xl">
        {/* background blur, borrado usando a imagem do Hero */}
        {heroImage && (
          <img
            src={heroImage}
            alt={figure.name}
            className="absolute w-full h-full object-cover blur-xl scale-110"
          />
        )}

        {/* imagem principal */}
        {heroImage && (
          <img
            src={heroImage}
            alt={figure.name}
            className="relative w-full h-full object-contain"
          />
        )}

        <div className="absolute inset-0 bg-black/60" />

        {/* botão voltar */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-md text-sm hover:bg-black/70"
        >
          ← Voltar
        </button>

        {/* Título */}
        <div className="absolute bottom-6 left-6">
          <h1 className="text-3xl font-bold">
            {figure.name || "Figura sem nome"}
          </h1>
          <p className="text-text-muted">
            {figure.brand} • {figure.line}
          </p>
        </div>

        {/* bagde */}
        <span className={`absolute top-4 right-4 text-xs px-3 py-1 rounded ${figure.inCollection ? "bg-green-600" : "bg-gray-600"}`}>
          {figure.inCollection ? "Na coleção ✓" : "Não possui ✗"}
        </span>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-2 flex justify-between items-center">
        <p className="px-4 text-xl font-bold">{figure.name}</p>
        <button
          onClick={() => {
            const confirmed = confirm(
              "Deseja realmente excluir esta figure?"
            );

            if (!confirmed) return; // se não estiver confirmed, não faça nada!

            deleteFigure(figure.id);

            navigate(`/characters/${figure.characterId}`);
          }}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 duration-500 flex items-center gap-1"
        >
          <span>Excluir</span> <BsTrash size={16} color="#fff" />
        </button>
      </div>

      {/* CONTEÚDO */}
      <div className="max-w-6xl mx-auto px-6 pt-2 pb-10 space-y-10">

        {/* INFO CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-text-muted">Ano</p>
            <p className="text-lg font-semibold">
              {figure.releaseYear ?? "—"}
            </p>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-text-muted">Escala</p>
            <p className="text-lg font-semibold">
              {figure.scale ?? "—"}
            </p>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-text-muted">Linha</p>
            <p className="text-lg font-semibold">
              {figure.line}
            </p>
          </div>

          <div className="bg-card p-4 rounded-xl border border-border">
            <p className="text-xs text-text-muted">Wave</p>
            <p className="text-lg font-semibold">
              {figure.wave ?? "—"}
            </p>
          </div>

        </div>

        {/* FICHA TÉCNICA */}
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-xl font-semibold mb-4">Ficha técnica</h2>

          <div className="space-y-2 text-sm">

            <p><span className="text-text-muted">Personagem:</span> {figure.characterId}</p>
            <p><span className="text-text-muted">Universo:</span> {figure.universe}</p>

            {figure.variant && (
              <p><span className="text-text-muted">Versão:</span> {figure.variant}</p>
            )}

            {figure.sku && (
              <p>
                <span className="text-text-muted">SKU:</span>
                <span className="ml-1 font-mono">{figure.sku}</span>
              </p>
            )}

          </div>
        </div>

        {/* GALERIA */}
        {/* Quando a galeria sofre alterações, refreshGallery é chamado através de onPhotoChange
        para renderizar novamente o FigurePage e atualizar o Hero*/}
        <FigureGallery
          figureId={figure.id}
          onPhotosChange={refreshGallery}
        />

        {/* GALERIA (mock) */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Galeria</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-32 bg-surface rounded-xl border border-border flex items-center justify-center text-xs text-text-muted"
              >
                Foto {i}
              </div>
            ))}
          </div>
        </div>

        {/* PACK */}
        {figure.pack && (
          <div className="bg-card p-6 rounded-xl border border-border">
            <h2 className="text-xl font-semibold mb-4">Pack</h2>

            <p className="text-sm">
              {figure.pack.name} ({figure.pack.type})
            </p>
          </div>
        )}

      </div>

    </div>
  )
}


/*
    useReducer é um Hook do React utilizado para controlar um estado através
    de uma função chamada reducer.

    Neste caso, não precisamos ler o valor atual do estado.
    Precisamos apenas de uma função capaz de alterar esse estado e provocar
    uma nova renderização do componente.

    O primeiro valor retornado pelo useReducer seria o estado atual.
    Como não precisamos utilizá-lo, deixamos esse espaço vazio:

    const [, refreshGallery] = ...

    O segundo valor é a função dispatch, que chamamos de refreshGallery.
    Sempre que refreshGallery() for executada, o reducer será chamado:

    version => version + 1

    Isso gera um novo estado e faz o React renderizar novamente o FigurePage.

    O valor inicial do estado é 0.

    const [, refreshGallery] = useReducer(
      (version) => version + 1,
      0
    );


    A FigureGallery recebe o id da figure para saber quais fotos
    pertencem a ela.

    Também recebe a função refreshGallery através da prop onPhotosChange.

    Sempre que alguma foto da galeria for adicionada, excluída ou tiver
    seu status de foto principal alterado, a FigureGallery pode chamar:

    onPhotosChange();

    Como a função recebida é refreshGallery, isso altera internamente
    o estado controlado pelo useReducer e provoca uma nova renderização
    do FigurePage.

    Com a nova renderização, o FigurePage executa novamente:

    getFigurePhotos(figure.id)

    e recalcula qual imagem deve ser utilizada no Hero.

    <FigureGallery
      figureId={figure.id}
      onPhotosChange={refreshGallery}
    />

*/

/* Segunda explicação de como age o useReducer aqui:

// useReducer controla um estado interno que será usado apenas
// para forçar uma nova renderização quando a galeria for alterada.
//
// Não precisamos utilizar o valor atual do estado, por isso
// ignoramos o primeiro valor retornado com uma vírgula:
//
// const [, refreshGallery]
//
// refreshGallery é a função que atualiza esse estado.
// Cada chamada executa o reducer abaixo e faz o FigurePage
// renderizar novamente.
//
// O reducer recebe a versão atual e gera uma nova versão:
//
// version => version + 1
//
// O estado inicial começa em 0.
    const [, refreshGallery] = useReducer(
      (version) => version + 1,
      0
    );


    A galeria recebe o id da figure para trabalhar apenas com
  as fotos pertencentes a ela.

  onPhotosChange recebe a função refreshGallery.

  Quando a galeria sofre alguma alteração, ela chama:

  onPhotosChange()

  Isso executa refreshGallery(), que atualiza o estado interno
  do useReducer e faz o FigurePage renderizar novamente.

  Assim, o Hero consegue buscar novamente a foto principal.

  <FigureGallery
    figureId={figure.id}
    onPhotosChange={refreshGallery}
  />
*/

// Evoluir no fututo:

// pack info
// histórico (teve/vendeu)