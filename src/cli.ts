
/* IMPORT */

import * as caporal from 'caporal';
import {updater} from 'specialist';
import {name, version} from '../package.json';
import Template from '.';

/* CLI */

async function CLI () {

  updater ({ name, version });

  caporal
    .version ( version )
    /* WIZARD */
    .action ( () => Template.wizard () )
    /* CREATE */
    .command ( 'create', 'Create a project from a template' )
    .argument ( '<template>', 'Template name' )
    .argument ( '[project]', 'Project name' )
    .action ( args => Template.create ( args.template, args.project ) )
    /* LIST */
    .command ( 'list', 'List installed templates' )
    .action ( () => Template.list () )
    /* INSTALL */
    .command ( 'install', 'Install a template from a repository' )
    .argument ( '<repository>', 'Git endpoint url, GitHub shorthand or local path' )
    .argument ( '[template]', 'Template name' )
    .action ( args => Template.install ( args.repository, args.template ) )
    /* UNINSTALL */
    .command ( 'uninstall', 'Uninstall one or all templates' )
    .argument ( '[template]', 'Template name' )
    .action ( args => Template.uninstall ( args.template ) )
    /* UPDATE */
    .command ( 'update', 'Update one or all templates' )
    .argument ( '[template]', 'Template name' )
    .action ( args => Template.update ( args.template ) );

  caporal.parse ( process.argv );

}

/* EXPORT */

export default CLI;
