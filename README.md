# PortifolioWithAngular
## Deploying to Netlify
To deploy this portfolio as a static site on Netlify:

1. Create a new site on Netlify and connect your Git repository.
2. Set the build command to:

   npm run build:netlify

3. Set the publish directory to:

   dist/portifolio_with_angular/browser

4. Add a `contact-endpoint` meta tag in `src/index.html` for server-side submissions (e.g., Formspree) or a `mailto:` value to open the visitor's mail client.

   - Formspree quick setup:
     1. Sign in to https://formspree.io and create a new form to get an endpoint like `https://formspree.io/f/<yourFormId>`.
     2. Add the meta tag to `src/index.html`:

        `<meta name="contact-endpoint" content="https://formspree.io/f/<yourFormId>">`

     3. Optionally set reply-to and other fields in your Formspree settings.

   - Mail client (fallback):

       `<meta name="contact-endpoint" content="mailto:you@example.com">`
Netlify will use the `_redirects` file (in `public/_redirects`) or `netlify.toml` to route all requests to `index.html` so client-side routing works correctly.

## Contact form configuration

The contact form supports an optional server-side submission endpoint (for example, Formspree). To enable direct submission, add a meta tag to `src/index.html`:

```html
<meta name="contact-endpoint" content="https://formspree.io/f/yourFormId">
```

If no endpoint is provided, the form falls back to opening the user's email client via `mailto:` and the "Copy Message" button copies the message to clipboard.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
