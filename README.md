# Forever Young Beauty Clinic — React Demo

Responsive React/TypeScript MVP configured specifically for GitHub Pages at:

`https://rokasauras.github.io/fybc-demo/`

## Demo routes

The project includes a GitHub Pages SPA fallback so clean React routes continue to work on refresh:

- Public website: `/fybc-demo/`
- Customer account demo: `/fybc-demo/account`
- Owner dashboard demo: `/fybc-demo/dashboard`

## Deploy through GitHub Pages

1. Upload the contents of this project to the root of the `rokasauras/fybc-demo` repository.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push/commit to `main`.
5. Open the **Actions** tab and wait for **Deploy FYBC demo to GitHub Pages** to finish.
6. Visit `https://rokasauras.github.io/fybc-demo/`.

Every future push to `main` automatically rebuilds and republishes the demo.

## Local development

```bash
npm install
npm run dev
```

Because this build is configured for the `fybc-demo` repository path, Vite may show the app under `/fybc-demo/` locally.

## Production build

```bash
npm run build
```

The production files are generated in `dist/`.

## Images

Real demo images live in `public/images/` and include the Forever Young treatment photo, Banana Beauty Lab storefront and Guinot consultation image.

## Important

The dashboard and customer account currently contain demo data only. Do not place real customer information, credentials or AWS secrets in this public GitHub Pages repository. Authentication and private customer data should be added later through the AWS backend/Cognito deployment.
