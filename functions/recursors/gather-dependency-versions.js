import createRecursor from "../create-recursor"
import fastclone from "fast-clone"

export let initial = {}

export let createReducer = () =>
	function reducer (current, name, info) {
		let counts = fastclone(current)
		counts[name] = [...new Set((counts[name] || []).concat(info.version))]
		return counts
	}

let recursor = () => createRecursor(createReducer(), initial)
export default recursor
