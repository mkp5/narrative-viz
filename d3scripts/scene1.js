async function init() {
  const data = await d3.csv("./resources/world-life-expectancy-at-birth.csv");

  data.forEach(function (d) {
    year = d.year;
    age = d.age;
  })

  var worldjson = {};
  var i;
    for (i = 0; i < data.length; i++) {
      worldjson[data[i].year] = data[i].age;
    }
    //console.log(worldjson);

  var margins = { top: 50, right: 100, bottom: 80, left: 50 };
  width = 960 - margins.left - margins.right;
  height = 650 - margins.top - margins.bottom;

  var svg = d3.select("#scene_1")
    .append("svg")
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom)
    .append("g")
    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

  var x = d3.scaleLinear().domain([1962,2018]).range([0, width ]);

  //Set the tick values for x-axis from 1962 to display the years evenly with 4 years difference.
  svg.append("g").attr("transform", "translate(10," + height + ")")
    .call(d3.axisBottom(x).tickValues([1962,1966,1970,1974,1978,1982,1986,1990,1994,1998,2002,2006,2010,2014,2018]).tickFormat(d3.format("d")))
    .style("font-size","10px");
  svg.append("text").attr("transform","translate("+(width/2) + "," + (margins.top+height-15 ) + ")").style("text-anchor", "middle").text("Birth Year");

  //settings for y-axis
  var y = d3.scaleLinear().domain([54, d3.max(data, function (d) { return +d.age+2; })]).range([height, 0]);
  svg.append("g").attr("transform", "translate(10,0 )").call(d3.axisLeft(y)).style("font-size","10px");
  svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - margins.left +15).attr("x", 0 - (height / 2)).attr("dy", "1em").style("text-anchor", "middle")
      .text("Life Expectancy (at birth)");

  svg.append("path")
  .attr("transform", "translate(10,0)")
    .datum(data).transition().duration(700)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(d.age) })
    )
  svg
    .append("text")
    .attr("x", 300)
    .attr("y", 300)
    .text("Observation:Increasing trend in life expectancy (at birth) across the world.")
    .style("font-size", "15px");

     var focus = svg.append('g').append('circle').style("fill", "black").attr("stroke", "black").attr('r', 4).style("opacity", 0);

  var focusText = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'black');
    console.log(focus);

        svg.append('rect').style("fill", "none").style("pointer-events", "all").attr('width', width).attr('height', height)
    .on('mousemove', mouseMove).on('mouseout', mouseOut).on('mouseover', mouseOver);

function mouseOver() {
    focus.style("opacity", 1);
    focusText.style("opacity",1);
  }

  function mouseMove() {
    var xtemp = x.invert(d3.mouse(this)[0]);
    var yearTmp = parseInt(xtemp,10);
    console.log(yearTmp);
    var ageTmp = worldjson[parseInt(xtemp,10)];
    console.log(ageTmp);
    focus.attr("cx", x(yearTmp)).attr("cy", y(ageTmp)+3).attr('r',4);
    focusText.html("In " + yearTmp + " Life Expectancy is:" + ageTmp +" yrs").attr("x", x(yearTmp) - 25).attr("y", y(ageTmp) + 40);
  }

  function mouseOut() {
    focus.style("opacity", 0);
    focusText.style("opacity", 0);
  }
}