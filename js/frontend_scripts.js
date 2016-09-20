var populateContent;

$(document).ready(function(){
	
	updateTime();
	updateDay();
	
	setInterval(function(){
		updateTime();
		updateDay();
	}, 1000);
	
	function updateTime(){
		var d = new Date();
		var hours = d.getHours()%12 < 10 ? "0" + d.getHours()%12 : d.getHours()%12;
        if (hours == "00") hours = "12";
		var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
		var seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
		var timeStr = hours + " " + minutes + " " + seconds;
//        var timeStr = hours + " " + minutes;
		$("#time-block").html(timeStr);
	}
	
	function updateDay(){
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		var d = new Date();
		var dateStr = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate();
		$("#date-block").html(dateStr);
	}
  
  populateContent = function populateContent(contentList){
    $(".content").each(function(i, obj){
      setContent(contentList[i], obj);
    });
  }
  
  function setContent(content, block){
    $(block).find("a").attr("href", content.url);
    $(block).find(".content-block").css('background-image', 'url(' + content.img + ')');
    $(block).find(".inner-news-article").text(content.title);
    $(block).find(".news-title").text(content.title);
    $(block).find(".inner-news-src").text(content.source);
    $(block).find(".news-content-src").text(content.source);
  }
	
});