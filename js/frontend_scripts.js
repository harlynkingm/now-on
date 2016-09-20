jQuery(document).ready(function(){
	
	updateTime();
	updateDay();
	
	setInterval(function(){
		updateTime();
		updateDay();
	}, 1000);
	
	function updateTime(){
		var d = new Date();
		var hours = d.getHours()%12 < 10 ? "0" + d.getHours()%12 : d.getHours()%12;
		var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
		var seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
		var timeStr = hours + " " + minutes + " " + seconds;
		$("#time-block").html(timeStr);
	}
	
	function updateDay(){
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		var d = new Date();
		var dateStr = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate();
		$("#date-block").html(dateStr);
	}
  
  $('.content-block').each(function(){
    console.log($(this).data('img'));
    if ($(this).data('img') != undefined){
      $(this).css('background-image', 'url(' + $(this).data('img') + ')');
    }
  });
	
});

class ContentObject{
  constructor(title, source, img, url){
    this.title = title;
    this.source = source;
    this.img = img;
    this.url = url;
  }
}