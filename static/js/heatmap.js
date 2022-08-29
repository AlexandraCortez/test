function d3heatmap(data) {
	d3.selectAll("svg.remove").remove()
	d3.selectAll("canvas.remove").remove()

	// set the dimensions and margins of the graph
		var margin_h = {top: 25, right: 5, bottom: 5, left: 85},
			width_h = 920 - margin_h.left - margin_h.right,
			height_h = 340 - margin_h.top - margin_h.bottom;


		var svg_heatmap_lgr = d3.select("#heatmapLGN")
			.append("svg")
			.attr("class", "remove")
			.style("width", width_h + margin_h.left + margin_h.right + "px")
			.style("height", height_h + margin_h.top + margin_h.bottom + "px")
			.attr("width", width_h + margin_h.left + margin_h.right)
			.attr("height", height_h + margin_h.top + margin_h.bottom)
			.append("g")
			.attr("transform","translate(" + margin_h.left + "," + margin_h.top + ")")
			.attr("class", "svg");


		// Labels of row and columns
		var myGroups = d3.map(data, function(d){return(d.stationID)}).keys();
		var myVars = d3.map(data, function(d){return(d.datetime)}).keys();

		// Build X scales and axis:
		var x = d3.scaleBand()
			.range([ 0, width_h ])
			.domain(myGroups)
			.padding(0.01);

		// Build X scales and axis:
		var y = d3.scaleBand()
			.range([ height_h, 0 ])
			.domain(myVars)
			.padding(0.01);


		svg_heatmap_lgr.append("g").attr("transform", "translate(0," + height_h + ")");

		svg_heatmap_lgr.append("g").call(d3.axisLeft(y));

		// text label for the x axis
	  	svg_heatmap_lgr.append("text")
		  	.attr("transform","translate(" + (width_h/2) + " ," + (-7)+ ")")
							  // (height_h + margin_h.top + 20) + ")")
		  	.style("text-anchor", "middle")
		  	.style("font-size", 12)
			.style("font-weight", "bold")
			.text("Stations");

	  	// text label for the y axis
	  	svg_heatmap_lgr.append("text")
		  	.attr("transform", "rotate(-90)")
		  	.attr("y", 0 - margin_h.left)
		  	.attr("x",0 - (height_h / 2))
		  	.attr("dy", "1em")
		  	.style("text-anchor", "middle")
			.style("font-size", 12)
			.style("font-weight", "bold")
		  	.text("Hour");



		var drawHeatmap = function(svgvar, area,colorvar,valueName,min,max) {

		    var colours = d3.scaleSequential()
			.interpolator(colorvar)
			.domain([min,max])

			var tooltip2 = d3.select("body")
				.append("div")
				.attr("class", "infobulle")
				.style("position", "absolute")
				.style("background", "white")
				.style("opacity", "0")
				.style("padding", "0 10px")
				.style("z-index", "999");

             // Three function that change the tooltip when user hover / move / leave a cell
            var mouseover = function(d) {
            	d3.select(this)
                  .style("stroke-width", 4)
                  .style("stroke-opacity", 1);
                 tooltip2.style("opacity", 1)

            	tooltip2
                    .html( "stationID: " +d.stationID )
                    .style("left", (d3.event.pageX + 20 + "px"))
					.style("top", (d3.event.pageY  + 20 + "px"));
					//.style("left", (d3.mouse(this)[0]) + "px")
                    //.style("top",  (d3.mouse(this)[1]) - 55 + "px");
            }

            var mouseleave = function(d) {
            	tooltip2.style("opacity", 0)
				 d3.select(this)
					.style("stroke-width", 1)
                	.style("stroke-opacity", 0.6)
					 .style("opacity", 0.6);

		    }

		    // function to create the initial heatmap
            var heatmap = svgvar.selectAll(".heatmap")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", function(d) { return x(d.stationID) })
                .attr("y", function(d) { return y(d.datetime) })
                .attr("class", "hour bordered")
                .attr("width", x.bandwidth() )
                .attr("height", y.bandwidth() )
                .style("stroke", "white")
                .style("stroke-opacity", 0.6)
				.style("stroke-width", 1)
                .style("fill", function(d) { return colours(+d.nRMSE_arrivals); })
				.style("opacity", 0.6)
				.attr("class", "heatmap");
            heatmap.each(function(d) {
				 this.classList.add("heatmap" + d.stationID);
			});
            heatmap.on("mouseover", mouseover)
                //.on("mousemove", mousemove)
                .on("mouseout", mouseleave);

            //d3LegendHeatmap(area,colorvar);

        }


        var max = d3.max(data, function (d) { return +d["nRMSE_arrivals"]; });

        var min = d3.min(data, function (d) { return +d["nRMSE_arrivals"]; })


		drawHeatmap(svg_heatmap_lgr,"#heatmapLGN", d3.interpolateOranges," Available Bikes: ",min,max);



	//d3altitude(weekendInfo);
}
