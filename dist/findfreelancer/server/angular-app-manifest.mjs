
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "preload": [
      "chunk-5AUY2EOX.js",
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
      "chunk-MTLQQYZE.js",
      "chunk-FM3JJRYB.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/settings"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-MTLQQYZE.js",
      "chunk-FM3JJRYB.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/settings/identity"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-MTLQQYZE.js",
      "chunk-FM3JJRYB.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/settings/security"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-MTLQQYZE.js",
      "chunk-FM3JJRYB.js",
      "chunk-2B5LARV5.js"
    ],
    "route": "/settings/delete-account"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-MTLQQYZE.js",
      "chunk-FM3JJRYB.js",
      "chunk-2B5LARV5.js"
    ],
    "redirectTo": "/settings/identity",
    "route": "/settings/**"
  },
  {
    "renderMode": 1,
    "preload": [
      "chunk-YC4WH5FS.js",
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
      "chunk-YC4WH5FS.js",
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
      "chunk-YC4WH5FS.js",
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
      "chunk-YC4WH5FS.js",
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
      "chunk-YC4WH5FS.js",
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
      "chunk-YC4WH5FS.js",
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
      "chunk-YC4WH5FS.js",
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
      "chunk-YC4WH5FS.js",
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
      "chunk-YC4WH5FS.js",
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
      "chunk-WAVM25HR.js",
      "chunk-K2GJYNWS.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/freelancer"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-WAVM25HR.js",
      "chunk-K2GJYNWS.js",
      "chunk-JD4BGQKP.js",
      "chunk-XXUBBK5C.js"
    ],
    "route": "/freelancer/*"
  },
  {
    "renderMode": 0,
    "preload": [
      "chunk-IGP6DPV7.js",
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
    'index.csr.html': {size: 12442, hash: 'ada59c689ff3932bca561d2fc3683e61af560781d371a782c3e2b3b5e5c7fa56', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 7350, hash: '80fb7096f66e3c3227f9ae61fc8e74032477aee89b4da74449505fad8038e536', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-3ZW4WJRP.css': {size: 312785, hash: '8gj59UZGD3c', text: () => import('./assets-chunks/styles-3ZW4WJRP_css.mjs').then(m => m.default)}
  },
};
