// StringGenerator.jsx (React Component)
import React, { useState } from "react";
import "./StringGenerator.css";

export default function StringGenerator() {
  const [amount, setAmount] = useState(0);
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const generateRandomString = (length = 20) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };

  const generateStrings = () => {
    if (!amount || amount <= 0) {
      setMessage({ type: "error", text: "❌ Please enter a valid amount." });
      return;
    }
    const strings = Array.from({ length: amount }, () => generateRandomString(20));
    setOutput(strings.join("\n"));
    setShowModal(true);
    const now = new Date().toLocaleString();
    setHistory([...history, { id: history.length + 1, strings, amount, date: now }]);
    setMessage({ type: "" });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output).then(() => {
      setMessage({ type: "success", text: "✅ Copied to clipboard!" });
    });
  };

  const downloadText = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const link = document.createElement("a");
    link.download = "generated_strings.txt";
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  const downloadHTML = () => {
  const htmlContent = document.getElementById("historySection").outerHTML;
  const fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>String Generation History</title>
      <style>
        body { font-family: sans-serif; padding: 20px; background: #1D2538; color: white; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; border: 1px solid #ccc; color: white; }
        th { background-color: #0A1121; }
        td { background-color: #1D2538; }
        h2 { color: #fff; }
        button { display: none; }
      </style>
    </head>
    <body>
      ${htmlContent}
    </body>
    </html>
  `;

  const blob = new Blob([fullHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "generation_history.html";
  a.click();
  URL.revokeObjectURL(url);
};


  return (
    <div className="string-gen-wrapper">
      <div className="string-gen-box">
        <h2 className="text-2xl font-bold mb-4">🎯 Auto String Generator</h2>
        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="string-input"
          placeholder="How many to generate?"
        />
        <button onClick={generateStrings} className="string-btn">Generate</button>
        {message.text && (
          <div className={`string-msg ${message.type}`}>{message.text}</div>
        )}
      </div>

      {showModal && (
        <div className="string-modal">
          <div className="string-modal-content">
            <h3 className="text-xl font-bold mb-2">✅ Generated Strings</h3>
            <pre className="string-pre">{output}</pre>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={copyToClipboard} className="string-btn">Copy</button>
              <button onClick={downloadText} className="string-btn">Download .txt</button>
              <button onClick={() => setShowModal(false)} className="string-btn-red">Close</button>
            </div>
          </div>
        </div>
      )}

      <div id="historySection" className="string-history">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🧾 Generation History</h2>
          <button onClick={downloadHTML} className="string-btn-sm">📥 Export Data</button>
        </div>
        <div className="overflow-x-auto">
          <table className="string-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>String(s)</th>
                <th>Amount</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr><td colSpan="4">No history yet</td></tr>
              ) : (
                history.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="whitespace-pre-wrap">
                     {item.strings.map((str, idx) => (
                     <div key={idx}>{str}</div>
                     ))}
                    </td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
{/* 
      <footer className="w-full text-center text-sm text-white mt-10 pb-4">
        <a href="https://github.com/WaiYanPhoneMyint" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-semibold">
          Bunny
        </a> © 2025 All right reserved
      </footer>
   */}
    </div>
  );
}
