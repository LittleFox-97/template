#!/usr/bin/env node

import { bin } from 'specialist'
import Template from '.'

bin ('template', 'A super-simple way to create new projects based on templates')

  .action (() => { // TODO: Make this into a wizard instead, or show the help menu
    console.log ('Execute "template --help" for help')
  })

  .command ('cd', 'CD into a local template')
  .argument ('<template>', 'The template to CD into')
  .action (async (options, args) => {
    return Template.cd (args[0])
  })

  .command ('ls', 'List installed templates')
  .action (async () => {
    return Template.ls ()
  })

  .command ('new', 'Create a project from a template')
  .argument ('<template>', 'Template name')
  .argument ('<project>', 'Project name')
  .action (async (options, args) => {
    return Template.new (args[0], args[1])
  })

  .command ('install', 'Install a template from a repository')
  .argument ('<repository>', 'Git endpoint url, GitHub shorthand, or local path')
  .argument ('<template>', 'Template name')
  .action (async (options, args) => {
    return Template.install (args[0], args[1])
  })

  .command ('uninstall', 'Uninstall a template')
  .argument ('<template>', 'Template name')
  .action (async (options, args) => {
    return Template.uninstall (args[0])
  })

  .command ('update', 'Update one or all templates')
  .argument ('[template]', 'Template name')
  .action (async (options, args) => {
    return Template.update (args[0])
  })

  .run ()
