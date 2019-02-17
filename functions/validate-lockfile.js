export default async function validateLockfile (lockfile) {
	return lockfile.lockfileVersion === 1 && lockfile.requires === true
		? Promise.resolve()
		: Promise.reject()
}
