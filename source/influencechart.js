// Marije Dekker
var margin = {top: 20, right: 30, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
  .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x0)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left");

var chart = d3.select(".chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
 .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var colorBar = d3.scale.ordinal()
  .range(["#4dc9ff", "#dd3497"]);

var jsoninfluence;
var jsonDrug;

d3.selectAll(".influencemenu")
  .on("change", function() {
    d3.selectAll(".removebar").remove();
    jsonInfluence = d3.select(this).property("value");
    jsonDrug = "jsons/drug/xtcuse.json";
    queue()
    .defer(d3.json, jsonInfluence)
    .defer(d3.json, jsonDrug)
    .await(makeBarchart);
});

function makeBarchart(error, influence, drug){
  var barData =[];
  if (error) throw error;
  influence.forEach(function(d){
    for(i in drug){
      if (d.countrycode == drug[i].countrycode){
        barData.push({"country": d.country, "influence": d.influence, "drug": drug[i].bestEstimate})
      }
    };
  });

  var barVariables = d3.keys(barData[0]).filter(function(key) { return key !== "country"; });

  barData.forEach(function(d) {
    d.correlation = barVariables.map(function(name) { return {name: name, value: +d[name]}; });
  });

  x0.domain(barData.map(function(d) { return d.country; }));
  x1.domain(barVariables).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(barData, function(d) { return d3.max(d.correlation, function(d) { return d.value; }); })]);

  chart.append("g")
      .attr("class", "x axis removebar")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(80)")
      .style("text-anchor", "start");

  chart.append("g")
      .attr("class", "y axis removebar")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("%");

  var country = chart.selectAll(".country")
      .data(barData)
    .enter().append("g")
      .attr("class", "country removebar")
      .attr("transform", function(d) { return "translate(" + x0(d.country) + ",0)"; });

  country.selectAll("rect")
      .data(function(d) { return d.correlation; })
    .enter().append("rect")
      .attr("class", "removebar")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return colorBar(d.name); })
      .on('mouseover', function (barData) {
        d3.select(this)
          .style('fill', '#49006a')
      })
      .on('mouseout', function (barData) {
        d3.select(this)
          .style("fill", function(d) { return colorBar(d.name); })
      })
}