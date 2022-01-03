let data = {
    option: {
        0: {
            a: 'Chléb#video',
            b: 'Cereálie#video'
        }
    },
    bread: {
        0: { //videa 2.1 až 2.3
            a: 'Vezmu nejdřív prkénko.#SHd2zQQsHUw',
            b: 'Položím chléb na linku.#adresaURL'
        },
        1: { //videa 2.1-1 až 2.1-4
            a: 'Vezmu zubatý nůž. Na pohodu.#hukEChgGDw',
            b: 'Vezmu velký nůž. Tím by to mělo jít.#adresaURL',
            c: 'Vezmu malý, ale ostrý nůž. Je ostrý, však to půjde.#adresaURL',
            d: 'Vezmu příborový nůž. No, uvidíme, ale tak proč ne?#adresaURL'
        },
        2: { //videa 2.2-1 až 2.2-4
            a: 'Vezmu zubatý nůž. Na pohodu.#hukEChgGDw',
            b: 'Vezmu velký nůž. Tím by to mělo jít.#adresaURL',
            c: 'Vezmu malý, ale ostrý nůž. Je ostrý, však to půjde.#adresaURL',
            d: 'Vezmu příborový nůž. No, uvidíme, ale tak proč ne?#adresaURL'
        },
        3: { //videa 4.1 až 4.3
            a: 'Vzít máslo a rozbalit. To je jasný.#adresaURL',
            b: 'Dát plátek šunky na krajíc. Nic dalšího není přece potřeba.#adresaURL',
            c: 'Dát plátek sýra na krajíc. Co jiného by tam mělo přijít jako první?#adresaURL'
        },
        4: { //videa 4.1-1 až 4.1-3
            a: 'Vezmu příborový nůž a namažu krajíc máslem. Normálka!#adresaURL',
            b: 'Namažu krajíc přímo máslem. Aspoň se nic nezašpiní.#adresaURL',
            c: 'Vezmu banán a namažu s ním máslo na krajíc. A co jako? Jste to nikdy nezkoušeli?#adresaURL'
        },
        5: { //videa 5 a 6
            a: 'Teď tam přijde plátek šunky!#v',
            b: 'SÝÝÝÝÝÝR!#v',
        },
        6: { //videa 7 a 8
            a: 'No a nakonec šunka. Jak jinak?!#v',
            b: 'No a nakonec sýr. Jak jinak?!#v',
        }
    },
    cereal: {
        0: {
            a: 'Otevřu nejdříve sáček.#video',
            b: 'Vezmu misku nejdřív. Kam by se to pak sypalo?!#video',
            c: 'Miska ano, ale malá, přeci jen nemám takový hlad.#video'
        },
        1: {
            a: 'Nasypu cereálie do misky!#video'
        },
        2: {
            a: 'Teď přidáme mléko!#video'
        },
        3: {
            a: 'Budu to snad jíst rukama? Samozřejmě přidáme lžičku!#video'
        }
    },
}

let cisloOtazky = 0;
let score = 0;
let time = 0
let tag = document.createElement('script');
let isGameReady = false;
let typeOfQuest = data.option;
let isPlank;

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

//Init API
window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('player', {
        height: '500',
        width: '745',
        playerVars: {
            'controls': 0,
            'autoplay': 1,
            'rel': 0,
            'fs': 0,
        },
        videoId: "",
        events: {
            'onReady': onPlayerReady,
        },
    });
};

// Launch video as it's ready
function onPlayerReady(event) {

}


document.addEventListener("DOMContentLoaded", function () {
    displayQuestion();
    setInterval(() => { time -= 1; }, 1000);
});

function startGame() {
    document.getElementById("menuGame").innerHTML = '';
    document.getElementById("game").style.visibility = "visible";
    player.loadVideoById("CHDKHwq8ZTs", "large"); //vložit úvodní video
}

function submitAnswer(el) {
    let ul = document.getElementById('options');
    let answer;
    for (let i = 0; i < ul.childNodes.length; i++) {
        if (ul.childNodes[i].className == "list-group-item active") {
            answer = ul.childNodes[i];
            break;
        }
    }

    switch (answer.value) {
        case 1:
            score += 300;
            break;

        case 2:
            score += 200;
            break;
        case 3:
            score -= 100;
            break;
        default:
            score -= 500;
            break;
    }
    document.getElementById('scorePoint').innerHTML = score;
    document.getElementById('options').innerHTML = '';
    
    player.loadVideoById(answer.id, "large");

    if (answer.value === 1 && typeOfQuest == data.option) {
        typeOfQuest = data.bread;
        cisloOtazky = 0;
    } else if (answer.value === 2 && typeOfQuest == data.option) {
        typeOfQuest = data.cereal;
        cisloOtazky = 0;
    }
    if (cisloOtazky == 0 && answer.value == 2) cisloOtazky++;
    if (cisloOtazky == 1) cisloOtazky++;
    
    if (cisloOtazky == 5 && (answer.value == 1 || answer.value == 2)) {
        if (answer.value == 1) {
            data.bread[cisloOtazky].a = data.bread[cisloOtazky].b;
            delete data.bread[cisloOtazky].b;
            cisloOtazky--;
        }
        if (answer.value == 2) {
            delete data.bread[cisloOtazky].b;
            cisloOtazky--;
        }
    }
    if (cisloOtazky == 3 && (answer.value == 2 || answer.value == 3)) {
        cisloOtazky += 3;
        if (answer.value == 2) {//6a 
            data.bread[cisloOtazky].a = data.bread[cisloOtazky].b;
            delete data.bread[cisloOtazky].b;
            cisloOtazky--;
        }
        if (answer.value == 3) {//6b
            delete data.bread[cisloOtazky].b;
            cisloOtazky--;
        }
    }
    cisloOtazky++;
    displayQuestion();
}

function itemOnClick(el) {
    let lis = document.getElementsByClassName("active");
    for (li of lis) {
        li.classList.remove("active");
    }
    el.classList.add('active');
}

//zobrazení možností s podmínkou, jež zajišťuje rozmězí otázek od 1 do 4
function displayQuestion() {
    let ul = document.getElementById('options');

    if (typeOfQuest[cisloOtazky]) {
        let optionA = document.createElement('li');
        let fiA = typeOfQuest[cisloOtazky].a.split('#');
        optionA.classList.add('list-group-item');
        optionA.textContent = fiA[0];
        optionA.setAttribute('onclick', 'itemOnClick(this)');
        optionA.id = fiA[1];
        optionA.value = 1;

        if (typeOfQuest[cisloOtazky].b) {
            let optionB = document.createElement('li');
            let fiB = typeOfQuest[cisloOtazky].b.split('#');
            optionB.classList.add('list-group-item');
            optionB.textContent = fiB[0];
            optionB.setAttribute('onclick', 'itemOnClick(this)');
            optionB.id = fiB[1];
            optionB.value = 2;

            if (typeOfQuest[cisloOtazky].c) {
                let optionC = document.createElement('li');
                let fiC = typeOfQuest[cisloOtazky].c.split('#');
                optionC.classList.add('list-group-item');
                optionC.textContent = fiC[0];
                optionC.setAttribute('onclick', 'itemOnClick(this)');
                optionC.id = fiC[1];
                optionC.value = 3;

                if (typeOfQuest[cisloOtazky].d) {
                    let optionD = document.createElement('li');
                    let fiD = typeOfQuest[cisloOtazky].d.split('#');
                    optionD.classList.add('list-group-item');
                    optionD.textContent = fiD[0];
                    optionD.setAttribute('onclick', 'itemOnClick(this)');
                    optionD.id = fiD[1];
                    optionD.value = 4;
                    ul.append(optionA, optionB, optionC, optionD);
                    showQRandom();
                } else {
                    ul.append(optionA, optionB, optionC);
                    showQRandom();
                }
            } else {
                ul.append(optionA, optionB);
            }
        } else {
            ul.append(optionA);
        }
    }
}

//náhodné zobrazení otázek
function showQRandom() {
    let ul = document.querySelector('ul');
    for (let i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
}

