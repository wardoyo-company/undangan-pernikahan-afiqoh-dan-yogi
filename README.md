# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Deploy to GitHub Pages

The GitHub Actions workflow builds this TanStack Start app as a static site and
deploys it to GitHub Pages whenever changes are pushed to `main`. It also
supports manual runs from the Actions tab.

1. Push the project to a GitHub repository.
2. In the repository settings, add these Actions secrets under **Settings →
   Secrets and variables → Actions**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Under **Settings → Pages**, select **GitHub Actions** as the build and
   deployment source.
4. Push to `main` or run **Deploy to GitHub Pages** from the Actions tab.

The workflow detects the Pages base path automatically, including project-site
URLs such as `https://owner.github.io/repository/`. For a different default
branch, update the branch filter in `.github/workflows/deploy-pages.yml`.

The Supabase URL and publishable key are included in the public client bundle;
they are not service-role secrets. Keep database access protected with the
appropriate Supabase row-level security policies.

To test the production build locally, run `npm run build`; the static site is
written to `dist/client`.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
