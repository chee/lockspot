import validateLockfile from "./validate-lockfile"

let errors = {
	parsing (error) {
		console.error("Error parsing the input, make sure it's a json file!")
		console.error("You can pass the file as STDIN or using the --file argument")
		process.exit(2)
	},
	invalid () {
		console.error("Input doesn't appear to be a valid lockfile")
		console.error("Make sure you've made it with a recent version of npm")
		process.exit(3)
	}
}

let tryy = async fn => fn()

export default async function parseLockfile (input) {
	let lockfile = await tryy(() => JSON.parse(input))
		.catch(errors.parsing)

	await validateLockfile(lockfile)
		.catch(errors.invalid)

	return lockfile
}
