// scripts
// Get a reference to the HTML element

function generateQR(file_url, id) {
  let full_url = `http://${location.hostname}:${location.port}/${file_url}`;
  let qrcodeContainer = document.getElementById(`qr-code-${id}`);
  if (!qrcodeContainer.innerHTML) {
    new QRCode(qrcodeContainer, {
      text: full_url,
      width: 200,
      height: 200,
    });
  } else {
    qrcodeContainer.innerHTML = null;
  }
}
