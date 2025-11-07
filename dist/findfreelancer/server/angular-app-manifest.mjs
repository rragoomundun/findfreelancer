
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-5DTOWXLD.js",
      "chunk-HHCKMFT6.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-HJFBNVQH.js",
      "chunk-JMBAKKFG.js"
    ],
    "route": "/auth"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-HJFBNVQH.js",
      "chunk-JMBAKKFG.js"
    ],
    "route": "/auth/register"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-HJFBNVQH.js",
      "chunk-JMBAKKFG.js"
    ],
    "route": "/auth/register/confirm/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-HJFBNVQH.js",
      "chunk-JMBAKKFG.js"
    ],
    "route": "/auth/login"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-HJFBNVQH.js",
      "chunk-JMBAKKFG.js"
    ],
    "route": "/auth/password"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-HJFBNVQH.js",
      "chunk-JMBAKKFG.js"
    ],
    "route": "/auth/password/forgotten"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-HJFBNVQH.js",
      "chunk-JMBAKKFG.js"
    ],
    "route": "/auth/password/reset/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-7SPXKAFF.js",
      "chunk-V4HOXBVP.js",
      "chunk-JMBAKKFG.js"
    ],
    "route": "/settings"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-7SPXKAFF.js",
      "chunk-V4HOXBVP.js",
      "chunk-JMBAKKFG.js"
    ],
    "route": "/settings/identity"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-7SPXKAFF.js",
      "chunk-V4HOXBVP.js",
      "chunk-JMBAKKFG.js"
    ],
    "route": "/settings/security"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-7SPXKAFF.js",
      "chunk-V4HOXBVP.js",
      "chunk-JMBAKKFG.js"
    ],
    "route": "/settings/delete-account"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-7SPXKAFF.js",
      "chunk-V4HOXBVP.js",
      "chunk-JMBAKKFG.js"
    ],
    "redirectTo": "/settings/identity",
    "route": "/settings/**"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-K3VMRSIL.js",
      "chunk-HHCKMFT6.js",
      "chunk-V4HOXBVP.js",
      "chunk-TOW4VS5C.js",
      "chunk-JMBAKKFG.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/profile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-K3VMRSIL.js",
      "chunk-HHCKMFT6.js",
      "chunk-V4HOXBVP.js",
      "chunk-TOW4VS5C.js",
      "chunk-JMBAKKFG.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/profile/general"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-K3VMRSIL.js",
      "chunk-HHCKMFT6.js",
      "chunk-V4HOXBVP.js",
      "chunk-TOW4VS5C.js",
      "chunk-JMBAKKFG.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/profile/presentation"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-K3VMRSIL.js",
      "chunk-HHCKMFT6.js",
      "chunk-V4HOXBVP.js",
      "chunk-TOW4VS5C.js",
      "chunk-JMBAKKFG.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/profile/skills"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-K3VMRSIL.js",
      "chunk-HHCKMFT6.js",
      "chunk-V4HOXBVP.js",
      "chunk-TOW4VS5C.js",
      "chunk-JMBAKKFG.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/profile/experiences"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-K3VMRSIL.js",
      "chunk-HHCKMFT6.js",
      "chunk-V4HOXBVP.js",
      "chunk-TOW4VS5C.js",
      "chunk-JMBAKKFG.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/profile/education"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-K3VMRSIL.js",
      "chunk-HHCKMFT6.js",
      "chunk-V4HOXBVP.js",
      "chunk-TOW4VS5C.js",
      "chunk-JMBAKKFG.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/profile/languages"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-K3VMRSIL.js",
      "chunk-HHCKMFT6.js",
      "chunk-V4HOXBVP.js",
      "chunk-TOW4VS5C.js",
      "chunk-JMBAKKFG.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/profile/contact"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-K3VMRSIL.js",
      "chunk-HHCKMFT6.js",
      "chunk-V4HOXBVP.js",
      "chunk-TOW4VS5C.js",
      "chunk-JMBAKKFG.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "redirectTo": "/profile/general",
    "route": "/profile/**"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-BXIZULQG.js",
      "chunk-TOW4VS5C.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/freelancer"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-BXIZULQG.js",
      "chunk-TOW4VS5C.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/freelancer/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-OWFDSABD.js",
      "chunk-JMBAKKFG.js",
      "chunk-URFRI6HF.js",
      "chunk-LOVHG6VV.js"
    ],
    "route": "/search"
  },
  {
    "renderMode": 1,
    "redirectTo": "/auth/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1220, hash: '818cd246a2a015939b8920dc6b1787af201b5edb1b07efc5139ef1395818ae7e', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1760, hash: '538a4fd15ed3233a40ed75bf887bba0d4c247a934480561b39aeef403cb41de6', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}
  },
};
