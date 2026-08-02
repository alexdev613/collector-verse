import type { FigurePhoto } from "../types/FigurePhoto";

const STORAGE_KEY = "figurePhotos"; // chave utilizada para persisitir as fotos das figures

export function getFigurePhotos(figureId?: string): FigurePhoto[] {
  const stored = localStorage.getItem(STORAGE_KEY); // tenta recuperar dados salvos no navegador

  if (!stored) return []; // se não houver nada salvo → retorna array vazio

  // converte o JSON armazenado em um array de FigurePhoto
  let parsed: FigurePhoto[] = [];

  try {
    parsed = JSON.parse(stored);
  } catch {
    parsed = [];
  }

  if (figureId) {
    return parsed.filter((photo) => photo.figureId === figureId);
  }

  return parsed;
}

// Salva uma nova foto ou atualiza uma foto existente.
export function saveFigurePhoto(photo: FigurePhoto) {
  const stored = localStorage.getItem(STORAGE_KEY);

  // try/catch para garantir que a função sempre retorne um array, mesmo que vazio (caso não haja um JSON válido)
  let parsed: FigurePhoto[] = [];

  try {
    parsed = stored ? JSON.parse(stored) : [];
  } catch {
    parsed = [];
  }

  // Procura uma foto pelo id do array.
  const index = parsed.findIndex((p) => p.id === photo.id);

  if (index >= 0) {
    // Edição, se a foto existe (substitui valores antigos pelos novos)
    parsed[index] = photo;
  } else {
    // Criação, nova foto
    parsed.push(photo);
  }

  // Salva o array atualizado no localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
}

// getFigurePhotoById, para pegar uma foto específica pelo id
export function getFigurePhotoById(id: string): FigurePhoto | null {
  const photos = getFigurePhotos();

  return photos.find((photo) => photo.id === id) ?? null;
}

// deleteFigurePhoto
export function deleteFigurePhoto(id: string) {
  const stored = localStorage.getItem(STORAGE_KEY);

  let parsed: FigurePhoto[] = [];

  try {
    parsed = stored ? JSON.parse(stored) : [];
  } catch {
    parsed = [];
  }

  // Remove a foto pelo id
  const filtered = parsed.filter((photo) => photo.id !== id);

  // Salva a lista atualizada no localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));

}

// Marca uma foto como principal para uma determinada figure.
export function setPrimaryPhoto(
  figureId: string,
  photoId: string
) {
  // Recupera todas as fotos persistidas no localStorage
  const stored = localStorage.getItem(STORAGE_KEY);

  // Garante um array válido, mesmo que não existam dados salvos
  let parsed: FigurePhoto[] = []; // parsed é o array de FigurePhoto ou um array vazio

  // Converte o JSON armazenado em um array de FigurePhoto
  try {
    parsed = stored ? JSON.parse(stored) : [];
  } catch {
    // Em caso de erro na leitura do JSON, utiliza um array vazio
    parsed = [];
  }

  // Itera/Percorre todas as fotos para garantir que apenas
  // uma delas seja marcada como principal para esta figure
  parsed.forEach((photo) => {

    // Ignora fotos que pertencem a outras figures
    if (photo.figureId !== figureId) return;

    // A foto selecionada recebe true e as demais recebem false
    photo.isPrimary = photo.id === photoId;
  });

  // Persiste/salva as alterações no localStorage
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(parsed)
  );
}

// Retorna a quantidade de fotos cadastradas para uma figure
export function getFigurePhotoCount(
  figureId: string
): number {
  return getFigurePhotos(figureId).length;
}
