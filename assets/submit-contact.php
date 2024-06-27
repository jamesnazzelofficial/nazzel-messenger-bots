<?php

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));
    $preferred_contact = htmlspecialchars(trim($_POST['preferred_contact']));

    // Validation (basic validation, you can enhance as needed)
    if (empty($name) || empty($email) || empty($message) || empty($preferred_contact)) {
        echo "Please fill in all fields.";
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format.";
        exit;
    }

    // Send email (example for email contact method)
    if ($preferred_contact == 'email') {
        $to = "jamesnazzelv.quinto@gmail.com"; // Replace with your email address
        $subject = "Message from Contact Form";
        $body = "Name: $name\n";
        $body .= "Email: $email\n";
        $body .= "Message:\n$message\n";
        
        $headers = "From: $email";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            echo "Message sent successfully. We will contact you shortly.";
        } else {
            echo "Failed to send message. Please try again later.";
        }
    } elseif ($preferred_contact == 'telegram') {
        // Example for Telegram contact method (requires bot integration)
        $telegram_bot_token = "your_telegram_bot_token_here"; // Replace with your Telegram bot token
        $telegram_chat_id = "your_telegram_chat_id_here"; // Replace with your Telegram chat ID

        // Compose message
        $telegram_message = "Name: $name\n";
        $telegram_message .= "Email: $email\n";
        $telegram_message .= "Message:\n$message\n";

        // Send message via Telegram bot API
        $telegram_url = "https://api.telegram.org/bot$telegram_bot_token/sendMessage";
        $telegram_params = [
            'chat_id' => $telegram_chat_id,
            'text' => $telegram_message
        ];

        // Send request
        $ch = curl_init($telegram_url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $telegram_params);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $telegram_response = curl_exec($ch);
        curl_close($ch);

        // Check response
        $telegram_response = json_decode($telegram_response, true);
        if ($telegram_response && $telegram_response['ok']) {
            echo "Message sent successfully via Telegram. We will contact you shortly.";
        } else {
            echo "Failed to send message via Telegram. Please try again later.";
        }
    } else {
        echo "Contact method not implemented yet."; // Handle other contact methods here
    }
} else {
    echo "Method not allowed.";
}
