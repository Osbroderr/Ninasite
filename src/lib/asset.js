// Préfixe les chemins du dossier /public avec la base de déploiement,
// pour que les images marchent à la racine comme dans un sous-dossier.
export function asset(path = '') {
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/$/, '') + '/' + String(path).replace(/^\//, '')
}
