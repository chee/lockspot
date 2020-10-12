export default async function validateLockfile (lockfile) {
	let validVersion = lockfile.lockfileVersion === 1 || lockfile.lockfileVersion === 2
	return validVersion && lockfile.requires === true
		? Promise.resolve()
		: Promise.reject()
}
