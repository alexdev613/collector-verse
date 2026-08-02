export type FigurePhoto = {
  id: string;

  // Figure dona da foto
  figureId: string;

  // imagem
  url: string;

  // legenda opcional
  caption?: string | null;

  // foto principal da figure
  isPrimary?: boolean; // Ver se faz sentido em deixar de capa

  // quando foi adicionado
  createdAt: string;
}
