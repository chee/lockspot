import expect from "expect"
import sinon from "sinon"
import parseLockfile from "../../functions/parse-lockfile"

describe("functions/parse-lockfile", () => {
	afterEach(() => sinon.restore())
	it("dislikes non-json", async () => {
		let exit = sinon.stub(process, "exit")
		expect(exit.called).toBe(false)
		await parseLockfile("{")
		expect(exit.called).toBe(true)
	})

	it("dislikes non-lockfile json", async () => {
		let exit = sinon.stub(process, "exit")
		expect(exit.called).toBe(false)
		await parseLockfile("{a: []}")
		expect(exit.called).toBe(true)
	})

	it("likes a lockfile", async () => {
		let exit = sinon.stub(process, "exit")
		expect(exit.called).toBe(false)
		let lockfile = await parseLockfile(`
			{
				"name": "lil-yeet",
				"lockfileVersion": 1,
				"requires": true,
				"dependencies": {}
			}
		`)
		expect(exit.called).toBe(false)
		expect(lockfile).toEqual({
			name: "lil-yeet",
			lockfileVersion: 1,
			requires: true,
			dependencies: {}
		})
	})
})
