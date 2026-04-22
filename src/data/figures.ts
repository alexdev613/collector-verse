// Mock das figuras:
export const figuresByCharacter = {
  wolverine: [
    {
      id: "wolverine-xforce",

      name: "Wolverine X-Force", // Nome comercial do produto

      brand: "Hasbro", // brand/manufacturer: Hasbro, Medicon, Bandai (brand = marca), (manufacturer = fabricante)
      line: "Marvel Legends", // Marvel Legends, Mafex, SH Figuarts, Bootleg
      wave: "X-Force Wave", // Coleção

      universe: "Marvel", // Marvel, DC, Star Wars, MOTU
      characterId: "wolverine", // Wolverine, Batman

      variant: "Yellow Suit", // Versão visual/temática do personagem

      releaseYear: 2019, // Ano de lançamento

      scale: "1/12", // 1/12, 1/10, 1/6

      pack: { // Não obrigatório, o usuário pode não saber, ter comprado avulso ou não ter mais o item, mas querer ele no sistema por cadastro
        type: "2-pack",
        name: "Wolverine vs Sabretooth",
        includes: [
          { figureId: "wolverine-80years", characterId: "wolverine" },
          { figureId: "sabretooth-80years", characterId: "sabretooth" }
        ]
      },

      image: "https://i.imgur.com/nMWk4IL.jpeg",
      inCollection: true // o usuário teve, vendeu, ainda tem ou quer recomprar
    },
    {
      id: "wolverine-xmen97-logan",

      name: "Logan (X-Men '97 Civilian)",

      brand: "Hasbro",
      line: "Marvel Legends",
      wave: "X-Men '97 Wave",

      universe: "Marvel",
      characterId: "wolverine",

      variant: "Civilian Logan",

      releaseYear: 2024,
      scale: "1/12",

      // 👇 sem pack (simplesmente não existe o campo)

      image: null,
      inCollection: true
    },
    {
      id: "wolverine-mafex",
      name: "Wolverine (MAFEX)",
      brand: "Medicom",
      line: "MAFEX",
      universe: "Marvel",
      characterId: "wolverine",
      variant: "Comic Version",
      releaseYear: null,
      scale: "1/12",
      image: null,
      inCollection: true
    }
  ],
  psylocke: [
    {
      id: "psylocke-xforce-3pack",

      name: "Psylocke X-Force (3-Pack)",

      brand: "Hasbro",
      line: "Marvel Legends",
      wave: "X-Men 3-Pack Wave",

      universe: "Marvel",
      characterId: "psylocke",

      variant: "X-Force Ninja",

      releaseYear: 2018,
      scale: "1/12",

      pack: {
        id: "psylocke-gambit-banshee-pack", // permite no futuro página do pack, filtro por pack, link compatilhado
        type: "3-pack",
        name: "Psylocke, Gambit & Banshee",
        includes: [
          { figureId: "psylocke-xforce-3pack", characterId: "psylocke" },
          { figureId: "gambit-3pack", characterId: "gambit" },
          { figureId: "banshee-3pack", characterId: "banshee" }
        ]
      },

      image: null,
      inCollection: true
    },
    {
      id: "psylocke-mafex",

      name: "Psylocke (Comic Version)",

      brand: "Medicom",
      line: "MAFEX",
      wave: "Comic Series",

      universe: "Marvel",
      characterId: "psylocke",

      variant: "Classic Comic",

      releaseYear: 2022,
      scale: "1/12",

      image: null,
      inCollection: true
    },
    {
      id: "psylocke-gameverse",

      name: "Psylocke (Gameverse)",

      brand: "Hasbro",
      line: "Marvel Legends",
      wave: "Gamerverse Wave",

      universe: "Marvel",
      characterId: "psylocke",

      variant: "Gameverse",

      releaseYear: 2025,
      scale: "1/12",

      pack: {
        id: "psylocke-thanos-gameverse-pack",
        type: "2-pack",
        name: "Psylocke vs Thanos (Gameverse)",
        includes: [
          { figureId: "psylocke-gameverse", characterId: "psylocke" },
          { figureId: "thanos-gameverse", characterId: "thanos" }
        ]
      },

      image: null,
      inCollection: true
    }
  ],

  thanos: [
    {
      id: "thanos-gameverse",

      name: "Thanos (Gameverse)",

      brand: "Hasbro",
      line: "Marvel Legends",
      wave: "Gamerverse Wave",

      universe: "Marvel",
      characterId: "thanos",

      variant: "Gameverse",

      releaseYear: 2025,
      scale: "1/12",

      pack: {
        id: "psylocke-thanos-gameverse-pack",
        type: "2-pack",
        name: "Psylocke vs Thanos (Gameverse)",
        includes: [
          { figureId: "psylocke-gameverse", characterId: "psylocke" },
          { figureId: "thanos-gameverse", characterId: "thanos" }
        ]
      },

      image: null,
      inCollection: false // 👈 PERFEITO PRO CASO DE TER VENDIDO AVULSO!
    },
    {
      id: "thanos-classic",

      name: "Thanos (Classic Comic) - Marvel Legends",

      brand: "Hasbro",
      line: "Marvel Legends",
      wave: "Infinity Saga Wave",

      universe: "Marvel",
      characterId: "thanos",

      variant: "Classic Comic",

      releaseYear: 2020,
      scale: "1/12",

      image: null,
      inCollection: true
    }
  ],

  hulk: [
    {
      id: "hulk-classic",
      name: "Hulk (Classic)",
      brand: "Hasbro",
      line: "Marvel Legends",
      universe: "Marvel",
      characterId: "hulk",
      variant: "Classic",
      releaseYear: null,
      scale: "1/12",
      image: null,
      inCollection: true
    },
    {
      id: "hulk-deluxe",
      name: "Hulk Deluxe",
      brand: "Hasbro",
      line: "Marvel Legends",
      wave: null,

      universe: "Marvel",
      characterId: "hulk",

      variant: null,

      releaseYear: 2025,
      scale: "1/12",

      image: null,
      inCollection: false
    },
  ],
}