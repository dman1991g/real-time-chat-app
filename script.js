// Function to send a message
function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const messageText = messageInput.value.trim();
  if (messageText !== "") {
    const sender = "user1"; // Assuming sender is a constant for demonstration
    const timestamp = new Date().toISOString();
    const newMessageRef = firebase.database().ref("messages").push();
    newMessageRef.set({
      sender: sender,
      text: messageText,
      timestamp: timestamp
    });
    messageInput.value = "";
  }
}

// Function to display messages
function displayMessage(message) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.innerText = `${message.sender}: ${message.text}`;
  chatBox.appendChild(messageElement);
}

// Listen for new messages in real-time
firebase.database().ref("messages").on("child_added", function(snapshot) {
  const message = snapshot.val();
  displayMessage(message);
});

// Send message when the send button is clicked
document.getElementById("send-btn").addEventListener("click", sendMessage);

// Send message when Enter key is pressed
document.getElementById("message-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
