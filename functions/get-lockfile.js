import getInput from "./get-input"
import parseLockfile from "./parse-lockfile"

export default async function getLockfile ({file}) {
	return parseLockfile(await getInput({file}))
}
