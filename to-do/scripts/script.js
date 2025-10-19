$(document).ready(function () {
    let editingItem = null;

  function handlePromptSubmission() {
    let inputvalue = $("#user-prompt").val();
    $("#user-prompt").val("");
    if (!inputvalue.trim()) return;

    if (editingItem) {
      editingItem.find(".data-div p").text(inputvalue);
      $("#user-prompt").val("");
      editingItem = null; 
      return;
    }

    $(".to-do-list").append(
      `
            <div class="data-col">
              <div class="data-div">
                <p>
                ` +
        inputvalue +
        `
                </p>
              </div>

              <div class="data-btns">
                <div class="btn edit-btn">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </div>
                <div class="btn del-btn">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            `
    );
  }

  $("#user-prompt").keydown(function (e) {
    if (e.keyCode === 13) handlePromptSubmission();
  });

  $(".add-btn").click(function (e) {
    handlePromptSubmission();
  });

  $(document).on("click", ".del-btn", function () {
    $(this).parent().parent().remove();
  });

  $(document).on("click", ".edit-btn", function () {
    let parent = $(this).parent().parent();
    let editText = parent.find(".data-div p").text().trim();

    $("#user-prompt").val(editText).focus();

    editingItem = parent;
  });
});
