async function init() {
  const dataAfrica = await d3.csv("./resources/africa.csv");

  dataAfrica.forEach(function (d) {
    year = d.year;
    age = d.age;
  });
       var dataAfrica_json = {};
  var i;
    for (i = 0; i < dataAfrica.length; i++) {
      dataAfrica_json[dataAfrica[i].year] = dataAfrica[i].age;
    }

  const dataAmerica = await d3.csv("./resources/americas.csv");

  dataAmerica.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

  var dataAmerica_json = {};
  var i;
    for (i = 0; i < dataAmerica.length; i++) {
      dataAmerica_json[dataAmerica[i].year] = dataAmerica[i].age;
  }

  const dataAsia = await d3.csv("./resources/asia.csv");

  dataAsia.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

  var dataAsia_json = {};
  var i;
    for (i = 0; i < dataAsia.length; i++) {
      dataAsia_json[dataAsia[i].year] = dataAsia[i].age;
    }

    const dataEurope = await d3.csv("./resources/europe.csv");

  dataEurope.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

           var dataEurope_json = {};
  var i;
    for (i = 0; i < dataEurope.length; i++) {
      dataEurope_json[dataEurope[i].year] = dataEurope[i].age;
    }


    const dataLatin = await d3.csv("./resources/latin-america.csv");

  dataLatin.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

           var dataLatin_json = {};
  var i;
    for (i = 0; i < dataLatin.length; i++) {
      dataLatin_json[dataLatin[i].year] = dataLatin[i].age;
    }

    const dataNorthAmerica = await d3.csv("./resources/north-america.csv");

  dataNorthAmerica.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

           var dataNorthAmerica_json = {};
  var i;
    for (i = 0; i < dataNorthAmerica.length; i++) {
      dataNorthAmerica_json[dataNorthAmerica[i].year] = dataNorthAmerica[i].age;
    }



    const dataOceania = await d3.csv("./resources/oceania.csv");

  dataOceania.forEach(function (d) {
    year = d.year;
    age = d.age;
  });

           var dataOceania_json = {};
  var i;
    for (i = 0; i < dataOceania.length; i++) {
      dataOceania_json[dataOceania[i].year] = dataOceania[i].age;
    }

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
    .attr("x", 25)
    .attr("y", 10)
    .text("1.North America has highest life expectancy and Africa has the lowest.")
    .style("font-size", "12px");
    svg
    .append("text")
    .attr("x", 25)
    .attr("y", 25)
    .text("2.Asia and Africa have more than 50% increase in life expectancy over 60 yrs.")
    .style("font-size", "12px");


  var focusBlue = svg.append('g').append('circle').style("fill", "blue").attr("stroke", "blue").attr('r', 4).style("opacity", 0);
  var focusOrange = svg.append('g').append('circle').style("fill", "orange").attr("stroke", "orange").attr('r', 4).style("opacity", 0);
  var focusMagenta = svg.append('g').append('circle').style("fill", "magenta").attr("stroke", "magenta").attr('r', 4).style("opacity", 0);
  var focusGreen = svg.append('g').append('circle').style("fill", "green").attr("stroke", "green").attr('r', 4).style("opacity", 0);
  var focusBrown = svg.append('g').append('circle').style("fill", "brown").attr("stroke", "brown").attr('r', 4).style("opacity", 0);
  var focusRed = svg.append('g').append('circle').style("fill", "red").attr("stroke", "red").attr('r', 4).style("opacity", 0);
  var focusBlack = svg.append('g').append('circle').style("fill", "black").attr("stroke", "black").attr('r', 4).style("opacity", 0);

  var focusTextBlue = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'blue');
  var focusTextOrange = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'orange');
  var focusTextMagenta = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'magenta');
  var focusTextGreen = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'green');
  var focusTextBrown = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'brown');
  var focusTextRed = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'red');
  var focusTextBlack = svg.append('g').append('text').style("opacity", 0).attr("text-anchor", "left").attr("alignment-baseline", "middle")
      .attr("fill", 'black');

  svg.append('rect').style("fill", "none").style("pointer-events", "all").attr('width', width).attr('height', height)
    .on('mousemove', mouseMove).on('mouseout', mouseOut).on('mouseover', mouseOver);

  function mouseOver() {
    focusBlue.style("opacity", 1);
    focusOrange.style("opacity", 1);
    focusMagenta.style("opacity", 1);
    focusGreen.style("opacity", 1);
    focusBrown.style("opacity", 1);
    focusRed.style("opacity", 1);
    focusBlack.style("opacity", 1);

    focusTextBlue.style("opacity",1);
    focusTextOrange.style("opacity",1);
    focusTextMagenta.style("opacity",1);
    focusTextGreen.style("opacity",1);
    focusTextBrown.style("opacity",1);
    focusTextRed.style("opacity",1);
    focusTextBlack.style("opacity",1);
  }

  function mouseMove() {
    var xtemp = x.invert(d3.mouse(this)[0]);
    var yearTmp = parseInt(xtemp,10);
    var natmp = parseFloat(dataNorthAmerica_json[yearTmp]);
    var asiatmp = parseFloat(dataAsia_json[yearTmp]);
    var latintmp = parseFloat(dataLatin_json[yearTmp]);
    var europetmp = parseFloat(dataEurope_json[yearTmp]);
    var americatmp = parseFloat(dataAmerica_json[yearTmp]);
    var africatmp = parseFloat(dataAfrica_json[yearTmp]);
    var oceaniatmp = parseFloat(dataOceania_json[yearTmp]);

    console.log(natmp);
    console.log(asiatmp);
    console.log(latintmp);
    console.log(europetmp);
    console.log(americatmp);
    console.log(africatmp);
    console.log(oceaniatmp);

    focusBlue.attr("cx", x(yearTmp)).attr("cy", y(africatmp)+3).attr('r',4);
    focusOrange.attr("cx", x(yearTmp)).attr("cy", y(latintmp)+3).attr('r',4);
    focusMagenta.attr("cx", x(yearTmp)).attr("cy", y(oceaniatmp)+3).attr('r',4);
    focusGreen.attr("cx", x(yearTmp)).attr("cy", y(europetmp)+3).attr('r',4);
    focusBrown.attr("cx", x(yearTmp)).attr("cy", y(natmp)+3).attr('r',4);
    focusRed.attr("cx", x(yearTmp)).attr("cy", y(asiatmp)+3).attr('r',4);
    focusBlack.attr("cx", x(yearTmp)).attr("cy", y(americatmp)+3).attr('r',4);

    focusTextBrown.html("In " + yearTmp + "- North America:" + natmp.toFixed(2) +" yrs").attr("x", 600).attr("y",360);
    focusTextGreen.html("In " + yearTmp + "- Europe:" + europetmp.toFixed(2) +" yrs").attr("x", 600).attr("y", 380);
    focusTextMagenta.html("In " + yearTmp + "- Oceania:" + oceaniatmp.toFixed(2) +" yrs").attr("x", 600).attr("y", 400);
    focusTextBlack.html("In " + yearTmp + "- Americas:" + americatmp.toFixed(2) +" yrs").attr("x", 600).attr("y", 420);
    focusTextOrange.html("In " + yearTmp + "- Latin Americas:" + latintmp.toFixed(2) +" yrs").attr("x", 600).attr("y", 440);
    focusTextRed.html("In " + yearTmp + "- Asia:" + asiatmp.toFixed(2) +" yrs").attr("x", 600).attr("y", 460);
    focusTextBlue.html("In " + yearTmp + "- Africa:" + africatmp.toFixed(2) +" yrs").attr("x", 600).attr("y", 480);
     //console.log(worlddata);
  }

  function mouseOut() {
    focusBlue.style("opacity", 0);
    focusOrange.style("opacity", 0);
    focusMagenta.style("opacity", 0);
    focusGreen.style("opacity", 0);
    focusBlue.style("opacity", 0);
    focusRed.style("opacity", 0);
    focusBlack.style("opacity", 0);

    focusTextBlue.style("opacity",0);
    focusTextOrange.style("opacity",0);
    focusTextMagenta.style("opacity",0);
    focusTextGreen.style("opacity",0);
    focusTextBlue.style("opacity",0);
    focusTextRed.style("opacity",0);
    focusTextBlack.style("opacity",0);
  }

}