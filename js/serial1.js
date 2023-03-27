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
    count = 0
    $(document).ready(function() {
        $("#button").click(function(){
            count = count + 1;
            if (count % 2 == 1) {
                console.log(count)
                yScale = d3.scaleLog()
                    .domain([1, d3.max(data, d => d.y)])
                    .range([height, 0]);
                    // Update the y-axis with the new scale
                yAxis = d3.axisLeft(yScale)
                    .ticks(10, ",.1s");
                yAxisElement.call(yAxis);
                $("#button").text('Change to Line');
            }
            else {
                yScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.y)])
                    .range([height, 0]);
                // Update the y-axis with the new scale
                yAxis = d3.axisLeft(yScale)
                    .ticks(10, ",.1s");
                yAxisElement.call(yAxis);
                $("#button").text('Change to Logarithmic');
            }
            svg.select(".line")
                .attr("d", line)

        });
    });