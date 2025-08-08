const input = document.querySelector("#input");
const container = document.querySelector(".container");
const btn = document.querySelector("#btn");
const chatContainer = document.querySelector(".chat-container");

let userMessage = null;

let apiUrl = "http://localhost:5000/api/chat";

function createChatBox(html, className) {
  const div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}


async function getApiResponse(aiChatBox) {
  const textElement = aiChatBox.querySelector(".text");

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    const apiResponse = data?.response || "कोई उत्तर नहीं मिला।";
    textElement.innerText = apiResponse;
  } catch (error) {
    console.error("API error:", error);
    textElement.innerText = "❌ कुछ गड़बड़ हो गई।";
  } finally {
    aiChatBox.querySelector(".loading").style.display = "none";
  }
}


function showLoading() {
  const html = `
    <div class="img">
      <img src="ai.png" alt="AI model" width="50" />
    </div>
    <p class="text"></p>
    <img class="loading" src="loading.gif" height="50" alt="loading">
  `;
  const aiChatBox = createChatBox(html, "ai-chat-box");
  chatContainer.appendChild(aiChatBox);

  getApiResponse(aiChatBox);
}

btn.addEventListener("click", () => {
  userMessage = input.value.trim();

  if (!userMessage) {
    container.style.display = "flex";
    return;
  } else {
    container.style.display = "none";
  }

  const html = `
    <div class="img">
      <img src="user.png" alt="User" width="50" />
    </div>
    <p class="text">${userMessage}</p>
  `;
  const userChatBox = createChatBox(html, "user-chat-box");
  chatContainer.appendChild(userChatBox);

  input.value = "";
  setTimeout(showLoading, 500);
});

