export type Figure = {
  id: string
  name: string

  brand: string
  line: string
  wave?: string | null

  universe: string
  characterId: string

  variant?: string | null

  releaseYear?: number | null
  scale?: string

  // SKU / código da fabricante // No futuro quem sabe podemos pesquisar SKU futuramente para buscar infos e até fazer preenchimento automático de alguns campos, mas por enquanto não é necessário
  sku?: string | null;

  pack?: {
    id: string
    type: string
    name: string
    includes: {
      figureId: string
      characterId: string
    }[]
  }

  image?: string | null
  inCollection: boolean
}