import { cycleColour, altCycleColour } from './colour.js';

export function drawGrid(parentContainer, config) {
	const gridWidth = config.width;
	const gridHeight = config.height;

	for(let row = 0; row < gridHeight; row++) {
		const rowDiv = document.createElement("div");
		rowDiv.classList.add("row");
		parentContainer.append(rowDiv);

		for(let col = 0; col < gridWidth; col++) {
			const childNode = drawCell(mapDataToCell({config, row, col}));
			rowDiv.appendChild(childNode);
		}
	}

	function drawCell({index, val, width, height}) {
		const cell = document.createElement("div");
		cell.id = index;
		cell.classList.add("cell");
		if(val !== null) {
			cell.innerText = val;
		}
		cell.addEventListener("contextmenu", (e) => {
			e.preventDefault();
		});
		cell.addEventListener("click", (e) => {
			cycleColour(cell);
		});
		cell.addEventListener("auxclick", (e) => {
			altCycleColour(cell);
		});
		cell.onmouseover = (event) => {
			// cell.classList.add("cell-hover")
			hoverNeighboursOfId(index, width, height);
		};
		cell.onmouseout = (event) => {
			hoverNeighboursOfId(index, width, height, false);
		};
		return cell;
	}

	function mapDataToCell({
        config: {
            data,
            width,
            height
        }, 
        row, 
        col
    }) {
		const index = row * width + col;
		return {
			index,
			val: data[index],
			width: width,
			height: height
		};
	}

	function hoverNeighboursOfId(id, width, height, hover = true) {
		const cellArray = getNeighboursOfId(id, width, height);

		const action = hover ? "add" : "remove";
		cellArray.forEach(cell => cell.classList[action]("cell-hover"));
	}

	function getNeighboursOfId(id, width, height) {
		// Raw values
		const beside = [id-1, id+1];
		const aboveBelow = [id-width, id+width]
		const diagonal = aboveBelow.map(cellId => [cellId-1, cellId+1]).flat();

		const hoverColumn = getColumnById(id, width);

		return [id, ...beside, ...aboveBelow, ...diagonal]
			.filter(cellId => cellId >= 0 && cellId < width * height) // Ignore anything over the boundaries of the grid
			.filter(cellId => Math.abs(getColumnById(cellId, width) - hoverColumn) < 2) // Ignore anything that is trying to wrap around horizontally
			.map(cellId => getCellById(cellId));

		function getCellById(id) {
			return document.getElementById(id);
		}

		function getColumnById(id, width) {
			return id % width;
		}
	}
}