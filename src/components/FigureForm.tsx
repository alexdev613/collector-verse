import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { Figure } from "../types/Figure";

import { saveFigure, figureExists } from "../lib/figureStorage";

type Props = {
  defaultValues?: Figure;
  isEditing?: boolean;

  // 🔥 permite criar figure já vinculada ao personagem
  presetCharacterId?: string;
};

type FormData = {
  name: string;

  brand: string;
  line: string;
  wave?: string | null;

  universe: string;
  characterId: string;

  variant?: string | null;

  releaseYear?: number | null;
  scale?: string;

  sku?: string | null;

  image?: string | null;

  inCollection: boolean;
};

export function FigureForm({ defaultValues, isEditing, presetCharacterId }: Props) {
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: defaultValues ?? {
      characterId: presetCharacterId ?? "",
      inCollection: true
    }
  });

  const imageUrl = watch("image");

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function onSubmit(data: FormData) {

    // 🔥 id mais único para figures
    const generatedId = generateSlug(
      `${data.name}-${data.brand}-${data.line}`
    );

    const id = isEditing && defaultValues
      ? defaultValues.id
      : generatedId;

    const figure: Figure = {
      id,

      name: data.name,

      brand: data.brand,
      line: data.line,
      wave: data.wave || null,

      universe: data.universe,
      characterId: data.characterId,

      variant: data.variant || null,

      releaseYear: data.releaseYear
        ? Number(data.releaseYear)
        : null,

      scale: data.scale || "Não informada",

      sku: data.sku || null,

      image: data.image || null,

      inCollection: data.inCollection
    };

    try {
      saveFigure(figure);

      navigate(`/characters/${figure.characterId}`);

    } catch (error: any) {
      alert(error.message);
    }

  }

  return (
    <div className="max-w-2xl mx-auto bg-card p-6 rounded-xl border border-border">

      <h2 className="text-2xl font-semibold mb-6">
        {isEditing ? "Editar Figure" : "Nova Figure"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* NOME */}
        <div>
          <label htmlFor="name" className="text-sm">Nome</label>
          <input
            id="name"
            {...register("name", {
              required: "Nome é obrigatório",

              validate: (value) => {

                const generatedId = generateSlug(`${value}-${watch("brand")}-${watch("line")}`);

                const isSameFigure = isEditing && defaultValues?.id === generatedId;

                if (isSameFigure) return true;

                const exists = figureExists(generatedId);

                return !exists || "Já existe uma figure com esse id";
              }
            })}
            className="w-full mt-1 p-2 rounded bg-surface border border-border"
          />

          {errors.name && (
            <p className="text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* BRAND */}
        <div>
          <label htmlFor="brand" className="text-sm">Marca</label>
          <input
            id="brand"
            {...register("brand", { required: "Marca é obrigatória" })}
            className="w-full mt-1 p-2 rounded bg-surface border border-border"
          />
        </div>

        {/* LINE */}
        <div>
          <label htmlFor="line" className="text-sm">Linha</label>
          <input
            id="line"
            {...register("line", { required: "Linha é obrigatória" })}
            className="w-full mt-1 p-2 rounded bg-surface border border-border"
          />
        </div>

        {/* WAVE */}
        <div>
          <label htmlFor="wave" className="text-sm">Wave</label>
          <input
            id="wave"
            {...register("wave")}
            className="w-full mt-1 p-2 rounded bg-surface border border-border"
          />
        </div>

        {/* UNIVERSO */}
        <div>
          <label htmlFor="universe" className="text-sm">Universo</label>
          <input
            id="universe"
            {...register("universe", { required: "Universo é obrigatório" })}
            className="w-full mt-1 p-2 rounded bg-surface border border-border"
          />
        </div>

        {/* CHARACTER ID */}
        <div>
          <label htmlFor="characterId" className="text-sm">Character ID</label>
          <input
            id="characterId"
            {...register("characterId", { required: "CharacterId é obrigatório" })}
            className="w-full mt-1 p-2 rounded bg-surface border border-border read-only:opacity-60 read-only:cursor-not-allowed"
            readOnly={!!presetCharacterId || isEditing} // evita edição quando existir presetCharacterId ou se estiver em edição!
          />
        </div>

        {/* RELEASE YEAR */}
        <div>
          <label htmlFor="releaseYear" className="text-sm">Ano</label>
          <input
            id="releaseYear"
            type="number"
            {...register("releaseYear")}
            className="w-full mt-1 p-2 rounded bg-surface border border-border"
          />
        </div>

        {/* SCALE */}
        <div>
          <label htmlFor="scale" className="text-sm">Escala</label>
          <input
            id="scale"
            {...register("scale")}
            className="w-full mt-1 p-2 rounded bg-surface border border-border"
          />
        </div>

        {/* SKU */}
        <div>
          <div className="flex justify-between">
            <label htmlFor="sku" className="text-sm">
              SKU <span className="text-text-muted">(opcional)
              </span>
            </label>
            <span className="text-[0.525rem] text-orange-400 self-end">
              (*) Código do fabricante
            </span>
          </div>

          <input
            id="sku"
            {...register("sku")}
            placeholder="Ex.: F6543"
            className="w-full mt-1 p-2 rounded bg-surface border border-border"
          />
        </div>

        {/* IMAGE */}
        <div>
          <label htmlFor="image" className="text-sm">Imagem (URL)</label>
          <input
            id="image"
            {...register("image")}
            className="w-full mt-1 p-2 rounded bg-surface border border-border"
          />
        </div>

        {/* CHECKBOX */}
        <div className="flex items-center gap-2">
          <input id="inCollection" type="checkbox" {...register("inCollection")} />
          <label htmlFor="inCollection" className="">Está na coleção</label>
        </div>

        {/* BOTÕES */}
        <div className="flex gap-2 pt-4">

          <button type="submit" className="bg-primary px-4 py-2 rounded text-white">
            {isEditing ? "Salvar alterações" : "Criar Figure"}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-surface px-4 py-2 rounded border border-border"
          >
            Cancelar
          </button>

        </div>

      </form>

      {/* PREVIEW */}
      {imageUrl && (
        <div className="flex justify-center mt-6">
          <img
            src={imageUrl}
            alt="Prévia"
            className="h-64 object-contain border border-border rounded"
          />
        </div>
      )}

    </div>
  )
}
