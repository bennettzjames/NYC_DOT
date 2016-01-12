console.log("main.js linked")

$(document).ready(function(){

  var loadData = function(){
    $.ajax({
      url: '/loadData',
      type: 'get',
      dataType: 'json'
    }).done(function(results){
      var eventsArray = []
      results.forEach(function(result){
        eventsArray.push({title: result.name, start: result.start})
      })
      $('#calendar').fullCalendar({
        height: 500,
        events: eventsArray
      })
    })
  }

  $(window).on('load',loadData)

})