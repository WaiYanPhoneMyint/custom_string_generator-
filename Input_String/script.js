let historyId = 1;

function generateStrings() {
  const textarea = document.getElementById('inputStrings');
  const input = textarea.value.trim();
  const amount = parseInt(document.getElementById('amount').value);
  const output = document.getElementById('outputText');

  if (!input || isNaN(amount) || amount <= 0) {
    alert("Please enter valid input and amount.");
    return;
  }

  let lines = input.split('\n').filter(Boolean);

  if (amount > lines.length) {
    alert(`You only have ${lines.length} lines available.`);
    return;
  }

  let result = [];
  for (let i = 0; i < amount; i++) {
    const randIndex = Math.floor(Math.random() * lines.length);
    result.push(lines[randIndex]);
    lines.splice(randIndex, 1);
  }

  output.textContent = result.join('\n');
  textarea.value = lines.join('\n');
  document.getElementById('resultModal').style.display = 'flex';

  // ✅ Add to history
  const table = document.getElementById('historyTable');
  const row = document.createElement('tr');
  const now = new Date();
  const dateTime = now.toLocaleString();

  const emptyRow = document.getElementById('emptyRow');
  if (emptyRow) emptyRow.remove();

  row.innerHTML = `
    <td>${historyId++}</td>
    <td>${result.join('<br>')}</td>
    <td>${amount}</td>
    <td>${dateTime}</td>
  `;
  table.appendChild(row);
}

function copyText() {
  const text = document.getElementById('outputText').textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Copied to clipboard!");
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

function updateStringCount() {
  const input = document.getElementById('inputStrings').value.trim();
  const count = input.split('\n').filter(Boolean).length;
  document.getElementById('stringCount').textContent = `In stock: ${count} string(s)`;
}
function downloadPDF() {
  const history = document.querySelector('.history');
  html2canvas(history).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height]
    });
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save("generation_history.pdf");
  });
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
        body {
          background: #1D2538;
          color: white;
          font-family: sans-serif;
          padding: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          color: white;
        }
        th, td {
          border: 1px solid #444;
          padding: 10px;
          text-align: left;
          font-size: 14px;
        }
        th {
          background: #0A1121;
        }
        h2 {
          margin-bottom: 15px;
        }
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



function closeModal() {
  document.getElementById('resultModal').style.display = 'none';
}

document.getElementById('inputStrings').addEventListener('input', updateStringCount);

// Call once on page load
updateStringCount();
