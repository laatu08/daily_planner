// Initialize EmailJS
emailjs.init({ publicKey: window.ENV.EMAILJS_PUBLIC_KEY });

window.addEventListener("beforeunload", () => {
  console.log("PAGE IS RELOADING BECAUSE OF LIVE SERVER!");
});


document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded, attaching handlers...");

  // Save form fields to localStorage
  const fields = ['name', 'email', 'date', 'priorities', 'todo', 'notes', 'quote'];

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    el.value = localStorage.getItem(id) || '';

    el.addEventListener("input", () => {
      localStorage.setItem(id, el.value);
    });
  });
  loadQuoteOfTheDay();
  // Handle form submit
  const form = document.getElementById("plannerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Form submitted — no reload");

    await exportAndSend();
  });

  const clearBtn = document.getElementById("clearPlannerBtn");

  clearBtn.addEventListener("click", () => {
    if (!confirm("Are you sure you want to clear everything?")) return;

    // Clear localStorage
    localStorage.clear();

    // Clear all form fields 
    ['name', 'email', 'date', 'priorities', 'todo', 'notes', 'quote'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });

    // Clear table cells
    document.querySelectorAll("[contenteditable='true']").forEach(cell => {
      cell.innerText = "";
    });

    console.log("All fields cleared.");
  });

});


function showLoading() {
  document.getElementById("loadingOverlay").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loadingOverlay").classList.add("hidden");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


// Fetch Quote of the Day
async function loadQuoteOfTheDay() {
  const quoteField = document.getElementById("quote");

  if (localStorage.getItem("quote")) return;

  try {
    const res = await fetch("https://api.api-ninjas.com/v2/quotes?category=inspirational", {
      headers: { "X-Api-Key": window.ENV.QUOTE_API_KEY }
    });

    const data = await res.json();
    const quote = `${data[0].quote} — ${data[0].author}`;

    quoteField.value = quote;
    localStorage.setItem("quote", quote);

  } catch (err) {
    console.error("Quote load failed:", err);
  }
}



function clonePlannerForScreenshot() {
  const original = document.getElementById("planner");
  const clone = original.cloneNode(true);

  // Replace textareas with styled divs
  clone.querySelectorAll("textarea").forEach((textarea, i) => {
    const div = document.createElement("div");
    div.style.minHeight = textarea.style.height || "80px";
    div.style.border = "1px solid #ccc";
    div.style.padding = "8px";
    div.style.whiteSpace = "pre-wrap";
    div.style.wordWrap = "break-word";
    div.style.overflowWrap = "break-word";
    div.style.borderRadius = "6px";
    div.style.background = "rgba(254, 255, 255, 0.6)";

    div.innerText = textarea.value;

    textarea.replaceWith(div);
  });

  // Place clone offscreen
  clone.style.position = "absolute";
  clone.style.top = "-9999px";
  document.body.appendChild(clone);

  return clone;
}

async function fetchUrl() {
  const clone = clonePlannerForScreenshot();

  const canvas = await html2canvas(clone);
  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));

  document.body.removeChild(clone);  // cleanup

  const formData = new FormData();
  formData.append("planner", blob, "planner.png");

  try {
    const uploadRes = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await uploadRes.json();
    return data.url;

  } catch (err) {
    console.error("Upload error", err);
    alert("Upload failed");
    return null;
  }
}


async function exportAndSend() {
  console.log("Running exportAndSend...");
  showLoading()

  const toEmail = localStorage.getItem("email");
  // if (!toEmail) {
  //   alert("Please enter an email.");
  // }

  const plannerUrl = await fetchUrl();

  await emailjs.send(window.ENV.EMAILJS_SERVICE_ID,
    window.ENV.EMAILJS_TEMPLATE_ID, {
    to_email: toEmail,
    user_name: localStorage.getItem("name") || "User",
    planner_date: localStorage.getItem("date") || "",
    image_url: plannerUrl,
    company_email: "support@dailyplanner.com"
  });

  console.log("Email sent!");
  showToast("Your planner has been sent successfully!");
  hideLoading();
}
