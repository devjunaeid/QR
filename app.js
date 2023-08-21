const wrapper = document.querySelector(".wrapper");
const submitBtn = wrapper.querySelector(".form button");
const qrInput = wrapper.querySelector(".form input");
const qrdiv = document.querySelector(".qr");
const qrImg = document.querySelector(".qr img");
const downlaodImgBtn = document.querySelector(".qr button");

var apiRequest = "";

async function downloadImage(imageSrc, nameOfDownload = "qr.png") {
  const response = await fetch(imageSrc);
  const blobImage = await response.blob();
  const href = URL.createObjectURL(blobImage);

  const anchorElement = document.createElement("a");
  anchorElement.href = href;
  anchorElement.download = nameOfDownload;

  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
}

submitBtn.addEventListener("click", () => {
  let userInput = qrInput.value;
  if (userInput == "") return alert("Blank!! Enter text or paste a link.");
  apiRequest = `https://api.qrserver.com/v1/create-qr-code/?data=${userInput}&amp;size=300x300`;
  qrImg.src = apiRequest;
  qrImg.addEventListener("load", () =>{
    qrdiv.classList.remove("hidden");
    qrdiv.classList.add("flex");
  });
});

// remove the generated qr div when qr input field is empty.
qrInput.addEventListener("keyup", () =>{
  if(!qrInput.value){
    qrdiv.classList.remove("flex");
    qrdiv.classList.add("hidden");
  }
});

downlaodImgBtn.addEventListener("click", () =>{
    downloadImage(apiRequest);
});
