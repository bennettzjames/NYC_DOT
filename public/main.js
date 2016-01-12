console.log("main.js linked")
var $eventOne
var eventsData

$(document).ready(function(){

  var loadData = function(){
    $.ajax({
      url: '/loadData',
      type: 'get',
      dataType: 'json'
    }).done(function(results){
   	  eventsData = results
      var eventsArray = []
      results.forEach(function(result){
        eventsArray.push({title: result.name, start: result.start})
      })
      $('#calendar').fullCalendar({
        height: 500,
        events: eventsArray
      })
      $eventOne = $('.fc-content');
	  $eventOne.on('click', toggleModal);
	  $('.fc-next-button').on('click',function(){
	  	$('.fc-content').on('click',toggleModal);
	  })
	  $('.fc-prev-button').on('click',function(){
	  	$('.fc-content').on('click',toggleModal);
	  })	  
    })
  }

  $(window).on('load',loadData)

  var toggleModal = function(){
	var name = this.innerText
	var namedEvent = eventsData.find(function(data){
		return data.name === name
	})

	// Lots of appending
	var $modal = $('<div>').attr('class','modal');
	var $name = $('<h1>').text(namedEvent.name);
	var $sponsor = $('<p>').text(namedEvent.sponsor);
	var $description = $('<p>').text(namedEvent.description);
	var $registered = $('<p>').text("Number Registered " + namedEvent.rsvps.length)
	var $maxAttendees = $('<p>').text("capacity" + " " + namedEvent.max_attendees);
	var $nameInput = $('<input>').attr({type:'text',class:'input-name',placeholder:'Name'})
	var $emailInput = $('<input>').attr({type:'text',class:'input-email',placeholder:'Email'})
	var $submitInput = $('<input>').attr({type:'submit', value:'Submit'})
	var $closeButton = $('<button>').text('Close')

	$modal.append($name, $sponsor, $description, $registered, $maxAttendees, $nameInput,$emailInput,$submitInput, $('<br>'), $closeButton);
	$('body').append($modal)

	namedEvent.comments.forEach(function(comment){
		$modal.append($('<p>').text(comment.comment + "-" + comment.name))
	})

	var closeModal = function(){
		$modal.remove()
	}

	$closeButton.on('click',closeModal)

	$submitInput.on('click',function(event){
		if (namedEvent.rsvps.length >= namedEvent.max_attendees){
			$.ajax({
				url: '/registration',
				type: 'post',
				data: {name: name, rsvp: {name: $nameInput.val(), email: $emailInput.val()}}
			})
			eventsData.find(function(obj){
				if (obj.name === namedEvent.name){
					obj.rsvps.push({name: $nameInput.val(), email: $emailInput.val()})
				}
			})
			$nameInput.val('');
			$emailInput.val('');
		} else {
			var $error = $('<h3>').text('There are no more open spots!')
			$modal.append($error)
		}
	})
  }

  //var attendeesNum = db.collection("event").find({})


})

