
export function getConfig() {
	// Hardcoded config for now
	return {
		width: 15,
		height: 20,
		// Data is either
		// - a singular value
		// - or a sequence of nulls, signified by a 1-length array with the format: [sequence of nulls]
		// - or a 2-length array, with the format [value, sequence]
		data: [
			[1], 0, [2], 5, [1], 6, [2], 6, 5, [3], 4, [5], [8, 2], 9, [5], 8, [3], 5, [1], 7, [2], [8, 2], [9, 2], [2],
			9, [1], 0, 3, [1], 6, [5], 7, [2], 8, [1], 5, [1], 4, 6, [3], 2, [3], 8, 9, [3], 3, [1], 5, [1], 4, [2], 3,
			[1], 5, 6, 7, [5], 5, [1], 5, 3, [1], 3, 5, [1], [5, 2], 4, [1], 3, 4, [1], [3, 4], [2], [3, 2], [4], 3, 2,
			4, 3, 4, [2], 1, 2, [2], 3, [1], 4, [6], 3, [4, 2], [1], 2, [1], 3, [3], 4, [2], 4, [2], 4, [3, 3], 4, [1],
			4, [4], 3, [1], 2, [3], 5, [1], [4, 2], [1], 3, [3], 5, [3], 5, [1], [3, 2], 5, [1], 7, 5, [1], 1, 4, [1],
			7, 5, 6, [1], 5, [2], 5, [1], 7, [6, 2], [2], 7, [1], 7, [1], 5, [1], 3, [2], [6, 2], [7, 2], 5, [4], 5, [3],
			6, 7, 6, [3], 5, [1], [7, 2], [2], [7, 2], [1], 8, [3], 7, [4], 8, [1], 7, [1], 7, [1], 6, 8, 6, 7, [6, 2],
			[2], 5, [1], 7, [11], 0, [1], 3, [1], 3, [1], 4, [1], [4, 2], [2], 3, [1], 0
		]
	}
}

export function processConfig(config) {
	if(!validateDataLength(config)) {
		return {
			success: false,
			error: "Dimension and data mismatch",
			config: null
		}
	};

	return {
		success: true,
		error: null,
		config: mapData(config)
	}

	function validateDataLength(config) {
		// Returns boolean - true if width * height matches data length
		const totalLength = config.width * config.height;

		const actualLength = config.data
			.map(i => {
				// This is a singular value
				if(typeof i === "number") {
					return 1;
				}
				// This is a sequence of nulls
				if(i.length === 1) {
					return i[0];
				}
				// This is a sequence of not-nulls
				return i[1];
				// TODO: error handling?
			})
			.reduce((prev, curr) => prev += curr, 0);
		
		return totalLength === actualLength;
	}

	function mapData(config) {
		// Returns array mapping of the data object
		return {
			...config,
			data: config.data
				.map(i => {
					// This is a singular value
					if(typeof i === "number") {
						return i;
					}
					// Create an array of nulls, we'll flatmap it later

					// This is a sequence of nulls
					if(i.length === 1) {
						const nullArray = new Array(i[0]).fill(null);
						return nullArray;
					}

					// This is a sequence of values
					const valueArray = new Array(i[1]).fill(i[0]);
					return valueArray;
					// TODO: error handling?
				})
				.flat()
		}
	}
}