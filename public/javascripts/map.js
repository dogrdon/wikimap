var map;
var pointsLayer;
var markerMap = {};



		$(document).ready(function(){
			
			map = new L.Map('mapContainer');
			var url = 'http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-streets/{z}/{x}/{y}.png';
			
			var copyright = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';
			var tileLayer = new L.TileLayer(url, {attribution:copyright});
			
			//var startPosition = new L.LatLng(42.33143, -83.04575);//detroit
			var startPosition = new L.LatLng(41.883333, -87.633333);//chicago
			//var startPosition = new L.LatLng(40.7143528, -74.0059731);//new york
		
			map.on('load', function(){
				console.log("loading...");
				requestUpdatedPoints();
			
			});

			map.setView(startPosition, 13).addLayer(tileLayer);

			map.on('moveend', function(){
				requestUpdatedPoints();
			});


			//////////////
			/// WRONG ADDITION OF ADDING KEYWORD SEARCH
			//////////////
			$('a#submitSearch').on('click', function(e){
				e.preventDefault();
				keyword = '';
				keyword = $('input#keyword').val();
				alert(keyword);
				requestUpdatedPoints(keyword);
				//the problem is, with this reload(), the keyword is resetting to what's in map.on('load'...)
				location.reload();

			});
		});

		function requestUpdatedPoints(keyword){
			$.ajax({
				type: 'GET',
				url: 'http://api.infochimps.com/encyclopedic/wikipedia/dbpedia/wikipedia_articles/search?g.radius=100000&g.latitude=41.883333&g.longitude=-87.633333&f.q=chicago&apikey=droquo-_c5lTgLrIBuMeK88eT-4-lYca69',
				dataType: 'jsonp',
				//data: JSON.stringify(data),
				contentType: 'application/json; charset=utf-8',
				success: function(result){
					console.log(result);
					for( var i=0; i<result.results.length - 1; i++ ){
						
						console.log("adding " + result.results[i].wikipedia_id + " to the map")
						

						var marker = L.marker([result.results[i].coordinates[1], result.results[i].coordinates[0]]).addTo(map);
						marker.bindPopup('<a href="'+result.results[i].url+'" target="_blank">'+result.results[i].wikipedia_id+'</a>');
					}
				},
				error: function(){
					alert('check your error log.');
				}
			});
		}


		

