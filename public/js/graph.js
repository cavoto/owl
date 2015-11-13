$(document).ready(function () {

    var graphObj = jQuery.parseJSON($("#graph_data").text());

    if (graphObj !== undefined) {
        if (graphObj.type === "pie") {

        } else {

            // Get context with jQuery - using jQuery's .get() method.
            var ctx = $("#graph_line").get(0).getContext("2d");
            _.forEach(graphObj.datasets, function (value, key) {
                var color = get_color();
                graphObj.datasets[key].fillColor = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
                graphObj.datasets[key].strokeColor = "rgba(" + color + ",1)";
                graphObj.datasets[key].pointColor = "rgba(" + color + ",1)";
                graphObj.datasets[key].pointHighlightFill = "#fff";
                graphObj.datasets[key].fillColor = "rgba(" + color + ",0.2)";
                graphObj.datasets[key].label= "My First dataset";
                graphObj.datasets[key].pointStrokeColor= "#fff";
                graphObj.datasets[key].pointHighlightStroke="rgba(" + color + ",1)";
            });

            // This will get the first returned node in the jQuery collection.
            var myNewChart = new Chart(ctx).Line(graphObj, options);

        }

    }
});

var color_choices = ['151,187,205', '220,220,220'];

function get_color() {
    return color_choices[Math.floor((Math.random() * 2))];
}


var options = {
    scaleFontFamily: "'FontAwesome'",
    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: true,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: 4,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: 1,
    // Number - The scale starting value
    scaleStartValue: 0,
    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,
    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Number - Scale label font size in pixels
    scaleFontSize: 18,
    // Interpolated JS string - can access value
    scaleLabel: function (data) {

        var o = "";
        if (data.value == 1) {
            o = "\uf119"
        } else if (data.value == 2) {
            o = "\uf11a"
        } else if (data.value == 3) {
            o = "\uf118"
        }

        return o;
    }
}