
import { getConfig, processConfig } from './config.js';
import { drawGrid } from './grid.js';

import { getUrl } from './url.js';

export function run() {

	window.onload = () => {

		console.log("page is fully loaded");
	
		let gridContainer = document.getElementById("gridContainer");
		gridContainer.classList.add("cellContainer");
		
		//getUrl();
		
		const config = getConfig();
		const result = processConfig(config);
		if(!result.success) {
			console.log("Error while mapping");
			console.log(result.error);
			return;
		}
	
		console.log("Mapping successful");
		console.log(result.config);
	
		drawGrid(gridContainer, result.config);
	}
}
