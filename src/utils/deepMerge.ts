type AnyObject = { [key: string]: any }

const isObject = (val: any): val is AnyObject => val !== null && typeof val === 'object'

const mergeArrayWithDedupe = <T>(a: T[], b: T[]): T[] => {
	const combined = new Set([
		...a,
		...b
	])
	return Array.from(combined)
}

/**
 * 深度合并两个对象
 * @param target - 目标对象
 * @param obj - 需要合并的对象
 * @returns 合并后的对象
 */
export const deepMerge = (target: AnyObject, obj: AnyObject): AnyObject => {
	// 创建目标对象的副本
	const output: AnyObject = { ...target }

	for (const key of Object.keys(obj)) {
		const oldVal = output[key]
		const newVal = obj[key]

		if (Array.isArray(oldVal) && Array.isArray(newVal)) {
			output[key] = mergeArrayWithDedupe(oldVal, newVal)
		} else if (isObject(oldVal) && isObject(newVal)) {
			output[key] = deepMerge(oldVal, newVal)
		} else {
			output[key] = newVal
		}
	}

	return output
}
