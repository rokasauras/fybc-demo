# GitHub Pages setup for `rokasauras/fybc-demo`

This project is already configured for the repository name **fybc-demo**.

## Upload

Upload **the contents of this folder to the root of the repository**, so `package.json`, `src`, `public`, `.github` and `vite.config.ts` are at the top level of the repo.

The easiest/reliable route is from Terminal after extracting the ZIP:

```bash
cd fybc-demo-github-pages
git init
git branch -M main
git remote add origin https://github.com/rokasauras/fybc-demo.git
git add .
git commit -m "Add Forever Young React demo"
git push -u origin main
```

If the repository already has a Git history, clone it first and copy these project files into the cloned folder instead.

## Turn on Pages

In the GitHub repository:

1. Open **Settings**.
2. Open **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Open **Actions** and wait for **Deploy FYBC demo to GitHub Pages** to finish.

The site should then be available at:

`https://rokasauras.github.io/fybc-demo/`

Dashboard demo:

`https://rokasauras.github.io/fybc-demo/dashboard`

Customer account demo:

`https://rokasauras.github.io/fybc-demo/account`

The included GitHub Pages fallback keeps those routes working if you refresh them directly.

## Important

This GitHub Pages build is a public demo. Do not upload real customer data, passwords, API keys or AWS secrets to this repository.
