var populateContent;

class Source{
  constructor(title, image){
    this.title = title; //String source title
    this.image = image; //String local image
  }
};

var sources = [
  new Source('espn', "images/logos/espn.png"),
  new Source('onion', "images/logos/onion.png"),
  new Source('pitchfork', "images/logos/pitchfork.png"),
  new Source('new-york-times', "images/logos/nyt.png"),
  new Source('washington-post', "images/logos/washingtonpost.jpg"),
  new Source('ap', "images/logos/ap.png"),
  new Source('business-insider', "images/logos/businessinsider.png"),
  new Source('buzzfeed', "images/logos/buzzfeed.png")
];

$(document).ready(function(){
	
    var localSources = []; // Local version for updating
	updateTime();
	updateDay();
    getColor();
    setDefaults();
    var startIndex = 0;
    setPictures(startIndex);
	
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
    if (content.title.length > 55){
      $(block).find(".inner-news-title").addClass("inner-news-title-small");
    }
    $(block).find(".inner-news-src").text(content.source);
    $(block).find(".news-content-src").text(content.source);
  }
  
  function storeData(key, val, callback){
    var obj = {};
    obj[key] = val;
    chrome.storage.sync.set(obj, function(){
//      console.log("SAVED");
      if (callback){
        callback();
      }
    });
  }
  
  function getData(key, callback){
    chrome.storage.sync.get(key, function(data){
      callback(data[key]);
    });
  }
  
  function saveColor(color){
    storeData('color', color);
  }
  
  function getColor(){
    getData('color', setColor);
  }
  
  function setColor(color){
    if (color){
      $(".bg-default").css("background-color", color);
    } else {
      saveColor("#020F29");
    }
  }
  
  $(".color-selector").hover(function(){
    var color = $(this).css("background-color");
    $(".bg-default").css("transition", "background-color 0.5s");
    setColor(color);
  });
  
  $(".color-selector").mouseleave(function(){
    var color = $(this).css("background-color");
    saveColor(color);
  });
  
//  $(".color-selector").click(function(){
//    var color = $(this).css("background-color");
//    saveColor(color);
//    $(".bg-default").css("transition", "background-color 0.5s");
//    setColor(color);
//  });
  
  function setDefaults(){
    $(".settings-container").hide();
    $(".back").hide();
  }
  
  $(".settings").click(function(){
    $(".settings").fadeOut(200);
    $(".refresh").fadeOut(200);
    $(".main-container").fadeOut(200, function(){
      $(".settings-container").fadeIn(200);
      $(".back").fadeIn(200);
    });
  });
  
  $(".back").click(function(){
      $(".back").fadeOut(200);
      $(".settings-container").fadeOut(200, function(){
        $(".settings").fadeIn(200);
        $(".refresh").fadeIn(200);
        $(".main-container").fadeIn(200);
      });
  });
  
  $(".arrow-left").click(function(){
    startIndex -= 8;
    startIndex = Math.max(0, startIndex);
    setPictures(startIndex%sources.length);
  });
  
  $(".arrow-right").click(function(){
    startIndex += 8;
    setPictures(startIndex%sources.length);
  });
  
  $(".news-option").click(function(){
    if ($(this).hasClass("news-option-active")){
      removeSource($(this).attr("id"));
    } else {
      addSource($(this).attr("id"));
    }
  });
  
  function setPictures(startIndex){
    var pics = [];
    for (var i = startIndex; i < startIndex + 9; i++){
      if (i < sources.length){
        pics.push(sources[i % 8]);
      }
    }
    $(".news-option").each(function(i, obj){
      $(obj).find("img").attr("src", pics[i].image);
      $(obj).attr("id", pics[i].title);
    });
    getActiveSources();
  };
  
  function getActiveSources(){
    getData('sources', setActiveSources);
  }
  
  function setActiveSources(data){
    if (data){
      localSources = data;
      $(".news-option").each(function(i, obj){
        if (data.includes($(obj).attr("id"))){
          $(obj).addClass("news-option-active");
        } else {
          $(obj).removeClass("news-option-active");
        }
      });
    } else {
      localSources = ['espn']; // DEFAULT
      storeData('sources', localSources, getActiveSources);
    }
  }
  
  function addSource(source){
    localSources.push(source);
    storeData('sources', localSources, getActiveSources);
  }
  
  function removeSource(source){
    localSources.splice(localSources.indexOf(source), 1);
    storeData('sources', localSources, getActiveSources);
  }
	
});