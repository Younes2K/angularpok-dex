# Pokédex

Application web Angular 18 connectée à la [PokéAPI](https://pokeapi.co) permettant de consulter, rechercher et sauvegarder des Pokémon en favoris.

---

## Lancer le projet

```bash
npm install
ng serve
```

Accès : `http://localhost:4200`

---

## Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| Angular | 18 | Framework principal |
| TypeScript | 5.5 | Typage strict |
| TailwindCSS | 3 | Styles utilitaires |
| RxJS | 7.8 | Gestion des flux asynchrones |
| PokéAPI | v2 | Source de données |

---

## Pourquoi ces choix

**Angular 18** — J'ai choisi Angular pour son architecture structurée (modules, services, guards, interceptors). Ça m'a permis de séparer clairement les responsabilités et de garder un code lisible et maintenable.

**Architecture feature-based** — J'ai organisé le projet par fonctionnalité avec du lazy loading sur chaque module. Chaque feature est indépendante, ce qui facilite la maintenance et les évolutions.

**TailwindCSS** — J'ai utilisé Tailwind pour éviter de gérer des fichiers SCSS séparés par composant. Tout le style est dans le template, c'est plus rapide à écrire et plus simple à lire.

**RxJS / Observables** — J'ai utilisé les Observables parce que c'est le standard Angular pour les appels HTTP. J'ai utilisé `switchMap` pour annuler les requêtes en doublon et `forkJoin` pour paralléliser les appels Pokémon + espèce.

**LocalStorage** — J'ai géré les favoris et le thème dark/light avec le LocalStorage, sans backend. C'est suffisant pour ce besoin et ça persiste entre les sessions.
