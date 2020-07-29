async function init() {
  const dataAfrica = await d3.csv("./resources/africa.csv");

  dataAfrica.forEach(function (d) {
    year = d.year;
    age = d.age;
  });


  const dataAmerica = await d3.csv("./resources/americas.csv");

  dataAmerica.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

  const dataAsia = await d3.csv("./resources/asia.csv");

  dataAsia.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

    const dataEurope = await d3.csv("./resources/europe.csv");

  dataEurope.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

    const dataLatin = await d3.csv("./resources/latin-america.csv");

  dataLatin.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

    const dataNorthAmerica = await d3.csv("./resources/north-america.csv");

  dataNorthAmerica.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

    const dataOceania = await d3.csv("./resources/oceania.csv");

  dataOceania.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

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
  var y = d3.scaleLinear().domain([35, 80]).range([height, 0]);
  svg.append("g").attr("transform", "translate(10,0 )").call(d3.axisLeft(y)).style("font-size","10px");
  svg.append("text").attr("transform", "rotate(-90)").attr("y", 0 - margins.left +15).attr("x", 0 - (height / 2)).attr("dy", "1em").style("text-anchor", "middle")
      .text("Life Expectancy (at birth)");

  svg.append("path")
  .attr("transform", "translate(10,0)")
    .datum(dataAfrica).transition().duration(700)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(d.age) })
    );

    svg.append("path")
  .attr("transform", "translate(10,0)")
    .datum(dataAmerica).transition().duration(700)
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(d.age) })
    );

        svg.append("path")
  .attr("transform", "translate(10,0)")
    .datum(dataAsia).transition().duration(700)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(d.age) })
    );

        svg.append("path")
  .attr("transform", "translate(10,0)")
    .datum(dataEurope).transition().duration(700)
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(d.age) })
    );

        svg.append("path")
  .attr("transform", "translate(10,0)")
    .datum(dataLatin).transition().duration(700)
    .attr("fill", "none")
    .attr("stroke", "orange")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(d.age) })
    );

        svg.append("path")
  .attr("transform", "translate(10,0)")
    .datum(dataNorthAmerica).transition().duration(700)
    .attr("fill", "none")
    .attr("stroke", "brown")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(d.age) })
    );

        svg.append("path")
  .attr("transform", "translate(10,0)")
    .datum(dataOceania).transition().duration(700)
    .attr("fill", "none")
    .attr("stroke", "magenta")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(d.age) })
    );

    svg
    .append("text")
    .attr("x", 300)
    .attr("y", 400)
    .text("Obs:North America has highest life expectancy and Africa has the lowest.")
    .style("font-size", "15px");

}