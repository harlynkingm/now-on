$(document).ready(function () {
  //push all content to demos array then pick a random 7
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
    console.log(data);
  },

  error: function() {
    // Here's where you handle an error response.
    // Note that if the error was due to a CORS issue,
    // this function will still fire, but there won't be any additional
    // information about the error.
  }
});


 function xmlParser(xml) {

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
          if(espn_content.length > 7){
              populateContent(espn_content);
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
    
});