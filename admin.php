<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Define valid username and password
    $validUsername = "admin";
    $validPassword = "tntj";

    // Perform validation
    if ($username == $validUsername && $password == $validPassword) {
        // Valid credentials, redirect to a success page or perform any desired action
        echo("<h2 style='color:green'>Login successfully..</h2>");

        exit;
    } else {
        // Invalid credentials, display an error message
        echo("<h2 style='color:red'>Invalid username or password</h2>");
    }
}
?>

    

