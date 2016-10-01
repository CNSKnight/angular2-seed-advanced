import { join } from 'path';
import { SeedAdvancedConfig } from './seed-advanced.config';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides.
 * A few examples can be found below.
 * 
 * Materilize-css requires:
 * $ npm install --save jquery@^2.2.4 materialize-css angular2-materialize
 */
export class ProjectConfig extends SeedAdvancedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  ACAPF_BASE = '../../../../acap-dev/';

  constructor() {
    super();
    this.APP_TITLE = 'Steeve\'s App (in seed.config)';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    this.mergeObject(this.SYSTEM_CONFIG_DEV, {
      paths: {
        acap: `${this.ACAPF_BASE}core/templates`
      },
      map: {
        // node_modules/ inferred
        // @see main.web.ts imports
        jquery: 'jquery/dist/jquery.min',
        materialize: 'materialize-css/dist',
        'angular2-materialize': 'angular2-materialize/dist',
        acapFPkg: `${this.ACAPF_BASE}core/templates/js/acapF-package.source.js`
      },
      packages: {
        materialize: {
          format: 'global',
          main: 'js/materialize.min',
          defaultExtension: 'js'
        },
        'angular2-materialize': {
          main: 'index',
          defaultExtension: 'js'
        },
        '@ngrx/store-devtools': {
          main: 'index',
          defaultExtension: 'js'
        },
        '@ngrx/store-log-monitor': {
          main: 'index',
          defaultExtension: 'js'
        }
      },
      meta: {
        acapFPkg: {
          format: 'amd',
          exports: 'acap',
          deps: [
            'lodash',
            'mootools_more',
            'acap/js/polyfills-and-proto-extensions.source.js'
          ]
        }
      }
    });

    this.SYSTEM_BUILDER_CONFIG.paths['acap'] = `${this.ACAPF_BASE}core/templates`;
    this.SYSTEM_BUILDER_CONFIG.paths['materialize-css'] = 'node_modules/materialize-css';
    this.SYSTEM_BUILDER_CONFIG.paths['angular2-materialize'] = 'node_modules/angular2-materialize';

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });

  }

}
