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
    .select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


d3.csv(path).then(function(state_data){
    console.log(state_data);
    // function state_smoking_levels(state_data) {
    var smoking_level_array = [];
    var age_array = [];
    for (var i = 0; i < state_data.length; i++){
        var smoking_level = state_data[i].smokes;
        var state_age = state_data[i].age;
        smoking_level_array.push(smoking_level);
        age_array.push(state_age);

    };
    // return smoking_level_array;
// }
    
   

    console.log("Smoking level ", smoking_level_array);
    console.log("Age: ", age_array);





});