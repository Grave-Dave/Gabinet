
function initMap() {
	const places = [
		{
			title: 'Obornicka 77k/1b, 51-114 Wrocław',
            link:'https://goo.gl/maps/hMLShhFAAqw3ZqQf6',
			location: {
				lat: 51.14023967026625,
				lng: 17.029128876085984,
			},
		},
		{
			title: 'Legnicka 55a/3, 54-234 Wrocław',
            link:'https://goo.gl/maps/wSKW69HnLDDG9H3w8',
			location: {
				lat: 51.123935996371145,
				lng: 16.98942565479382,
			},
		},
		{
			title: 'Otmuchowska 7, 50-505 Wrocław',
            link:'https://goo.gl/maps/g9gkCMLdGQEgkKc88',
			location: {
				lat: 51.086168446261205,
				lng: 17.050631541169484,
			},
		},
	];

	const infoWindows = places.map(place=>{
        return new google.maps.InfoWindow({
        content:`<div><p class='bold'>${place.title}</p></br><a href=${place.link} target="_blank" class='map-link'>Sprawdź dojazd</a></div>`,
        pixelOffset: new google.maps.Size(0, -10)
    })})

	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: { lat: 51.1181407, lng: 17.0240905 },
        mapId: '77544c86d12f69ec'
	});

	const pins = places.map(place => {
		return new google.maps.Marker({
			position: { lat: place.location.lat, lng: place.location.lng },
			animation: google.maps.Animation.DROP,
			map: map,
            icon: './src/img/red-pin.png',            
		});
	});

	pins.forEach((pin,i)=>pin.addListener('click', () => {
		infoWindows[i].close();
		infoWindows[i].open(pin.getMap(), pin);
	}))

	pins.forEach(pin=>pin.addListener('mouseover', () => toggleBounce(pin)))
	pins.forEach(pin=>pin.addListener('mouseout', () => toggleBounce(pin)))
	
}

function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
        marker.setIcon('./src/img/red-pin.png')
	} else {
        marker.setIcon('./src/img/yellow-pin.png')
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

window.initMap = initMap;
