const wrapper = document.querySelector(".wrapper")
const form = wrapper.querySelector("form");
const formBtn = form.querySelector("button");
const qrimg = document.querySelector('.codeImg');
const inp = form.querySelector("input");
const display = wrapper.querySelector(".qr");
const textArea = display.querySelector("textarea");
const copyBtn = display.querySelector("button");

let txt = '';

function fetchRequest(formData){
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST", body: formData
    }).then(res => res.json()).then(result => {
        txt = result[0].symbol[0].data;
    })
}


formBtn.addEventListener("click", () => {
    textArea.innerText = txt;
    display.classList.remove("hidden");
    display.classList.add("flex");
})

inp.addEventListener("change", e =>{
    let img = e.target.files[0];
    let formData = new FormData();
    formData.append("file", img);
    fetchRequest(formData);
    qrimg.src = URL.createObjectURL(img);
    qrimg.classList.remove("hidden");
})

copyBtn.addEventListener("click", () =>{
    navigator.clipboard.writeText(txt);
    alert("Copied!!")
})