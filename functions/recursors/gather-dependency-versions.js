import createRecursor from "../create-recursor"
import fastclone from "fast-clone"

export let initial = {}

export let createReducer = (options = {}) =>
	function reducer (current, name, info) {
		let {
			production = false,
			pattern
		} = options
		if (production && info.dev) {
			return current
		}
		if (pattern && !pattern.exec(name)) {
			return current
		}
		let counts = fastclone(current)
		counts[name] = [...new Set((counts[name] || []).concat(info.version))]
		return counts
	}

let recursor = options => createRecursor(createReducer(options), initial)

export default recursor
