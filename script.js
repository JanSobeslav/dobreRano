let data = {
    option: {
        0: {
            a: 'Chléb#1.mp4',
            b: 'Cereálie#cereal/1.mp4'
        }
    },
    bread: {
        0: { //videa 2.1 až 2.3
            a: 'Vezmu nejdřív prkénko.#2.1.mp4',
            b: 'Položím chléb na linku.#2.2.mp4'
        },
        1: { //videa 2.1-1 až 2.1-4
            a: 'Vezmu zubatý nůž. Na pohodu.#2.1-1.mp4',
            b: 'Vezmu velký nůž. Tím by to mělo jít.#2.1-2.mp4',
            c: 'Vezmu malý, ale ostrý nůž. Je ostrý, však to půjde.#2.1-3.mp4',
            d: 'Vezmu příborový nůž. No, uvidíme, ale tak proč ne?#2.1-4.mp4'
        },
        2: { //videa 2.2-1 až 2.2-4
            a: 'Vezmu zubatý nůž. Na pohodu.#2.2-1.mp4',
            b: 'Vezmu velký nůž. Tím by to mělo jít.#2.2-2.mp4',
            c: 'Vezmu malý, ale ostrý nůž. Je ostrý, však to půjde.#2.2-3.mp4',
            d: 'Vezmu příborový nůž. No, uvidíme, ale tak proč ne?#2.2-4.mp4'
        },
        3: { //videa 4.1 až 4.3
            a: 'Vzít máslo a rozbalit. To je jasný.#4.1.mp4',
            b: 'Dát plátek šunky na krajíc. Nic dalšího není přece potřeba.#4.2.mp4',
            c: 'Dát plátek sýra na krajíc. Co jiného by tam mělo přijít jako první?#4.3.mp4'
        },
        4: { //videa 4.1-1 až 4.1-3
            a: 'Vezmu příborový nůž a namažu krajíc máslem. Normálka!#4.1-1.mp4',
            b: 'Namažu krajíc přímo máslem. Aspoň se nic nezašpiní.#4.1-2.mp4',
            c: 'Vezmu banán a namažu s ním máslo na krajíc. A co jako? Jste to nikdy nezkoušeli?#4.1-3.mp4'
        },
        5: { //videa 5 a 6
            a: 'Teď tam přijde plátek šunky!#5.mp4',
            b: 'SÝÝÝÝÝÝR!#4.3.mp4',
        },
        6: { //videa 7 a 8
            a: 'No a nakonec šunka. Jak jinak?!#7.mp4',
            b: 'No a nakonec sýr. Jak jinak?!#8.mp4',
        }
    },
    cereal: {
        0: {
            a: 'Otevřu nejdříve sáček.#cereal/2.mp4',
            b: 'Vezmu misku nejdřív. Kam by se to pak sypalo?!#cereal/3.1.mp4',
            c: 'Miska ano, ale malá, přeci jen nemám takový hlad.#cereal/3.2.mp4'
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
let typeOfBreakfast;
let startCount = 0;
let video;
let dur;
let sBowl;
let opened;


document.addEventListener("DOMContentLoaded", function () {
    setInterval(() => { time -= 1; }, 1000);
});

function startGame(btn) {
    btn.innerHTML = 'Připraven?';
    if (startCount === 1) {
        document.getElementById("menuGame").innerHTML = '';
        document.getElementById("game").style.visibility = "visible";
        video = document.getElementById("video");
        video.play();
        setTimeout(() => { video.pause(); displayQuestion(); }, parseInt(String(video.duration).replace('.', '')) - 3400);
    } else {
        $("#music").attr("src", "assets/music/normal.mp3");
        $("#music")[0].play();
        video = document.getElementById("videoMenu");
        video.play();
        startCount++;
    }



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
    document.getElementById('options').innerHTML = '';
    if (answer.id !== 'video') {
        video.pause();
        video.src = "assets/videos/" + answer.id;
        video.play();
    }

    if (answer.value === 1 && typeOfQuest == data.option) {
        typeOfQuest = data.bread;
        typeOfBreakfast = data.option[0].a;
        cisloOtazky = -1;

    } else if (answer.value === 2 && typeOfQuest == data.option) {
        typeOfQuest = data.cereal;
        typeOfBreakfast = data.option[0].b;
        cisloOtazky = -1;
    }
    if (typeOfBreakfast === 'Chléb#1.mp4') {
        if (cisloOtazky == 1) cisloOtazky++;
        if (cisloOtazky == 0 && answer.value == 2) cisloOtazky++;


        if (cisloOtazky == 5 && (answer.value == 1 || answer.value == 2)) {
            cisloOtazky++;
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
        video.addEventListener('ended', myHandler, false);
    }

    if (typeOfBreakfast === 'Cereálie#cereal/1.mp4') {
        if ((cisloOtazky == 0 && answer.value == 1) && data.cereal[0].c) {
            data.cereal[cisloOtazky].a = data.cereal[cisloOtazky].b;
            data.cereal[cisloOtazky].b = data.cereal[cisloOtazky].c;
            delete data.cereal[cisloOtazky].c;
            cisloOtazky--;
            console.log(data);
        }

        if (cisloOtazky == 0 && !data.cereal[0].c) {
            if (answer.value == 1) sBowl = false;
            if (answer.value == 2) sBowl = true;
            console.log(sBowl);
        } else if (cisloOtazky == 0 && (answer.value == 2 || answer.value == 3)) {
            if (answer.value == 2) sBowl = false;
            if (answer.value == 3) sBowl = true;
        }

        if (cisloOtazky == 1 && !data.cereal[0].c) {
            video.pause();
            if (!sBowl) { video.src = "assets/videos/cereal/3.1-1.mp4"; }
            if (sBowl) { video.src = "assets/videos/cereal/3.2-1.mp4"; }
            video.play();
        } else if (cisloOtazky == 1 && data.cereal[0].c) {
            video.pause();
            if (!sBowl) video.src = "assets/videos/cereal/3.1-2.mp4";
            if (sBowl) video.src = "assets/videos/cereal/3.2-2.mp4";
            video.play();
        }

        if (cisloOtazky == 2 && !data.cereal[0].c) {
            video.pause();
            if (sBowl) {video.src = "assets/videos/cereal/4.2.mp4"; answer.value = 5;}
            if (!sBowl) video.src = "assets/videos/cereal/4.1.mp4";
            video.play();
        } else if (cisloOtazky == 2 && data.cereal[0].c) {
            answer.value = 5;
            video.pause();
            if (sBowl) video.src = "assets/videos/cereal/4.4.mp4";
            if (!sBowl) video.src = "assets/videos/cereal/4.3.mp4";
            video.play();
        }

        if (cisloOtazky == 3 && !data.cereal[0].c) {
            video.pause();
            if (sBowl) { video.src = "assets/videos/cereal/5.2.mp4"; answer.value = 5; }
            if (!sBowl) video.src = "assets/videos/cereal/4.1.mp4";
            video.play();
        } else if (cisloOtazky == 3 && data.cereal[0].c) {
            answer.value = 5;
            video.pause();
            if (sBowl) video.src = "assets/videos/cereal/5.4.mp4";
            if (!sBowl) video.src = "assets/videos/cereal/5.4.mp4";
            video.play();
        }

        cisloOtazky++;
        video.addEventListener('ended', myHandler, false);
    }

    switch (answer.value) {
        case 1:
            score += 300;
            if ($("#music").attr("src") != 'assets/music/normal.mp3') {
                $("#music").attr("src", "assets/music/normal.mp3");
                $("#music")[0].play();
            }
            break;
        case 2:
            score += 200;
            if ($("#music").attr("src") != 'assets/music/normal.mp3') {
                $("#music").attr("src", "assets/music/normal.mp3");
                $("#music")[0].play();
            }
            break;
        case 3:
            score -= 100;
            if ($("#music").attr("src") != 'assets/music/katastrofa.mp3') {
                if (cisloOtazky != 3) {
                    $("#music").attr("src", "assets/music/katastrofa.mp3");
                    $("#music")[0].play();
                }
            }
            break;
        default:
            score -= 500;
            if ($("#music").attr("src") != 'assets/music/katastrofa.mp3') {
                $("#music").attr("src", "assets/music/katastrofa.mp3");
                $("#music")[0].play();
            }
            break;
    }

    document.getElementById('scorePoint').innerHTML = score;

}
function myHandler(e) {
    displayQuestion();

}

function itemOnClick(el) {
    let lis = document.getElementsByClassName("active");
    for (li of lis) {
        li.classList.remove("active");
    }
    el.classList.add('active');
    submitAnswer(el);
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
    if (!typeOfQuest[cisloOtazky]) {
        document.getElementById("endGame").innerHTML = "KONEC";
        document.getElementById("answerBtn").style.visibility = "hidden";
        document.getElementById('scorePoint').innerHTML = score - time;
        video.addEventListener('ended', video.remove(), false);
    }
}

//náhodné zobrazení otázek
function showQRandom() {
    let ul = document.querySelector('ul');
    for (let i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
}

