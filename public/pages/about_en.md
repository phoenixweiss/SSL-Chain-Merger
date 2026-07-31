# About

**SSL Chain Merger** is a browser-based tool for packaging PEM-encoded certificate components into individual `crt`, `csr`, and `key` files or a downloadable ZIP archive. Paste the required text into the matching fields and download the files for your server configuration.

## Privacy and validation limits

The domain name, certificates, CSR, and private key remain in memory in the current browser tab. They are not uploaded, logged, or saved by the application. The app includes no analytics, telemetry, or crash reporting; only the selected language and theme preferences are stored locally.

The current validation checks the expected PEM boundary markers and basic domain-name syntax. It does not parse or cryptographically verify certificates, establish chain trust, or confirm that a private key and CSR match the domain certificate. Review generated files with appropriate certificate tooling before using them in production.
