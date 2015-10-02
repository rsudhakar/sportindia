var TimelineWidget = function(svgSelector) {

    var svg = d3.select(svgSelector);
    var timeScale = d3.time.scale()
        .domain([moment().toDate(), moment().add(3, 'months').toDate()])
        .range([0, 1000]);
    //var colors = d3.scale.category10();
    var eventData;
    var monthData;

    var render = function(data) {
        eventData = data;
        monthData = getFirstOfEachMonth(timeScale.domain());
        refresh();
    };

    var refresh = function() {
        drawEvents();
        drawTimeline();
    };

    var drawEvents = function() {
        svg.selectAll(".refline").data([true])
            .enter().append("line").classed("refline", true)
            .attr("x1", 0).attr("y1",50).attr("x2", 1000).attr("y2", 50);

        var eventElements = svg.selectAll(".event").data(eventData);
        var newEventElements = eventElements.enter().append("g").classed("event", true);
        newEventElements.append("circle");
        newEventElements.append("text");
        eventElements.select("circle")
            .attr("r", 9)
            .attr("cx", function(d) { return timeScale(d.date) })
            .attr("cy", 50)
            .attr("fill", "#00aaff");
        eventElements.select("text")
            .attr("x", function(d) { return timeScale(d.date) - (moment(d.date).get('date') > 9 ?  5 : 3) })
            .attr("y", 53)
            .text(function(d) { return moment(d.date).format("D") });
        eventElements.exit().remove();
        eventElements.on('click', function() {
            var selectedEvent = d3.select(this);
            showEventDetailsPointer(selectedEvent);
        })
    };

    var drawTimeline = function() {
        var monthElements = svg.selectAll(".month").data(monthData);
        var newMonthElements = monthElements.enter().append("g").classed("month", true);
        newMonthElements.append("line");
        newMonthElements.append("text");
        monthElements.select("line")
            .attr("x1", function(d) { return timeScale(d) })
            .attr("y1", 10)
            .attr("x2", function(d) { return timeScale(d) })
            .attr("y2", 60);
        monthElements.select("text")
            .attr("x", function(d) { return timeScale(d) + 5 })
            .attr("y", 20)
            .text(function(d) { return moment(d).format("MMMM YYYY") });
        monthElements.exit().remove();
    };

    var showEventDetailsPointer = function(selectedEvent) {
        var eventData = selectedEvent.data();
        var eventPointer = svg.selectAll(".event-pointer").data(eventData);
        var newEventPointer = eventPointer.enter()
            .append("g").classed("event-pointer", true);
        newEventPointer.append("line");
        newEventPointer.append("polyline");
        eventPointer.select("line")
            .attr("x1", function(d) { return timeScale(d.date)})
            .attr("y1", 75)
            .attr("x2", function(d) { return timeScale(d.date)})
            .attr("y2", 120);
        eventPointer.select("polyline")
            .attr("points","1 130 1 120 999 120 999 130");
        $(".event-timeline-details").show();
    };

    var getFirstOfEachMonth = function(dateRange) {
        var months = [];
        var fromDate = moment(dateRange[0]).startOf('month');
        var toDate = moment(dateRange[1]);
        while(fromDate.isBefore(toDate)) {
            months.push(moment(fromDate).toDate());
            fromDate.add(1, 'month');
        }
        return months;
    };


    return {
        render: render
    }

};