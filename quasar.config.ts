// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import path from 'path';
import type { UserConfig as ViteUserConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { defineConfig } from '#q-app/wrappers';
//定义vite插件
const getVitePlugins = (ctx: any) => {
  import.meta.url = './';
  const defaultPlugins = [
    //三维插件vite-plugin-xgis-cesium
    ['vite-plugin-xgis-cesium', {}],
    //https://www.npmjs.com/package/vite-plugin-commonjs
    //支持将const foo = require('foo') 改为 import * as foo from 'foo'
    ['vite-plugin-commonjs', {}],
    //支持xframelib 0.9.6版以后；包含了vite-plugin-node-polyfills支持引用Node核心库模块
    ['vite-plugin-xframelib', {}],
    nodePolyfills(),
    //系统默认自带的
    [
      'vite-plugin-checker',
      {
        // vueTsc: true,
        eslint: {
          lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
          useFlatConfig: true,
        },
      },
      { server: false },
    ],
  ];
  if (ctx.dev) {
    defaultPlugins.push([
      'vite-plugin-fs',
      {
        port: 7080, // 可自定义端口，默认7070
        root: '/', // 限制可访问的根目录
      },
    ]);
    //跳转根据页面查看VUE代码
    //https://www.npmjs.com/package/vite-plugin-vue-inspector
    defaultPlugins.push([
      'vite-plugin-vue-inspector',
      {
        enabled: false,
        toggleButtonVisibility: 'active',
        toggleButtonPos: 'bottom-right',
      },
    ]);
  }
  if (ctx.prod) {
    const prodArray = [
      // [
      //   'unplugin-vue-components/vite',
      //   {
      //     resolvers: [
      //       //动态引入ElementPlus组件 https://www.npmjs.com/package/unplugin-vue-components
      //       // require('unplugin-vue-components/resolvers').ElementPlusResolver(),
      //       tinyResolver //opentiny组件
      //     ]
      //   }
      // ],

      [
        'rollup-plugin-visualizer',
        {
          filename: 'stats.html',
          open: true,
          gzipSize: true,
          brotliSize: true,
        },
      ],
      //拷贝widget代码到静态目录里
      // ['rollup-plugin-copy',{
      //   targets: [
      //     {
      //       src: 'src/widgets/cesiumWidgets/*',
      //       dest: 'dist/spa/code/src/widgets/cesiumWidgets'
      //     },
      //   ]
      // }],
      //自动垫片插件：https://www.npmjs.com/package/@vitejs/plugin-legacy
      //@vitejs/plugin-legacy (不启用)
      // ['@vitejs/plugin-legacy',{
      //   targets: ['defaults', 'not IE 11'],
      //   modernPolyfills:true
      // }],
    ];
    defaultPlugins.push(...prodArray);
  }
  return defaultPlugins;
};

export default defineConfig((ctx: any) => {
  return {
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files //,'devGridOutput'
    boot: ctx.dev ? ['initXframe', 'directives', 'devOutput'] : ['initXframe', 'directives'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#css
    css: [
      //全局样式+主题样式
      'theme.css',
      //引入模块CSS
      // //引入floating-vue通用tooltip
      // '~floating-vue/dist/style.css',
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      'mdi-v7',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      // 'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
      'material-icons-outlined',
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#build
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      typescript: {
        strict: true,
        vueShim: true,
        // extendTsConfig (tsConfig) {}
      },

      vueRouterMode: 'hash', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      //2024-11-24必须打开
      publicPath: './',
      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      //https://quasar.dev/quasar-cli-vite/quasar-config-file#build
      minify: 'terser',
      polyfillModulePreload: true,
      // distDir

      // extendViteConf (viteConf) {},
      //https://quasar.dev/quasar-cli-vite/handling-vite
      viteVuePluginOptions: {},
      //https://quasar.dev/quasar-cli-vite/quasar-config-file#build
      alias: {
        '@': path.join(__dirname, 'src'),
      },
      vitePlugins: getVitePlugins(ctx),
      extendViteConf: (viteConf: ViteUserConfig, invokeParams: InvokeParams) => {
        //参考：https://github.com/mozilla/pdf.js/issues/17245
        // viteConf.optimizeDeps = {
        //   esbuildOptions: {
        //     target: 'es2022'
        //   },
        //   // include:["@cesium/engine"],
        // };
        //https://sass-lang.com/documentation/js-api/interfaces/legacysharedoptions/#silenceDeprecations
        //参考：https://quasar.dev/quasar-cli-vite/css-preprocessors
        //https://vite.dev/config/shared-options.html#css-preprocessoroptions
        viteConf.css = {
          preprocessorOptions: {
            scss: {
              api: 'modern', // 修改api调用方式
              //https://stackoverflow.com/questions/68147471/how-to-set-sassoptions-in-vite
              quietDeps: true,
            },
            sass: {
              quietDeps: true,
              //https://github.com/vitejs/vite/discussions/4013
              //https://sass-lang.com/documentation/js-api/interfaces/deprecations/
              silenceDeprecations: ['legacy-js-api', 'import'],
            },
          },
        };
        if (ctx.dev) {
          viteConf.esbuild = {
            target: 'es2022',
            supported: {
              'top-level-await': true,
            },
          };
        }
        if (ctx.prod) {
          //根目录
          viteConf.base = './';
          //是否抛弃console.log
          viteConf.esbuild = {
            drop: ['console', 'debugger'],
            target: 'es2022',
            supported: {
              'top-level-await': true,
            },
          };
          //不使用使用workerpool，https://github.com/josdejong/workerpool/blob/master/examples/vite/vite.config.ts
          // viteConf.build.commonjsOptions = {
          //   // ignore built-in modules in Node.js  使用workerpool需要配置
          //   ignore: ['os', 'child_process', 'worker_threads']
          // };
          viteConf.build.rollupOptions = {
            external: ['/img', 'vite-plugin-fs'], //,'pdfjs-dist'
            output: {
              manualChunks(id) {
                if (id.includes('/node_modules/')) {
                  // 设置需要独立打包的npm包
                  const expansions = [
                    'axios',
                    'pinia',
                    'vue-router',
                    'xframelib',
                    '@microsoft/signalr',
                    'echarts',
                    '@iconify/vue',
                    'viewerjs',
                    'xgis-cesium',
                    // 'vue',
                    // '@vue',
                    // 'quasar',
                  ];
                  const c = expansions.find((exp) => id.includes(`/node_modules/${exp}`));
                  if (c) {
                    if ('xgis-cesium' === c) {
                      //二次分包
                      const pathObj = path.parse(id);
                      if (!(pathObj.name === 'index')) return pathObj.name;
                      // console.log('xgis-cesium  id',id);
                      // if(id.endsWith('Cesium-BUJnXk1B.js'))
                      //   return 'Cesium-BUJnXk1B';
                    }
                    return `${c}-exp`;
                  } else {
                    return 'vendor';
                  }
                }
                // 将源码按业务模块分组
                if (id.includes('src/')) {
                 if (id.includes('/layouts/')) {
                    return 'layouts-module';
                  }
                  if (id.includes('/pages/')) {
                    return 'pages-module';
                  }
                  // 按widgets业务分模块
                  if (id.includes('/widgets/bigScreen/')) {
                    return 'bigScreen-widgets-module';
                  }
                  if (id.includes('/widgets/cesiumWidgets/')) {
                    return 'cesium-widgets-module';
                  }
                  if (id.includes('/widgets/map2d/')) {
                    return 'map2d-widgets-module';
                  }
                  if(id.includes('/widgets/layouts'))
                  {
                       return 'layouts-widgets-module';
                  }
                }
              },
            },
          };
          //web worker的相关配置
          viteConf.worker = {
            format: 'es',
            rollupOptions: {
              output: {
                // 1. 输出格式（关键配置）
                // 推荐 'es' 以支持 Worker 内的 import/export
                format: 'es',
                // 2. 文件名配置（覆盖外层 worker.filename）
                // 入口 Worker 文件命名（优先级高于外层配置）
                entryFileNames({ name }) {
                  // 生产环境：添加哈希防缓存
                  return 'workers/[name].js';
                },
              },
            },
          };
        }
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#devserver
    devServer: {
      // https: true,
      open: true, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#framework
    framework: {
      config: {
        dark: true,
      },

      // iconSet: 'material-icons', // Quasar icon set
      lang: 'zh-CN', // Quasar language pack'en-US'

      cssAddon: true, //断点，实现跨端、响应式
      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['Dialog', 'AppFullscreen', 'Loading', 'Notify'],
    },

    animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    // animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
    //   pwaServiceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    //   bexManifestFile: 'src-bex/manifest.json
    // },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render', // keep this as last one
      ],

      // extendPackageJson (json) {},
      // extendSSRWebserverConf (esbuildConf) {},

      // manualStoreSerialization: true,
      // manualStoreSsrContextInjection: true,
      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      pwa: false,
      // pwaOfflineHtmlFilename: 'offline.html', // do NOT use index.html as name!

      // pwaExtendGenerateSWOptions (cfg) {},
      // pwaExtendInjectManifestOptions (cfg) {}
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      // swFilename: 'sw.js',
      // manifestFilename: 'manifest.json',
      // extendManifestJson (json) {},
      // useCredentialsForManifestTag: true,
      // injectPwaMetaTags: false,
      // extendPWACustomSWConf (esbuildConf) {},
      // extendGenerateSWOptions (cfg) {},
      // extendInjectManifestOptions (cfg) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf) {},
      // extendElectronPreloadConf (esbuildConf) {},

      // extendPackageJson (json) {},

      // Electron preload scripts (if any) from /src-electron, WITHOUT file extension
      preloadScripts: ['electron-preload'],

      // specify the debugging port to use for the Electron app when running in development mode
      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'vue-widget-quasar-template',
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      // extendBexScriptsConf (esbuildConf) {},
      // extendBexManifestJson (json) {},

      /**
       * The list of extra scripts (js/ts) not in your bex manifest that you want to
       * compile and use in your browser extension. Maybe dynamic use them?
       *
       * Each entry in the list should be a relative filename to /src-bex/
       *
       * @example [ 'my-script.ts', 'sub-folder/my-other-script.js' ]
       */
      extraScripts: [],
    },
  };
});
