// @TODO: YOUR CODE HERE!
const path = "assets/data/data.csv";

var svgWidth = 960;
var svgHeight = 700;

var chartMargin = {
    top: 20,
    right: 40, 
    bottom: 60,
    left: 100
};

var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
    .select("#scatter")
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

    var xLinearScale = d3.scaleLinear()
        .range([0, chartWidth])
        .domain(d3.extent(state_data, data=> data.age));
    var yLinearScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(state_data, data => data.smokes)]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    
    chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis);
    chartGroup.append("g").call(leftAxis);

    
    chartGroup.selectAll("circle")
        .data(state_data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "10")
        .attr("fill", "red")
        .attr("opacity", "0.5"); 

       
    chartGroup.append("g")
        .selectAll("text")
        .data(state_data)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("dx", d => xLinearScale(d.age))
        .attr("dy", d => yLinearScale(d.smokes))
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr("font-size", "10px")
        .attr("alignment-baseline", "central");

        
          // Forming axis labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .classed("axis-text", true)
        .style("font-weight", "bold")
        .text("% Smoker");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
        .attr("class", "axisText")
        .classed("active", true)
        .style("font-weight", "bold")
        .text("Average Age");
        
})

.catch(function (error) {
    console.log(error);
});
