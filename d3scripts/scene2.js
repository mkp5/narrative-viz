async function init() {
  var margins = { top: 50, right: 100, bottom: 80, left: 50 },
    width = 960 - margins.left - margins.right,
    //width = 960  - margins.left,
    height = 650 - margins.top - margins.bottom;

  var svg = d3.select("#scene_2")
    .append("svg")
    .attr("width", width + margins.left + margins.right)
    .attr("height", height + margins.top + margins.bottom)
    .append("g")
    .attr("transform","translate(" + margins.left + "," + margins.top + ")");


  const data_world = await d3.csv("./resources/world-life-expectancy-at-birth.csv");
  var y = d3.scaleLinear().domain([50, d3.max(data_world, function (d) { return +d.age+2; })]).range([height, 0]);

  var x = d3.scaleLinear().domain([1962,2018]).range([0, width ]);

    svg.append("g")
      .attr("transform", "translate(10," + height + ")")
      .call(d3.axisBottom(x).tickValues([1962,1966,1970,1974,1978,1982,1986,1990,1994,1998,2002,2006,2010,2014,2018]).tickFormat(d3.format("d")))
      .style("font-size","10px");

   svg.append("text").attr("transform","translate(" + (width/2) + " ," + (height + margins.top ) + ")").style("text-anchor", "middle")
     .text("Birth Year");

    svg.append("g").attr("transform", "translate(10,0 )").call(d3.axisLeft(y)).style("font-size","10px");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margins.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Life Expectancy (at birth)");


    const data_male = await d3.csv("./resources/male-life-expectancy.csv");
    data_male.forEach(function (d) {
      year = d.year;
      age = d.age;
    })

    svg.append("path").attr("transform", "translate(10,0 )").datum(data_male).attr("fill", "none").attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", d3.line().x(function (d) { return x(d.year) }).y(function (d) { return y(d.age) })
      )

    const data_female = await d3.csv("./resources/female-life-expectancy.csv");
    data_female.forEach(function (d) {
      year = d.year;
      age = d.age;
    })

    svg.append("path").attr("transform", "translate(10,0 )").datum(data_female).attr("fill", "none").attr("stroke", "purple").attr("stroke-width", 2.5)
      .attr("d", d3.line().x(function (d) { return x(d.year) }).y(function (d) { return y(d.age) }));
   svg
    .append("text")
    .attr("x", 225)
    .attr("y", 350)
    .text("1.Female Life expectancy is higher than Male;2.Both Male and Female have increasing trend.")
    .style("font-size", "15px");
}