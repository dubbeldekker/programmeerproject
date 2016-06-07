// Marije Dekker
var width = 550,
    height = 550,
    radius = Math.min(width, height) / 2;

var color = d3.scale.ordinal()
    .range(["#ff6666", "#d966ff", "#66b3ff", "#66ffff", "#6666ff", "#ff66ff"]);

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
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var druglist = [];
var drugdata = {};

queue()
    .defer(d3.json, 'jsons/drug/amfetamineuse.json')
    .defer(d3.json, 'jsons/drug/cannabisuse.json')
    .defer(d3.json, 'jsons/drug/cocaineuse.json')
    .defer(d3.json, 'jsons/drug/xtcuse.json')
    .defer(d3.json, 'jsons/drug/opiateuse.json')
    .defer(d3.json, 'jsons/drug/opioideuse.json')
    //.awaitAll(drugdata);

function drugdata(error, amfetamine, cannabis, cocaine, xtc, opiate, opioide){
    if (error) throw error;
    for (i in amfetamine){
        if (amfetamine[i].countrycode == "FRA") {
            drugdata["amfetamine"] = amfetamine[i].bestEstimate;
            druglist[0] = "amfetamine";
        }
    }
    console.log(drugdata);

}

d3.json("jsons/drug/xtcuse.json", function(error, data) {
  if (error) throw error;
  data.forEach(function(d){
    d.bestEstimate = +d.bestEstimate;
  });

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.country); });

  /*g.append("text")
      .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
      .text(function(d) { return d.data.country; });*/
});