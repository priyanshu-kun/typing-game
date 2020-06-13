const paragraph = [`Pink ponies and purple giraffes roamed the field. Cotton candy grew from the ground as a chocolate river meandered off to the side. What looked like stones in the pasture were actually rock candy. Everything in her dream seemed to be perfect except for the fact that she had no mouth.`, "He watched as the young man tried to impress everyone in the room with his intelligence. There was no doubt that he was smart. The fact that he was more intelligent than anyone else in the room could have been easily deduced, but nobody was really paying any attention due to the fact that it was also obvious that the young man only cared about his intelligence.", "Here's the thing. She doesn't have anything to prove, but she is going to anyway. That's just her character. She knows she doesn't have to, but she still will just to show you that she can. Doubt her more and she'll prove she can again. We all already know this and you will too.", "Colors bounced around in her head. They mixed and threaded themselves together. Even colors that had no business being together. They were all one, yet distinctly separate at the same time. How was she going to explain this to the others?", "Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky. At that period of the day the sun’s warm rays seemed to cast a sleepy spell over the silent mountainside, so all of the animals, with one accord, had decided it should be the hour for their mid-day sleep.", "Spending time at national parks can be an exciting adventure, but this wasn't the type of excitement she was hoping to experience. As she contemplated the situation she found herself in, she knew she'd gotten herself in a little more than she bargained for. It wasn't often that she found herself in a tree staring down at a pack of wolves that were looking to make her their next meal.", "It was easy to spot her. All you needed to do was look at her socks. They were never a matching pair. One would be green while the other would be blue. One would reach her knee while the other barely touched her ankle. Every other part of her was perfect, but never the socks. They were her micro act of rebellion.", "The lone lamp post of the one-street town flickered, not quite dead but definitely on its way out. Suitcase by her side, she paid no heed to the light, the street or the town. A car was coming down the street and with her arm outstretched and thumb in the air, she had a plan.", "It had been her dream for years but Dana had failed to take any action toward making it come true. There had always been a good excuse to delay or prioritize another project. As she woke, she realized she was once again at a crossroads. Would it be another excuse or would she finally find the courage to pursue her dream? Dana rose and took her first step.", `A long black shadow slid across the pavement near their feet and the five Venusians, very much startled, looked overhead. They were barely in time to see the huge gray form of the carnivore before it vanished behind a sign atop a nearby building which bore the mystifying information "Pepsi-Cola."`, `"Explain to me again why I shouldn't cheat?" he asked. "All the others do and nobody ever gets punished for doing so. I should go about being happy losing to cheaters because I know that I don't? That's what you're telling me?"`, `It was a question of which of the two she preferred. On the one hand, the choice seemed simple. The more expensive one with a brand name would be the choice of most. It was the easy choice. The safe choice. But she wasn't sure she actually preferred it.`];

let count = 0;
let index = 0;
let mistakes = 0;
let wordCount = 0;
let Average = 0;
const Screen = document.querySelector(".User-screen");
const generatedWords = document.querySelector(".test-words");
let WrodArray = null;
let flag = true;
let cancelInterval = null;

function EndTask() {
    if (index !== WrodArray.length-1) {
        return;
    }
    else {
        generatedWords.innerHTML = `<h1 style="font-size: 2rem; font-weight: bold; line-height: 2.5rem; color: grey; "><span style="text-decoration: underline;">Score Borad</span><br/> Typing speed: <span style="color: #00ff00;">${wordCount + 1} words per/min</span> <br/> Accuracy: <span style="color: red;">Not avaliable</span> <br/> Typing mistakes: <span style="color: red;">${mistakes}</span> <br/> 👉🏼Press Start to play again.</h1>`;
        Average = 0;
        clearInterval(cancelInterval);
    }
   
}



function checkWord(pressedKey) {
    let OnScreenPara = paragraph[count];
    EndTask();
    if (pressedKey !== OnScreenPara[index]) {

        WrodArray[index].style.color = "red";
        WrodArray[index].style.textDecoration = "underline";
        mistakes++;
    }
    else {
        WrodArray[index].style.color = "#00ff00";
    }
    if (OnScreenPara[index] === " ") {
        Screen.value = "";
        wordCount++;
    }
    index++;
}


function invokeParagraph() {
    if(count === paragraph.length) {
        count = 0;
    }
    generatedWords.innerHTML = "";
    paragraph[count].split("").forEach((character) => {
        let span = document.createElement("span");
        span.setAttribute("class", "word");
        span.innerHTML = character;
        generatedWords.appendChild(span);
    })
    WrodArray = Array.from(document.querySelectorAll(".word"));
    clearInterval(cancelInterval);
    countdown();
}


Screen.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
        
        checkWord(e.key);
        
    }
    else {
        Screen.value = "";
        Screen.blur();
        index = WrodArray.length-1;
        clearInterval(cancelInterval);
        EndTask();
        index = 0;
    }
})
let currentTime;

function countdown() {

    let minute = 0;
    document.querySelector(".minutes").innerHTML = 0;
    document.querySelector(".seconds").innerHTML = "00";
    currentTime = new Date();
    cancelInterval = setInterval(() => {
        let exatSecond = GetExatTime();
        if (exatSecond % 60 !== 0) {
            if ((exatSecond % 60) < 10) {
                document.querySelector(".seconds").innerHTML = `0${(exatSecond % 60)}`;
            }
            else {
                document.querySelector(".seconds").innerHTML = (exatSecond % 60);
            }

        }
        else {
            document.querySelector(".minutes").innerHTML = ++minute;
            document.querySelector(".seconds").innerHTML = "00";
        }
        if (minute === 3) {
            Screen.value = "";
            index = 0;
            wordCount = 0;
            mistakes = 0;
            count++;  
            EndTask()
            invokeParagraph();
        }

    }, 1000);
}

function GetExatTime() {
    return (Math.floor((new Date() - currentTime) / 1000));
}

document.querySelector(".btn").addEventListener("click", () => {
    Screen.value = "";
    index = 0;
    wordCount = 0;
    mistakes = 0;
    if (flag === true) {
        invokeParagraph()
        flag = false;
    }
    else {
        // AverageSpeed();
        count++;
        invokeParagraph()
    }

})

