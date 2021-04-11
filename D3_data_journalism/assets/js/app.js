// @TODO: YOUR CODE HERE!
const path = "assets/data/data.csv";

var svgWidth = 960;
var svgHeight = 660;

var chartMargin = {
    top: 30,
    right: 30, 
    bottom: 30,
    left: 30
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
    .select("scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


d3.csv(path).then(function(state_data){
    console.log("Overall data ", state_data);
   

    state_data.forEach(function(data){
        data.smokes = +data.smokes;
        data.age = +data.age;
    });


    // console.log(data.smokes);

    var xLinearScale = d3.xLinearScale()
        .range([0, chartWidth])
        .domain(d3.extent(state_data, data=> data.age));
    var yLinearScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(state_data, data => data.smokes)]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
      // Append an SVG group element to the chartGroup, create the left axis inside of it
      chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis)
        .call(leftAxis);
    
   




});

 // var smoking_level_array = [];
    // var age_array = [];
    // for (var i = 0; i < state_data.length; i++){
    //     var smoking_level = state_data[i].smokes;
    //     var state_age = state_data[i].age;
    //     smoking_level_array.push(smoking_level);
    //     age_array.push(state_age);

    // };


    // var xScale = Math.max(...age_array);
    // console.log("x Scale  ", xScale);
    // xScale = Math.ceil(xScale) + 10;
    // console.log("x Scale rounded up + 10", xScale);


    // var yScale = Math.max(...smoking_level_array);
    // yScale = Math.ceil(yScale) + 10;
    




    // var drawLine = d3.line()
    //     .x(state_data=> xScale(age_array))
    //     .y(state_data => yScale(smoking_level_array));

   
    //     chartGroup.append("path")
    //     // The drawLine function returns the instructions for creating the line for forceData
    //     .attr("d", drawLine(state_data))
    //     .classed("scatter", true);


 //   // Append an SVG group element to the chartGroup, create the bottom axis inside of it
    //   // Translate the bottom axis to the bottom of the page
    //   chartGroup.append("g")
    //     .classed("axis", true)
    //     .attr("transform", `translate(0, ${chartHeight})`)
    //     .call(bottomAxis);
    // }).catch(function(error) {
    //   console.log(error);
    // svg.selectAll("dot")
    //     .data(smoking_level_array)
    //   .enter().append("circle")
    //     .attr("r", 3.5)
    //     .attr("cx", function(d) { return x(d.date); })
    //     .attr("cy", function(d) { return y(d.close); });
   

    // console.log("Smoking level ", smoking_level_array);
    // console.log("Age: ", age_array);
