async function init() {
  var margins = { top: 50, right: 100, bottom: 80, left: 50 },
    width = 960 - margins.left - margins.right,
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

      var data_male_json = {};
  var i;
    for (i = 0; i < data_male.length; i++) {
      data_male_json[data_male[i].year] = data_male[i].age;
    }
    //console.log(data_male_json);


    svg.append("path").attr("transform", "translate(10,0 )").datum(data_male).attr("fill", "none").attr("stroke", "blue")
      .attr("stroke-width", 2)
      .attr("d", d3.line().x(function (d) { return x(d.year) }).y(function (d) { return y(d.age) })
      );

    const data_female = await d3.csv("./resources/female-life-expectancy.csv");
    data_female.forEach(function (d) {
      year = d.year;
      age = d.age;
    });

          var data_female_json = {};
  var i;
    for (i = 0; i < data_female.length; i++) {
      data_female_json[data_female[i].year] = data_female[i].age;
    }
    //console.log(data_female_json);

    svg.append("path").attr("transform", "translate(10,0 )").datum(data_female).attr("fill", "none").attr("stroke", "purple").attr("stroke-width", 2.5)
      .attr("d", d3.line().x(function (d) { return x(d.year) }).y(function (d) { return y(d.age) }));
   svg
    .append("text")
    .attr("x", 25)
    .attr("y", 25)
    .text("1.Female Life expectancy is higher than Male.")
    .style("font-size", "12px");
  svg
    .append("text")
    .attr("x", 25)
    .attr("y", 45)
    .text("2.Both Male and Female have increasing trend.")
    .style("font-size", "12px");

  svg
    .append("text")
    .attr("x", 25)
    .attr("y", 65)
    .text("3.Change is female life expectancy is 34.82%")
    .style("font-size", "12px");
  svg
    .append("text")
    .attr("x", 25)
    .attr("y", 85)
    .text("4.Change is male life expectancy is 36.38%")
    .style("font-size", "12px");

    var focus = svg.append('g').append('circle').style("fill", "black").attr("stroke", "black").attr('r', 4).style("opacity", 0);
    var focusfemale = svg.append('g').append('circle').style("fill", "purple").attr("stroke", "purple").attr('r', 4).style("opacity", 0);

  var focusTextMale = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'blue');
  var focusTextFemale = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'purple');

        svg.append('rect').style("fill", "none").style("pointer-events", "all").attr('width', width).attr('height', height)
    .on('mousemove', mouseMove).on('mouseout', mouseOut).on('mouseover', mouseOver);

function mouseOver() {
    focus.style("opacity", 1);
    focusfemale.style("opacity", 1);
    focusTextMale.style("opacity",1);
    focusTextFemale.style("opacity",1);
  }

  function mouseMove() {
    var xtemp = x.invert(d3.mouse(this)[0]);
    var yearTmp = parseInt(xtemp,10);
    console.log(yearTmp);
    var fageTmp = data_female_json[yearTmp];
    var mageTmp = data_male_json[yearTmp];
    console.log(fageTmp);
    console.log(mageTmp);
    var ftmp = parseFloat(fageTmp);
    var mtmp = parseFloat(mageTmp);
    focus.attr("cx", x(yearTmp)).attr("cy", y(mageTmp)+3).attr('r',4);
    focusfemale.attr("cx", x(yearTmp)).attr("cy", y(fageTmp)+3).attr('r',4);
    focusTextMale.html("In " + yearTmp + "- Male          :" + mtmp.toFixed(2) +" yrs").attr("x", 600).attr("y", + 320);
    focusTextFemale.html("In " + yearTmp + "- Female:" + ftmp.toFixed(2) +" yrs").attr("x", 600).attr("y", + 300);
    //console.log(worlddata);
  }

  function mouseOut() {
    focus.style("opacity", 0);
    focusfemale.style("opacity", 0);
    focusTextFemale.style("opacity", 0);
    focusTextMale.style("opacity", 0);
  }

}