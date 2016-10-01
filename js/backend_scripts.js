var loadContent;

$(document).ready(function () {
  //push all content to demos array then pick a random 7
  //check boxes equal to sources then display (list of whats checked and check for each content if source is in that array)
  var demos = [];
  var dataLength = 0;
  
  class ContentObject{
    constructor(title, source, img, url){
      this.title = title; //String article title
      this.source = source; //String source website
      this.img = img; //String image url
      this.url = url; //String article url
    }
      
  };

  function getWeather(){
    //simple_forcast, high, low for two days and icon name
    var startPos;
    var lat;
    var long;
    var geoSuccess = function(position) {
      startPos = position;
      lat = startPos.coords.latitude;
      long = startPos.coords.longitude;
         $.ajax({
         type: "GET",
         url: "http://api.wunderground.com/api/dfea5ebf794779cb/forecast/q/"+lat+","+long+".json",
         dataType: "JSON",
         success: weatherParser
        });
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }
  
  function weatherParser(data){
    var forecast = data["forecast"]["simpleforecast"]["forecastday"];
    var today = {};
    var tomorrow = {};
    today.high = forecast[0]["high"]["fahrenheit"];
    today.low = forecast[0]["low"]["fahrenheit"];
    today.icon = forecast[0]["icon"];
    tomorrow.high = forecast[1]["high"]["fahrenheit"];
    tomorrow.low = forecast[1]["low"]["fahrenheit"];
    tomorrow.icon = forecast[1]["icon"];
    loadWeather(today,tomorrow)
  }

  loadContent = function loadContent(data){
    hideContent();
    
    //Reset params
    demos = [];
    dataLength = data.length;

    getWeather();

    if(data.includes("espn")){
      $.ajax({
         type: "GET",
         url: "http://www.espn.com/espn/rss/news",
         dataType: "xml",
         success: function(data){
          xmlParserImageInside(data, "ESPN", "item", "description", "link", innerImage, ["picture:first source:first", "srcset"]);
         },
        error: function(){
          dataLength--;
        }
      });
    }

    if(data.includes("av-club")){
        $.ajax({
         type: "GET",
         url: "http://www.avclub.com/feeds/rss/",
         dataType: "xml",
         success: function(data){
           xmlParser(data, "AV Club", "item", "title", "link", divImage, ["description", "img", "src"]);
         },
        error: function(){
          dataLength--;
        }
        });
    }

    if(data.includes("vox")){
        $.ajax({
         type: "GET",
         url:  "http://www.vox.com/rss/index.xml",
         dataType: "xml",
         success: function(data){
           xmlParser(data, "Vox", "entry", "title", "id", divImage, ["content", "img", "src"]);
         },
        error: function(){
          dataLength--;
        }
        });
    }

    if(data.includes("new-york-times")){
         $.ajax({
         type: "GET",
         url: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
         dataType: "xml",
         success: function(data){
           xmlParserNYT(data);
         },
        error: function(){
          dataLength--;
        }
        });
    }

    if(data.includes("complex")){
         $.ajax({
         type: "GET",
         url: "http://assets.complex.com/feeds/channels/all.xml",
         dataType: "xml",
         success: function(data){
           xmlParser(data, "Complex", "item", "title", "link", normalImage, "enclosure");
         },
        error: function(){
          dataLength--;
        }
        });
    }

    if(data.includes("buzzfeed")){
        $.ajax({
         type: "GET",
         url: "https://www.buzzfeed.com/index.xml",
         dataType: "xml",
         success: function(data){
           xmlParser(data, "Buzzfeed", "item", "title", "link", buzzfeedImage, "media\\:content, content");
         },
        error: function(){
          dataLength--;
        }
        });
    }

    if(data.includes("abc-news")){
        $.ajax({
         type: "GET",
         url: "http://feeds.abcnews.com/abcnews/topstories",
         dataType: "xml",
         success: function(data){
           xmlParser(data, "ABC News", "item", "title", "link", normalImage, "media\\:thumbnail, thumbnail");
         },
        error: function(){
          dataLength--;
        }
        });
    }

    if(data.includes("pitchfork")){
        $.ajax({
         type: "GET",
         url: 'http://pitchfork.com/rss/news/',
         dataType: "xml",
         success: function(data){
           xmlParser(data, "Pitchfork", "item", "title", "link", normalImage, "enclosure");
         },
        error: function(){
          dataLength--;
        }
        });
    }
    
    if(data.includes("onion")){
        $.ajax({
         type: "GET",
         url: 'http://www.theonion.com/feeds/rss',
         dataType: "xml",
         success: function(data){
           xmlParser(data, "The Onion", "item", "title", "link", divImage, ["description", "img", "src"]);
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("rolling-stone")){
        $.ajax({
         type: "GET",
         url: 'http://www.rollingstone.com/rss',
         dataType: "xml",
         success: function(data){
           xmlParser(data, "Rolling Stone", "item", "title", "link", normalImage, "media\\:content, content");
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("five-thirty-eight")){
        $.ajax({
         type: "GET",
         url: 'http://fivethirtyeight.com/all/feed',
         dataType: "xml",
         success: function(data){
           xmlParser(data, "FiveThirtyEight", "item", "title:first", "link", normalImage, "media\\:content, content");
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("business-insider")){
        $.ajax({
         type: "GET",
         url: 'http://www.businessinsider.com/rss',
         dataType: "xml",
         success: function(data){
           xmlParser(data, "Business Insider", "item", "title", "link", biImage, "description");
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("people")){
        $.ajax({
         type: "GET",
         url: 'http://feeds.people.com/people/headlines',
         dataType: "xml",
         success: function(data){
          xmlParser(data, "People", "item", "title", "link", normalImage, "media\\:content, content");
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("associated-press")){
        $.ajax({
         type: "GET",
         url: 'http://hosted.ap.org/lineups/TOPHEADS.rss?SITE=AP&SECTION=HOME',
         dataType: "xml",
         success: function(data){
           xmlParserImageInside(data, "AP", "item", "title", "link", apImage, "img:first");
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("fortune")){
        $.ajax({
         type: "GET",
         url: 'http://fortune.com/feed/',
         dataType: "xml",
         success: function(data){
          xmlParser(data, "Fortune", "item", "title:first", "link", normalImage, "media\\:content, content");
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("cosmopolitan")){
        $.ajax({
         type: "GET",
         url: 'http://www.cosmopolitan.com/rss/all.xml/',
         dataType: "xml",
         success: function(data){
           xmlParser(data, "Cosmopolitan", "item", "title", "link", cosmoImage, ["description", "img", "href"]);
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("chicago-tribune")){
        $.ajax({
         type: "GET",
         url: 'http://www.chicagotribune.com/rss2.0.xml',
         dataType: "xml",
         success: function(data){
           xmlParserImageInside(data, "Chicago Tribune", "item", "title", "link", tribuneImage, ["img:first", "src"]);
         },
        error: function(){
          dataLength--;
        }
        });
    }    

    if(data.includes("fox")){
        $.ajax({
         type: "GET",
         url: 'http://feeds.foxnews.com/foxnews/latest?format=xml',
         dataType: "xml",
         success: function(data){
           xmlParserImageInside(data, "Fox News", "item", "title", "link", innerImage, [".m img:first", "src"]);
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("ign")){
        $.ajax({
         type: "GET",
         url: 'http://feeds.ign.com/ign/all?format=xml',
         dataType: "xml",
         success: function(data){
           xmlParserImageInside(data, "IGN", "item", "title", "link", ignImage, ['meta', 'content']);
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("bbc")){
        $.ajax({
         type: "GET",
         url: 'http://feeds.bbci.co.uk/news/rss.xml#',
         dataType: "xml",
         success: function(data){
           xmlParser(data, "BBC News", "item", "title", "link", normalImage, "media\\:thumbnail, thumbnail");
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("reuters")){
        $.ajax({
         type: "GET",
         url: 'http://feeds.reuters.com/reuters/topNews?format=xml',
         dataType: "xml",
         success: function(data){
           xmlParserImageInside(data, "Reuters", "item", "title", "link", innerImage, [".nav-share", "data-share-img"]);
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("economist")){
        $.ajax({
         type: "GET",
         url: 'http://www.economist.com/sections/international/rss.xml',
         dataType: "xml",
         success: function(data){
           xmlParserImageInside(data, "Economist", "item", "title", "link", economistImage, ["meta[name='twitter:image']", "content"]);
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("wired")){
        $.ajax({
         type: "GET",
         url: 'https://www.wired.com/feed/',
         dataType: "xml",
         success: function(data){
           xmlParserImageInside(data, "Wired", "item", "title", "link", innerImage, ["meta[name='twitter:image:src']", "content"]);
         },
        error: function(){
          dataLength--;
        }
        });
    }    
    
    if(data.includes("ars-technica")){
        $.ajax({
         type: "GET",
         url: 'http://feeds.arstechnica.com/arstechnica/index?format=xml',
         dataType: "xml",
         success: function(data){
           xmlParser(data, "Ars Technica", "item", "title", "link", arsImage, []);
         },
        error: function(){
          dataLength--;
        }
        });
    }

    if (data.length == 0){
      populateContent(data);
    }

  }
  
  function xmlParser(data, source, itemRef, titleRef, urlRef, imageFunction, imageParams){
    var contents = [];
    $(data).find(itemRef).each(function() {
      var content = new ContentObject();
      content.title = htmlDecode($(this).find(titleRef).text());
      content.source = source;
      content.url = $(this).find(urlRef).text();
      content.img = imageFunction(this, imageParams);
      if (content.img){
        contents.push(content);
      }
    });
    if (contents.length){
      demos.push(contents);
    }
    if (demos.length == dataLength){
      populateContentList(demos);
    }
  }
  
  
  function xmlParserImageInside(data, source, itemRef, titleRef, urlRef, imageFunction, imageParams) {
    var contents = [];
    $(data).find(itemRef).each(function () {
      var content = new ContentObject();
      content.title= htmlDecode($(this).find(titleRef).text());
      content.source=source;
      content.url= $(this).find(urlRef).text();
      $.ajax({
        url: content.url,
        success: function(data) {
          var imger = imageFunction(data, imageParams);
          if(imger){
            content.img = imger;
            contents.push(content);
          }
          if(contents.length == 7){
            demos.push(contents);
            if(demos.length == dataLength){
              populateContentList(demos);
            }
          }
        }
      });
    });
  }
  
  function normalImage(data, imgRef){
    return $(data).find(imgRef).attr("url");
  }
  
  function divImage(data, imgData){
    var temp_html = $(data).find(imgData[0]).text();
    var div = $("<div></div>");
    div.html(temp_html);
    return div.find(imgData[1]).attr(imgData[2]);
  }
  
  function innerImage(data, imgData){
    var div = $("<div></div>");
    div.html(data);
    var url = div.find(imgData[0]).attr(imgData[1]);
    if (url && url.startsWith("//")){
      url = "http:" + url;
    }
    if (url && !url.includes(" ")){
      return url;
    }
  }
  
  function arsImage(data, imgData){
    var url = $($($(data).get(0).lastElementChild).html()).find("img").attr("src");
    if (url && url.endsWith(".jpg")){
      return $($($(data).get(0).lastElementChild).html()).find("img").attr("src");
    }
  }
  
  function economistImage(data, imgData){
    var tempImg = innerImage(data, imgData);
    if (tempImg && !tempImg.endsWith("107.jpg")){
      return tempImg;
    }
  }
  
  function tribuneImage(data, imgData){
    if ($(data).find(imgData[0]).get(0)){
      return $(data).find(imgData[0]).get(0).currentSrc;
    }
  }
  
  function ignImage(data, imgData){
    var url;
    $(data).find(imgData[0]).each(function(){
      var content = $(this).get(0).content;
      if (content && content.endsWith(".jpg")){
        url = content;
      }
    });
    if (url) return url;
  }
  
  function apImage(data, imgRef){
    var tempImg = $(data).find(".ap-smallphoto-img").attr("src");
    if (tempImg){
      var url = "http://hosted.ap.org" + tempImg;
      url = url.replace("small", "big");
      return url;
    }
  }
  
  function cosmoImage(data, imgData){
    var tempImg = divImage(data, imgData);
    tempImg = tempImg.replace("?resize=100:*", "");
    return tempImg;
  }
  
  function buzzfeedImage(data, imgRef){
    var returnImage = "";
    var tempImg = "";
    $(data).find(imgRef).each(function(i, obj){
      tempImg = $(obj).attr("url");
      if (tempImg && tempImg.includes("=")){
        returnImage = tempImg;
      }
    });
    if (returnImage == ""){
      returnImage = tempImg;
    }
    return returnImage;
  }
  
  function biImage(data, imgRef){
    var temp = divImage(data, [imgRef, "img", "src"]);
    if (temp && !temp.includes(" ")){
      return temp;
    } else {
      return null;
    }
  }
  
  function xmlParserNYT(xml){
    var nyt = [];
    $(xml).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
      demo.source="New York Times";
      demo.url= $(this).find("link").text();
      img_url = $(this).find('media\\:content, content').attr('url');
      var original_url = img_url;
      if (img_url){
        img_url = img_url.replace(/((moth)(-\w*))\.jpg|(moth)\.jpg/, 'master675.jpg');
      }
      $.get(img_url).fail(function() { 
        demo.img = original_url;
      })
      demo.img = img_url;
      if(demo.img){
        nyt.push(demo);
      }
    });
    if(nyt.length > 7){
       demos.push(nyt); 
    }
    if(demos.length == dataLength ){
      populateContentList(demos);
    }
  }
    
  function htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }
    
  function populateContentList(demos){
     var final_array = [];

     while(final_array.length<7){
         var rand_site = Math.floor(Math.random() * demos.length);
         var rand_content = Math.floor(Math.random() * demos[rand_site].length);
         final_array.push(demos[rand_site][rand_content]);
         //remove content so not showed twice
         demos[rand_site].splice(rand_content, 1);
     }
     populateContent(final_array)

  }
  
  getData('sources', loadContent);
    
});