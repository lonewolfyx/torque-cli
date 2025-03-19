import type { PromptObject } from 'prompts'
import path from 'node:path'
import { checkDirExist, isValidPackageName } from '@/util.ts'
import * as process from 'node:process'
import { red } from 'kleur/colors'

const cwd = process.cwd()
export const baseQuestions = (): PromptObject[] => {
    return [
        {
            type: 'text',
            name: 'name',
            message: '请输入项目名称:'
        },
        {
            type: (prev) => (checkDirExist(path.resolve(cwd, prev)) ? 'toggle' : null),
            name: 'shouldOverwrite',
            message: `目标文件夹非空，是否覆盖？`,
            initial: true,
            active: '是',
            inactive: '否'
        },
        {
            name: 'overwriteChecker',
            // @ts-ignore
            type: (prev, values) => {
                if (values.shouldOverwrite === false) {
                    throw new Error(red('✖') + ` 操作取消`)
                }

                return null
            }
        },
        {
            // @ts-ignore
            type: (prev, values) => {
                return checkDirExist(path.resolve(cwd, values.projectName)) ? 'text' : null
            },
            name: 'pkgName',
            message: '请输入包名称',
            validate: (dir) => isValidPackageName(dir) || '无效的 package.json 名称'
        }
    ]
}
