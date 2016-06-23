// programmeerproject
// Marije Dekker, 10785949

// global variables
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

var plot = d3.select("#plot")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
// tooltip
var plotTip = d3.select("body").append("div")
  .attr("class", "plotTip")
  .style("opacity", 0);
// make plot on load page
var jsonInfluence = "json/influence/dropout.json";
var jsonDrug = "json/drug/amfetamineuse.json";
queue()
  .defer(d3.json, jsonInfluence)
  .defer(d3.json, jsonDrug)
  .await(makePlot);
// change plot 
d3.selectAll(".plotInfluenceMenu")
  .on("change", function() {
    jsonInfluence = d3.select(this).property("value");
    queue()
	    .defer(d3.json, jsonInfluence)
	    .defer(d3.json, jsonDrug)
	    .await(makePlot);
	});
d3.selectAll(".plotDrugMenu")
	.on("change", function() {
    jsonDrug = d3.select(this).property("value");
    queue()
	    .defer(d3.json, jsonInfluence)
	    .defer(d3.json, jsonDrug)
	    .await(makePlot);
});
// make the plot
function makePlot(error, influence, drug) {
  // remove old plot
  d3.selectAll(".removeScatter").remove();
  // show the right influence information
  if(jsonInfluence == "json/influence/dropout.json") {
    $("#dropout").show();
  } else {
    $("#dropout").hide();
  }
  if(jsonInfluence == "json/influence/education.json") {
    $("#education").show();
  } else {
    $("#education").hide();
  }
  if(jsonInfluence == "json/influence/poverty.json") {
    $("#poverty").show();
  } else {
    $("#poverty").hide();
  }
  if(jsonInfluence == "json/influence/prison.json") {
    $("#prison").show();
  } else {
    $("#prison").hide();
  }
  if(jsonInfluence == "json/influence/smoke.json") {
    $("#smoking").show();
  } else {
    $("#smoking").hide();
  }
  if(jsonInfluence == "json/influence/unemployment.json") {
    $("#unemployment").show();
  } else {
    $("#unemployment").hide();
  }
  // make data for the plot
  var plotData =[];
  if (error) throw error;
  influence.forEach(function(d) {
    for(i in drug) {
      if (d.countrycode == drug[i].countrycode) {
        plotData.push({"countrycode":d.countrycode, "country": d.country, "influence": d.influence, "drug": drug[i].bestEstimate})
      }
    };
  });
  x.domain(d3.extent(plotData, function(d) { 
    return d.influence; 
  })).nice();
  y.domain(d3.extent(plotData, function(d) { 
    return d.drug; 
  })).nice();
  // axes
  plot.append("g")
      .attr("class", "x axis removeScatter")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .attr("dx", "-20em")
      .attr("dy", "3.3em")
      .style("text-anchor", "end")
      .text("(in %)");
  plot.append("g")
      .attr("class", "y axis removeScatter")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(90)")
      .attr("y", 6)
      .attr("dy", "2.9em")
      .attr("dx", "16.5em")
      .style("text-anchor", "end")
      .text("(in %)")
  // make dots
  plot.selectAll(".dot")
      .data(plotData)
    .enter().append("circle")
      .attr("class", "dot removeScatter onHover")
      .attr("r", 7.5)
      .attr("cx", function(d) { return x(d.influence); })
      .attr("cy", function(d) { return y(d.drug); })
      .style("fill",'#dd3497' )
      // make on click the donutchart
      .on("click", function(d){
        makePiechart(d.countrycode, d.country);
      })
      // make tooltip
      .on("mouseover", function(d) {
        d3.select(this)
          .attr("r", 9)
          .style("fill", '#49006a')
        plotTip.transition()
          .duration(200)
          .style("opacity", .9);
        plotTip.html(d.country + "<br> influence: " + d.influence + "%<br> drug: " + d.drug + "%<br>")
          .style("left", (d3.event.pageX + 12) + "px")
          .style("top", (d3.event.pageY - 28) + "px")
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .attr("r", 7.5)
          .style("fill", '#dd3497')
        plotTip.transition()
          .duration(500)
          .style("opacity", 0)
      });
};