import fastclone from "fast-clone"
import recurseDependencies from "./recurse-dependencies"

export default function createRecursor (fn, initial) {
	let result = fastclone(initial)

	return async function recurse (dependencies) {
		await recurseDependencies(async function (name, info) {
			result = await fn(result, name, info)
		}, dependencies)

		return result
	}
}
