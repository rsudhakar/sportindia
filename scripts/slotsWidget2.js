var TimingsWidget = function(svgSelector) {

  var svg = d3.select(svgSelector);
  var width = $(svgSelector).width();
  var height = $(svgSelector).height();
  var days = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];
  var colors = d3.scale.category10();

  var daysAxis;
  var timeAxis;
  var slotsData;
  var constants;

  var render = function(data) {
    slotsData = data;
    constants = {
      totalWidth: $(svgSelector).width(),
      timeAxisHeight: 100,
      daysAxisWidth: 110
    };
    var days = _.collect(slotsData, function(d) { return d.day; });

    var defaultType = data[0].type;
    drawLegend();
    drawTime(defaultType);
    drawDays(defaultType);
    drawSlots(defaultType);
  }

  var drawTime = function(type) {
    var filteredSlotsData = _.filter(slotsData, function(d) { return d.type === type});
    var timeSlots = _.reduce(filteredSlotsData, function(result, d) { result.push(d.from); result.push(d.to); return result }, []);
    timeSlots = _.sortBy(_.uniq(timeSlots));
    timeAxis = d3.scale.linear()
          .domain([4, 23])
          .range([constants.daysAxisWidth, constants.totalWidth-30]);

    var timeElems = svg.selectAll(".time").data(timeSlots);
    timeElems.exit().remove();
    timeElems.enter().append("text").classed("time", true);
    timeElems.attr("x", function(d) { return timeAxis(d) - 10 })
        .attr("y", 50)
        .text(function(d) { return (d < 12) ? d + "am" : (d == 12 ? "12pm" : (d-12) + "pm") });

    timeTickElems = svg.selectAll(".timeTick").data(timeSlots);
    timeTickElems.exit().remove();
    timeTickElems.enter().append("line").classed("timeTick", true);
    timeTickElems.attr("x1", function(d) { return timeAxis(d)})
        .attr("y1", 60)
        .attr("x2", function(d) { return timeAxis(d)})
        .attr("y2", 70);
  }

  var drawDays = function(type) {
    var filteredSlotsData = _.filter(slotsData, function(d) { return d.type === type});
    var slotsDays = _.collect(filteredSlotsData, function(d) { return d.day; })
    var availableDays = _.intersection(days, slotsDays);

    var neededHeight = constants.timeAxisHeight + availableDays.length*30;
    $(svgSelector).height(neededHeight + 30);

    daysAxis = new function() {
      var axis = d3.scale.linear().domain([0, availableDays.length-1]).range([constants.timeAxisHeight, neededHeight]);
      return function(value) {
        return axis(availableDays.indexOf(value.toLowerCase()))
      }
    };

    var daysElem = svg.selectAll(".day").data(availableDays);
    daysElem.exit().remove();
    daysElem.enter().append("text").classed("day", true);
    daysElem.attr("x", 20)
        .attr("y", function(d) { return daysAxis(d) })
        .text(function(d) { return d[0].toUpperCase() + d.slice(1) });

    var dayLineElems = svg.selectAll(".dayLines").data(availableDays);
    dayLineElems.exit().remove();
    dayLineElems.enter().append("line").classed("dayLines", true);
    dayLineElems.attr("x1", constants.daysAxisWidth)
        .attr("y1", function(d) { return daysAxis(d) - 2 })
        .attr("x2", width)
        .attr("y2", function(d) { return daysAxis(d) - 2 });
  }

  var drawSlots = function(type) {
    var filteredSlotsData = _.filter(slotsData, function(d) { return d.type === type});
    var slotNames = _.uniq(_.collect(filteredSlotsData, function(d) { return d.type; }));
    var slotNameElems = svg.selectAll(".slotName").data(filteredSlotsData);
    slotNameElems.enter().append("rect").classed("slotName", true);
    slotNameElems.exit().remove();

    slotNameElems
        .transition()
        .attr("x", function(d) { return timeAxis(d.from) })
        .attr("y", function(d) { return daysAxis(d.day.toLowerCase()) - 7 })
        .attr("width", function(d) { return timeAxis(d.to) - timeAxis(d.from) })
        .attr("height", 9)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("opacity", 1);
  }

  var drawLegend = function() {
      var slotNames = _.uniq(_.collect(slotsData, function(d) { return d.type; }));
      var legend = d3.select(".legend");
      var legendItems = legend.selectAll(".item").data(slotNames);
      legendItems.enter().append("div").classed("item", true);
      legendItems
        // .style("color", function(d) { return colors(slotNames.indexOf(d)) })
        .text(function(d) { return d });

      legendItems.on("click", function(type) {
          d3.selectAll(".item").classed("selected", false);
          d3.select(this).classed("selected", true);
          drawTime(type);
          drawDays(type);
          drawSlots(type);
          $(".more-info").show();    

          // svg.selectAll(".slotName")
          //     .transition()
          //     .duration(500)
          //     .attr("opacity", function(d) {
          //     return (d.type === type) ? 1 : 0.1;
          // });          
      });
  };

  return {
    render: render
  }
};
