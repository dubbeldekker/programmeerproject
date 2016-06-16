// programmeerproject
// Marije Dekker, 10785949

var width = 650,
    height = 550,
    radius = Math.min(width, height) / 2.5;

var colorPie = d3.scale.ordinal()
    .range(["#ffaa00", "#cccccc", "#33cccc", "#009000", "#cc0000", "#cc6600",]);

var arc = d3.svg.arc()
    .outerRadius(radius * 0.8)
    .innerRadius(radius * 0.45);

var outerArc = d3.svg.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.bestEstimate; });

var svg = d3.select("#piechart")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "pie")
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
svg.append("g")
    .attr("class", "slices");
svg.append("g")
    .attr("class", "labels");
svg.append("g")
    .attr("class", "lines");

var countryDiv = document.getElementById("clickedCountry");
var rawPieData = [];
// make queue
queue()
    .defer(d3.json, 'jsons/drug/amfetamineuse.json')
    .defer(d3.json, 'jsons/drug/cocaineuse.json')
    .defer(d3.json, 'jsons/drug/xtcuse.json')
    .defer(d3.json, 'jsons/drug/opiateuse.json')
    .defer(d3.json, 'jsons/drug/cannabisuse.json')
    .defer(d3.json, 'jsons/drug/opioideuse.json')
    .await(drugData);
// prepare data
function drugData(error, amfetamine, cocaine, xtc, opiate, cannabis, opioide){
    if (error) throw error;
    amfetamine.forEach(function(d){
        rawPieData.push({"countryCode": d.countrycode, "drug": "amfetamine", "bestEstimate": d.bestEstimate})
    });
    cocaine.forEach(function(d){
        rawPieData.push({"countryCode": d.countrycode, "drug": "cocaine", "bestEstimate": d.bestEstimate})
    });
    xtc.forEach(function(d){
        rawPieData.push({"countryCode": d.countrycode, "drug": "XTC", "bestEstimate": d.bestEstimate})
    });    
    opiate.forEach(function(d){
        rawPieData.push({"countryCode": d.countrycode, "drug": "opiates", "bestEstimate": d.bestEstimate})
    });
    cannabis.forEach(function(d){
        rawPieData.push({"countryCode": d.countrycode, "drug": "cannabis", "bestEstimate": d.bestEstimate})
    });
    opioide.forEach(function(d){
        rawPieData.push({"countryCode": d.countrycode, "drug": "opioides", "bestEstimate": d.bestEstimate})
    });
    makePiechart("NLD", "Click on a country in the map. <br> Netherlands");
}
// function to make piechart
function makePiechart(drugCountry, chosenCountry){
    // remove no data text
    d3.selectAll(".removepie").remove();
    // make data
    var pieData = [];
    rawPieData.forEach(function(d){
        if (drugCountry == d.countryCode){
            pieData.push({"drug": d.drug, "bestEstimate": d.bestEstimate});
        }
        countryDiv.innerHTML = (chosenCountry + ":");
    })
    if (pieData.length < 1) {
        countryDiv.innerHTML = ("There is no data of " + chosenCountry + ".");
    }
    var key = function(d){ return d.data.drug; };
    // pie parts
    var slice = svg.select(".slices").selectAll("path.slice")
        .data(pie(pieData), key);
    slice.enter()
        .insert("path")
        .style("fill", function(d) { return colorPie(d.data.drug); })
        .attr("class", "slice");
    slice       
        .transition().duration(750)
        .attrTween("d", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        })
    slice.exit()
        .remove();
     // pielabels
    var text = svg.select(".labels").selectAll("text")
        .data(pie(pieData), key);
    text.enter()
        .append("text")
        .attr("dy", ".35em")
        .text(function(d) {
            return d.data.drug;
        });   
    function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
    }
    text.transition().duration(800)
        .attrTween("transform", function(d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate("+ pos +")";
            };
        })
        .styleTween("text-anchor", function(d){
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                return midAngle(d2) < Math.PI ? "start":"end";
            };
        });
    text.exit()
        .remove();
    // lines between pie and label
    var polyline = svg.select(".lines").selectAll("polyline")
        .data(pie(pieData), key);
    polyline.enter()
        .append("polyline");
    polyline.transition().duration(750)
        .attrTween("points", function(d){
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * 0.99 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };          
        });
    polyline.exit()
        .remove();
}