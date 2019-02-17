import getLockfile from "../functions/get-lockfile"
import findDependents from "../functions/recursors/find-dependents"

export let command = "requires <name>"
export let describe = "see what packages directly need a given package"
export let aliases = [
	"who-needs",
	"whoneeds"
]
export let builder = yargs =>
	yargs
		.positional("name", {
			describe: "the package name",
			required: true
		})

export async function handler (argv) {
	let lockfile = await getLockfile(argv)

	let requires = await findDependents(argv.name)(lockfile.dependencies)

	console.log(requires.join(" "))
}
