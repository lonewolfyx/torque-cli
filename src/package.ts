import { x } from 'tinyexec'

/**
 * Generate package.json
 * @param repositoryName
 */
export const generatePackageJson = async (repositoryName: string) => {

    const userName = await x('git', ['config', '--get', 'user.name'])
    const owner = userName?.stdout?.trim() || '' as string

    const userMail = await x('git', ['config', '--get', 'user.email'])
    const email = userMail?.stdout?.trim() || '' as string

    return {
        'name': repositoryName,
        'version': '0.0.0',
        'author': `${owner} <${email}>`,
        'homepage': `https://github.com/${owner}/${repositoryName}`,
        'bugs': {
            'url': `https://github.com/${owner}/${repositoryName}/issues`
        },
        'repository': {
            'type': 'git',
            'url': `git+https://github.com/${owner}/${repositoryName}.git`
        }
    }
}
