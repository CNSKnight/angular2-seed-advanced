import { join } from 'path';
import { SeedAdvancedConfig } from './seed-advanced.config';
import { InjectableDependency } from './seed.config.interfaces';

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedAdvancedConfig {

  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  constructor() {
    super();
    this.APP_TITLE = 'Steeve\'s App (in project.config)';
    let additional_deps: InjectableDependency[] = [
      {src: 'jquery/dist/jquery.min.js', inject: 'libs'}
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;
    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);

    /* Add to or override NPM module configurations: */
    //this.mergeObject( this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false } );

    this.SYSTEM_CONFIG.map = this.SYSTEM_CONFIG.map || {};
    this.SYSTEM_CONFIG.map['materialize'] = `${this.APP_BASE}node_modules/materialize-css`;
    this.SYSTEM_CONFIG.map['angular2-materialize'] = `${this.APP_BASE}node_modules/angular2-materialize`;
    this.SYSTEM_CONFIG.map['jquery'] = `${this.APP_BASE}node_modules/jquery`;
    this.SYSTEM_CONFIG.map['$'] = 'jquery';
    this.SYSTEM_CONFIG.map['window.jQuery'] = 'jquery';
    // this may break acacF
    this.SYSTEM_CONFIG.map['acapFPkg'] = `${this.APP_BASE}core/templates/js/acapF-package.source.js`;
  }
}
