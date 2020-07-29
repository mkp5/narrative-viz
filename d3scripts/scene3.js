async function init() {
  var selectedCountry = 'Afghanisthan';
  var margins = { top: 50, right: 100, bottom: 80, left: 50 },
    width = 960 - margins.left - margins.right,
    height = 650 - margins.top - margins.bottom;

  function reloadData(selectedGroup) {
    console.log('reload data for selected country');
    var dataFilter = data.filter(function(d){return d.country==selectedGroup});
    console.log('selectedGroup'+selectedGroup);
    selectedCountry = selectedGroup;
    line.datum(dataFilter).transition().duration(1000).attr("d", d3.line().x(function(d) { return x(d.year) }).y(function(d) { return y(+d.value) }))
        .attr("stroke", "blue")
  }
  function mouseOver() {
    focus.style("opacity", 1);
    focusText.style("opacity",1);
    focusTextworld.style("opacity",1);
  }

  function mouseMove() {
    var xtemp = x.invert(d3.mouse(this)[0]);
    var tmp = data.filter(function(d){return d.country==selected1})
    var i = bisect(tmp, xtemp, 1);
    selectedData = tmp[i];
    console.log(selectedData);
    focus.attr("cx", x(selectedData.year)).attr("cy", y(selectedData.value)+3).attr('r',4);
    var tm = parseFloat(selectedData.value);
    console.log(tm.toFixed(2));
    focusText.html("Year:" + selectedData.year + ";  " + selectedCountry+":" + tm.toFixed(2) +" yrs").attr("x", x(selectedData.year) - 25).attr("y", y(selectedData.value) + 40);
    focusTextworld.html("World:" + worldjson[selectedData.year]+" yrs.").attr("x", x(selectedData.year) - 25).attr("y", y(selectedData.value) + 75);
    //console.log(worlddata);
  }

  function mouseOut() {
    focus.style("opacity", 0);
    focusText.style("opacity", 0);
    focusTextworld.style("opacity", 0);
  }

  var svg = d3.select("#scene_3").append("svg").attr("width", width + margins.left + margins.right).attr("height", height + margins.top + margins.bottom)
    .append("g").attr("transform","translate(" + margins.left + "," + margins.top + ")");

  const worlddata = await d3.csv("./resources/world-life-expectancy-at-birth.csv");
  worlddata.forEach(function (d) {
    year = d.year;
    age = d.age;
  })
  var worldjson = {};
  var i;
    for (i = 0; i < worlddata.length; i++) {
      worldjson[worlddata[i].year] = worlddata[i].age;
    }
    //console.log(worldjson);

  //console.log('worlddata.size'+worlddata[0].year);
  const data = await d3.csv("./resources/countries-life-expectancy.csv");

  var selected1 = new Object();
  var allGroup = d3.map(data, function(d){return(d.country)}).keys()
  selected1 = allGroup[0];
  var allYear = d3.map(data, function(d){return(d.year)}).keys()

  d3.select("#drop_down").selectAll('myOptions').data(allGroup).enter().append('option').text(function (d) { return d; })
    .attr("value", function (d) { return d; });

  var newColor = d3.scaleOrdinal().domain(allGroup).range(d3.schemeSet2);

  var x = d3.scaleLinear().domain([1962,2018]).range([0, width]);

  svg.append("g").attr("transform", "translate(10," + height + ")")
      .call(d3.axisBottom(x).tickValues([1962,1966,1970,1974,1978,1982,1986,1990,1994,1998,2002,2006,2010,2014,2018]).tickFormat(d3.format("d")))
      .style("font-size","10px");

 svg.append("text").attr("transform","translate(" + (width/2) + " ," +(height + margins.top ) + ")").style("text-anchor", "middle").text("Birth Year");

 var y = d3.scaleLinear().domain([25, d3.max(data, function(d) { return +d.value; })]).range([ height, 0 ]);
 svg.append("g").attr("transform", "translate(10,0 )").call(d3.axisLeft(y)).style("font-size","10px");

     svg.append("path").attr("transform", "translate(10,0)").datum(worlddata).attr("fill", "none").attr("stroke", "black").attr("stroke-dasharray", ("3, 3")).attr("stroke-width", 2.5).attr("d", d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(d.age) })
    )

 svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - margins.left).attr("x", 0 - (height / 2)).attr("dy", "1em")
    .style("text-anchor", "middle").text("Life Expectancy (at birth)");

  var line = svg.append('g').append("path").attr("transform", "translate(10,0 )")
      .datum(data.filter(function(d){return d.country==allGroup[0]}))
      .attr("d", d3.line().x(function(d) { return x(d.year) }).y(function(d) { return y(+d.value) }))
      .attr("stroke", "blue")
      .style("stroke-width", 2).style("fill", "none")

  var bisect = d3.bisector(function(d) { return d.year; }).left;

  var focus = svg.append('g').append('circle').style("fill", "black").attr("stroke", "black").attr('r', 4).style("opacity", 0);

  var focusText = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'black')
  var focusTextworld = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'black')
  d3.select("#drop_down").on("change", function(d) {
      var newOption = d3.select(this).property("value");
      selected1 = newOption;
      reloadData(newOption);
  })
  svg.append('rect').style("fill", "none").style("pointer-events", "all").attr('width', width).attr('height', height)
    .on('mousemove', mouseMove).on('mouseout', mouseOut).on('mouseover', mouseOver);

}