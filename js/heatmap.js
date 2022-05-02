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

function polygonStyle(feature) {
return {
fillColor: '#ffffff',
fillOpacity: 0.5,
weight: 1,
opacity: 1,
color: 'grey',
}
}

async function addDistrictsGeoJson(url) {
const response = await fetch(url)
const data = await response.json()
const polygons = L.geoJson(data, {
  onEachFeature: popUPinfo,
  style: polygonStyle,  
})
polygons.addTo(map)
}
addDistrictsGeoJson('geojson/tartu_city_districts_edu.geojson')


function createCircle(feature, latlng) {
let options = {
radius: 5,
fillColor: 'SlateBlue',
fillOpacity: 1,
color: 'DarkSlateBlue',
weight: 1,
opacity: 1,
}
return L.circleMarker(latlng, options)
}

addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson')

function heatDataConvert(feature) {
	return [
		feature.geometry.coordinates[1],
		feature.geometry.coordinates[0],
		feature.properties.area,
	]
}

async function addCelltowersGeoJson(url) {
const response = await fetch(url)
const data = await response.json()
const heatData = data.features.map(heatDataConvert)
const heatMap = L.heatLayer(heatData, { radius: 10 })
heatMap.addTo(map)
}
