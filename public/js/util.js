$( document ).ready(function() {
  // Handler for .ready() called.
    $('#datetimepicker12').datetimepicker({
       icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-arrow-up",
            down: "fa fa-arrow-down"
        }
    });
    
    $("#createCall_btn").click(function(){
        var data = $('form').serializeArray();
        
        $.post( "/rest/call/create", data) .done(function( data ) {
            alert( "Data Loaded: " + data );
          });
    });
    $("#create_form").submit(function(){
        event.preventDefault();
        var data = $('form').serializeArray();

        $.post( "/rest/user/create", data) .done(function( data ) {
            alert( "Response: " + data.msg );
          });
    });
});