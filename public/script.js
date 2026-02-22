let string = document.getElementById("string");
let main = document.getElementById("main");
let face = document.getElementById("face");

let isOn = true;
let startY = 0;
let currentHeight = 80;

string.addEventListener("mousedown", function(e){
    startY = e.clientY;

    document.onmousemove = function(e){
        let diff = e.clientY - startY;
        if(diff > 0 && currentHeight < 140){
            currentHeight = 80 + diff;
            string.style.height = currentHeight + "px";
        }
    }

    document.onmouseup = function(){
        document.onmousemove = null;

        if(currentHeight > 120){
            toggleLamp();
        }

        string.style.height = "80px";
        currentHeight = 80;
    }
});

function toggleLamp(){
    isOn = !isOn;

    if(isOn){
        main.classList.remove("hidden");
        face.textContent = "😊";
    } else{
        main.classList.add("hidden");
        face.textContent = "😢";
    }
}

document.getElementById("loginBtn").addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    const msg = document.getElementById("msg");

    msg.textContent = data.message;
    msg.style.color = data.success ? "green" : "red";
});
