// lib = camada de lógica de dados (storage, helpers, regras)
import type { Character } from "../types/Character";
import { characters as mockCharacters } from "../data/characters"; // ⚠️ ideal no futuro: mover isso para src/data/characters

// chave usada no localStorage
const STORAGE_KEY = "characters";

/**
 * 🔥 Fonte única de verdade dos personagens
 *
 * Junta:
 * - personagens mockados (default)
 * - personagens criados/editados pelo usuário (localStorage)
 *
 * A UI não precisa saber de onde vem — só consome essa função.
 */
export function getCharacters(): Character[] {

  // tenta recuperar dados salvos no navegador
  const stored = localStorage.getItem(STORAGE_KEY);

  // se não houver nada salvo → usa apenas mock
  if (!stored) return mockCharacters;

  // transforma string JSON em array de objetos
  const parsed: Character[] = JSON.parse(stored);

  // começa com os personagens mockados
  const merged = [...mockCharacters];

  /**
   * 🔥 Merge de dados:
   *
   * Para cada personagem salvo:
   * - se não existir → adiciona (novo criado pelo usuário)
   * - se existir → sobrescreve (edição do usuário)
   */
  parsed.forEach((storedChar) => {

    const exists = merged.find((c) => c.id === storedChar.id);

    if (!exists) {
      // personagem novo
      merged.push(storedChar);
    } else {
      // personagem editado → storage ganha do mock
      Object.assign(exists, storedChar);
    }

  });

  return merged;
}

// saveCharacter que lida com criação e edição, sem risco de criar personagens duplicados (com o mesmo id):
export function saveCharacter(character: Character) {
  // tenta pegar os dados já salvos no navegador
  const stored = localStorage.getItem(STORAGE_KEY);
  
  // Se existir algo salvo, vem como string JSON, que precisa converter para array de objetos, se não existir, começa com array vazio
  // const parsed: Character[] = stored ? JSON.parse(stored) : [];
  // Porém se o localStorage tiver algo corrompido que não seja um JSON válido, isso vai quebrar a aplicação.

  // Então é melhor usar um try/catch pra evitar que isso aconteça e garantir que a função sempre retorne um array, mesmo que vazio:
  let parsed: Character[] = [];

  try {
    parsed = stored ? JSON.parse(stored) : [];
  } catch {
    parsed = [];
  }

  // 🔍 Procura personagem pelo id no array. JS findIndex: retorna o índice (posição no array) ou -1 se não encontrar...
  const index = parsed.findIndex((c) => c.id === character.id); // Diz em qual posição do array está o personagem com esse id

  if (index >= 0) {
    // ✏️ UPDATE (edição) personagem existe -> (substitui o personagem antigo pelo novo)
    parsed[index] = character;
  } else {
    // ➕ CREATE (criação): se não existe, adiciona novo personagem.
    parsed.push(character);
  }

  // 💾 salva no localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
}

// Helper de verificação de existência de personagem duplicados:
export function characterExists(id: string): boolean {
  // Usa a fonte de verdade (mock + localStorage), pegando lista atualizada de personagens!
  const characters = getCharacters();

  // some retorna true se enctrar algum personagem com esse id, ou false se não encontrar.
  return characters.some((c) => c.id === id);
}

export function getCharacterById(id: string): Character | null {
  const characters = getCharacters();

  return characters.find((c) => c.id === id) ?? null;
}
