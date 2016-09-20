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
  
  $(".content").each(function(i, obj){
    setContent(demos[i], obj);
  });
  
  function setContent(content, block){
    $(block).find("a").attr("href", content.url);
    $(block).find(".content-block").css('background-image', 'url(' + content.img + ')');
    $(block).find(".inner-news-article").text(content.title);
    $(block).find(".news-title").text(content.title);
    $(block).find(".inner-news-src").text(content.source);
    $(block).find(".news-content-src").text(content.source);
  }
	
});

class ContentObject{
  constructor(title, source, img, url){
    this.title = title; //String article title
    this.source = source; //String source website
    this.img = img; //String image url
    this.url = url; //String article url
  }
};

var demo1 = new ContentObject(
  title="Morrissey Announces Pop-Up Shop at Brooklyn Dog Rescue", 
  source="Pitchfork", 
  img="http://cdn3.pitchfork.com/news/68245/82537873.png",
  url="http://pitchfork.com/news/68245-morrissey-announces-pop-up-shop-at-brooklyn-dog-rescue/"
);

var demo2 = new ContentObject(
  name= "BEST SHOWS FROM THE SUMMER YOU MAY HAVE MISSED",
  source= "New York Times",
  img= "https://static01.nyt.com/images/2016/09/12/watching/12watching1/12watching1-master675.jpg",
  url= "http://www.nytimes.com/2016/09/12/arts/television/stranger-things-the-great-british-baking-show-what-to-watch.html"
);

var demo3 = new ContentObject(
  name= "An Embattled Emily Blunt in ‘The Girl on the Train’",
  source= "New York Times",
  img= "https://static01.nyt.com/images/2016/09/18/arts/18EMILYBLUNT1SUB/18EMILYBLUNT1SUB-master768.jpg",
  url= "http://www.nytimes.com/2016/09/18/movies/emily-blunt-the-girl-on-the-train.html?hp&action=click&pgtype=Homepage&clickSource=story-heading&module=mini-moth&region=top-stories-below&WT.nav=top-stories-below"
);

var demo4 = new ContentObject(
  name= "Colin Powell Calls Trump A “National Disgrace” In Personal Emails",
  source= "Buzzfeed",
  img= "https://img.buzzfeed.com/buzzfeed-static/static/2016-09/13/20/campaign_images/buzzfeed-prod-fastlane01/colin-powell-calls-trump-a-national-disgrace-in-p-2-19118-1473811245-13_big.jpg",
  url= "https://www.buzzfeed.com/andrewkaczynski/colin-powell-calls-trump-national-disgrace-in-personal-email"
);

var demo5 = new ContentObject(
  name= "Ava DuVernay’s 'A Wrinkle In Time' casts its lead",
  source= "AV Club",
  img= "http://i.onionstatic.com/avclub/5968/18/16x9/640.jpg",
  url= "http://www.avclub.com/article/ava-duvernays-wrinkle-time-casts-its-lead-242568"
);

var demo6 = new ContentObject(
  name= "How Animals Go Extinct",
  source= "The Onion",
  img= "http://i.onionstatic.com/onion/5442/1/16x9/700.jpg",
  url= "http://www.theonion.com/infographic/how-animals-go-extinct-53939"
);

var demo7 = new ContentObject(
  name= "Buy or sell? Week 1 fantasy performances for all 32 teams",
  source= "ESPN",
  img= "http://a.espncdn.com/combiner/i?img=%2Fphoto%2F2016%2F0911%2Fr124795_1296x729_16%2D9.jpg",
  url= "http://www.espn.com/nfl/insider/story/_/page/32for32x160913/2016-nfl-week-1-buy-sell-fantasy-performances-all-32-teams/"
);

var demos = [demo1, demo2, demo3, demo4, demo5, demo6, demo7];