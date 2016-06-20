// programmeerproject
// Marije Dekker, 10785949

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 500 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


var jsonInfluence = "jsons/influence/dropout.json";
var jsonDrug = "jsons/drug/amfetamineuse.json";

queue()
    .defer(d3.json, jsonInfluence)
    .defer(d3.json, jsonDrug)
    .await(makePlot);

d3.selectAll(".scatterinfluencemenu")
  .on("change", function() {
    d3.selectAll(".removeScatter").remove();
    jsonInfluence = d3.select(this).property("value");
    queue()
	    .defer(d3.json, jsonInfluence)
	    .defer(d3.json, jsonDrug)
	    .await(makePlot);
	});
d3.selectAll(".scatterdrugmenu")
	.on("change", function() {
    d3.selectAll(".removeScatter").remove();
    jsonDrug = d3.select(this).property("value");
    //updateMap(jsonDrug);
    queue()
	    .defer(d3.json, jsonInfluence)
	    .defer(d3.json, jsonDrug)
	    .await(makePlot);
});

function makePlot(error, influence, drug){
  var plotData =[];
  if (error) throw error;
  influence.forEach(function(d){
    for(i in drug){
      if (d.countrycode == drug[i].countrycode){
        plotData.push({"countrycode":d.countrycode, "country": d.country, "influence": d.influence, "drug": drug[i].bestEstimate})
      }
    };
  });
  
  x.domain(d3.extent(plotData, function(d) { return d.influence; })).nice();
  y.domain(d3.extent(plotData, function(d) { return d.drug; })).nice();
  
  chart.append("g")
      .attr("class", "x axis removeScatter")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("%");

  chart.append("g")
      .attr("class", "y axis removeScatter")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("%")

 chart.selectAll(".dot")
      .data(plotData)
    .enter().append("circle")
      .attr("class", "dot removeScatter onHover")
      .attr("r", 7.5)
      .attr("cx", function(d) { return x(d.influence); })
      .attr("cy", function(d) { return y(d.drug); })
      .style("fill",'#dd3497' )
      .on("click", function(d){
        makePiechart(d.countrycode, d.country);
      })
       .on("mouseover", function(d) {
          d3.select(this)
            .attr("r", 10)
            .style("fill", '#49006a')
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(d.country + "<br> influence: " + d.influence + "%<br> drug: " + d.drug + "%<br>")
            .style("left", (d3.event.pageX + 12) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
        })
      .on("mouseout", function(d) {
          d3.select(this)
            .attr("r", 7.5)
            .style("fill", '#dd3497')
          tooltip.transition()
            .duration(500)
            .style("opacity", 0)
      });
};