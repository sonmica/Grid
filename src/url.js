export function getUrl() {
	const url = document.URL;
	const urlNode = document.getElementById("urlContainer");
	const urlDiv = document.createElement("div");
	urlDiv.innerText = `Page url: ${url}`;
	urlNode.appendChild(urlDiv);
}