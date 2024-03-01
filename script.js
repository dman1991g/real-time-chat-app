// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCNU5uJ9YkR3F3BtghpRwIJ3TR6FaUFxTM",
  authDomain: "real-time-chat-app-b5633.firebaseapp.com",
  projectId: "real-time-chat-app-b5633",
  storageBucket: "real-time-chat-app-b5633.appspot.com",
  messagingSenderId: "598824406460",
  appId: "1:598824406460:web:69dd525b78ada125be2fb9"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Function to send a message
function sendMessage() {
  const message = document.getElementById("message-input").value;
  if (message.trim() !== "") {
    const newMessageRef = database.ref("messages").push();
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
database.ref("messages").on("child_added", function(snapshot) {
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
