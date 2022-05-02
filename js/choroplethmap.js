let map = L.map('map').setView([58.373523, 26.716045], 12)

const osm =
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: 'OpenStreetMap contributors',
})

osm.addTo(map)
6

function defaultMapSettings() {
map.setView([58.373523, 26.716045], 12)
}

function popUPinfo(feature, layer) {
layer.bindPopup(feature.properties.NIMI)
}

addDistrictsGeoJson('geojson/tartu_city_districts_edu.geojson')

async function addDistrictsGeoJson(url) {
	const response = await fetch(url)
	const data = await response.json()
	L.choropleth(data, {
		valueProperty: 'TOWERS',
		scale: ['#f2f0f7', '#6a51a3'],
		steps: 4,
		mode: 'e',
		style: {
			color: '#fff',
			weight: 2,
			fillOpacity: 0.8,
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup('Value: ' + feature.properties.OBJECTID)
		},
	}).addTo(map)
}
