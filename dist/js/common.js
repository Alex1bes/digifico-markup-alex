$(function() {
  $("ul").each(function(indx, ul) {
    var lis = $("li", ul),
      width = $(ul).width();
    lis.each(function(indx, li) {
      width -= $(li).width();
      var left = width;
      width -= $(li).width();
      $(li).on("click", function(event) {
        event.preventDefault();
        $(".link", lis).not($(".link", li).addClass("active")).removeClass("active");
        $(ul).css("margin-left", left + "px")
      });
      $(".link", li).is(".active") && $(li).click()
    })
  })
});