var margin = {top: 20, right: 30, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

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

d3.selectAll(".influence")
  .on("click", function() {
    d3.selectAll(".remove").remove();
    var influence = this.getAttribute("value");
    var json;
    if(influence == "dropout"){
      json = "jsons/influence/dropout.json";
      document.getElementById("sortinfluence").innerHTML = "influence: education";
    }
    if(influence == "poverty"){
      json = "jsons/influence/poverty.json";
      document.getElementById("sortinfluence").innerHTML = "influence: poverty";
    }
    if(influence == "criminality"){
      json = "jsons/influence/prison.json";
      document.getElementById("sortinfluence").innerHTML = "influence: criminality";
    }
    if(influence == "smoking"){
      json = "jsons/influence/smoke.json";
      document.getElementById("sortinfluence").innerHTML = "influence: smoking";
    }
    if(influence == "unemployment"){
      json = "jsons/influence/unemployment.json";
      document.getElementById("sortinfluence").innerHTML = "influence: unemployment";
    }
    d3.json(json, function(error, data){
      if (error) throw error;
    x.domain(data.map(function(d) { return d.country; }));
    y.domain([0, d3.max(data, function(d) { return d.influence; })]);

    chart.append("g")
      .attr("class", "x axis remove")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
     .selectAll("text")
      .attr("y", 0)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(80)")
      .style("text-anchor", "start");

    chart.append("g")
        .attr("class", "y axis remove")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(90)")
        .attr("y", 6)
        .attr("dy", "2.2em")
        .attr("dx", "10em")
        .style("text-anchor", "end")
        .text("%" + influence);

    chart.selectAll(".bar")
      .data(data)
     .enter().append("rect")
      .attr("class", "bar remove")
      .attr("x", function(d) { return x(d.country); })
      .attr("y", function(d) { return y(d.influence); })
      .attr("height", function(d) { return height - y(d.influence); })
      .attr("width", x.rangeBand())
      .style({
        'fill': '#dd3497'
        
      })
    .on('mouseover', function (data) {
      d3.select(this)
        .style('fill', '#49006a')
    })
    .on('mouseout', function (data) {
      d3.select(this)
        .style('fill', '#dd3497')
    })
  })
});