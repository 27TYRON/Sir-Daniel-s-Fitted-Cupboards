function sendMessage(){
    let name=document.getElementById("name").value;
    let message=document.getElementById("message").value;

    let text=`Hello, my name is ${name}. ${message}`;
    window.open(`https://wa.me/27813421958?text=${encodeURIComponent(text)}`);
}