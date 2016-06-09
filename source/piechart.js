// Marije Dekker
var width = 550,
    height = 550,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#ff5555", "#55ffff", "#55b9ff", "#d559ff", "#5555ff", "#ff55ff"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var labelArc = d3.svg.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.bestEstimate; });

var svg = d3.select("#piechart")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "pie")
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var rawData = [];

queue()
    .defer(d3.json, 'jsons/drug/amfetamineuse.json')
    .defer(d3.json, 'jsons/drug/cannabisuse.json')
    .defer(d3.json, 'jsons/drug/cocaineuse.json')
    .defer(d3.json, 'jsons/drug/xtcuse.json')
    .defer(d3.json, 'jsons/drug/opiateuse.json')
    .defer(d3.json, 'jsons/drug/opioideuse.json')
    .await(drugdata);

function drugdata(error, amfetamine, cannabis, cocaine, xtc, opiate, opioide){
    if (error) throw error;
    amfetamine.forEach(function(d){
        rawData.push({"countryCode": d.countrycode, "drug": "amfetamine", "bestEstimate": d.bestEstimate})
    });
    cannabis.forEach(function(d){
        rawData.push({"countryCode": d.countrycode, "drug": "cannabis", "bestEstimate": d.bestEstimate})
    });
    cocaine.forEach(function(d){
        rawData.push({"countryCode": d.countrycode, "drug": "cocaine", "bestEstimate": d.bestEstimate})
    });
    xtc.forEach(function(d){
        rawData.push({"countryCode": d.countrycode, "drug": "XTC", "bestEstimate": d.bestEstimate})
    });
    opiate.forEach(function(d){
        rawData.push({"countryCode": d.countrycode, "drug": "opiates", "bestEstimate": d.bestEstimate})
    });
    opioide.forEach(function(d){
        rawData.push({"countryCode": d.countrycode, "drug": "opioide", "bestEstimate": d.bestEstimate})
    });
    makePiechart("FRA");
}
function makePiechart(drugCountry){
    d3.selectAll(".removepie").remove();
    var data = [];
    rawData.forEach(function(d){
        if (drugCountry == d.countryCode){
            data.push({"drug": d.drug, "bestEstimate": d.bestEstimate});
        }
    })
    if (data.length < 1) {
        
    }
    var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc removepie");

    g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.drug); });

    /*g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .text(function(d) { return d.data.bestEstimate + "%" + d.data.drug;});*/
}