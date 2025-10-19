$(function () {
  var handle = $("#custom-handle");
  var basePrice = 140.32;

  function updateSlider(val) {
    handle.text(val);
    $("#amount").val("$" + ((val + 1) * basePrice).toFixed(2));
  }

  $("#slider").slider({
    min: 0,
    max: 36,
    value: 0,
    create: function () {
      let val = $(this).slider("value");
      updateSlider(val);
    },
    slide: function (event, ui) {
      updateSlider(ui.value);
    },
  });

  // Dropdown
  const dropdown = $(".dropdown");
  const selected = dropdown.find(".selected");
  const options = dropdown.find(".options");
  const arrow = dropdown.find(".arrow");

  selected.on("click", function () {
    options.toggle();
    arrow.toggleClass("up");
  });

  dropdown.find(".option").on("click", function () {
    selected.find(".info").html($(this).html());
    options.hide();
    arrow.removeClass("up");

    basePrice = parseFloat($(this).data("price"));
    let val = $("#slider").slider("value");
    updateSlider(val);
  });

  $(document).on("click", function (e) {
    if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
      options.hide();
      arrow.removeClass("up");
    }
  });
});

$(function () {
  var handle2 = $("#handle2");
  var basePrice2 = 240.22;
  var maxQty = 10;

  function updateSlider2(val) {
    handle2.text(val);
    $("#amount2").val("$" + (val * basePrice2).toFixed(2));
  }

  $("#slider2").slider({
    min: 0,
    max: maxQty,
    value: 0,
    create: function () {
      let val = $(this).slider("value");
      updateSlider2(val);
    },
    slide: function (event, ui) {
      updateSlider2(ui.value);
    },
  });

  //   const dropdown2 = $(".custom-dropdown");
  //   const selected2 = dropdown2.find(".custom-selected");
  //   const options2 = dropdown2.find(".custom-options");
  //   const arrow2 = dropdown2.find(".custom-arrow");

  //   selected2.on("click", function () {
  //     options2.toggle();
  //     arrow2.toggleClass("up");
  //   });

  //   dropdown2.find(".custom-option").on("click", function () {
  //     selected2.find(".custom-info").html($(this).html());
  //     options2.hide();
  //     arrow2.removeClass("up");

  //     basePrice2 = parseFloat($(this).data("price"));
  //     $("#slider2").slider("value", 0);
  //     updateSlider2(0);
  //   });

  //   $(document).on("click", function (e) {
  //     if (!dropdown2.is(e.target) && dropdown2.has(e.target).length === 0) {
  //       options2.hide();
  //       arrow2.removeClass("up");
  //     }
  //   });
});
