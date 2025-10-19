$(".closure .rc-41").on("click", function () {
  $(".container-fluid.sidebar").toggleClass("collapsed");
  $(".wrapper").toggleClass("collapsed");
  $(".container.main-content").toggleClass("collapsed");
  
  $(".closure i.fa-angle-double-left, .closure i.fa-angle-double-right").toggle();
});
