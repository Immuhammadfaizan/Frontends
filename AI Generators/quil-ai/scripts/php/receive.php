<?php

$question = $_GET['question'];
//operation 
$question = urlencode($question);
$result = file_get_contents("http://195.179.229.119/gpt4/chatgptapi.php?prompt=" . $question);

echo $result;

?>
