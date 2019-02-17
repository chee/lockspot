import createRecursor from "../create-recursor"
import fastclone from "fast-clone"

export let initial = {}

export let createReducer = () =>
	function reducer (current, name) {
		let counts = fastclone(current)
		counts[name] = (counts[name] || 0) + 1
		return counts
	}

export default () => createRecursor(createReducer(), initial)
