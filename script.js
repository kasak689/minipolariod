const fileInput = document.getElementById("fileInput");
const captionInput = document.getElementById("captionInput");
const generateButton = document.getElementById("generateButton");
const printButton = document.getElementById("printButton");
const canvas = document.getElementById("polaroidCanvas");
const ctx = canvas.getContext("2d");

let uploadedImage = null;

fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            uploadedImage = img;
        }
        img.src = e.target.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    }
});

generateButton.addEventListener("click", function () {
    if (!uploadedImage) {
        alert("Please upload an image first!");
        return;
    }

    const caption = captionInput.value;

    // Clear canvas
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw photo inside the polaroid frame
    const photoX = 20;
    const photoY = 20;
    const photoWidth = canvas.width - 40;
    const photoHeight = canvas.height - 100;

    ctx.drawImage(uploadedImage, photoX, photoY, photoWidth, photoHeight);

    // Draw caption below
    ctx.fillStyle = "#333";
    ctx.font = "bold 20px Poppins";
    ctx.textAlign = "center";
    ctx.fillText(caption, canvas.width / 2, canvas.height - 40);
});

printButton.addEventListener("click", function () {
    const dataUrl = canvas.toDataURL("image/png");
    const windowContent = `
        <html>
            <head><title>Print Polaroid</title></head>
            <body style="margin: 0; display: flex; justify-content: center; align-items: center;">
                <img src="${dataUrl}" style="width: 80%; margin: auto;" />
                <script>window.onload = function() { window.print(); }</script>
            </body>
        </html>
    `;
    const printWindow = window.open('', '', 'width=600,height=800');
    printWindow.document.open();
    printWindow.document.write(windowContent);
    printWindow.document.close();
});
