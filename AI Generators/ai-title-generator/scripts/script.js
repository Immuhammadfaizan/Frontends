$(document).ready(function () {
  // Toggle dropdown visibility
  $(document).on("click", ".select", function () {
    const $currentSelect = $(this);
    const $currentDropdown = $currentSelect.next(".dropdown-list");
    const $icon = $currentSelect.find(".angle-down i");

    $(".dropdown-list").not($currentDropdown).slideUp(150);
    $(".angle-down i").not($icon).removeClass("rotated");

    $currentDropdown.slideToggle(150);
    $icon.toggleClass("rotated");
  });

  // Option select
  $(document).on("click", ".dropdown-list div", function (e) {
    const selectedText = $(this).text().trim();
    const $dropdown = $(this).closest(".dropdown-list");
    const $select = $dropdown.prev(".select");

    $select.find("span:first").text(selectedText);
    $dropdown.slideUp(150);
    $select.find(".angle-down i").removeClass("rotated");

    e.stopPropagation();
  });

  // Close if clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".form-group").length) {
      $(".dropdown-list").slideUp(150);
      $(".angle-down i").removeClass("rotated");
    }
  });

  // Generate button click
  $("#generateBtn").on("click", function () {
    let category = $("#selectedCategory").text();
    let audience = $("#selectedAudience").text();
    let contentType = $("#selectedContent").text();
    let niche = $("#niche").val();
    let keywords = $("#keywords").val();

    if (
      category === "Select Category" ||
      audience === "Select Audience" ||
      contentType === "Select Content Type" ||
      !niche ||
      !keywords
    ) {
      alert("Please fill all fields before generating!");
      return;
    }

    let prompt = `Generate an SEO optimized title for a ${contentType} in the ${category} category about ${niche}, targeting ${audience}. Keywords: ${keywords}.`;

    $("#generateBtn").html("Generating...").css("opacity", "0.6");

    $.ajax({
      url: "scripts/php/receive.php",
      type: "GET",
      data: { question: prompt },
      success: function (response) {
        let charCount = response.length;
        let wordCount = response.split(" ").length;

        let resultHTML = `
          <div class="result-container" id="resultContainer" style="display:block;">
            <div class="result-header">
              <span class="success-icon"></span>
              <h3>Generated SEO Title</h3>
            </div>
            <div class="generated-title">
              <h4 id="generatedTitle">${response}</h4>
              <div class="title-meta">
                <span class="meta-item">${charCount} characters</span>
                <span class="meta-item">${wordCount} words</span>
                <span class="meta-item">SEO Optimized</span>
              </div>
            </div>
            <button class="copy-btn" id="copyBtn">Copy Title</button>
          </div>
        `;

        // Append result to page — FIXED
        $(".form-container").after(resultHTML);

        // Reset button
        $("#generateBtn").html("<span>Generate SEO Title</span>").css({
          opacity: "1",
          "pointer-events": "auto",
        });
      },
      error: function () {
        alert("Error! Please try again.");
        $("#generateBtn").html("<span>Generate SEO Title</span>").css({
          opacity: "1",
          "pointer-events": "auto",
        });
      },
    });
  });

  // Copy button
  $(document).on("click", "#copyBtn", function () {
    let $btn = $(this);
    let text = $("#generatedTitle").text();

    navigator.clipboard.writeText(text).then(() => {
      $btn.text("Copied!");
      $btn.css({
        background: "#10b981",
        color: "#fff",
      });

      setTimeout(() => {
        $btn.text("Copy Title");
        $btn.css({
          background: "rgba(212, 175, 55, 0.2)",
          color: "#d4af37",
        });
      }, 1500);
    });
  });
});
