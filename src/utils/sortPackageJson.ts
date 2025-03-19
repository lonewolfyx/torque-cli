// https://docs.npmjs.com/cli/v11/configuring-npm/package-json
const properties = [
	'name',
	'version',
	'type',
	'private',
	'description',
	'keywords',
	'homepage',
	'bugs',
	'author',
	'contributors',
	'maintainers',
	'files',
	'main',
	'exports',
	'bin',
	'types',
	'typings',
	'typesVersions',
	'man',
	'directories',
	'repository',
	'funding',
	'scripts',
	'config',
	'dependencies',
	'devDependencies',
	'optionalDependencies',
	'peerDependencies',
	'peerDependenciesMeta',
	'bundledDependencies',
	'bundleDependencies',
	'resolutions',
	'overrides',
	'packageManager',
	'engines',
	'engineStrict',
	'os',
	'cpu',
	'license',
	'licenses',
	'preferGlobal',
	'eslintConfig',
	'eslintIgnore',
	'prettier',
	'stylelint',
	'jest',
	'jshintConfig',
	'jscsConfig',
	'nodemonConfig',
	'husky',
	'renovate',
	'lint-staged',
	'browserslist',
	'publishConfig',
	'dist',
	'readme',
	'module',
	'esnext',
	'workspaces',
	'jspm',
	'ava',
	'release',
	'jscpd'
]

// 二级对象键值排序
const dependencies = [
	'scripts',
	'dependencies',
	'devDependencies',
	'optionalDependencies',
	'peerDependencies',
	'peerDependenciesMeta',
	'bundledDependencies',
	'bundleDependencies'
]
export const sortPackageJson = (packageJson: Record<string, any>): Record<string, any> => {
	const sortedPackageJson: Record<string, any> = {}

	// 首先按照 properties 数组中的顺序添加键值对
	properties.forEach((key) => {
		if (packageJson[key] !== undefined) {
			if (dependencies.includes(key)) {
				// 对依赖对象中的键进行排序
				const sortedDepObj: Record<string, any> = {}

				Object.keys(packageJson[key])
					.sort()
					.forEach((depKey) => {
						sortedDepObj[depKey] = packageJson[key][depKey]
					})

				sortedPackageJson[key] = sortedDepObj
			} else {
				sortedPackageJson[key] = packageJson[key]
			}
		}
	})

	// 过滤出不在 properties 数组中的键
	const remainingKeys = Object.keys(packageJson).filter((key) => !properties.includes(key))
	// 对剩余的键进行排序
	remainingKeys.sort()

	// 将排序后的剩余键值对添加到 sortedPackageJson 中
	remainingKeys.forEach((key) => {
		sortedPackageJson[key] = packageJson[key]
	})

	return sortedPackageJson
}
