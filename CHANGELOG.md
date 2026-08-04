# Changelog

All notable changes to SSL Chain Merger are documented in this file.

## 0.0.4 - 2026-08-04

### Changed

- Allow one or more intermediate certificates in chain order and make the root certificate optional while preserving the existing root-inclusive workflow.
- Build merged fullchains in the explicit domain, intermediate, and optional root order.
- Remove the obsolete local `gh-pages` deployment path in favor of validated tag-based GitHub Actions releases.
- Document certificate-chain order and ZIP behavior in English and Russian.

### Tests

- Cover individual component downloads, the existing root-inclusive archives, and fullchains with multiple intermediates and no root certificate.

## 0.0.3 - 2026-07-31

### Added

- Add continuous integration with pinned Node.js and Yarn versions, frozen dependency installation, linting, formatting, release checks, and browser tests.
- Add tag-based GitHub Pages deployment with version, tag ancestry, and quality gates.
- Display the build version in the localized footer.

## 0.0.2 - 2026-07-31

### Security

- Document that domains and PEM content stay in the current browser tab and clarify the limits of format validation.
- Add a Content Security Policy and a no-referrer policy for the static application.
- Disable raw HTML in Markdown, production debug logging, autocomplete, and spellcheck for sensitive PEM fields.

### Changed

- Persist the selected color theme locally and expose accessible theme-switch labels in English and Russian.
- Normalize regional browser locales such as `ru-RU` and `en-US` to the supported `RU` and `EN` interface languages.
- Display the localized author name and GitHub handle in the footer.
