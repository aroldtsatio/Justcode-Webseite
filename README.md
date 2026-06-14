
# JUSTCODE-KL Website

Official website of **JUSTCODE-KL**, a Computer Science Student Association (Hochschulgruppe) at RPTU Kaiserslautern.

Built with:

- React
- TypeScript
- Vite
- CSS
- React Router

---

## Prerequisites

Make sure the following tools are installed:

- Node.js
- npm
- Git

Check your installations:

```bash
node -v
npm -v
git --version
```
---

## Clone the Repository

```bash
git clone https://gitlab.rhrk.uni-kl.de/justcode-kl/justcode-website.git
cd justcode-website
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

The production files will be generated in:

```text
dist/
```

---

## Preview Production Build

```bash
npm run preview
```

---


## Useful Commands

Create a new React + TypeScript project with Vite:

```bash
npm create vite@latest justcode-website -- --template react-ts
cd justcode-website
npm install
npm run dev
```

Install React Router:

```bash
npm install react-router-dom
```

Install i18next for German / English localization:

```bash
npm install i18next react-i18next
```

Install Lucide icons:

```bash
npm install lucide-react
```

Install Framer Motion:

```bash
npm install framer-motion
```

---

## NPM Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

---

## Git Workflow

Never work directly on the `main` branch.

Create a feature branch:

```bash
git checkout -b feature/home-page
```

Stage changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "Add home page"
```

Push the branch:

```bash
git push origin feature/home-page
```

Then open a Pull Request on GitHub.

---

## Collaboration Rules

- Do not push directly to `main`.
- Always create a feature branch.
- Always submit a Pull Request.
- At least one team member should review code before merging.
- Keep components reusable and maintainable.
- Use meaningful file and folder names.
- Test on desktop and mobile before requesting review.

---

## Deployment

Recommended platforms: Vercel

- Vercel

Build before deployment:

```bash
npm run build
```

---

## Project Goals

The website should showcase:

- JUSTCODE-KL vision and mission
- Activities and workshops
- Student projects
- Team members
- Learning resources
- Events and talks
- Career opportunities
- Membership application form

---

## License

Developed and maintained by the members of JUSTCODE-KL.

© JUSTCODE-KL. All rights reserved.

  