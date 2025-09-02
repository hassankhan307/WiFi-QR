const ssidInput = document.getElementById("ssid");
const passInput = document.getElementById("password");
const qrDiv = document.getElementById("qrcode");
const downloadBtn = document.getElementById("downloadBtn");

let qr;

function generateQR() {
  const ssid = ssidInput.value.trim();
  const pass = passInput.value.trim();

  const wifiString = `WIFI:T:WPA;S:${ssid};P:${pass};;`;

  qrDiv.innerHTML = ""; // clear old QR

  if (ssid) {
    qr = new QRCode(qrDiv, {
      text: wifiString,
      width: 200,
      height: 200,
    });
    downloadBtn.disabled = false;
  } else {
    downloadBtn.disabled = true;
  }
}

function downloadQR() {
  const img = qrDiv.querySelector("img") || qrDiv.querySelector("canvas");
  if (img) {
    const link = document.createElement("a");
    link.href = img.src || img.toDataURL("image/png");
    link.download = "wifi-qr.png";
    link.click();
  }
}

ssidInput.addEventListener("input", generateQR);
passInput.addEventListener("input", generateQR);
downloadBtn.addEventListener("click", downloadQR);
