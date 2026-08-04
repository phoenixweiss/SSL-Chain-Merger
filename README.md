# SSL Chain Merger

**SSL Chain Merger** is a browser-based tool for packaging PEM-encoded certificate components into individual `crt`, `csr`, and `key` files or a downloadable ZIP archive. Paste the required text into the matching fields and download the files for your server configuration.

[Try online](https://phoenixweiss.github.io/SSL-Chain-Merger/)

---

## Privacy and Validation Limits

The domain name, certificates, CSR, and private key remain in memory in the current browser tab. They are not uploaded, logged, or saved by the application. The app includes no analytics, telemetry, or crash reporting; only the selected language and theme preferences are stored locally.

The current validation checks the expected PEM boundary markers and basic domain-name syntax. It does not parse or cryptographically verify certificates, establish chain trust, or confirm that a private key and CSR match the domain certificate. Review generated files with appropriate certificate tooling before using them in production.

## Certificate Chain Order

The merged fullchain contains the domain certificate first, followed by one or
more intermediate certificates in the order entered. The intermediate field
accepts multiple complete PEM certificate blocks. A root certificate remains
supported for compatibility and is appended when provided, but it is optional
because most server configurations omit the root from the served chain.

The separate-file ZIP mode keeps the existing filenames. If several
intermediate certificates are entered, they are stored together in the
`intermediate.crt` file in the same order.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

### Prerequisites

- [Node.js](https://nodejs.org/) `~> 22.12.0`
- [Yarn](https://yarnpkg.com/) `~> 1.22.22`

### Clone the repo

```sh
git clone git@github.com:phoenixweiss/SSL-Chain-Merger.git
cd SSL-Chain-Merger
```

### Install the dependencies

```sh
yarn install
```

### Keep project up-to-date

```sh
yarn upgrade-interactive
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Compile and Minify for Production

```sh
yarn build
```

### Preview the Production

```sh
yarn preview
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

### Format with [Prettier](https://prettier.io/)

```sh
yarn format
```

### Publish to [GitHub Pages](https://pages.github.com/)

GitHub Actions publishes the production build from validated semantic version
tags (`vMAJOR.MINOR.PATCH`). Local deployment is intentionally unavailable.

### List project structure using `tree`

```sh
tree -I 'node_modules|dist'
```

## Technologies Used

- **Vue 3** - The core framework for building the user interface.
- **Pinia** - For state management.
- **Vite** - For fast development and build process.
- **sass** - Version 1.93.3 - CSS preprocessor for styling.
- **@picocss/pico** - Version 2.1.1 - Minimal CSS framework for semantic HTML.
- **i18next** - Internationalization framework.
- **jszip** - Library for creating, reading and editing .zip files.

## Future Plans

- Refactoring and updates.
- Implement offline support with Electron.

## Contribution

Feel free to contribute by submitting issues or pull requests. Any feedback and suggestions are welcome.

## Author

Created and maintained by [Pavel Tkachev (@phoenixweiss)](https://github.com/phoenixweiss).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
