// Source unique de vérité pour tous les projets.
// Chaque projet a une couverture (grille Work) + des blocs de contenu
// rendus par ProjectView. Types de blocs : 'video' | 'gallery'.

export const projects = [
  {
    slug: 'racines',
    title: 'Racines',
    year: 'In progress',
    medium: ['Installation', 'Photography', 'Performance'],
    cover: 'projets/soleil.jpg',
    summary:
      'A work in progress blending audiovisual installation, photographic series and performance. Through trees and nature, it explores relationships and boundaries — and the quiet absurdities of the world around them.',
    blocks: [
      { type: 'video', id: 'ZYdhJ1r0bA0', title: 'Feu' },
      {
        type: 'gallery',
        title: 'Feu',
        images: [
          'projets/racines/fog.png',
          'projets/racines/soleil.png',
          'projets/racines/fleurbleu.png',
          'projets/racines/fleurvert.png',
        ],
      },
      {
        type: 'gallery',
        title: 'La nuit les arbres dansent',
        images: [
          'projets/racines/danse.jpg',
          'projets/racines/arbreamoureux.jpg',
          'projets/racines/guirlande.jpg',
        ],
      },
    ],
  },
  {
    slug: 'title',
    title: 'Title Sequence',
    year: '2024',
    medium: ['Film', 'Editing'],
    credits: 'with Lilou Bernard',
    cover: 'projets/title.jpg',
    summary:
      'A title sequence for a fictional film imagined with Lilou Bernard. We wrote the script, then shot and edited the footage — playing with how to introduce each person who worked on the imaginary movie.',
    blocks: [{ type: 'video', id: '2EvVFT8J_Wo' }],
  },
  {
    slug: 'montage',
    title: 'Montage Photo',
    year: '2023',
    medium: ['Editing'],
    cover: 'projets/photo.jpg',
    summary:
      'An edit built from the photographs of James Marcus Haney, cut to put his work in the foreground.',
    blocks: [{ type: 'video', id: 'PutBx3KZS8A' }],
  },
  {
    slug: 'memoire',
    title: 'Mémoire',
    year: '2024',
    medium: ['Installation', 'Performance'],
    cover: 'projets/memoire.jpg',
    summary:
      "Two screens, two points of view, built from texts we wrote about a woman named Claude. One screen tells her real story; the other belongs to her granddaughter, who barely knew her and — after Claude's death — finds photographs and imagines the life behind them. Image and sound are edited live, so the piece becomes a conversation between the two women.",
    blocks: [
      { type: 'video', id: 'TBBH3pbmc2E' },
      {
        type: 'gallery',
        images: [
          'projets/memoire/mamie.jpg',
          'projets/memoire/poupees.jpg',
          'projets/memoire/famille.jpg',
        ],
      },
    ],
  },
  {
    slug: 'cyberpunk',
    title: 'Cyberpunk',
    year: '2023',
    medium: ['VJing', 'Video'],
    credits: 'with Aurélien Droissard',
    cover: 'projets/cyberpunk.jpg',
    summary:
      'A series of visuals made for VJing in a cyberpunk universe, created with Aurélien Droissard for a Paris-based French collective.',
    blocks: [
      { type: 'video', id: '8EPO_r9N8Y4' },
      {
        type: 'gallery',
        lightbox: true,
        images: [
          'projets/cyberpunk/cyberpunk1.png',
          'projets/cyberpunk/cyberpunk2.png',
          'projets/cyberpunk/cyberpunk3.png',
          'projets/cyberpunk/cyberpunk4.png',
          'projets/cyberpunk/cyberpunk5.png',
        ],
      },
    ],
  },
  {
    slug: 'jardin',
    title: 'Jardin',
    year: '2023',
    medium: ['Photography'],
    cover: 'projets/jardin.jpg',
    summary: 'A series of photographs taken in a small garden.',
    blocks: [
      {
        type: 'gallery',
        lightbox: true,
        images: [
          'projets/jardin/jardin1.jpg',
          'projets/jardin/jardin2.jpg',
          'projets/jardin/jardin3.jpg',
          'projets/jardin/jardin4.jpg',
          'projets/jardin/jardin5.jpg',
        ],
      },
    ],
  },
  {
    slug: 'mapping',
    title: 'Mapping',
    year: 'In progress',
    medium: ['TouchDesigner', 'VJing'],
    cover: 'projets/maping.jpg',
    summary:
      'A VJing session built in TouchDesigner — an ongoing effort to control everything by touch, without relying on Resolume.',
    blocks: [
      {
        type: 'gallery',
        lightbox: true,
        images: ['projets/mapping/nuage2.png', 'projets/mapping/cercle.png'],
      },
    ],
  },
  {
    slug: 'concert',
    title: 'Concert',
    year: '2023',
    medium: ['Photography'],
    cover: 'projets/concert.jpg',
    summary:
      'Photographs taken at night at La Station — Gare des Mines, for the collective radio Flouka and DLJL.',
    blocks: [
      {
        type: 'gallery',
        lightbox: true,
        images: [
          'projets/concert/concert1.jpeg',
          'projets/concert/concert9.jpeg',
          'projets/concert/concert3.jpeg',
          'projets/concert/concert4.jpeg',
          'projets/concert/concert8.jpeg',
          'projets/concert/concert6.jpeg',
          'projets/concert/concert7.jpeg',
          'projets/concert/concert5.jpg',
          'projets/concert/concert2.jpeg',
        ],
      },
    ],
  },
]

export const shorts = [
  { name: 'Pornstar', id: '2pu_CBBf94I' },
  { name: 'Profy', id: 'jdIs2dGggsw' },
  { name: 'Anomalie', id: 'tN8dYUZs_TI' },
]

export function getProject(slug) {
  return projects.find((p) => p.slug === slug)
}
