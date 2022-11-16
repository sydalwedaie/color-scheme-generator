const formEl = document.getElementById("form")
const inputColorEl = document.getElementById("input-color")
const inputSchemeEl = document.getElementById("input-scheme")

let selectedColor = inputColorEl.value
let selectedScheme = inputSchemeEl.value

let schemeData = []

formEl.addEventListener("input", () => {
	selectedColor = inputColorEl.value
	selectedScheme = inputSchemeEl.value
})

document.addEventListener("submit", e => {
	e.preventDefault()
	handleForm()
})

document.addEventListener("click", e => {
	e.target.dataset.color && selectOnClick(e.target.dataset.color)
})

function selectOnClick(color) {
	navigator.clipboard.writeText(color)
	console.log(color)
	// alert("Copied the color: " + color)
}

function handleForm() {
	const hexValue = selectedColor.slice(1)
	schemeData = []
	fetch(
		`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${selectedScheme}`
	)
		.then(res => res.json())
		.then(data => {
			data.colors.forEach(color => {
				schemeData.push({
					hex: color.hex.value,
					name: color.name.value,
				})
			})
			render()
		})
}

function render() {
	document.getElementById("content").innerHTML = getHtml()
}

function getHtml() {
	let html = ""
	schemeData.forEach(color => {
		html += `
            <div class='color-slot'  id="color-${color.hex}" style='background-color: ${color.hex}'>
                <p class="color-name">${color.name}</p>
                <p class="color-hex" data-color="${color.hex}">${color.hex}</p>
            </div>
        `
	})
	return html
}

handleForm()
