# Changelog

All notable changes to SSL Chain Merger are documented in this file.

## 0.0.6 - 2026-10-14

### Changed

- Accept PKCS#8, encrypted PKCS#8, and EC private key wrappers alongside existing RSA keys, and support the legacy CSR request label.
- Accept LF and CRLF line endings, surrounding whitespace, and a final newline while rejecting mismatched, nested, empty, and incomplete PEM blocks.
- Document supported PEM wrappers and line-ending behavior in English and Russian while preserving existing download filenames and fullchain ordering.

### Tests

- Add unit coverage for supported PEM wrappers and invalid boundaries.
- Cover new key and CSR downloads in individual files and both ZIP modes alongside the existing download, privacy, localization, and routing scenarios.

## 0.0.5 - 2026-08-13

### Added

- Add an English and Russian plain-language guide to certificates, keys, CSRs, chains, common certificate types, and file formats.
- Add an automatic heading-based contents column with nested levels, active-section highlighting, direct section links, and a collapsible mobile layout.

### Fixed

- Reload localized Markdown reliably when the interface language changes.
- Keep the desktop contents column permanently expanded and remove unnecessary overflow on short pages.

### Tests

- Cover the guide route, localized contents, heading levels, section links, desktop placement, and mobile behavior.

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
