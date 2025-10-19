<?php
// Get the incoming question parameter
$question = $_GET['question'] ?? '';

// Validate the input
if (empty(trim($question))) {
    echo "No prompt received.";
    exit;
}

// URL encode the prompt safely
$encodedQuestion = urlencode($question);

// Build your external API endpoint
$url = "http://195.179.229.119/gpt4/chatgptapi.php?prompt=" . $encodedQuestion;

// Set up context to avoid SSL or timeout issues
$context = stream_context_create([
    "http" => [
        "timeout" => 30, // 30 seconds timeout
        "ignore_errors" => true
    ]
]);

// Fetch response
$response = @file_get_contents($url, false, $context);

// Handle possible failure
if ($response === false || empty(trim($response))) {
    echo "Unable to connect to AI server or empty response.";
    exit;
}

// Send back plain text response
header("Content-Type: text/plain; charset=UTF-8");
echo trim($response);
?>
