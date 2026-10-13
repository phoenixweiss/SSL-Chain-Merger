# About

**SSL Chain Merger** is a browser-based tool for packaging PEM-encoded certificate components into individual `crt`, `csr`, and `key` files or a downloadable ZIP archive. Paste the required text into the matching fields and download the files for your server configuration.

## Privacy and validation limits

The domain name, certificates, CSR, and private key remain in memory in the current browser tab. They are not uploaded, logged, or saved by the application. The app includes no analytics, telemetry, or crash reporting; only the selected language and theme preferences are stored locally.

The current validation checks the expected PEM boundary markers and basic domain-name syntax. It does not parse or cryptographically verify certificates, establish chain trust, or confirm that a private key and CSR match the domain certificate. Review generated files with appropriate certificate tooling before using them in production.

## Supported PEM formats

Certificate fields accept `CERTIFICATE` blocks. Private keys accept `RSA PRIVATE KEY`, `PRIVATE KEY` (PKCS#8), `ENCRYPTED PRIVATE KEY`, and `EC PRIVATE KEY`; CSR accepts `CERTIFICATE REQUEST` and `NEW CERTIFICATE REQUEST`. LF and CRLF line endings, surrounding whitespace, and a final newline are accepted. BEGIN and END labels must match; only the intermediate field accepts multiple blocks.

Encrypted keys are packaged unchanged, without decryption or a password prompt. Validation checks the wrappers, not Base64/DER content. Browsers normalize textarea line endings to LF; individual files and separate ZIP entries preserve the resulting form content. Merged fullchain retains the existing contract: trim each certificate field, join them with LF, and append a final LF.

## Certificate chain order

The merged fullchain contains the domain certificate first, followed by one or more intermediate certificates in the order entered. The intermediate field accepts multiple complete PEM certificate blocks. A root certificate remains supported for compatibility and is appended when provided, but it is optional because most server configurations omit the root from the served chain.

The separate-file ZIP mode keeps the existing filenames. If several intermediate certificates are entered, they are stored together in the `intermediate.crt` file in the same order.
