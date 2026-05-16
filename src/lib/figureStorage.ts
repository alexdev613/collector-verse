import type { Figure } from "../types/Figure";
import { figures as mockFigures } from "../data/figures";

const STORAGE_KEY = "figures";

export function getFigures(): Figure[] {
  const stored = localStorage.getItem(STORAGE_KEY); // tenta recuperar dados salvos no navegador

  if (!stored) return mockFigures; // se não houver nada salvo → usa apenas mock

  // transforma string JSON em array de objetos
  let parsed: Figure[] = [];

  try {
    parsed = JSON.parse(stored);
  } catch {
    parsed = [];
  }

  // começa com os personagens mockados
  const merged = [...mockFigures];

  /**
   * 🔥 Merge de dados:
   * Para cada figura salva:
   * - se não existir → adiciona (nova criada pelo usuário)
   * - se existir → sobrescreve (edição do usuário)
   */
  parsed.forEach((storedFigure) => {
    const exists = merged.find((f) => f.id === storedFigure.id);

    if (!exists) {
      merged.push(storedFigure); // figura nova
    } else {
      Object.assign(exists, storedFigure); // figura editada → storage ganha do mock
    }
  });

  return merged;
}