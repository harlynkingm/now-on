var populateContent;
var getData;
var loadWeather;
var hideContent;

class Source{
  constructor(title, image, domain){
    this.title = title; //String source title
    this.image = image; //String local image
    this.domain = domain; //String domain name
  }
};

var sources = [
  new Source('espn', "images/logos/espn.png", "espn.com"),
  new Source('av-club', "images/logos/avclub.png", "avclub.com"),
  new Source('pitchfork', "images/logos/pitchfork.png", "pitchfork.com"),
  new Source('new-york-times', "images/logos/nyt.png", "nytimes.com"),
  new Source('abc-news', "images/logos/abcnews.png", "abcnews.com"),
  new Source('complex', "images/logos/complex.jpg", "complex.com"),
  new Source('vox', "images/logos/vox.jpg", "vox.com"),
  new Source('buzzfeed', "images/logos/buzzfeed.png", "buzzfeed.com"),
  new Source('onion', "images/logos/onion.png", "theonion.com"),
  new Source('rolling-stone', "images/logos/rollingstone.jpg", "rollingstone.com"),  
  new Source('five-thirty-eight', "images/logos/fivethirtyeight.jpg", "fivethirtyeight.com"),
  new Source('business-insider', "images/logos/businessinsider.png", "businessinsider.com"),
  new Source('people', "images/logos/people.png", "people.com"),
  new Source('associated-press', "images/logos/ap.jpg", "ap.org"),
  new Source('fortune', "images/logos/fortune.png", "fortune.com"),  
  new Source('cosmopolitan', "images/logos/cosmopolitan.png", "cosmopolitan.com"),  
  new Source('chicago-tribune', "images/logos/chicago-tribune.png", "chicagotribune.com"),  
  new Source('fox', "images/logos/fox.jpg", "foxnews.com"),  
  new Source('ign', "images/logos/ign.png", "ign.com"),  
  new Source('bbc', "images/logos/bbc.png", "bbc.com"),  
  new Source('reuters', "images/logos/reuters.jpg", "reuters.com"),  
  new Source('economist', "images/logos/economist.png", "economist.com"),  
  new Source('wired', "images/logos/wired.jpg", "wired.com"),  
  new Source('ars-technica', "images/logos/ars-technica.png", "arstechnica.com"),
  new Source('msnbc', "images/logos/msnbc.png", "msnbc.com"),
  new Source('huffington-post', "images/logos/huffington-post.png", "huffingtonpost.com"),
  new Source('washington-post', "images/logos/the-washington-post.jpg", "washingtonpost.com"),
  new Source('newsweek', "images/logos/newsweek.jpg", "newsweek.com"),
  new Source('time', "images/logos/time.png", "time.com"),
  new Source('new-yorker', "images/logos/new-yorker.png", "newyorker.com"),
  new Source('vogue', "images/logos/vogue.png", "vogue.com"),
  new Source('national-geographic', "images/logos/national-geographic.png", "nationalgeographic.com"),
  new Source('mashable', "images/logos/mashable.png", "mashable.com"),
  new Source('vice', "images/logos/vice.png", "vice.com"),
  new Source('yahoo', "images/logos/yahoo.png", "yahoo.com"),
  new Source('mtv', "images/logos/mtv.png", "mtv.com"),
  new Source('gizmodo', "images/logos/gizmodo.png", "gizmodo.com"),
  new Source('elite-daily', "images/logos/elite-daily.jpg", "elitedaily.com"),
  new Source('upworthy', "images/logos/upworthy.png", "upworthy.com"),
  new Source('refinery29', "images/logos/refinery29.png", "refinery29.com")
];

$(document).ready(function(){
  
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

    getData = function getData(key, callback){
      chrome.storage.sync.get(key, function(data){
        callback(data[key]);
      });
    }
    
    //clearStorage();
	
    var localSources = []; // Local version for updating
	updateTime();
	updateDay();
    getColor();
    setDefaults();
    var sourcePage = 0;
    var totalPages = 5;
    getData('sources', checkSources);
	
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
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = new Date();
		var dateStr = days[d.getDay()] + ", " + months[d.getMonth()] + " " + d.getDate();
		$("#date-block").html(dateStr);
	}
  
  populateContent = function populateContent(contentList){
//    console.log(contentList);
    $(".loading").hide();
    if (contentList.length > 0){
      $(".main-content").show();
      $(".content").each(function(i, obj){
        setContent(contentList[i], obj);
      });
    } else {
      $(".main-content").hide();
    }
  }
  
  hideContent = function hideContent(){
    $(".main-content").hide();
    $(".loading").show();
  }
  
  function setContent(content, block){
    $(block).find("a").attr("href", content.url);
    $(block).find(".content-block").css('background-image', 'url(' + content.img + ')');
    $(block).find(".inner-news-article").text(content.title);
    $(block).find(".news-title").text(content.title);
    if (content.title.length > 85){
      $(block).find(".inner-news-title").addClass("inner-news-title-extra-small");
    } else if (content.title.length > 55){
      $(block).find(".inner-news-title").addClass("inner-news-title-small");
    }
    $(block).find(".inner-news-src").text(content.source);
    $(block).find(".news-content-src").text(content.source);
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
      $(".color-selector").each(function(i, obj){
        if ($(obj).css("background-color") == color){
          $(obj).addClass("color-selector-active");
        }
      });
    } else {
      saveColor("#020F29");
    }
  }
  
//  $(".color-selector").hover(function(){
//    var color = $(this).css("background-color");
//    $(".bg-default").css("transition", "background-color 0.5s");
//    setColor(color);
//  });
//  
//  $(".color-selector").mouseleave(function(){
//    var color = $(this).css("background-color");
//    saveColor(color);
//  });
  
  $(".color-selector").click(function(){
    var color = $(this).css("background-color");
    saveColor(color);
    $(".bg-default").css("transition", "background-color 0.5s");
    $(".color-selector-active").removeClass("color-selector-active");
    setColor(color);
  });
  
  function setDefaults(){
    $(".settings-container").hide();
    $(".back").hide();
    $(".main-content").hide();
    $(".weather-content").hide();
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
    loadContent(localSources);
  });
    
  $(".refresh").click(function(){
      loadContent(localSources);
  });
  
  $(".arrow-left").click(function(){
    sourcePage -= 1;
    if (sourcePage == -1) sourcePage = totalPages - 1;
    setPictures(sourcePage);
  });
  
  $(".arrow-right").click(function(){
    sourcePage += 1;
    sourcePage = sourcePage % totalPages;
    setPictures(sourcePage);
  });
  
  $(".news-option").click(function(){
    if ($(this).hasClass("news-option-active")){
      removeSource($(this).attr("id"));
    } else {
      addSource($(this).attr("id"));
    }
  });
  
  function setPictures(page){
    var pics = [];
    var pageLength = 8;
    var startIndex = page * pageLength;
    for (var i = startIndex; i < startIndex + pageLength + 1; i++){
      if (i < sources.length){
        pics.push(sources[i]);
      }
    }
    $(".news-option").each(function(i, obj){
      $(obj).find("img").attr("src", pics[i].image);
      $(obj).attr("id", pics[i].title);
    });
    getActiveSources();
  };
  
  function checkSources(data){
    if (data){
      setPictures(sourcePage);
      loadContent(data);
    } else {
      defaultSources();
    }
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
    }
  }
  
  function defaultSources(){
    chrome.history.search({text:"", maxResults:200}, function(results){
      for (var i = 0; i < results.length; i++){
        var domain = results[i].url.split("/")[2];
        for (var s = 0; s < sources.length; s++){
          if (domain.includes(sources[s].domain) && !localSources.includes(sources[s].title)){
            localSources.push(sources[s].title);
          }
        }
      }
      if (localSources.length == 0){
        localSources = ['abc-news', 'new-york-times'];
      }
      storeData('sources', localSources, getActiveSources);
      setPictures(sourcePage);
      loadContent(localSources);
    });
  }
  
  function addSource(source){
    localSources.push(source);
    storeData('sources', localSources, getActiveSources);
  }
  
  function removeSource(source){
    localSources.splice(localSources.indexOf(source), 1);
    storeData('sources', localSources, getActiveSources);
  }
    
  function clearStorage(){
      chrome.storage.sync.clear(function(){
          console.log("ALL CLEAR");
      });
  }
    
  loadWeather = function loadWeather(today, tomorrow){
      $("#weather-block-1 #temp-high").text(today.high);
      $("#weather-block-1 #temp-low").text(today.low);
      $("#weather-block-1 .weather-icon").attr("src", "images/weather/" + today.icon + ".png");
      $("#weather-block-2 #temp-high").text(tomorrow.high);
      $("#weather-block-2 #temp-low").text(tomorrow.low);
      $("#weather-block-2 .weather-icon").attr("src", "images/weather/" + tomorrow.icon + ".png");
      $(".weather-content").fadeIn(300);
  }
	
});