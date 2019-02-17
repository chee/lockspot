export default async function recurseDependencies (fn, dependencies) {
	for (let name in dependencies) {
		let info = dependencies[name]

		await fn(name, info)

		if (info.dependencies) {
			await recurseDependencies(fn, info.dependencies)
		}
	}
}
