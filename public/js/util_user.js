$(document).ready(function () {

    var calls = jQuery.parseJSON($("#calls_data").text());
    console.log(calls);
    var total = calls.length;


    var bySentiment = _.groupBy(calls, 'sentiment');

    //    var diffPercent = ((v2 / v1) * 100).toFixed(2);
    var diffPercent;



    if (bySentiment[3] !== undefined) {
        $("#good_number").text(bySentiment[3].length);
        diffPercent = ((bySentiment[3].length / total) * 100).toFixed(1);
        $("#good_percentage").text(diffPercent + "%");
        $("#good_progress").css("width", diffPercent + "%");
    }

    if (bySentiment[2] !== undefined) {
        $("#medium_number").text(bySentiment[2].length);
        diffPercent = ((bySentiment[2].length / total) * 100).toFixed(1);
        $("#medium_percentage").text(diffPercent + "%");
        $("#medium_progress").css("width", diffPercent + "%");
    }
    if (bySentiment[1] !== undefined) {
        $("#bad_number").text(bySentiment[1].length);
        diffPercent = ((bySentiment[1].length / total) * 100).toFixed(1);
        $("#bad_percentage").text(diffPercent + "%");
        $("#bad_progress").css("width", diffPercent + "%");
    }

});