import {EOL} from "os"
import getLockfile from "../functions/get-lockfile"
import countDependencies from "../functions/recursors/count-dependencies"
import getLongestName from "../functions/recursors/get-longest-name"

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

	let counts = await countDependencies()(lockfile.dependencies)
	let longestName = await getLongestName()(lockfile.dependencies)

	Object.entries(counts)
		.sort(sorts[argv.sort])
		.filter(([, count]) => count >= argv.min)
		.forEach(([name, count]) => {
			process.stdout.write(
				name.padEnd(longestName.length, " ") + "\t" + count + EOL
			)
	})
}
