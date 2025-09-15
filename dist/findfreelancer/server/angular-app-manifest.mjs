
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-O5Y5BLIW.js",
      "chunk-DG2ZGPQQ.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-QFO3QOAV.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/auth"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-QFO3QOAV.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/auth/register"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-QFO3QOAV.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/auth/register/confirm/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-QFO3QOAV.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/auth/login"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-QFO3QOAV.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/auth/password"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-QFO3QOAV.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/auth/password/forgotten"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-QFO3QOAV.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/auth/password/reset/*"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-I75USEBO.js",
      "chunk-FM3JJRYB.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/settings"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-I75USEBO.js",
      "chunk-FM3JJRYB.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/settings/identity"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-I75USEBO.js",
      "chunk-FM3JJRYB.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/settings/security"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-I75USEBO.js",
      "chunk-FM3JJRYB.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/settings/delete-account"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-I75USEBO.js",
      "chunk-FM3JJRYB.js",
      "chunk-2B5LARV5.js"
    ],
    "redirectTo": "/settings/identity",
    "route": "/settings/**"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PQ2USVNV.js",
      "chunk-DG2ZGPQQ.js",
      "chunk-FM3JJRYB.js",
      "chunk-K2GJYNWS.js",
      "chunk-2B5LARV5.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/profile"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PQ2USVNV.js",
      "chunk-DG2ZGPQQ.js",
      "chunk-FM3JJRYB.js",
      "chunk-K2GJYNWS.js",
      "chunk-2B5LARV5.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/profile/general"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PQ2USVNV.js",
      "chunk-DG2ZGPQQ.js",
      "chunk-FM3JJRYB.js",
      "chunk-K2GJYNWS.js",
      "chunk-2B5LARV5.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/profile/presentation"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PQ2USVNV.js",
      "chunk-DG2ZGPQQ.js",
      "chunk-FM3JJRYB.js",
      "chunk-K2GJYNWS.js",
      "chunk-2B5LARV5.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/profile/skills"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PQ2USVNV.js",
      "chunk-DG2ZGPQQ.js",
      "chunk-FM3JJRYB.js",
      "chunk-K2GJYNWS.js",
      "chunk-2B5LARV5.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/profile/experiences"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PQ2USVNV.js",
      "chunk-DG2ZGPQQ.js",
      "chunk-FM3JJRYB.js",
      "chunk-K2GJYNWS.js",
      "chunk-2B5LARV5.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/profile/education"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PQ2USVNV.js",
      "chunk-DG2ZGPQQ.js",
      "chunk-FM3JJRYB.js",
      "chunk-K2GJYNWS.js",
      "chunk-2B5LARV5.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/profile/languages"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PQ2USVNV.js",
      "chunk-DG2ZGPQQ.js",
      "chunk-FM3JJRYB.js",
      "chunk-K2GJYNWS.js",
      "chunk-2B5LARV5.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/profile/contact"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-PQ2USVNV.js",
      "chunk-DG2ZGPQQ.js",
      "chunk-FM3JJRYB.js",
      "chunk-K2GJYNWS.js",
      "chunk-2B5LARV5.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "redirectTo": "/profile/general",
    "route": "/profile/**"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-U4BGER5B.js",
      "chunk-K2GJYNWS.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/freelancer"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-U4BGER5B.js",
      "chunk-K2GJYNWS.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/freelancer/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-QZILZK47.js",
      "chunk-2B5LARV5.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
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
    'index.csr.html': {size: 12544, hash: 'e88a6c6919602750c98273fab243e86680ebe141ba18592f948a9a31e8415a23', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7452, hash: '6416e9575c8b2fbe1dae8e4cb64078186f3638cb25c794b196c208f445c17803', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-HQDWHZ42.css': {size: 313315, hash: '9Cs4um/AdfA', text: () => import('./assets-chunks/styles-HQDWHZ42_css.mjs').then(m => m.default)}
  },
};
