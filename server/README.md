# Backend des inscriptions

Le frontend et le backend restent dans ce depot. Vercel deploie le site Vite et la fonction `api/registrations.mjs` ensemble. Les donnees sont conservees dans PostgreSQL chez Neon, et non sur le disque temporaire de Vercel.

## Organisation

- `src/app/components/JoinCTA.tsx` : formulaire existant, sans changement de design.
- `src/app/utils/registration.ts` : appel HTTP et gestion des erreurs.
- `api/registrations.mjs` : point d'entree Vercel.
- `server/registration-handler.mjs` : validation HTTP et traitement.
- `server/database.mjs` : requetes PostgreSQL parametrees.
- `server/migrations/001-registrations.sql` : schema de la base.
- `server/vite-api.mjs` : meme API pendant `npm run dev`.

## Installation locale

Utiliser Node.js 22.

1. Installer les dependances avec `npm install`.
2. Creer une base Neon de developpement (ou une branche Neon distincte de la production).
3. Copier `.env.example` vers `.env.local`.
4. Remplacer `DATABASE_URL` par la chaine de connexion Neon.
5. Generer un secret avec la commande ci-dessous et le placer dans `RATE_LIMIT_SECRET`.
6. Executer `npm run db:migrate`, puis `npm run dev`.

```sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Le formulaire appelle `/api/registrations` sur le meme serveur Vite. Il faut une connexion Neon valide, meme en developpement : aucune inscription n'est simulee ni sauvegardee dans le navigateur.

Pour un autre port local, adapter `SITE_ORIGIN` a l'adresse exacte affichee par Vite.

## Deploiement Vercel

1. Importer ce depot dans Vercel avec le preset Vite.
2. Connecter une base Neon au projet.
3. Configurer les variables serveur `DATABASE_URL`, `RATE_LIMIT_SECRET` et `SITE_ORIGIN`.
4. Mettre le domaine public exact dans `SITE_ORIGIN`, par exemple `https://justcode-kl.de`. Plusieurs domaines peuvent etre separes par une virgule.
5. Creer le schema une fois pour la base cible : avec sa connexion dans un environnement local prive, executer `npm run db:migrate`. Cette commande est reutilisable et ne supprime aucune table.
6. Deployer le projet puis tester une inscription et verifier la ligne dans Neon.

Ne jamais nommer un secret `VITE_DATABASE_URL` ou `VITE_RATE_LIMIT_SECRET` : les variables VITE_ sont destinees au navigateur. Les fichiers .env locaux sont ignores par Git.

Utiliser une base/branche de test pour les deployments Preview. L'origine `https://VERCEL_URL` du deployment est autorisee automatiquement ; les domaines personnalises doivent figurer dans `SITE_ORIGIN`.

Le schema n'est pas cree automatiquement a chaque requete ni pendant le build. Une base non configuree ou un schema absent produit une erreur temporaire, jamais une fausse confirmation.

## Comportement du formulaire

`POST /api/registrations`, avec `Content-Type: application/json` :

```json
{
  "name": "Test Student",
  "email": "student@example.com",
  "major": "Computer Science",
  "semester": "3",
  "interests": "Web development and AI",
  "website": ""
}
```

`website` est le champ anti-robot et doit rester vide.

- `202 { "ok": true }` : demande recue, ou adresse deja presente.
- `400` : JSON ou champs invalides ; `fields` indique les champs a corriger.
- `403` : origine non autorisee.
- `405` : methode autre que POST.
- `413` : corps trop volumineux (16 Ko maximum).
- `415` : format autre que JSON.
- `429` : plus de cinq tentatives par adresse IP en quinze minutes ; voir `Retry-After`.
- `503` : configuration manquante ou base indisponible.

Les adresses e-mail sont normalisees en minuscules. Une demande existante n'est jamais ecrasee par un nouvel envoi. Les doublons recoivent la meme confirmation pour ne pas reveler les adresses deja inscrites. L'unicite est imposee par PostgreSQL, y compris lors d'envois simultanes.

Chaque inscription commence avec le statut `pending`. Cette version ne cree pas de compte utilisateur, ne verifie pas la propriete de l'adresse e-mail et n'envoie pas d'e-mail automatique. La confirmation signifie reception de la demande, pas admission dans l'association.

## Consulter les demandes

Seuls les responsables ayant acces a Neon peuvent consulter les donnees. Aucune route publique ne permet de les lister.

Dans l'editeur SQL prive de Neon :

```sql
SELECT id, name, email, major, semester, interests, status, created_at
FROM registrations
ORDER BY created_at DESC;
```

L'equipe peut traiter, corriger ou supprimer les demandes dans cette base. Definir les regles de conservation et les acces de l'equipe avant l'ouverture des inscriptions.

## Protection et exploitation

La limitation est atomique et stockee dans PostgreSQL pour rester effective entre les instances Vercel. Les compteurs utilisent un HMAC de l'adresse IP ; aucune IP brute n'est stockee par cette application. Les compteurs expires sont supprimes a la prochaine requete valide. Les journaux applicatifs n'incluent ni formulaire ni connexion a la base. Les journaux propres aux hebergeurs sont distincts.

Sur Vercel uniquement, le backend utilise le X-Forwarded-For fourni par la plateforme. En local, ce header est ignore au profit de l'adresse reseau directe. Si l'API est deployee ailleurs, il faut adapter explicitement la confiance dans le proxy.

## Verification

```sh
npm test
npm run build
```

Les tests couvrent le client HTTP, le parseur JSON brut, le format Vercel, les erreurs, les doublons, les injections, les limites de taille et la limitation d'envoi. Le stockage est remplace par un double de test : ils ne prouvent pas la connexion a votre base Neon. Cette connexion et la migration doivent etre verifiees avec votre configuration.

Documentation officielle : [Vite sur Vercel](https://vercel.com/docs/frameworks/frontend/vite), [pilote Neon](https://github.com/neondatabase/serverless), [headers Vercel](https://vercel.com/docs/headers/request-headers).

