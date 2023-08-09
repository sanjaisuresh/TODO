<?php
// Your database connection credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "retinallogin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) 
{
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['username']) && isset($_POST['email']) && isset($_POST['password']) )
{
// Retrieve form data
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

// Insert data into the database
$sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";

if ($conn->query($sql) === TRUE) 
{
    echo "Signup successful!";
} else 
{
    echo "Error: " . $sql . "<br>" . $conn->error;
}
}

$conn->close();
?>