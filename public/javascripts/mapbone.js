$(function(){
	var map;
	var pointsLayer;
	var markerMap = {};


	var Wiki = Backbone.Model.extend();

	var Wikis = Backbone.Collection.extend({
		model: Wiki,
		url: 'http://api.infochimps.com/encyclopedic/wikipedia/dbpedia/wikipedia_articles/search?g.radius=100000&g.latitude=41.883333&g.longitude=-87.633333&f.q=chicago&apikey=droquo-_c5lTgLrIBuMeK88eT-4-lYca69',
		parse: function(response){
			console.log('parsing wiki results...');
			console.log(response.results);
			return response.results;
		}
	});

	var PageView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click button#searchButton': 'doSearch'
		},

		initialize: function(){
			_.bindAll(this, 'render', 'addThing');
			this.wikis = new Wikis();
			_this = this;
			this.wikis.bind('reset', function(collection){
				//clear map
				_this.$('#wikiResults').empty();
				collection.each(function(wiki){
					console.log(wiki);
					_this.addThing(wiki);
				});
			});


			map = new L.Map('mapContainer');
			var url = 'http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-streets/{z}/{x}/{y}.png';
			
			var copyright = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';
			var tileLayer = new L.TileLayer(url, {attribution:copyright});
			
			//var startPosition = new L.LatLng(42.33143, -83.04575);//detroit
			var startPosition = new L.LatLng(41.883333, -87.633333);//chicago
			//var startPosition = new L.LatLng(40.7143528, -74.0059731);//new york
			map.setView(startPosition, 13).addLayer(tileLayer);

			// map.on('load', function(){
			// 	console.log("loading...");
			// 	this.requestUpdatedPoints();
			
			// });
		

		},

		render: function(){
		 	return this;
		},

		// requestUpdatedPoints: function(){
		// 	$.ajax({
		// 		type: 'GET',
		// 		url: 'http://api.infochimps.com/encyclopedic/wikipedia/dbpedia/wikipedia_articles/search?g.radius=100000&g.latitude=41.883333&g.longitude=-87.633333&f.q=chicago&apikey=droquo-_c5lTgLrIBuMeK88eT-4-lYca69',
		// 		dataType: 'jsonp',
		// 		//data: JSON.stringify(data),
		// 		contentType: 'application/json; charset=utf-8',
		// 		success: function(result){
		// 			console.log(result);
		// 			for( var i=0; i<result.results.length - 1; i++ ){
						
		// 				console.log("adding " + result.results[i].wikipedia_id + " to the map")
						

		// 				var marker = L.marker([result.results[i].coordinates[1], result.results[i].coordinates[0]]).addTo(map);
		// 				marker.bindPopup('<a href="'+result.results[i].url+'" target="_blank">'+result.results[i].wikipedia_id+'</a>');
		// 			}
		// 		},
		// 		error: function(){
		// 			alert('check your error log.');
		// 		}
		// 	});
		// },

		doSearch: function(){
			alert('thanks for clickn');
			var keyword = $('#searchForm').val() || 'history';
			this.wikis.url = 'http://api.infochimps.com/encyclopedic/wikipedia/dbpedia/wikipedia_articles/search?g.radius=100000&g.latitude=41.883333&g.longitude=-87.633333&f.q='+ keyword +'&apikey=droquo-_c5lTgLrIBuMeK88eT-4-lYca69';
			this.wikis.fetch();
		},

		addThing: function(thing){
			_this = this;
			$('ul', this.el).append("<li>" + thing.get('_domain_id') + "</b>:<br /> " + thing.get('description') + "</li>");

		}
	});
	var pageView = new PageView();
});