import expect from "expect"
import validate from "../../functions/validate-lockfile"

describe("functions/validate-lockfile", () => {
	it("accepts a version 1 lockfile with requires: true", () => {
		return expect(validate({
			lockfileVersion: 1,
			requires: true
		})).resolves.toBeUndefined()
	})

	it("does not accept a version 2 lockfile with requires: true", () => {
		return expect(validate({
			lockFileVersion: 2,
			requires: true
		})).rejects.toBeUndefined()
	})

	it("does not accept a version 1 lockfile without requires: true", () => {
		return expect(validate({
			lockFileVersion: 1
		})).rejects.toBeUndefined()
	})
})
