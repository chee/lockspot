import {EOL} from "os"
import {handler as depcountHandler} from "./depcount"
import * as symbols from "../symbols"

export let command = "flat"
export let describe = "exit badly if the tree cannot be flat"

export let builder = yargs => {
	yargs
		.options("origami", {
			type: "boolean"
		})
		.options("pattern", {
			alias: ["r"],
			type: "array",
			describe: "only count packages whose name match one of these patterns",
			coerce: pattern => new RegExp(pattern)
		})
		.options("production", {
			alias: ["prod", "p"],
			type: "boolean",
			default: "false",
			describe: "only count the production (non-dev) tree"
		})
}

export async function handler (argv) {
	let options = argv.origami
		? {
			production: true,
			pattern: /@financial-times\/o-.*/
		}
		: argv

	let counts = await depcountHandler({
		...options,
		min: 2,
		[symbols.internal]: true
	})

	process.exit(counts.length)
}
