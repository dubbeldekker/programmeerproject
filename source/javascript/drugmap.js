// programmeerproject
// Marije Dekker, 10785949

// global variables
var chosenCountry;
var drugCountry;
var json = "json/drug/amfetamineuse.json"
// initiate choroplethmap
var map = new Datamap({
	element: document.getElementById('map'),
	// europe
  setProjection: function(element) {
      var projection = d3.geo.equirectangular()
        .center([20, 15])
        .rotate([4, 0])
        .scale(675)
        .translate([element.offsetWidth / 2, element.offsetHeight + 200]);
      var path = d3.geo.path()
        .projection(projection);
      return {path: path, projection: projection};
  },
  // fillcolors
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
  },
  // tooltips
  geographyConfig: {
    borderColor: 'grey',
    popupTemplate: function(geo, data) {
      if (!data) { return['<div class="hoverinfo">',
        'There is no data of ' + geo.properties.name ,
        '</div>'].join(''); 
      }
      if (data.percentage == undefined) {
        return['<div class="hoverinfo">',
        'There is no data of ' + geo.properties.name ,
        '</div>'].join('');
      }
      return ['<div class="hoverinfo">',
        'In ' + geo.properties.name + ' '
        + data.percentage,  '% of the population use this drug',
        '</div>'].join('');
    } 
  },
  // make piechart
  done: function(datamap) {
    datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
      drugCountry = (geography.id);
      chosenCountry = (geography.properties.name);
      makePiechart(drugCountry, chosenCountry);
    });
  }
});
// legend
map.legend({
  defaultFillName: "No data",
  labels: {
      D1: "0,0% - 0,2%",
      D2: "0,2% - 0,4%",
      D3: "0,4% - 0,6%",
      D4: "0,6% - 0,8%",
      D5: "0,8% - 1,0%",
      D6: "1,0% - 1,2%",
      D7: "1,2% - 1,4%",
      D8: "1,4% - 1,6%",
      D9: "1,6% <"
    }
});
// if a drug is chosen
d3.selectAll(".drugMenu")
  .on("change", function() {
    json = d3.select(this).property("value");
    updateMap(json);
  });
// fill map on load
updateMap(json);
// update map fill colors and tooltip
function updateMap(json){
  map.updateChoropleth(null, {reset: true})
  d3.json(json, function(error, data) {
    if (error) throw error;
    for (i in data) {
      var fillKey = {};
      var update = {};
      fillKey["percentage"] = data[i].bestEstimate;
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
      if (data[i].bestEstimate < 0.2) {
        fillKey["fillKey"] = "D1";
        update[data[i].countrycode] = fillKey;
        map.updateChoropleth(update);
      }
      if ((data[i].bestEstimate >= 0.2) && (data[i].bestEstimate < 0.4)) {
        fillKey["fillKey"] = "D2";
        update[data[i].countrycode] = fillKey;
        map.updateChoropleth(update);
      }
      if ((data[i].bestEstimate >= 0.4) && (data[i].bestEstimate < 0.6)) {
        fillKey["fillKey"] = "D3";
        update[data[i].countrycode] = fillKey;
        map.updateChoropleth(update);
      }
      if ((data[i].bestEstimate >= 0.6) && (data[i].bestEstimate < 0.8)) {
        fillKey["fillKey"] = "D4";
        update[data[i].countrycode] = fillKey;
        map.updateChoropleth(update);
      }
      if ((data[i].bestEstimate >= 0.8) && (data[i].bestEstimate < 1)) {
        fillKey["fillKey"] = "D5";
        update[data[i].countrycode] = fillKey;
        map.updateChoropleth(update);
      }
      if ((data[i].bestEstimate >= 1) && (data[i].bestEstimate < 1.2)) {
        fillKey["fillKey"] = "D6";
        update[data[i].countrycode] = fillKey;
        map.updateChoropleth(update);
      }
      if ((data[i].bestEstimate >= 1.2) && (data[i].bestEstimate < 1.4)) {
        fillKey["fillKey"] = "D7";
        update[data[i].countrycode] = fillKey;
        map.updateChoropleth(update);
      }
      if ((data[i].bestEstimate >= 1.4) && (data[i].bestEstimate < 1.6)) {
        fillKey["fillKey"] = "D8";
        update[data[i].countrycode] = fillKey;
        map.updateChoropleth(update);
      }
      if (data[i].bestEstimate >= 1.6) {
        fillKey["fillKey"] = "D9";
        update[data[i].countrycode] = fillKey;
        map.updateChoropleth(update);
      }
    }
  })
}