export type Character = {
  id: string
  name: string
  universe: string
  image: string
}

/**
 * Optamos por usar `type` ao invés de `interface` neste projeto
 * por ser mais flexível e moderno no ecossistema TypeScript.
 *
 * `type` permite composições mais avançadas (como unions, intersections
 * e tipos derivados), o que será útil à medida que o projeto crescer
 * (ex: diferentes tipos de coleções como personagens, livros, etc).
 *
 * Embora `interface` seja ótima para contratos e herança,
 * `type` oferece mais liberdade e é amplamente adotado em aplicações React modernas.
 */
