import {EOL} from "os"
import getLockfile from "../functions/get-lockfile"
import gatherDependencyVersions from "../functions/recursors/gather-dependency-versions"
import getLongestName from "../functions/recursors/get-longest-name"
import * as symbols from "../symbols"

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
			describe: "sort the dependencies as so"
		})
		.options("production", {
			alias: ["prod", "p"],
			type: "boolean",
			default: "false",
			describe: "only count the production (non-dev) tree"
		})
		.options("pattern", {
			alias: ["r"],
			type: "array",
			describe: "only count packages whose name match one of these patterns",
			coerce: pattern => new RegExp(pattern)
		})
		.check(argv => {
			if (!(Number.isInteger(argv.min) && argv.min >= 0)) {
				throw new Error("Error: `min` must be a non-negative integer")
			}

			return true
		})
}

let sorts = {
	dont: Function.prototype,
	count: ([, a], [, b]) => b - a,
	name: ([a, ], [b, ]) => a.localeCompare(b)
}

let countVersions = ([name, versions]) => [
	name,
	versions.length
]

let minFilter = min => ([, count]) =>
	count >= min

export async function handler (argv) {
	let lockfile = await getLockfile(argv)

	let versions = await gatherDependencyVersions(argv)(lockfile.dependencies)
	let longestName = await getLongestName()(lockfile.dependencies)

	let entries = Object.entries(versions)
	let counted = entries.map(countVersions)
	let sorted = argv.sort && argv.sort != "dont"
		? counted.sort(sorts[argv.sort])
		: counted
	let filtered = argv.min
		? sorted.filter(minFilter(argv.min))
		: sorted

	if (!argv[symbols.internal]) {
		filtered.forEach(([name, count]) => {
			process.stdout.write(
				name.padEnd(longestName.length, " ") + "\t" + count + EOL
			)
		})
	}

	return filtered
}
