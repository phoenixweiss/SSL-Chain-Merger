# Changelog

All notable changes to SSL Chain Merger are documented in this file.

## 0.0.2 - 2026-07-31

### Security

- Document that domains and PEM content stay in the current browser tab and clarify the limits of format validation.
- Add a Content Security Policy and a no-referrer policy for the static application.
- Disable raw HTML in Markdown, production debug logging, autocomplete, and spellcheck for sensitive PEM fields.

### Changed

- Persist the selected color theme locally and expose accessible theme-switch labels in English and Russian.
- Normalize regional browser locales such as `ru-RU` and `en-US` to the supported `RU` and `EN` interface languages.
- Display the localized author name and GitHub handle in the footer.
