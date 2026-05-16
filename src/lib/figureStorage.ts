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

// saveFigure
export function saveFigure(figure: Figure) {
  const stored = localStorage.getItem(STORAGE_KEY);

  // try/catch para garantir que a função sempre retorne um array, mesmo que vazio (caso não haja um JSON válido)
  let parsed: Figure[] = [];

  try {
    parsed = stored ? JSON.parse(stored) : [];
  } catch {
    parsed = [];
  }

  // Procura uma figure pelo id no array.
  const index = parsed.findIndex((fig) => fig.id === figure.id)

  if (index >= 0) {
    // Edição, se figure existe (substitui valores antigos pelos novos)
    parsed[index] = figure;
  } else {
    // Criação, se não existe esta figure, adiciona esta nova figure
    parsed.push(figure);
  }
  // 💾 salva no localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
}

// lookup p/verificar se figure existe(evita duplicidade), helper de validação, boolean.
export function figureExists(id: string): boolean {
  const figures = getFigures(); // mock + localStorage, pega lista atualizada

  return figures.some((fig) => fig.id === id); // some retorna true se existir figure com esse id
}

// getFigureById, como o nome diz, pegar figure pelo ID
export function getFigureById(id: string): Figure | null {
  const figures = getFigures();

  return figures.find((fig) => fig.id === id) ?? null;
}

/** 🗑 Remove uma figure do localStorage pelo id

    - Não remove dos mocks originais, apenas dos dados persistidos do usuário.
*/
export function deleteFigure(id: string) {
  const stored = localStorage.getItem(STORAGE_KEY);

  let parsed: Figure[] = [];

  try {
    parsed = stored ? JSON.parse(stored) : [];
  } catch {
    parsed = [];
  }

  // remove a figure pelo id
  const filtered = parsed.filter((fig) => fig.id !== id);

  // salva lista atualizada
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
