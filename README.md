# Nina Gaillard — Portfolio

Site vitrine de Nina Gaillard (artiste numérique & VJ).
Reconstruit en **Vue 3 + Vite**. Rapide, responsive, sans back-end.

## Lancer en local

```bash
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:5173

## Construire pour la production

```bash
npm run build      # génère le dossier /dist
npm run preview    # prévisualise le build
```

Le dossier `dist/` est un site statique : il s'héberge tel quel sur
Vercel, Netlify, GitHub Pages, un simple serveur web, etc.

### Déployer dans un sous-dossier (ex. GitHub Pages)

Le routing utilise des URLs en `#` (hash), donc aucune config serveur n'est
nécessaire. Si le site est servi depuis un sous-dossier
(`https://user.github.io/mon-repo/`), construire avec :

```bash
BASE_URL=/mon-repo/ npm run build
```

À la racine d'un domaine (`https://ninagaillard.com`), rien à changer.

## Modifier le contenu

Tout le contenu des projets vit dans **un seul fichier** :
`src/lib/projects.js`.

Chaque projet est un objet :

```js
{
  slug: 'mon-projet',                 // URL : /#/work/mon-projet
  title: 'Mon projet',
  year: '2025',
  medium: ['Installation', 'Video'],  // tags
  credits: 'with Quelqu’un',          // optionnel
  cover: 'projets/cover.jpg',         // image de la grille Work
  summary: 'Description…',
  blocks: [
    { type: 'video', id: 'YOUTUBE_ID', title: 'Titre optionnel' },
    { type: 'gallery', title: 'Titre optionnel', lightbox: true,
      images: ['projets/img1.jpg', 'projets/img2.jpg'] },
  ],
}
```

- `lightbox: true` → les images s'ouvrent en plein écran (clavier + swipe).
- Les images se déposent dans `public/` (chemins relatifs à ce dossier).
- Les **Shorts** se modifient dans le tableau `shorts` du même fichier.

## Structure

```
public/            images, PDF (CV), police, favicon
src/
  styles/base.css  système de design (couleurs, typo, animations)
  lib/projects.js  source unique de vérité du contenu
  lib/asset.js     helper de chemins (compatible sous-dossier)
  components/      SiteNav, SiteFooter, Lightbox
  views/           Home, Work, Project, Shorts, About, NotFound
  router.js
  App.vue          layout global + transitions + scroll-reveal
```

## Notes

- La vidéo du hero est hébergée en externe (archive.org). Pour la rendre
  autonome, déposer un `.mp4` dans `public/` et remplacer l'URL `<source>`
  dans `src/views/HomeView.vue` par `:src="asset('ma-video.mp4')"`.
- Polices : Gloucester (titres, fournie dans `public/font/`) +
  Space Grotesk / Space Mono (chargées depuis Google Fonts dans `index.html`).
- Animations désactivées automatiquement si l'utilisateur a activé
  « réduire les animations » dans son système.
```
