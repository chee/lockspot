import {createReadStream} from "fs"
import path from "path"
import fs from "fs"
import {promisify} from "util"

async function checkPathIsRegularFile (path) {
	return promisify(fs.stat)(path)
		.then(stats => stats.isFile())
		.catch(() => false)
}

async function getStream ({file, isTTY}) {
	if (file != null && file != "-") {
		let filepath = path.resolve(file)
		if (!await checkPathIsRegularFile(filepath)) {
			throw new Error(`not a file: "${filepath}"`)
		}
		return createReadStream(filepath)
	}

	let packageLockPath = "package-lock.json"

	let packageLockExists = await checkPathIsRegularFile(packageLockPath)

	if (!file && isTTY && packageLockExists) {
		return createReadStream(packageLockPath)
	}

	return process.stdin
}

export default async function getInput ({file}) {
	let {isTTY} = process.stdin
	let stream = await getStream({file, isTTY})

	stream.resume()
	stream.setEncoding("utf-8")

	let input = ""

	stream.on("data", chunk => input += chunk)

	return new Promise((keepPromise, breakPromise) => {
		stream.on("end", () => keepPromise(input))
		stream.on("error", breakPromise)
	})
}
