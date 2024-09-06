import{k as l,r as a,e as o}from"./index-XLdRjUWY.js";function u(e){const t=/^[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;return!!e.match(t)}function s(e){if(!(typeof e!="string"||e.length===0))return!(e.length>1&&u(e))}function I(e,t="cert"){let r;switch(t){case"csr":r=/^-----BEGIN CERTIFICATE REQUEST-----\n[\s\S]+?\n-----END CERTIFICATE REQUEST-----$/;break;case"key":r=/^-----BEGIN RSA PRIVATE KEY-----\n[\s\S]+?\n-----END RSA PRIVATE KEY-----$/;break;case"cert":default:r=/^-----BEGIN CERTIFICATE-----\n[\s\S]+?\n-----END CERTIFICATE-----$/;break}return r.test(e)}function f(e,t=null){if(!(typeof e!="string"||e.length===0))return!(e.length>1&&I(e,t))}var d=[{id:"cert_domain",content:null,type:"cert",title:"Domain certificate",name:"domain",placeholder:`-----BEGIN CERTIFICATE-----
Enter domain certificate
-----END CERTIFICATE-----`,format:"crt",required:!0},{id:"cert_inter",content:null,type:"cert",title:"Intermediate CA certificate",name:"inter",placeholder:`-----BEGIN CERTIFICATE-----
Enter intermediate CA certificate
-----END CERTIFICATE-----`,format:"crt",required:!1},{id:"cert_root",content:null,type:"cert",title:"Root CA certificate",name:"root",placeholder:`-----BEGIN CERTIFICATE-----
Enter root CA certificate
-----END CERTIFICATE-----`,format:"crt",required:!0},{id:"private_key",content:null,type:"key",title:"Private key",name:"private",placeholder:`-----BEGIN RSA PRIVATE KEY-----
Enter private key
-----END RSA PRIVATE KEY-----`,format:"key",required:!0},{id:"csr_code",content:null,type:"csr",title:"Certificate signing request",name:"request",placeholder:`-----BEGIN CERTIFICATE REQUEST-----
Enter certificate signing request
-----END CERTIFICATE REQUEST-----`,format:"csr",required:!1}];const T=l("global",()=>{const e=a(""),t=a(d),r=o(()=>s(e.value));function c(n,i){return f(n,i)}function E(n){return t.value.find(i=>i.id===n)}return{domainName:e,checkAriaInvalidDomainName:r,checkAriaInvalidCertContent:c,certs:t,getCertById:E}});export{T as u};
