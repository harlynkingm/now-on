var loadContent;
$(document).ready(function () {
  //push all content to demos array then pick a random 7
  //check boxes equal to sources then display (list of whats checked and check for each content if source is in that array)
  var demos = [];
  var dataLength = 0;
  getData('sources', loadContent);
  class ContentObject{
    constructor(title, source, img, url){
      this.title = title; //String article title
      this.source = source; //String source website
      this.img = img; //String image url
      this.url = url; //String article url
    }
  };

loadContent = function(data){
dataLength = data.length;
if(data.includes("espn")){
 $.ajax({
     type: "GET",
     url: "http://www.espn.com/espn/rss/news",
     dataType: "xml",
     success: xmlParserESPN
    });
}
if(data.includes("av-club")){
    $.ajax({
     type: "GET",
     url: "http://www.avclub.com/feeds/rss/",
     dataType: "xml",
     success: xmlParserAVClub
    });
}
if(data.includes("vox")){
    $.ajax({
     type: "GET",
     url:  "http://www.vox.com/rss/index.xml",
     dataType: "xml",
     success: xmlParserVox
    });
}
if(data.includes("ny-times")){
     $.ajax({
     type: "GET",
     url: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
     dataType: "xml",
     success: xmlParserNYT
    });
}
if(data.includes("complex")){
     $.ajax({
     type: "GET",
     url: "http://assets.complex.com/feeds/channels/all.xml",
     dataType: "xml",
     success: xmlParserComplex
    });
}
if(data.includes("buzzfeed")){
    $.ajax({
     type: "GET",
     url: "https://www.buzzfeed.com/index.xml",
     dataType: "xml",
     success: xmlParserBuzzfeed
    });
}
if(data.includes("abc-news")){
    $.ajax({
     type: "GET",
     url: "http://feeds.abcnews.com/abcnews/topstories",
     dataType: "xml",
     success: xmlParserABC
    });
}
if(data.includes("pitchfork")){
    $.ajax({
     type: "GET",
     url: 'http://pitchfork.com/rss/news/',
     dataType: "xml",
     success: xmlParserPitchfork
    });
}
}
function xmlParserPitchfork(xml){
    var pitchfork = [];
    $(xml).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
      demo.source="PitchFork";
      demo.url= $(this).find("link").text();
      demo.img = $(this).find("enclosure").attr("url");
      pitchfork.push(demo);
    });
      if(pitchfork.length > 7){
         demos.push(pitchfork); 
      }
      if(demos.length == dataLength ){
        populateContentList(demos);
       }
}
function xmlParserNYT(xml){
    var nyt = [];
    $(xml).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
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
      if(demos.length == dataLength ){
        populateContentList(demos);
       }
}
    
function xmlParserABC(xml){
    var abc = [];
    $(xml).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
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
      if(demos.length == dataLength ){
        populateContentList(demos);
       }
}
    
function xmlParserBuzzfeed(xml){
    var buzzfeed = [];
    $(xml).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
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
      if(demos.length == dataLength ){
        populateContentList(demos);
       }
}
    
function xmlParserComplex(xml){
    var complex = [];
    $(xml).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
      demo.source="Complex";
      demo.url= $(this).find("link").text();
      demo.img = $(this).find("enclosure").attr("url");
      if(demo.img){
        complex.push(demo);
      }
    });
      if(complex.length > 7){
         demos.push(complex); 
      }
      if(demos.length == dataLength ){
        populateContentList(demos);
       }
}


 function xmlParserESPN(xml) {

   var espn_content = [];

   $(xml).find("item").each(function () {

      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("description").text());
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
          if(demos.length == dataLength ){
              populateContentList(demos);
          }
        }
      });
       
  });
}
    
function xmlParserVox(xml){
    var vox = [];
    $(xml).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
      demo.source="Vox";
      demo.url= $(this).find("link").text();
      demo.img = $(this).find("content").find("img").attr("src");
      if(demo.img){
        vox.push(demo);
      }
    });
      if(vox.length > 7){
         demos.push(vox); 
      }
      if(demos.length == dataLength ){
        populateContentList(demos);
       }
}  
function xmlParserAVClub(xml){
    var AVClub = [];
    $(xml).find("item").each(function () {
      var demo = new ContentObject();
      demo.title= htmlDecode($(this).find("title").text());
      demo.source="AV Club";
      demo.url= $(this).find("link").text();
      demo.img = $(this).find("description").find("img").attr("src");
      if(demo.img){
        AVClub.push(demo);
      }
    });
      if(AVClub.length > 7){
         demos.push(AVClub); 
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
    
});