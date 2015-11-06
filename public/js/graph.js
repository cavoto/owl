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
            // This will get the first returned node in the jQuery collection.
            var myNewChart = new Chart(ctx).Line(graphObj);
            
        }

    }
});