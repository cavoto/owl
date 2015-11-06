$(document).ready(function () {

    var graphObj = jQuery.parseJSON($("#graph_data").text());

    if (graphObj !== undefined) {
        if (graphObj.type === "pie") {
            // Get context with jQuery - using jQuery's .get() method.
            var ctx = $("#graph_pie").get(0).getContext("2d");
            // This will get the first returned node in the jQuery collection.
            var myNewChart = new Chart(ctx).Line(data);

            //            var myLineChart = new Chart(ctx).Line(data, options);
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
            

            // This will get the first returned node in the jQuery collection.
            var myNewChart = new Chart(ctx).Line(graphObj);

        }

    }
});