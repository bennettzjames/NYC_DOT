console.log("main.js linked")

$(document).ready(function(){

  var loadData = function(){
    $.ajax({
      url: '/loadData',
      type: 'get',
      dataType: 'json'
    }).done(function(results){
      console.log('ajax works')
      var eventsArray = []
      results.forEach(function(result){
        console.log(result.events)
        result.events.forEach(function(evnt){
          eventsArray.push({title: evnt.name, start: evnt.date})
        })
      })
      $('#calendar').fullCalendar({
        height: 500,
        events: eventsArray
      })
    })
  }

  $(window).on('load',loadData)

})
