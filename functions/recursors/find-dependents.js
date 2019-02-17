import createRecursor from "../create-recursor"

export let initial = []

export let createReducer = target =>
	function reducer (current, name, info) {
		let hasRequires = info.requires != null && typeof info.requires == "object"
		return hasRequires && Object.keys(info.requires).includes(target)
			? current.concat(name)
			: current
	}

export default target => createRecursor(createReducer(target), initial)
