$(document).ready(function () {
  let count = 0;

  const elements = [
    "aside",
    ".sidebar",
    ".section.quil",
    ".container.main-content",
    ".row.header",
    ".row.title",
    ".row.input",
    ".row.bottoms-btns",
    ".row.footer .copy",
  ];

  $("#close").on("click", function () {
    elements.forEach((el) => $(el).toggleClass("collapsed expand"));
    elements.forEach((el) => console.log(el, $(el).attr("class")));
  });

  $("#open").on("click", function () {
    elements.forEach((el) => $(el).removeClass("collapsed").addClass("expand"));
  });

  $(".dropdown-toggle").on("click", function (e) {
    e.stopPropagation();
    const menu = $(this).siblings(".dropdown-menu");
    $(".dropdown-menu").not(menu).removeClass("active");
    menu.toggleClass("active");
  });

  $(document).on("click", function () {
    $(".dropdown-menu").removeClass("active");
  });

  // Prompt Generation Here
  function handlePromptSubmission() {
    var inputValue = $("#user-prompt").val();
    $("#user-prompt").val("");
    $(".row.title").remove();

    $(".reply").append(
      `
       <div class="query">
            <div class="hello">
              <p> ` +
        inputValue +
        ` </p>
            </div>

            <div class="copy-edit">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 256 256"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"
                ></path>
              </svg>

              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 256 256"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"
                ></path>
              </svg>
            </div>
          </div>
      `
    );

    if (count == 0) {
      $(".recent-bar").append(
        `
        <div class="menu-list"> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" class="text-primaryColor" height="20" width="20" xmlns="http://www.w3.org/2000/svg" > <path d="M48,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0Zm16,64V64A16,16,0,0,1,80,48h96a16,16,0,0,1,16,16v40a16,16,0,0,1-16,16H80A16,16,0,0,1,64,104Zm16,0h96V64H80Zm152,48v40a16,16,0,0,1-16,16H80a16,16,0,0,1-16-16V152a16,16,0,0,1,16-16H216A16,16,0,0,1,232,152Zm-16,40V152H80v40H216Z" ></path> </svg>
         <h4>` +
          inputValue.substring(0, 20) +
          `</h4> 
         <div class="dropdown dropdown-toggle"> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" class="text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" > <path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128ZM60,112a16,16,0,1,0,16,16A16,16,0,0,0,60,112Zm136,0a16,16,0,1,0,16,16A16,16,0,0,0,196,112Z" ></path> </svg> </div> <div class="dropdown-menu"> <div class="item"><i class="fa fa-pencil"></i> Rename</div> <div class="item"><i class="fa fa-share"></i> Share</div> <div class="item"><i class="fa fa-archive"></i> Archive</div> <div class="item delete"> <i class="fa fa-trash"></i> Delete </div> </div> </div>
      `
      );
      count++;
    }

    setTimeout(function () {
      $(".reply").append(
        '<img src="https://assets-v2.lottiefiles.com/a/187c58b4-d2eb-11ee-a835-f71f75809ac9/mtX6se6GrG.gif" class="img-loader">'
      );
    }, 500);

    setTimeout(function () {
      $(".img-loader").remove();
      $(".row.bottoms-btns").remove();

$.ajax({
    url: 'scripts/php/receive.php',
    type: 'GET',
     data: {
        question: inputValue,
        var2: 'value2'
    },
    success: function(data) {
      //parsing json
      console.log(data);


        $(".reply").append(
        `<div class="res-result">
          <div class="resp-bar">

            <div class="btm-data">
              <div class="resp-txt">
                <p>
            `+ data +`        
                </p>
              </div>
            </div>
          </div>
          <div class="flow-icon-bar">

            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M155.51,24.81a8,8,0,0,0-8.42.88L77.25,80H32A16,16,0,0,0,16,96v64a16,16,0,0,0,16,16H77.25l69.84,54.31A8,8,0,0,0,160,224V32A8,8,0,0,0,155.51,24.81ZM32,96H72v64H32ZM144,207.64,88,164.09V91.91l56-43.55Zm54-106.08a40,40,0,0,1,0,52.88,8,8,0,0,1-12-10.58,24,24,0,0,0,0-31.72,8,8,0,0,1,12-10.58ZM248,128a79.9,79.9,0,0,1-20.37,53.34,8,8,0,0,1-11.92-10.67,64,64,0,0,0,0-85.33,8,8,0,1,1,11.92-10.67A79.83,79.83,0,0,1,248,128Z"></path></svg>
            
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path></svg>
            
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"></path></svg>
            
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"></path></svg>
            
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M88,104H40a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0V76.69L62.63,62.06A95.43,95.43,0,0,1,130,33.94h.53a95.36,95.36,0,0,1,67.07,27.33,8,8,0,0,1-11.18,11.44,79.52,79.52,0,0,0-55.89-22.77h-.45A79.56,79.56,0,0,0,73.94,73.37L59.31,88H88a8,8,0,0,1,0,16Zm128,48H168a8,8,0,0,0,0,16h28.69l-14.63,14.63a79.56,79.56,0,0,1-56.13,23.43h-.45a79.52,79.52,0,0,1-55.89-22.77,8,8,0,1,0-11.18,11.44,95.36,95.36,0,0,0,67.07,27.33H126a95.43,95.43,0,0,0,67.36-28.12L208,179.31V208a8,8,0,0,0,16,0V160A8,8,0,0,0,216,152Z"></path></svg><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M237.66,106.35l-80-80A8,8,0,0,0,144,32V72.35c-25.94,2.22-54.59,14.92-78.16,34.91-28.38,24.08-46.05,55.11-49.76,87.37a12,12,0,0,0,20.68,9.58h0c11-11.71,50.14-48.74,107.24-52V192a8,8,0,0,0,13.66,5.65l80-80A8,8,0,0,0,237.66,106.35ZM160,172.69V144a8,8,0,0,0-8-8c-28.08,0-55.43,7.33-81.29,21.8a196.17,196.17,0,0,0-36.57,26.52c5.8-23.84,20.42-46.51,42.05-64.86C99.41,99.77,127.75,88,152,88a8,8,0,0,0,8-8V51.32L220.69,112Z"></path></svg>
            
            </div>
        </div>
                `
      );
    },
    error: function(xhr, status, error) {
        console.error('Error:', status);
    }
});


// Example usage:
/*
makeOpenAICall('Hello, how can I assist you today?', (err, response) => {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Response:', response.choices[0].message.content);
});
*/

      
    }, 2000);
  }

  $("#user-prompt").keydown(function (e) {
    if (e.keyCode === 13) handlePromptSubmission();
  });

  $(".input-func-btn").click(function () {
    handlePromptSubmission();
  });


/*
  const OPENAI_API_KEY = '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';

  const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

function makeOpenAICall(prompt, callback) {
    $.ajax({
        url: OPENAI_API_URL,
        type: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        data: JSON.stringify({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150
        }),
        success: function(response) {
            callback(null, response);
        },
        error: function(xhr, status, error) {
            callback(new Error(`API call failed: ${status}`), null);
        }
    });
}
*/

});
