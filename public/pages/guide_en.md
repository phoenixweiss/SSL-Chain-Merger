# SSL certificates in plain language

This page explains what the files in SSL Chain Merger mean. You do not need to understand cryptography to use the app, but knowing the role of each part helps you avoid common mistakes.

## What an SSL certificate does

When you open an HTTPS website, the browser needs answers to two questions:

1. Is this really the website I wanted to open?
2. Can we exchange data so that outsiders cannot read or quietly change it?

A TLS certificate helps the browser answer those questions. People still often call it an **SSL certificate**, although modern websites use the newer TLS protocol.

Think of the certificate as a public website ID. It names the domain, contains a public key, states who issued it, and has a validity period. The certificate is not secret: a web server sends it to every visitor.

## The main parts

### Domain certificate

This is the certificate issued for your website. It is also called a **leaf** or **server** certificate. It normally contains:

- one or more domain names;
- a public key;
- the issuer and validity dates;
- the issuer's digital signature.

### Private key

The private key is the secret half of the key pair. The public half is included in the certificate.

The server uses the private key to prove that it has the secret key matching the certificate. **Never publish, email, log, or commit a production private key.** If it is exposed, replace the certificate and key.

SSL Chain Merger processes a pasted key only in the current browser tab, but you should still use the official trusted copy of the site.

### CSR

CSR means **Certificate Signing Request**. It is a request used when obtaining a certificate. A CSR contains the public key and requested names and is signed with the private key.

A CSR is not a certificate and cannot be installed instead of one. After issuing the certificate, the CSR is usually not required by the web server.

### Intermediate certificate

An intermediate certificate connects your website certificate to a trusted root. Certificate authorities use intermediates so their most valuable root keys do not have to sign every website certificate directly.

There may be one intermediate or several. They must be placed in chain order, starting with the one that issued the domain certificate.

### Root certificate

A root certificate is the top of the trust chain. Trusted roots are normally already installed in browsers and operating systems.

For this reason, a server usually sends the domain certificate and intermediates, but not the root. SSL Chain Merger keeps the root field optional for compatibility with systems that need it in an exported file.

## What the certificate chain looks like

The usual chain is:

```text
domain certificate
→ intermediate certificate
→ another intermediate, if needed
→ trusted root certificate
```

The server normally sends only:

```text
domain certificate
→ intermediate certificate(s)
```

The browser already has the trusted root and uses it to check where the chain ends.

## Common certificate types

Certificates can be described in several different ways.

### By their role

- **Domain / leaf / server certificate** — belongs to a particular website.
- **Intermediate certificate** — links a website certificate to a root.
- **Root certificate** — the trusted starting point stored on a device.
- **Client certificate** — identifies a person or device to a service. This app is designed for server certificate files, not client authentication bundles.

### By domain coverage

- **Single-domain** — covers one exact domain.
- **SAN or multi-domain** — covers several names in one certificate.
- **Wildcard** — replaces exactly one left-most domain label. For example, `*.example.com` covers `www.example.com` and `api.example.com`, but not `example.com` or `dev.api.example.com`. A deeper level needs a separate name in the certificate, such as `*.api.example.com`.

### By identity check

- **DV** — the issuer checks control of the domain.
- **OV** — the issuer also checks organization details.
- **EV** — the issuer performs a stricter organization check.

All three can provide encrypted HTTPS. The difference is mainly how the owner was checked, not the strength of the connection by itself.

### By key algorithm

- **RSA** — very common and broadly compatible.
- **ECDSA / EC** — uses elliptic-curve keys and can provide smaller keys and signatures.

The certificate and private key must belong to the same key pair. Similar-looking filenames do not prove that they match.

## File formats and extensions

The extension alone does not always tell you what is inside a file.

- **PEM** — text with lines such as `-----BEGIN CERTIFICATE-----`. This app works with PEM text.
- **DER** — the same kind of cryptographic data in a binary form.
- **CRT / CER** — common certificate extensions; the content may be PEM or DER.
- **KEY** — commonly contains a private key. The key may be RSA, EC, encrypted, or stored in another standard structure.
- **CSR** — a certificate signing request, usually PEM or DER.
- **P7B / PKCS#7** — commonly contains certificates and a chain, but no private key.
- **PFX / P12 / PKCS#12** — a binary, usually password-protected bundle that may contain a certificate, chain, and private key.

SSL Chain Merger currently accepts PEM certificates, a PEM CSR with `CERTIFICATE REQUEST` markers, and an RSA private key with `RSA PRIVATE KEY` markers. Support for more common PEM key and CSR variants is planned. The app does not convert DER, P7B, PFX, or P12 files.

## What fullchain means

A `fullchain` file combines the domain certificate and its intermediate certificate or certificates in the correct order. Some systems use one combined file; others ask for the domain certificate and chain in separate fields.

In SSL Chain Merger:

- enable merging to create `domain.fullchain.crt`;
- leave merging disabled to get separate files in a ZIP archive;
- enter several intermediate PEM blocks in the same intermediate field, in chain order;
- add the root only if your target system explicitly requires it.

The private key and CSR are never included inside the fullchain certificate file. If provided, they remain separate files in the ZIP archive.

## What this app checks

SSL Chain Merger checks the basic shape of the entered domain and PEM markers. It preserves the entered components and packages them into files.

It does **not** currently prove that:

- the certificate is genuine or unexpired;
- the chain is trusted or in the correct cryptographic order;
- the private key, CSR, and certificate belong together;
- the certificate covers the entered domain;
- the files are suitable for a particular server.

Use certificate tools and your server documentation for those checks before production deployment.

## A simple checklist

1. Enter the website domain.
2. Paste the domain certificate.
3. Paste the intermediate certificate or certificates in the order supplied by the issuer.
4. Add the root only when your server or control panel explicitly asks for it.
5. Paste the private key only in a trusted local or official copy of the app.
6. Add the CSR only if you want to keep it in the downloaded archive.
7. Choose a combined fullchain or separate files according to your server documentation.
8. Verify the certificate and key with appropriate tools before installing them in production.

## Common mistakes

- Publishing or sending a private key to someone else.
- Confusing a CSR with the issued certificate.
- Putting certificates in reverse order.
- Adding the root because the word “fullchain” sounds as if it must contain everything.
- Assuming `.crt` always means PEM or `.key` always means one specific key type.
- Assuming matching filenames mean the certificate and private key belong together.
