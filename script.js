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
    lines.splice(randIndex, 1); // Remove used line
  }

  output.textContent = result.join('\n');
  textarea.value = lines.join('\n'); // Update textarea with remaining lines
  document.getElementById('resultModal').style.display = 'flex';
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

function closeModal() {
  document.getElementById('resultModal').style.display = 'none';
}
