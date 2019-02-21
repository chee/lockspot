import createRecursor from "../create-recursor"
import fastclone from "fast-clone"

export let initial = {}

export let createReducer = ({production = false} = {}) =>
	function reducer (current, name, info) {
		if (production && info.dev) {
			return current
		}
		let counts = fastclone(current)
		counts[name] = [...new Set((counts[name] || []).concat(info.version))]
		return counts
	}

let recursor = ({production}) => createRecursor(createReducer({production}), initial)
export default recursor
