const myURL = "https://excuser-three.vercel.app/v1/excuse/";
let excusePara = document.querySelector("#excuse");
const buttons = document.querySelectorAll(".get-excuse");
console.log(buttons);

const categories = ["unbelievable", "funny", "college", "developers"];
const colors = ["danger", "success", "warning", "info"];

const getExcuse = async (category, colorBG) => {
  const res = await fetch(myURL + category + "/");
  const data = await res.json();
  let excuse = data[0].excuse;
  console.dir(excuse);
  excusePara.innerText = excuse;
  excusePara.className = ""; // Reset the classes
  excusePara.classList.add(...colorBG.split(" ")); // Add the new classes
};

buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    let category = categories[index];
    let color = colors[index];
    let colorBG = `p-3 text-${color}-emphasis bg-${color}-subtle border border-${color}-subtle rounded-3`;
    getExcuse(category, colorBG);
  });
});

excusePara.addEventListener("click", () => {
  const textToCopy = excusePara.textContent;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      console.log("Text copied to clipboard");
      // Optionally, you can provide visual feedback to the user here
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      // Optionally, handle errors or provide feedback to the user
    });
});

// Function to show notification
function showNotification(message) {
  // Create a notification element
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = message;

  // Add CSS styles for the notification
  notification.style.position = "fixed";
  notification.style.bottom = "20px";
  notification.style.left = "50%";
  notification.style.transform = "translateX(-50%)";
  notification.style.padding = "10px";
  notification.style.background = "#333";
  notification.style.color = "#fff";
  notification.style.borderRadius = "5px";
  notification.style.opacity = "0";
  notification.style.transition = "opacity 0.5s ease-in-out";

  // Append the notification to the document body
  document.body.appendChild(notification);

  // Show the notification
  setTimeout(() => {
    notification.style.opacity = "1";
  }, 100);

  // Hide the notification after 2 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    // Remove the notification from the DOM after it fades out
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 1000);
}

// Add event listener to copy text when clicking the excuse paragraph
excusePara.addEventListener("click", () => {
  const textToCopy = excusePara.textContent;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      console.log("Text copied to clipboard");
      // Show notification
      showNotification("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      // Optionally, handle errors or provide feedback to the user
    });
});
