$(document).ready(function () {
  //push all content to demos array then pick a random 7
  //check boxes equal to sources then display (list of whats checked and check for each content if source is in that array)
  var demos = [];
  
  class ContentObject{
    constructor(title, source, img, url){
      this.title = title; //String article title
      this.source = source; //String source website
      this.img = img; //String image url
      this.url = url; //String article url
    }
  };

 $.ajax({
     type: "GET",
     url: "http://www.espn.com/espn/rss/news",
     dataType: "xml",
     success: xmlParser
    });
     $.ajax({
     type: "GET",
     url: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
     dataType: "xml",
     success: xmlParserNYT
    });
     $.ajax({
     type: "GET",
     url: "https://www.buzzfeed.com/index.xml",
     dataType: "xml",
     success: xmlParserBuzzfeed
    });
    $.ajax({
     type: "GET",
     url: "https://www.buzzfeed.com/index.xml",
     dataType: "xml",
     success: xmlParserBuzzfeed
    });
    $.ajax({
     type: "GET",
     url: "http://feeds.abcnews.com/abcnews/topstories",
     dataType: "xml",
     success: xmlParserABC
    });
  $.ajax({
  type: 'GET',
  url: 'http://pitchfork.com/rss/news/',

  // The 'contentType' property sets the 'Content-Type' header.
  // The JQuery default for this property is
  // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
  // a preflight. If you set this value to anything other than
  // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
  // you will trigger a preflight request.
  contentType: 'text/plain',

  xhrFields: {
    // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
    // This can be used to set the 'withCredentials' property.
    // Set the value to 'true' if you'd like to pass cookies to the server.
    // If this is enabled, your server must respond with the header
    // 'Access-Control-Allow-Credentials: true'.
    withCredentials: false
  },

  headers: {
    // Set any custom headers here.
    // If you set any non-simple headers, your server must include these
    // headers in the 'Access-Control-Allow-Headers' response header.
  },

  success: function(data) {
    var pitchfork = [];
      console.log(data);
    $(data).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
      if(demo.title.length > 55){
          demo.title = demo.title.substring(0,55) + "...";
      }
      demo.source="PitchFork";
      demo.url= $(this).find("link").text();
      demo.img = $(this).find("enclosure").attr("url");
      pitchfork.push(demo);
    });
      if(pitchfork.length > 7){
         demos.push(pitchfork); 
      }
      if(demos.length == 5 ){
        populateContentList(demos);
       }
  },

  error: function() {
    // Here's where you handle an error response.
    // Note that if the error was due to a CORS issue,
    // this function will still fire, but there won't be any additional
    // information about the error.
  }
});
    
function xmlParserNYT(xml){
    var nyt = [];
    $(xml).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
      if(demo.title.length > 55){
          demo.title = demo.title.substring(0,55) + "...";
      }
      demo.source="New York Times";
      demo.url= $(this).find("link").text();
      demo.img = $(this).find('media\\:content, content').attr('url');
      if(demo.img){
        nyt.push(demo);
      }
    });
      if(nyt.length > 7){
         demos.push(nyt); 
      }
      if(demos.length == 5 ){
        populateContentList(demos);
       }
}
    
function xmlParserABC(xml){
    var abc = [];
    $(xml).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
      if(demo.title.length > 55){
          demo.title = demo.title.substring(0,55) + "...";
      }
      demo.source="ABC News";
      demo.url= $(this).find("link").text();
      demo.img = $(this).find('media\\:thumbnail, thumbnail').attr('url');
      if(demo.img){
        abc.push(demo);
      }
    });
      if(abc.length > 7){
         demos.push(abc); 
      }
      if(demos.length == 5 ){
        populateContentList(demos);
       }
}
    
function xmlParserBuzzfeed(xml){
    var buzzfeed = [];
    $(xml).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
      if(demo.title.length > 55){
          demo.title = demo.title.substring(0,55) + "...";
      }
      demo.source="Buzzfeed";
      demo.url= $(this).find("link").text();
      demo.img = $(this).find('media\\:content, content').attr('url');
      if(demo.img){
        buzzfeed.push(demo);
      }
    });
      if(buzzfeed.length > 7){
         demos.push(buzzfeed); 
      }
      if(demos.length == 5 ){
        populateContentList(demos);
       }
}


 function xmlParser(xml) {

   var espn_content = [];

   $(xml).find("item").each(function () {

      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("description").text());
      if(demo.title.length > 55){
          demo.title = demo.title.substring(0,55) + "...";
      }
      demo.source="ESPN";
      demo.url= $(this).find("link").text();
     
      $.ajax({
        url: demo.url,
        success: function(data) {
          var imger = $(data).find("picture:first").find("source:first").attr("srcset");
          if(imger){
            demo.img = imger;
            espn_content.push(demo);
          }
          if(espn_content.length > 5){
              demos.push(espn_content);
                           
          }
          if(demos.length == 5 ){
              populateContentList(demos);
          }
        }
      });
       
  });
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
           console.log(demos[rand_site][rand_content]);
           final_array.push(demos[rand_site][rand_content]);
           //remove content so not showed twice
           demos[rand_site].splice(rand_content, 1);
       }
       populateContent(final_array)
       
   }
    
});