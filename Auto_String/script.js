let historyId = 1;

function generateRandomString(length = 20) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateStrings() {
  const amount = parseInt(document.getElementById('amount').value);
  const output = document.getElementById('outputText');

  if (isNaN(amount) || amount <= 0) {
    showMessage("error", "❌ Please enter a valid amount.");
    return;
  }

  let result = [];
  for (let i = 0; i < amount; i++) {
    result.push(generateRandomString(20));
  }

  output.textContent = result.join('\n');
  document.getElementById('resultModal').style.display = 'flex';

  const table = document.getElementById('historyTable');
  const row = document.createElement('tr');
  const now = new Date().toLocaleString();
  const emptyRow = document.getElementById('emptyRow');
  if (emptyRow) emptyRow.remove();

  row.innerHTML = `
    <td>${historyId++}</td>
    <td>${result.join('<br>')}</td>
    <td>${amount}</td>
    <td>${now}</td>
  `;
  table.appendChild(row);
}

function copyText() {
  const text = document.getElementById('outputText').textContent;
  navigator.clipboard.writeText(text).then(() => {
    showMessage("success", "✅ Copied to clipboard!");
  });
}

function downloadText() {
  const text = document.getElementById('outputText').textContent;
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.download = "generated_strings.txt";
  link.href = URL.createObjectURL(blob);
  link.click();
}

function closeModal() {
  document.getElementById('resultModal').style.display = 'none';
}

function downloadHTML() {
  const historySection = document.getElementById("historySection");

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>String History</title>
      <style>
        body { background: #1D2538; color: white; font-family: sans-serif; padding: 20px; }
        table { width: 100%; border-collapse: collapse; color: white; }
        th, td { border: 1px solid #444; padding: 10px; text-align: left; font-size: 14px; }
        th { background: #0A1121; }
        h2 { margin-bottom: 15px; }
      </style>
    </head>
    <body>
      <h2>🧾 Generation History</h2>
      ${historySection.querySelector("table").outerHTML}
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `String_History_${new Date().toISOString().slice(0,10)}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function showMessage(type, msg, duration = 3000) {
  const el = document.getElementById(`msg${type.charAt(0).toUpperCase() + type.slice(1)}`);
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, duration);
}
