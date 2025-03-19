import path from 'node:path'
import fs from 'node:fs'
import { sortPackageJson } from '@/utils/sortPackageJson.ts'
import { deepMerge } from '@/utils/deepMerge.ts'

/**
 * 渲染模板
 * @param src 源文件地址
 * @param dest 目标文件地址
 */
export const renderTemplate = (src: string, dest: string) => {
    const stats = fs.statSync(src)

    // 如果是一个目录
    if (stats.isDirectory()) {
        // 过滤掉 node_module
        if (path.basename(src) === 'node_modules') {
            return
        }

        fs.mkdirSync(dest, { recursive: true })
        for (const file of fs.readdirSync(src)) {
            renderTemplate(path.resolve(src, file), path.resolve(dest, file))
        }

        return
    }

    const filename = path.basename(src)

    // 合并两个 package.json 文件内容，并且排序
    if (filename === 'package.json') {
        const existing = JSON.parse(fs.readFileSync(src, 'utf8'))
        const newPackage = JSON.parse(fs.readFileSync(dest, 'utf8'))
        const pkg = sortPackageJson(deepMerge(existing, newPackage))
        fs.writeFileSync(dest, JSON.stringify(pkg, null, 4) + '\n')

        return
    }

    if (filename.startsWith('_')) {
        // rename `_file` to `.file`
        dest = path.resolve(path.dirname(dest), filename.replace(/^_/, '.'))
    }

    fs.copyFileSync(src, dest)
}
