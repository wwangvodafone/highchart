
 // Test data
 const data = [
    { x: 1, y: 100 },
    { x: 2, y: 2000 },
    { x: 3, y: 1500 },
    { x: 4, y: 25000 },
    { x: 5, y: 30000 }
  ];
  // Set up the chart dimensions
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  // Create the SVG element
  const svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  // Define the scales
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.x))
    .range([0, width]);
  yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.y)])
    .range([height, 0]);
  // Define the line function
  line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));
  // Add the line to the chart
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);
  // Add the X and Y axes
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));
  var yAxisElement = svg.append("g")
    .call(d3.axisLeft(yScale));
// Define a button to switch between linear and log scales
d3.select("#button")
    .on("click", function() {
        console("here")
        // Check the current scale type
        var currentScale = yScale;
        if (currentScale === d3.scaleLinear()) {
            // Switch to log scale
            yScale = d3.scaleLog()
                .domain([1, d3.max(data)])
                .range([500, 0]);
        } else {
            // Switch to linear scale
            yScale = d3.scaleLinear()
                .domain([0, d3.max(data)])
                .range([500, 0]);
        }
        // Update the y-axis and line graph with the new scale
        yAxis.scale(yScale);
        svg.select(".line")
            .attr("d", line);
        svg.select(".y-axis")
            .call(yAxis);
    });
