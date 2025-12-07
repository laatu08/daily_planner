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

  // Handle form submit (NO reload)
  const form = document.getElementById("plannerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();  // THE REAL FIX
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

// ---- Upload + Screenshot Helper ----
async function fetchUrl() {
  const element = document.getElementById("planner");

  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));

  const formData = new FormData();
  formData.append("planner", blob, "planner.png");

  let finalUrl = imgData;

  try {
    const uploadRes = await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: formData
    });

    const data = await uploadRes.json();
    finalUrl = data.url;
  } catch (e) {
    console.warn("Upload failed, using fallback");
  }

  return finalUrl;
}

// ---- Email Sending Logic ----
async function exportAndSend() {
  console.log("Running exportAndSend...");

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

}
