import fs from 'node:fs'
import path from 'node:path'

/**
 * 获取当前所在的文件夹名称
 */
export const getCurrentDirectoryName = (): string => {
	return process.cwd().split('/').pop() as string
}

/**
 * 检测文件夹地址是否存在
 * @param dir
 */
export const checkDirExist = (dir: string): boolean => {
	return fs.existsSync(dir)
}

/**
 * 是否是合法的包名
 * @param projectName
 */
export const isValidPackageName = (projectName: string): boolean => {
	return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName)
}

/**
 * 创建项目文件夹
 * @param projectPath
 */
export const createProjectDirectory = (projectPath: string) => {
	if (fs.existsSync(projectPath)) {
		for (const filename of fs.readdirSync(projectPath)) {
			if (filename === '.git') {
				continue
			}

			const fullPath = path.resolve(projectPath, filename)
			if (fs.lstatSync(fullPath).isDirectory()) {
				fs.rmSync(fullPath, { recursive: true })
			} else {
				fs.unlinkSync(fullPath)
			}
		}
	} else {
		fs.mkdirSync(projectPath, { recursive: true })
	}
}
