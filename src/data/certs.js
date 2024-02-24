export const certsData = [
  {
    id: 'cert_domain',
    type: 'domainCert',
    title: 'Domain certificate',
    name: 'cert_domain',
    placeholder: 'Enter domain certificate',
    format: 'crt',
    required: true
  },
  {
    id: 'cert_inter',
    type: 'intermediateCA',
    title: 'Intermediate CA certificate',
    name: 'cert_inter',
    placeholder: 'Enter intermediate CA certificate',
    format: 'crt',
    required: false
  },
  {
    id: 'cert_root',
    type: 'rootCA',
    title: 'Root CA certificate',
    name: 'cert_root',
    placeholder: 'Enter root CA certificate',
    format: 'crt',
    required: true
  },
  {
    id: 'private_key',
    type: 'privateKey',
    title: 'Private key',
    name: 'private_key',
    placeholder: 'Enter private key',
    format: 'key',
    required: true
  },
  {
    id: 'csr_code',
    type: 'csrCode',
    title: 'Certificate signing request',
    name: 'csr_code',
    placeholder: 'Enter certificate signing request',
    format: 'csr',
    required: true
  }
]
