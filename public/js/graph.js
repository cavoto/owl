$(document).ready(function () {

    var graphObj = jQuery.parseJSON($("#graph_data").text());

    if (graphObj !== undefined) {
        if (graphObj.type === "pie") {

        } else {

            // Get context with jQuery - using jQuery's .get() method.
            var ctx = $("#graph_line").get(0).getContext("2d");
            _.forEach(graphObj.datasets, function (value, key) {
                var color = get_color(key);
                graphObj.datasets[key].fillColor = "rgba(" + color + ",0.3)";
                graphObj.datasets[key].strokeColor = "rgba(" + color + ",1)";
                graphObj.datasets[key].pointColor = "rgba(" + color + ",1)";
                graphObj.datasets[key].pointHighlightFill = "#fff";
                graphObj.datasets[key].fillColor = "rgba(" + color + ",0.2)";
//                graphObj.datasets[key].label = "My First dataset";
                graphObj.datasets[key].pointStrokeColor = "#fff";
                graphObj.datasets[key].pointHighlightStroke = "rgba(" + color + ",1)";
            });

            // This will get the first returned node in the jQuery collection.
            var myNewChart = new Chart(ctx).Line(graphObj, options);

        }

    }
});

//var color_choices = ['151,187,205', '220,220,220', '221,209,199', '126,137,135'];
//var color_choices = ['3,90,108', '29,108,114', '32,153,161', '143,204,208'];
var color_choices = ['63,70,124', '3,90,108', '255,184,111', '165,87,101'];

function get_color(key) {
    var index = key < color_choices.length ? key : Math.floor((Math.random() * 4));
    return color_choices[index];
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
    multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>",
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