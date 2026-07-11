const text=document.getElementById("text");

const qr=document.getElementById("qr");

const history=document.getElementById("history");

let currentURL="";

loadHistory();

document.getElementById("generate").onclick=()=>{

if(text.value.trim()==""){

alert("Enter text");

return;

}

currentURL=`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text.value)}`;

qr.src=currentURL;

qr.style.display="block";

saveHistory(text.value,currentURL);

};

document.getElementById("download").onclick=()=>{

if(currentURL=="") return;

const a=document.createElement("a");

a.href=currentURL;

a.download="QRCode.png";

a.click();

};

function saveHistory(txt,url){

let data=JSON.parse(localStorage.getItem("history"))||[];

if(data.find(x=>x.text===txt)) return;

data.unshift({

text:txt,

url:url,

date:new Date().toLocaleString()

});

localStorage.setItem("history",JSON.stringify(data));

loadHistory();

}

function loadHistory(){

history.innerHTML="";

let data=JSON.parse(localStorage.getItem("history"))||[];

data.forEach((item,index)=>{

history.innerHTML+=`

<div class="history-item">

<p>${item.text}</p>

<img src="${item.url}">

<p>${item.date}</p>

<button onclick="download('${item.url}')">

Download

</button>

<button onclick="removeItem(${index})">

Delete

</button>

</div>

`;

});

}

function removeItem(index){

let data=JSON.parse(localStorage.getItem("history"))||[];

data.splice(index,1);

localStorage.setItem("history",JSON.stringify(data));

loadHistory();

}

function download(url){

const a=document.createElement("a");

a.href=url;

a.download="QRCode.png";

a.click();

}

document.getElementById("clear").onclick=()=>{

if(confirm("Clear all history?")){

localStorage.removeItem("history");

loadHistory();

}

};
