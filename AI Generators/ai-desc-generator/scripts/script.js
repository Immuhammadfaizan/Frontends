$(document).ready(function () {
  $("#descriptionForm").on("submit", function (e) {
    e.preventDefault();

    let contentType = $("#contentType").val();
    let audience = $("#audience").val();
    let additional = $("#additionalInfo").val().trim();

    if (!contentType || !audience) {
      $("#generatedText").text(
        "Please select both Content Type and Target Audience."
      );
      $("#resultsSection").removeClass("hidden");
      return;
    }

    let prompt = `Generate a professional ${contentType} description for ${audience}. ${
      additional ? "Additional info: " + additional : ""
    }`;

    $("#generatedText").text("Generating AI description...");
    $("#resultsSection").removeClass("hidden");

    $.ajax({
      url: "scripts/php/receive.php",
      method: "GET",
      data: { question: prompt },
      success: function (response) {
        const formatted = markdownToHTML(response);
        $("#generatedText").html(formatted);
      },
      error: function () {
        $("#generatedText").text("Unable to connect to AI server.");
      },
    });
  });

  $(document).on("click", "#copyBtn", function () {
    let text = $("#generatedText").text();
    navigator.clipboard.writeText(text);
    $("#successMessage").removeClass("hidden");
    setTimeout(() => $("#successMessage").addClass("hidden"), 2000);
  });

  $(document).on("click", "#regenerateBtn", function () {
    $("#descriptionForm").trigger("submit");
  });

  function markdownToHTML(md) {
    let html = md
      // Headings (support up to 6 levels)
      .replace(/^###### (.*$)/gim, '<h6 class="article-h6">$1</h6>')
      .replace(/^##### (.*$)/gim, '<h5 class="article-h5">$1</h5>')
      .replace(/^#### (.*$)/gim, '<h4 class="article-h4">$1</h4>')
      .replace(/^### (.*$)/gim, '<h3 class="article-h3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="article-h2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="article-h1">$1</h1>')

      // Bold & italic
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")

      // Numbered list
      .replace(/^\d+\.\s+(.*$)/gim, '<li class="article-li">$1</li>')
      
      // Bullet list
      .replace(/^[-•]\s+(.*$)/gim, '<li class="article-li">$1</li>')
      
      // Paragraphs
      .replace(/^(?!<h|<li)(.+)$/gim, '<p class="article-p">$1</p>');

    // Wrap lists
    html = html.replace(
      /(<li[\s\S]*?<\/li>)/gim,
      '<ul class="article-ul">$1</ul>'
    );

    return `<div class="article-container">${html}</div>`;
  }
});
