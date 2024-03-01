// Function to send a message
function sendMessage() {
  const message = document.getElementById("message-input").value;
  if (message.trim() !== "") {
    const newMessageRef = window.firebase.database().ref("messages").push();
    newMessageRef.set({
      text: message
    });
    document.getElementById("message-input").value = "";
  }
}

// Function to display messages
function displayMessage(message) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.innerText = message.text;
  chatBox.appendChild(messageElement);
}

// Listen for new messages in real-time
window.firebase.database().ref("messages").on("child_added", function(snapshot) {
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
