import {createReadStream} from "fs"
import path from "path"

export default async function getInput ({file = "-"}) {
	let stream = file == "-"
		? process.stdin
		:	createReadStream(path.resolve(file))

	stream.resume()
	stream.setEncoding("utf-8")

	let input = ""

	stream.on("data", chunk => input += chunk)

	return new Promise((keepPromise, breakPromise) => {
		stream.on("end", () => keepPromise(input))
		stream.on("error", breakPromise)
	})
}
