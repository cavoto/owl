$(document).ready(function () {

    var graphObj = jQuery.parseJSON($("#graph_data").text());

    if (graphObj !== undefined) {
        if (graphObj.type === "pie") {

        } else {

            // Get context with jQuery - using jQuery's .get() method.
            var ctx = $("#graph_line").get(0).getContext("2d");
            _.forEach(graphObj.datasets, function (value, key) {
                graphObj.datasets[key].fillColor = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
                graphObj.datasets[key].strokeColor = "rgba(220,220,220,1)";
                graphObj.datasets[key].pointColor = "rgba(220,220,220,1)";
                graphObj.datasets[key].pointHighlightFill = "#fff";
                graphObj.datasets[key].fillColor = "rgba(220,220,220,0.2)";
            });

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
    scaleLineWidth: 2,

    // Number - Scale label font size in pixels
    scaleFontSize: 20,
                    // Interpolated JS string - can access value
                    scaleLabel: function (data) {

                        var o = "";
                        if (data.value == 1) {
                            o = "\uf119"
                        } else if (data.value == 2) {
                            o = "\uf11a"
                        } else if (data.value == 3) {o = "\uf118"}

                        return o;
                    }
                }
                // This will get the first returned node in the jQuery collection.
            var myNewChart = new Chart(ctx).Line(graphObj, options);

        }

    }
});