// Marije Dekker
var map = new Datamap({
	element: document.getElementById('container'),
	// europe
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
  },
  // tooltip
  geographyConfig: {
      popupTemplate: function(geo, data) {
        if (!data) { return['<div class="hoverinfo">',
          'Of ' + geo.properties.name + ' is no data',
          '</div>'].join(''); 
        }
        return ['<div class="hoverinfo">',
          'In ' + geo.properties.name + ' '
          + data.percentage,  '% of the population use ' + data.drug,
          '</div>'].join('');
      } 
    }
});
d3.selectAll(".drug")
  .on("click", function() {
    map.updateChoropleth(null, {reset: true})
    var drug = this.getAttribute("value");
    var json;
    if(drug == "amfetamine"){
      json = "jsons/drug/amfetamineuse.json";
      document.getElementById("sortdrug").innerHTML = "drug: amfetamine";
    }
    if(drug == "cannabis"){
      json = "jsons/drug/cannabisuse.json";
      document.getElementById("sortdrug").innerHTML = "drug: cannabis";;
    }
    if(drug == "cocaine"){
      json = "jsons/drug/cocaineuse.json";
      document.getElementById("sortdrug").innerHTML = "drug: cocaine";;
    }
    if(drug == "XTC"){
      json = "jsons/drug/xtcuse.json";
      document.getElementById("sortdrug").innerHTML = "drug: XTC";;
    }
    if(drug == "opiates"){
      json = "jsons/drug/opiateuse.json";
      document.getElementById("sortdrug").innerHTML = "drug: opiates";;
    }
    if(drug == "opioides"){
      json = "jsons/drug/opioideuse.json";
      document.getElementById("sortdrug").innerHTML = "drug: opioides";;
    }
  d3.json(json, function(error, data){
    if (error) throw error;
    for (i in data) {
      var fillKey = {};
      var update = {};
      fillKey["percentage"] = data[i].bestEstimate;
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
      fillKey["drug"] = drug;
      update[data[i].countrycode] = fillKey;
      map.updateChoropleth(update);
      if (data[i].bestEstimate < 0.2){
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
      if (data[i].bestEstimate >= 1.6){
        fillKey["fillKey"] = "D9";
        update[data[i].countrycode] = fillKey;
        map.updateChoropleth(update);
      }
    }
  })
});