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