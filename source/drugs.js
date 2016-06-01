var map = new Datamap({
	element: document.getElementById('container'),
	setProjection: function(element) {
      var projection = d3.geo.equirectangular()
        .center([23, 10])
        .rotate([4.4, 0])
        .scale(600)
        .translate([element.offsetWidth / 2, element.offsetHeight + 200]);
      var path = d3.geo.path()
        .projection(projection);
      return {path: path, projection: projection};
    },
	fills: {
    D1: '#fff7f3',
    D2: '#fde0dd',
    D3: '#fcc5c0',
    D4: '#fa9fb5',
    D5: '#f768a1',
    D6: '#dd3497',
    D7: '#ae017e',
    D8: '#7a0177',
    D9: '#49006a',
	  defaultFill: '#666666'
  }
});

d3.json("jsons/drug/cannabisuse.json", function(error, data){
  if (error) throw error;

  for (i in data) {
    var fillKey = {};
    var update = {};
    if (data[i].bestEstimate <= 0.99){
      fillKey["fillKey"] = "D1";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
    if ((data[i].bestEstimate >= 1) && (data[i].bestEstimate <= 1.99)) {
      fillKey["fillKey"] = "D2";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
    if ((data[i].bestEstimate >= 2) && (data[i].bestEstimate <= 2.99)) {
      fillKey["fillKey"] = "D3";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
    if ((data[i].bestEstimate >= 3) && (data[i].bestEstimate <= 3.99)) {
      fillKey["fillKey"] = "D4";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
    if ((data[i].bestEstimate >= 4) && (data[i].bestEstimate <= 4.99)) {
      fillKey["fillKey"] = "D5";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
    if ((data[i].bestEstimate >= 5) && (data[i].bestEstimate <= 5.99)) {
      fillKey["fillKey"] = "D6";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
    if ((data[i].bestEstimate >= 6) && (data[i].bestEstimate <= 6.99)) {
      fillKey["fillKey"] = "D7";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
    if ((data[i].bestEstimate >= 7) && (data[i].bestEstimate <= 7.99)) {
      fillKey["fillKey"] = "D8";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
    if (data[i].bestEstimate >= 8){
      fillKey["fillKey"] = "D9";
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
    }
  }
})