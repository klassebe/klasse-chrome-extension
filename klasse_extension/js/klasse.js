$( document ).ready(function() {
    console.log( "ready!" );
    $(".refresh img").show();
    newimage();  
	if (navigator.geolocation){   
	    navigator.geolocation.getCurrentPosition(geolocated, geoerror);
	}
});

function newimage(nr = 0) {
	if (0 == nr) {
		nr = 1 + Math.floor(Math.random() * 43);
		var imgurl = './img/loesje_' + nr + '.jpg'
		console.log( imgurl );
    	$(".poster").css('background-image', 'url(\'' + imgurl + '\')');
	}
}

$(".refresh").click( function(e) {
	showvoordeel( window.nearlocations );
	newimage();
});

function showvoordeel( locationsarray ) {

	var randloc = locationsarray[Math.floor(Math.random() * locationsarray.length)];

	var tiphtml = '<a href="https://www.klasse.be/?post_type=voordelen-aanbod&p=' + randloc.ID + '">'+randloc.post_title+'</a>';

	console.log( tiphtml );

	$("#lktipcontent").html( tiphtml );

}

/* geo stuff */

function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

// Converts numeric degrees to radians
function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

function calcdistances( json ) {
	window.nearlocations = [];
	for ( var addr in json ) {
		if ( null == json[addr].coords ) {
			console.log( json[addr].post_title );
		} else {
			var latlong = json[addr].coords.split(",");
			var distance = calcCrow(
				latlong[0],
				latlong[1],
				window.latitude,
				window.longitude
			);
			if ( distance < 10 ) {
				window.nearlocations.push( json[addr] );
				//console.log( json[addr].post_title );
			}
		}
		//console.log( latlong );
	}
}

function geolocated( position ) {
	window.latitude  = position.coords.latitude;
	window.longitude = position.coords.longitude;
	console.log(window.latitude);
	console.log(window.longitude);
	$.getJSON("./voordelen.json", function(json) {
		calcdistances( json );
		showvoordeel( window.nearlocations );
	} );
}

function geoerror() {
    console.log("no location");
}


/** 

here be geolocation code, to be used laterz

function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
	console.log(latitude);
	console.log(longitude);
}


function error() {
    console.log("no location");
}

if (!navigator.geolocation){   
    console.log("no location possible");
}

navigator.geolocation.getCurrentPosition(success, error);
*/