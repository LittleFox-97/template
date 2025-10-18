/* IMPORT */

import type { SpawnOptions } from 'node:child_process'
import type { Stats } from 'node:fs'
import type { MetadataGlobal, MetadataLocal } from './types'
import { spawn, spawnSync } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { confirm, input } from '@inquirer/prompts'
import _ from 'lodash'
import { METADATA_GLOBAL_NAME, METADATA_LOCAL_NAME, TEMPLATES_PATH } from './constants'

/* MAIN */

const Utils = {

  /* API */

  fs: {

    delete: async (targetPath: string): Promise<void> => {
      targetPath = path.resolve (targetPath)

      if (!targetPath.startsWith (TEMPLATES_PATH)) {
        throw new Error (`Refusing to delete something outside of "${TEMPLATES_PATH}", for safety`)
      }

      await fs.rm (targetPath, { recursive: true })
    },

    isBinary: (fileContent: string): boolean => {
      // TODO: Maybe write this better
      // eslint-disable-next-line no-control-regex
      return /[\u0000-\u0007]/.test (fileContent)
    },

    isFile: async (targetPath: string): Promise<boolean> => {
      const stats = await Utils.fs.stat (targetPath)

      return !!stats?.isFile ()
    },

    isFolder: async (targetPath: string): Promise<boolean> => {
      const stats = await Utils.fs.stat (targetPath)

      return !!stats?.isDirectory ()
    },

    readJSON: async<T = MetadataGlobal | MetadataLocal>(filePath: string): Promise<T | undefined> => {
      try {
        const fileContent = await fs.readFile (filePath, 'utf8')
        const fileValue = JSON.parse (fileContent) as T

        if (!_.isPlainObject (fileValue)) {
          return
        }

        return fileValue
      } catch {

      }
    },

    stat: async (targetPath: string): Promise<Stats | undefined> => {
      try {
        return await fs.stat (targetPath)
      } catch {

      }
    },

  },

  metadata: {

    get: async (template: string): Promise<MetadataLocal | undefined> => {
      const metadataGlobal = await Utils.metadata.getGlobal ()
      const metadataLocal = await Utils.metadata.getLocal (template)

      return _.merge ({}, metadataLocal, metadataGlobal?.templates?.[template])
    },

    getGlobal: async (): Promise<MetadataGlobal | undefined> => {
      const metadataPath = path.join (TEMPLATES_PATH, METADATA_GLOBAL_NAME)

      return Utils.fs.readJSON<MetadataGlobal>(metadataPath)
    },

    getLocal: async (template: string): Promise<MetadataLocal | undefined> => {
      const templatePath = Utils.template.getPath(template)
      const metadataPath = path.join (templatePath, METADATA_LOCAL_NAME)

      return Utils.fs.readJSON<MetadataLocal>(metadataPath)
    },

  },

  path: {

    isUrl: (targetPath: string): boolean => {
      return /^\w+(?:\+\w+)?:\/\//.test (targetPath)
    },

  },

  prompt: {
    boolean: async (message: string, initial: boolean = true): Promise<boolean | undefined> => {
      return confirm({
        message,
        default: initial,
      })
    },

    string: async (message: string, initial?: string): Promise<string | undefined> => {
      return input({
        message,
        default: initial,
      })
    },
  },

  repository: {

    getEndpoint: async (repository: string): Promise<string | undefined> => {
      if (Utils.path.isUrl (repository)) {
        /* GIT ENDPOINT */

        if (/\.git$/.test (repository)) {
          return repository
        }

        /* GITHUB REPOSITORY */

        const details = repository.match (/.+github\.com\/([^\s/.]+)\/([^\s/#]+)(?:$|\/|#)/)

        if (details) {
          return `https://github.com/${details[1]}/${details[2]}.git`
        }
      } else {
        /* GITHUB SHORTHAND */

        const details = repository.match (/^([^\s/.]+)\/([^\s/]+)$/)

        if (details) {
          return `https://github.com/${details[1]}/${details[2]}.git`
        }

        /* PATH */

        if (path.isAbsolute (repository)) {
          if (await Utils.fs.isFolder (repository)) {
            return repository
          }
        } else {
          const fullPath = path.join (process.cwd (), repository)

          if (await Utils.fs.isFolder (fullPath)) {
            return fullPath
          }
        }
      }
    },

  },

  shell: {

    cd: (targetPath: string): void => {
      const shell = process.env['SHELL']

      if (!shell) {
        throw new Error ('Unable to find current shell in use')
      }

      spawnSync (shell, { // Spawning a sub-shell at path
        cwd: targetPath,
        stdio: 'inherit',
        env: process.env,
      })
    },

    exec: async (command: string, options?: SpawnOptions): Promise<boolean> => {
      return new Promise ((resolve) => {
        const process = spawn (command, {
          stdio: 'inherit',
          shell: true,
          ...options,
        })

        process.on ('close', code => resolve (code === 0))
        process.on ('error', () => resolve (false))
      })
    },

  },

  template: {

    getPath: (name: string): string => {
      return path.join (TEMPLATES_PATH, name)
    },

  },

  templates: {

    getNames: async (): Promise<string[]> => {
      const dirents = await fs.readdir (TEMPLATES_PATH, { withFileTypes: true })
      const folders = dirents.filter (dirent => dirent.isDirectory () && !dirent.name.startsWith ('.'))

      return folders.map (folder => folder.name).sort ()
    },

    getPaths: async (): Promise<string[]> => {
      const names = await Utils.templates.getNames ()

      return names.map (name => path.join (TEMPLATES_PATH, name))
    },

  },

}

/* EXPORT */

export default Utils
