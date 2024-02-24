export const certsData = [
  {
    id: 'cert_domain',
    type: 'cert',
    title: 'Domain certificate',
    name: 'cert_domain',
    placeholder: '-----BEGIN CERTIFICATE-----\nEnter domain certificate\n-----END CERTIFICATE-----',
    format: 'crt',
    required: true
  },
  {
    id: 'cert_inter',
    type: 'cert',
    title: 'Intermediate CA certificate',
    name: 'cert_inter',
    placeholder: '-----BEGIN CERTIFICATE-----\nEnter intermediate CA certificate\n-----END CERTIFICATE-----',
    format: 'crt',
    required: false
  },
  {
    id: 'cert_root',
    type: 'cert',
    title: 'Root CA certificate',
    name: 'cert_root',
    placeholder: '-----BEGIN CERTIFICATE-----\nEnter root CA certificate\n-----END CERTIFICATE-----',
    format: 'crt',
    required: true
  },
  {
    id: 'private_key',
    type: 'key',
    title: 'Private key',
    name: 'private_key',
    placeholder: '-----BEGIN RSA PRIVATE KEY-----\nEnter private key\n-----END RSA PRIVATE KEY-----',
    format: 'key',
    required: true
  },
  {
    id: 'csr_code',
    type: 'csr',
    title: 'Certificate signing request',
    name: 'csr_code',
    placeholder: '-----BEGIN CERTIFICATE REQUEST-----\nEnter certificate signing request\n-----END CERTIFICATE REQUEST-----',
    format: 'csr',
    required: false
  }
]
