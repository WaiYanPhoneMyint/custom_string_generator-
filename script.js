function generateStrings() {
  const input = document.getElementById('inputStrings').value.trim();
  const amount = parseInt(document.getElementById('amount').value);
  const output = document.getElementById('outputText');

  if (!input || isNaN(amount) || amount <= 0) {
    alert("Please enter valid input and amount.");
    return;
  }

  const lines = input.split('\n').filter(Boolean);
  if (lines.length === 0) {
    alert("No valid lines to choose from.");
    return;
  }

  let result = [];
  for (let i = 0; i < amount; i++) {
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    result.push(randomLine);
  }

  output.textContent = result.join('\n');
  document.getElementById('resultModal').style.display = 'flex';
}

function copyText() {
  const text = document.getElementById('outputText').textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard!");
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
