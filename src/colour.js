
export function cycleColour(node) {
	// cycle: none -> black -> gray
	if(node.classList.contains("black")) {
		node.classList.remove("black");
		node.classList.add("gray");
	} else if(node.classList.contains("gray")) {
		node.classList.remove("gray");
	} else {
		node.classList.add("black");
	}
}

export function altCycleColour(node) {
	// cycle: gray -> black -> none
	if(node.classList.contains("gray")) {
		node.classList.remove("gray");
		node.classList.add("black");
	} else if(node.classList.contains("black")) {
		node.classList.remove("black");
	} else {
		node.classList.add("gray");
	}
}