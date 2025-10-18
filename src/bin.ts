#!/usr/bin/env node

import process from 'node:process'
// src/bin.ts
import { program } from 'commander'
import Template from '.'

program.name('template').description('A super-simple way to create new projects based on templates')

program.action(() => {
  console.log('Execute "template --help" for help')
})

program.command('cd <template>')
  .description('CD into a local template')
  .action(async (template: string) => {
    return Template.cd(template)
  })

program.command('ls')
  .description('List installed templates')
  .action(async () => Template.ls())

program.command('new <template> <project>')
  .description('Create a project from a template')
  .action(async (template: string, project: string) => Template.new(template, project))

program.command('install <repository> <template>')
  .description('Install a template from a repository')
  .action(async (repository: string, template: string) => Template.install(repository, template))

program.command('uninstall <template>')
  .description('Uninstall a template')
  .action(async (template: string) => {
    return Template.uninstall(template)
  })

program.command('update [template]')
  .description('Update one or all templates')
  .action(async (template?: string) => {
    return Template.update(template)
  })

program.parse(process.argv)
