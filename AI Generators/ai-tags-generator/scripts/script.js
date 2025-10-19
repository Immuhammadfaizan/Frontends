$(document).ready(function () {
  const $form = $("#tagsForm");
  const $resultArea = $("#resultArea");
  const $successMessage = $("#successMessage");

  // Handle form submission
  $form.on("submit", function (e) {
    e.preventDefault();

    const topic = $("#contentTopic").val().trim();
    const type = $("#contentType").val();
    const info = $("#additionalInfo").val().trim();

    if (!topic || !type) {
      showError("Please fill in all required fields.");
      return;
    }

    const prompt = `Generate ${type} tags for topic: "${topic}". Additional info: "${info}".`;

    $resultArea.html("<p class='loading-text'>Generating tags...</p>");

    $("#generateBtn").on("click", function () {
      let prompt = $("#promptInput").val().trim();

      if (!prompt) {
        $("#resultArea").html(
          '<span class="text-amber-400 italic text-sm">Please enter a prompt first.</span>'
        );
        return;
      }

      let generatedText =
        "Fuji, Gala, Honeycrisp, Pink Lady, Granny Smith, Ambrosia, Jazz, Envy, Red Delicious, Golden Delicious";

      let tags = generatedText.split(",");

      $("#resultArea").empty();

      tags.forEach((tag) => {
        $("#resultArea").append(`
      <span class="tag-item">${tag.trim()}</span>
    `);
      });
    });

    $.ajax({
      url: "scripts/php/receive.php",
      type: "GET",
      data: { question: prompt },
      success: function (response) {
        $resultArea.html(formatTags(response));
      },
      error: function () {
        showError("Unable to fetch tags.");
      },
    });
  });

  // Format tags into styled, horizontal items
  function formatTags(response) {
    const tags = response.split(/[,#\n]+/).filter((tag) => tag.trim());
    const $wrapper = $("<div>", { class: "coffee-tag-wrapper text-left" });
    const $heading = $("<h3>", {
      text: "Generated Tags:",
      class: "tag-heading text-left",
    });

    const $list = $("<div>", { class: "tag-list" });
    let note = "";

    tags.forEach((tag, i) => {
      if (/feel free|modify|combine|theme/i.test(tag)) {
        note = tag.trim(); // it will save the note separately
      } else {
        $("<li>", {
          class: "tag-item",
          text: `${i + 1}.${tag.trim()}`,
        }).appendTo($list);
      }
    });

    const $copyButton = $("<button>", {
      id: "copyAllTags",
      class: "btn-copy",
      text: "Copy All",
    });

    $wrapper.append($heading).append($list);

    if (note) {
      $("<p>", {
        class: "tag-note mt-3 text-amber-400 italic",
        text: note,
      }).appendTo($wrapper);
    }

    $wrapper.append($copyButton);

    return $wrapper;
  }

  // Error display
  function showError(message) {
    $resultArea.html(`<p class='error-text'>Error: ${message}</p>`);
  }

  // Copy single tag on click
  $(document).on("click", ".tag-item", function () {
    const tagText = $(this).text();
    navigator.clipboard.writeText(tagText);
    showSuccess("Tag copied!");
  });

  // Copy all tags
  $(document).on("click", "#copyAllTags", function () {
    const allTags = $(".tag-item")
      .map(function () {
        return $(this).text();
      })
      .get()
      .join(", ");

    if (allTags) {
      navigator.clipboard.writeText(allTags);
      showSuccess("All tags copied!");
    }
  });

  // Success message animation
  function showSuccess(message) {
    $successMessage
      .text(message)
      .removeClass("hidden")
      .fadeIn(200)
      .delay(1500)
      .fadeOut(300, () => $successMessage.addClass("hidden"));
  }
});
