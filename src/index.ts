#!/usr/bin/env node

import { version } from '../package.json'
import cac from 'cac'
import path from 'node:path'
import prompts from 'prompts'
import fs from 'node:fs'
import { generatePackageJson } from '@/package.ts'
import { createProjectDirectory } from '@/utils'
import { renderTemplate } from '@/utils/renderTemplate.ts'

const cli = cac('@lonewolfyx/create')

const root = process.cwd()

cli.command('[projectName]', 'create a project')
    .action(async (projectName?: string) => {

        if (projectName === undefined) {
            throw new Error('please write project name')
        }

        // @ts-ignore
        const projectPath = path.resolve(root, projectName)
        createProjectDirectory(projectPath)

        const pkg = await generatePackageJson(projectName)
        fs.writeFileSync(path.resolve(projectPath, 'package.json'), JSON.stringify(pkg, null, 4))

        const { template } = await prompts({
            type: 'select',
            name: 'template',
            message: '请选择你需要的项目模板：',
            hint: '- 使用箭头切换按Enter确认。',
            choices: [
                { title: 'Library', value: 'library' },
                { title: 'Monorepo', value: 'monorepo' }
            ],
            initial: 0
        })

        const render = (templateName: string) => {
            const templatePath = path.resolve(new URL('../template', import.meta.url).pathname, templateName)
            renderTemplate(templatePath, projectPath)
        }

        render(template)
    })

cli.help()
    .version(version)
    .parse()
