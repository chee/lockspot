import {EOL} from "os"
import getLockfile from "../functions/get-lockfile"
import recurseDependencies from "../functions/recurse-dependencies"

export let command = "depcount"
export let describe = "the number of versions of each dependency"
export let aliases = [
	"dependency-counts",
	"dc"
]
export let builder = yargs => {
	yargs
		.option("min", {
			describe: "show only dependencies that have more than 'min' numbers",
			default: 0
		})
		.options("sort", {
			default: "dont",
			choices: ["dont", "count", "name"],
			describe: "how to sort the dependencies"
		})
		.options("show")
		.check(argv => {
			if (!(Number.isInteger(argv.min) && argv.min >= 0)) {
				throw new Error("Error: `min` must be a non-negative integer")
			}

			return true
		})
}

let sorts = {
	count: ([, a], [, b]) => b - a,
	name: ([a, ], [b, ]) => a.localeCompare(b)
}

export async function handler (argv) {
	let lockfile = await getLockfile(argv)

	let counts = {}
	let maxNameLength = 0

	await recurseDependencies(async (name, info) => {
		maxNameLength = name.length > maxNameLength
			? name.length
			: maxNameLength

		counts[name] = (counts[name] || 0) + 1

	}, lockfile.dependencies)

	Object.entries(counts)
		.sort(sorts[argv.sort])
		.filter(([, count]) => count >= argv.min)
		.forEach(([name, count]) => {
			process.stdout.write(
				name.padEnd(maxNameLength, " ") + "\t" + count + EOL
			)
	})
}
