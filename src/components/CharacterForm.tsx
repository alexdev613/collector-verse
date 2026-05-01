import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { Character } from "../types/Character";
import { saveCharacter, characterExists } from "../lib/characterStorage"; // funções para salvar personagem e verificar existência de id duplicado no localStorage

type FormData = {
  name: string;
  universe: string;
  image: string;
};

export function CharacterForm() {
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

  const imageUrl = watch("image");

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD") // separa os acentos
      .replace(/[\u0300-\u036f]/g, "") // remove os acentos
      .replace(/\s+/g, "-") // substitui espaços por hífens
      .replace(/[^\w-]+/g, "") // remove caracteres especiais
      .replace(/--+/g, "-") // substitui múltiplos hífens por um único
      .replace(/^-+|-+$/g, ""); // remove hífens do início e fim
  }

  function onSubmit(data: FormData) {
    const newCharacter: Character = {
      // id: crypto.randomUUID(),
      id: generateSlug(data.name),
      name: data.name,
      universe: data.universe,
      image: data.image
    }

    try {
      saveCharacter(newCharacter);
      console.log("Novo Personagem:", newCharacter);
      navigate("/dashboard/characters");
    } catch (error: any) {
      alert(error.message);
    }
    // 🔥 depois vamos salvar no Firebase, por enquanto só log
  }

  return (
    <div className="max-w-xl mx-auto bg-card p-6 rounded-xl border border-border">

      <h2 className="text-xl font-semibold mb-4">
        Novo Personagem
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* NOME */}
        <div>
          <label className="text-sm">Nome</label>
          {/* 
            🔍 Validação do nome do personagem

            - required: garante que o campo não fique vazio
            - validate:
                • transforma o nome em slug (id único e padronizado)
                • verifica se já existe um personagem com esse id
                • se existir → retorna mensagem de erro
                • se não existir → retorna true (validação passa)

            👉 Isso impede duplicidade mesmo com variações de acento, espaço ou maiúsculas
          */}
          <input
            {...register("name", {
              required: "Nome é obrigatório",
              validate: (value) => {
                const id = generateSlug(value);
                const exists = characterExists(id);

                return !exists || "Já existe um personagem com esse nome!";
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

        {/* UNIVERSO */}
        <div>
          <label className="text-sm">Universo</label>
          <input
            {...register("universe", { required: "Universo é obrigatório" })}
            className="w-full mt-1 p-2 rounded bg-surface border border-border"
          />
          {errors.universe && (
            <p className="text-xs text-red-500">
              {errors.universe.message}
            </p>
          )}
        </div>

        {/* IMAGEM */}
        <div>
          <label className="text-sm">Imagem (URL)</label>
          <input
            {...register("image", { required: "Imagem é obrigatória" })}
            className="w-full mt-1 p-2 rounded bg-surface border border-border"
          />
        </div>

        {/* BOTÕES */}
        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="bg-primary px-4 py-2 rounded text-white"
          >
            Criar
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

      {imageUrl && (
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt="Prévia"
            className="mt-2 h-56 object-contain border border-border rounded"
          />
        </div>
      )}
    </div>
  )
}
