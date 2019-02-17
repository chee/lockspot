import createRecursor from "../create-recursor"

export let initial = ""

export let createReducer = () =>
	function reducer (longest, name) {
		return name.length > longest.length
			? name
			: longest
	}

export default () => createRecursor(createReducer(), initial)
