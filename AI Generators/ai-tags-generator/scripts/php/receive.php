<?php
$question = $_GET['question'] ?? '';
if(empty($question)){ echo "No prompt received."; exit; }

$question = urlencode($question);
$url = "http://195.179.229.119/gpt4/chatgptapi.php?prompt=".$question;

$response = @file_get_contents($url);
if($response){ echo $response; }
else { echo "Unable to connect to AI server."; }
?>
