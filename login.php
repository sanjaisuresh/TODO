<?php
// Your database connection credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "retinallogin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if (isset($_POST['username']) && isset($_POST['password']) ){
// Retrieve form data
$username = $_POST['username'];
$password = $_POST['password'];

// Validate login
$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);
if ($result && $result->num_rows > 0) {
        // User credentials are valid. Redirect to the home page.
        header('Location: index.html');
        exit; // Make sure to terminate the script after the redirect
    } else {
        // Handle invalid credentials (for example, display an error message)
        echo '<p>Invalid username or password. Please try again.</p>';
    }
}

$conn->close();
?>
