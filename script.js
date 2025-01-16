const text = [
    "!@#%@&*()_+[]{}|;:,.<>?~`/\\-+=\"&^%$#*!!@?#%$&...sys_warning__!!\n",
    "Encryption status: ~Active~ Decrypting Files... Failed.\n",
    "ACCESS DENIED!\n",
    "Critical alert: Unauthorized access attempt detected from IP 127.0.0.1:3000\n",
    "Override authentication - successful. Attempted manipulation of file system structure detected.\n",
    "Malware execution in progress: C:\\Users\\Admin\\Documents\\temp.exe Command-line interface overridden.\n",
    "Contacting remote server: 45.76.23.12:8080... Connection lost.\n",
    "Traceback (critical): Memory leak detected. System integrity compromised.\n",
    "#Emergency_Protocol_Activated!!\n"
    , "Hello World...."
];
// https://learntechwithmotivation.github.io/audio-hosting/undertaker.mp3
const undertaker = new Audio("Audio/undertaker.mp3");
let bgAudio = new Audio("Audio/bgs.mp3");
// Sound Effect by <a href="https://pixabay.com/users/uttamkumar_r-7778549/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=189369">Uttam Kumar Roy</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=189369">Pixabay</a>
const prompts = document.querySelector(".prompt");


async function textDisplay() {
    const terminal = document.getElementById("terminal-content");
    for (let i = 1; i < text.length; i++) {
        if (i < text.length) {
            await displayPrompt(i);
            terminal.innerText = text.slice(0, i - 1).join("");
            await displayRandomTill(terminal, text[i]);
        }
    }
    terminal.innerText = text.join("");
    prompts.style.color = "#20c20e";
    await promptMessage("ACCESS GRANTED");
    prompts.hidden = false;
}

async function displayPrompt(index) {
    return new Promise(async (resolve) => {
        console.log("Entered displayPrompt method");
        switch (index) {
            case 1:
                await promptMessage("Initialising...");
                break;
            case 4:
                await promptMessage("Access Denied!!!");
                break;
            case 8:
                await promptMessage("CRITICAL SECURITY ALERT!!!");
                break;
        }

        resolve();
    });
}


async function promptMessage(message) {
    return new Promise(async (resolve) => {
        console.log("should display ", message);
        prompts.classList.toggle("magic");
        blinkScreen(10,100);
        alertBlink();
        await msgDisp(message);
        prompts.classList.toggle("magic");
        resolve();
    })
}

function alertBlink() {
    let c = 0;
    const interval = setInterval(() => {
        if (c < 6) {
            prompts.hidden = !prompts.hidden;
            c++;
        } else {
            clearInterval(interval);
            prompts.hidden = true; 
        }
    }, 500);
}
async function msgDisp(message) {
    prompts.innerText = message;
    playAlert();
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    })
}
function playAlert() {
    const alertSound = new Audio("Audio/iphone_alarm.mp3");
    alertSound.play().catch((error) => {
        console.log("Error in playing alert sound: ",error);
    });

    setTimeout(() => {
        alertSound.pause();
    }, 2000);

}

async function displayRandomTill(terminalObj, line) {
    const randomList = generateRandomListOfLimit(line.length);
    let i = 0;
    return new Promise((resolve) => {
        setTimeout(() => {
            const int = setInterval(() => {
                if (i < randomList.length) {
                    terminalObj.innerText += line.slice(randomList[i - 1], randomList[i]);
                    i++;
                } else {
                    clearInterval(int)
                }
            }, 100);
            resolve(100);
        }, randomList.length * 100);
    });
}
function generateRandomListOfLimit(limit) {
    lst = [0];
    let index = 0;
    while (lst[index] < limit) {
        lst.push(lst[index] + Math.floor((Math.random() * 5)));
        index++;
    }
    return lst;
}

function bgAudioPlay() {
    bgAudio.play().catch(error => {
        console.error('Error playing Background audio:', error);
    });
    bgAudio.volume = 0.35;
}
function playUndertakerTheme() {
    undertaker.play().catch(error => {
        console.log("Error in playing undertaker theme: ", error);
    });
}
function stopUndertakerTheme() {
    undertaker.pause();
}
function showNav() {
    const navBar = document.querySelector("nav");
    navBar.hidden = !navBar.hidden;
}
function blinkScreen(times, delay) {
    const body = document.body;
    return new Promise((resolve) => {

        let count = 0;
        const inter = setInterval(() => {
            body.classList.toggle("Blank");
            count++;
            if (count >= times) {
                clearInterval(inter);
                executeAfterDelay(stopUndertakerTheme, 3500);
                resolve();
            }
        }, delay);
    });
}
async function executeAfterDelay(func, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            func();
            resolve();
        }, delay);

    })
}
function chkProceed() {
    const startButton = document.getElementById("confirmToStart");
    const confirmationDiv = document.getElementById("begin-confirmation");

    startButton.addEventListener("click",
        async () => {
            playUndertakerTheme();
            confirmationDiv.classList.add("vanish-animation");
            executeAfterDelay(showNav, 1000);
            await blinkScreen(16, 700);
            document.querySelector(".terminal").hidden = false;
            await executeAfterDelay(bgAudioPlay, 5000);
            textDisplay();
        });
}

chkProceed();