//accessing button, content
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
//using SeechSynthessisUtterance to generate voice
function speak(text){
    //object created
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.pitch=1;
    textSpeak.volume=1;
    textSpeak.lang="en-GB";
    //computer window
    window.speechSynthesis.speak(textSpeak);
}

//to wish 
function wishMe(){
    let day= new Date();
    let hrs = day.getHours();
    if(hrs>=0 && hrs<12){
        speak("good Morning");
    }
    else if(hrs>=12 && hrs<16){
        speak("good afternoon");
    }
    else{
        speak("good evening");
    }
}
window.addEventListener('load',()=>{
    wishMe();
})

//seach recognition which is already there in js
//only supported for google, opera etc. but not for Safari and firefox
let speachRecog = window.SpeechRecognition || window.webkitSpeechRecognition;
let recog = new SpeechRecognition();
recog.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
     //take the command what we give
     takeCommand(transcript.toLowerCase());
}

btn.addEventListener("click", ()=>{
    recog.start();
    btn.style.display="none";
    voice.style.display = "block";
})

function takeCommand(msg){
    btn.style.display="flex";
    voice.style.display = "block";
    if(msg.includes("hello")|| msg.includes("hey")){
        speak("hello, how can I help you");
    }
    else if(msg.includes("who are you")){
        speak("I am a Virtual assistant of Miss Sanskriti Singh.");
    }
    else if(msg.includes("open youtube")){
        speak("opening youtube")
        windows.open("https://youtube.com/","_blank");
    }
    else if(msg.includes("open google")){
        speak("opening google")
        windows.open("https://google.com/","_blank");
    }
    else if(msg.includes("open instagram")){
        speak("opening instagram")
        windows.open("https://instagram.com/","_blank");
    }
    else if(msg.includes("open whatsapp")){
        speak("opening iwhatsapp")
        windows.open("whatsapp://");
    }
    else if(msg.includes("calculator")){
        speak("opening calculator")
        windows.open("calculator://");
    }
    else if(msg.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric", minute:"numeric"});
        speak(time);
    }
    else if(msg.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric", month:"short"});
        speak(date);
    }
    else{
        let finalText = "this is what i have for you" + msg.replace("sera","");
        speak(finalText)
        window.open(`https://www.google.com/search?q=${msg.replace("sera","")}`, "_blank");
    }
}
