// class pvtest{

//     #marian;
//     static marian2 = 50;
//     constructor(){
//         this.#marian = 20;
//     }
// }

// const instance = new pvtest();

//globale - status
var balance = 1000; // balanta
var playedbalance = 0; // miza mainii
var selectbalance = 50; // miza selectata
var game_over = 1;
var dd = 0; // valoarea 1 daca jucatorul a dat double down
var split = 0; // valoarea 1 daca a dat split
var allow_hit = 0; // valoarea 1 daca jucatorul are voie sa traga
var allow_stand = 1; // analog daca are voie sa apese stand
var allow_split = 0; 
var allow_dd = 1;
var dealer_total = document.getElementsByClassName("stack-dealer")[0].getElementsByClassName("total")[0];
var player_total_1 = document.getElementsByClassName("stack1")[0].getElementsByClassName("total")[0];
var player_total_2 = document.getElementsByClassName("stack2")[0].getElementsByClassName("total")[0];
var card_array = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var signs = ['C', 'D', 'H', 'S'];
var deckd = [];
var deckp = [];
var deckp2 = [];
var psoft = 0;
var dsoft = 0;
var pbj = 0;
var hashit = 0;
var hiddencardnr = 0;
var hiddencardlink = 0;
var shownhidden = 0;
var okstart = 1;
var currentstack = 1;
var pindex = 0, dindex = 0;
var input = document.getElementsByClassName("selector")[0];
input.value = "$50";
function resetgame() {
    return new Promise(resolve => {
        setTimeout(() => {
            $('.card').remove(); //eliminam toate instantele de carti de joc
            //restam variabilele de control
            dealer_total.innerHTML = "0";
            player_total_1.innerHTML = "0";
            player_total_2.innerHTML = "0";
            game_over = 0;
            allow_hit = 0;
            allow_stand = 1;
            allow_dd = 1;
            allow_split = 0;
            split = 0;
            dd = 0;
            pindex = 0;
            dindex = 0;
            currentstack = 1;
            deckd = [];
            deckp = [];
            deckp2 = [];
            hiddencardlink = '';
            hiddencardlink = '';
            psoft = 0;
            dsoft = 0;
            hashit = 0;
            pbj = 0;
            stack2 = document.getElementsByClassName("stack2")[0]; // resetam deckurile jucatorului
            document.getElementsByClassName("stack2")[0].getElementsByClassName("activ")[0].style.display = "none";
            document.getElementsByClassName("stack1")[0].getElementsByClassName("activ")[0].style.display = "block";
            stack2.style.display = 'none';
            dealer_total.style.color = 'white';
            dealer_total.style.backgroundColor = "#00C800";
            player_total_1.style.color = 'white';
            player_total_1.style.backgroundColor = "#00C800";
            player_total_2.style.color = 'white';
            player_total_2.style.backgroundColor = "#00C800";
            resolve('resetat!');
        }, 100);
    });
}


function buton_verif() {
    return new Promise(resolve => {
        setTimeout(() => {
            if (allow_hit == 0) {
                document.getElementsByClassName("hit")[0].setAttribute("style", "-webkit-filter:grayscale(" + 100 + "%)");
                document.getElementsByClassName("hit")[0].setAttribute("style", "filter:grayscale(" + 100 + "%)");
                document.getElementsByClassName("hit")[0].classList.remove("bighover");
            }
            else {
                document.getElementsByClassName("hit")[0].setAttribute("style", "-webkit-filter:grayscale(" + 0 + "%)");
                document.getElementsByClassName("hit")[0].setAttribute("style", "filter:grayscale(" + 0 + "%)");
                document.getElementsByClassName("hit")[0].classList.add("bighover");
            }
            if (allow_stand == 0) {
                document.getElementsByClassName("stand")[0].setAttribute("style", "-webkit-filter:grayscale(" + 100 + "%)");
                document.getElementsByClassName("stand")[0].setAttribute("style", "filter:grayscale(" + 100 + "%)");
                document.getElementsByClassName("stand")[0].classList.remove("bighover");
            }
            else {
                document.getElementsByClassName("stand")[0].setAttribute("style", "-webkit-filter:grayscale(" + 0 + "%)");
                document.getElementsByClassName("stand")[0].setAttribute("style", "filter:grayscale(" + 0 + "%)");
                document.getElementsByClassName("stand")[0].classList.add("bighover");
            }
            if (allow_dd == 0) {
                document.getElementsByClassName("dd")[0].setAttribute("style", "-webkit-filter:grayscale(" + 100 + "%)");
                document.getElementsByClassName("dd")[0].setAttribute("style", "filter:grayscale(" + 100 + "%)");
                document.getElementsByClassName("dd")[0].classList.remove("bighover");
            }
            else {
                document.getElementsByClassName("dd")[0].setAttribute("style", "-webkit-filter:grayscale(" + 0 + "%)");
                document.getElementsByClassName("dd")[0].setAttribute("style", "filter:grayscale(" + 0 + "%)");
                document.getElementsByClassName("dd")[0].classList.add("bighover");
            }
            if (allow_split == 0) {
                document.getElementsByClassName("split")[0].setAttribute("style", "-webkit-filter:grayscale(" + 100 + "%)");
                document.getElementsByClassName("split")[0].setAttribute("style", "filter:grayscale(" + 100 + "%)");
                document.getElementsByClassName("split")[0].classList.remove("bighover");
            }
            else {
                document.getElementsByClassName("split")[0].setAttribute("style", "-webkit-filter:grayscale(" + 0 + "%)");
                document.getElementsByClassName("split")[0].setAttribute("style", "filter:grayscale(" + 0 + "%)");
                document.getElementsByClassName("split")[0].classList.add("bighover");
            }
            resolve('verified!');
        }, 10);
    });
}

function firstdeal() {
    return new Promise(resolve => {
        setTimeout(() => {
            //cream 4 cărti noi, le adaugam clasele corespunzatoare
            var cartenoua1 = document.createElement("div");
            var cartenoua2 = document.createElement("div");
            var cartenoua3 = document.createElement("div");
            var cartenoua4 = document.createElement("div");
            cartenoua1.classList.add("card");
            cartenoua2.classList.add("card");
            cartenoua3.classList.add("card");
            cartenoua4.classList.add("card");
            var imgnoua1 = document.createElement("img");
            var imgnoua2 = document.createElement("img");
            var imgnoua3 = document.createElement("img");
            var imgnoua4 = document.createElement("img");
            imgnoua1.classList.add("card-png");
            imgnoua2.classList.add("card-png");
            imgnoua3.classList.add("card-png");
            imgnoua4.classList.add("card-png");
            //randomizam cartile
            path = "assets/png/"; //stabilim locatia pozelor cu cartile
            carte = card_array[Math.floor(Math.random() * Math.floor(13))]; // selectam un numar la intamplare de la 0 la 12
            deckp[pindex++] = carte;
            semn = signs[Math.floor(Math.random() * Math.floor(4))]; //analog de la 0 la 3
            numecarte = carte.concat(semn); // formam un string din numarul cartii + simbolul
            link = path.concat(numecarte.concat(".png")); // adaugam extensia .png la string
            imgnoua1.src = link; //atribuim fiecarui element link-ul
            carte = card_array[Math.floor(Math.random() * Math.floor(13))];
            deckd[dindex++] = carte;
            semn = signs[Math.floor(Math.random() * Math.floor(4))];
            numecarte = carte.concat(semn);
            link = path.concat(numecarte.concat(".png"));
            imgnoua2.src = link;
            carte = card_array[Math.floor(Math.random() * Math.floor(13))];
            deckp[pindex++] = carte;
            semn = signs[Math.floor(Math.random() * Math.floor(4))];
            numecarte = carte.concat(semn);
            link = path.concat(numecarte.concat(".png"));
            imgnoua3.src = link;
            carte = card_array[Math.floor(Math.random() * Math.floor(13))];
            semn = signs[Math.floor(Math.random() * Math.floor(4))];
            numecarte = carte.concat(semn);
            hiddencardnr = carte;
            hiddencardlink = path.concat(numecarte.concat(".png"));
            imgnoua4.src = "assets/png/red_back.png";
            //atribum elementul la containerul in care se afla o carte de joc
            cartenoua1.append(imgnoua1);
            cartenoua2.append(imgnoua2);
            cartenoua3.append(imgnoua3);
            cartenoua4.append(imgnoua4);
            stackp = document.getElementsByClassName("stack1")[0];
            stackd = document.getElementsByClassName("stack-dealer")[0];
            //introducem cartile in elementele corespunzatoare, ghidandu-ne dupa total
            stackp.insertBefore(cartenoua1, player_total_1);
            stackd.insertBefore(cartenoua2, dealer_total);
            stackp.insertBefore(cartenoua3, player_total_1);
            stackd.insertBefore(cartenoua4, dealer_total);
            resolve('first deal!');
        }, 100);
    });
}

function count() {
    return new Promise(resolve => {
        setTimeout(() => {
            pcount = 0; //valoarea jucatorului
            dcount = 0; //valoarea dealerului
            psoft = 0; //mana cu as
            dsoft = 0; //mana cu as la dealer
            //parcurgem teancul si calculam in functie de valori
            for (var i = 0; i < pindex; i++) {
                if (deckp[i] == "A") {
                    if (psoft == 0) {
                        pcount += 11;
                        psoft = 1;
                    }
                    else pcount++;
                }
                else if (deckp[i] == "J" || deckp[i] == "Q" || deckp[i] == "K") {
                    pcount += 10;
                }
                else {
                    pcount += parseInt(deckp[i]);
                }
            }
            for (var i = 0; i < dindex; i++) {
                if (deckd[i] == "A") {
                    if (dsoft == 0) {
                        dcount += 11;
                        dsoft = 1;
                    }
                    else dcount++;
                }
                else if (deckd[i] == "J" || deckd[i] == "Q" || deckd[i] == "K") {
                    dcount += 10;
                }
                else {
                    dcount += parseInt(deckd[i]);
                }
            }
            if (dsoft == 1) {
                //daca avem as verificam daca avem blackjack la dealer
                nr1 = (dcount - 10) + '';
                nr2 = dcount + '';
                if (dcount < 21)
                    dealer_total.innerHTML = nr1 + '/' + nr2;
                else if (dcount == 21) {
                    if (deckd.length == 2) {
                        //avem blackjack
                        dealer_total.innerHTML = 'BJ';
                        dealer_total.style.backgroundColor = 'black';
                    }
                    else {
                        //avem 21
                        dealer_total.innerHTML = nr2 + '';
                    }
                }
                else {
                    dealer_total.innerHTML = nr1 + '';
                    if (dcount > 31) {
                        //avem as si depasim 21
                        dealer_total.style.backgroundColor = 'red';
                        dealer_total.style.color = 'white';
                    }
                }
            }
            else {
                //nu avem as
                dealer_total.innerHTML = dcount + '';
                if (dcount > 21) {
                    //depasim 21
                    dealer_total.style.backgroundColor = 'red';
                    dealer_total.style.color = 'white';
                }
            }
            if (psoft == 1) {
                nr1 = (pcount - 10) + '';
                nr2 = pcount + '';
                if (pcount < 21)
                    player_total_1.innerHTML = nr1 + '/' + nr2;
                else if (pcount == 21) {
                    if (deckp.length == 2) {
                        player_total_1.innerHTML = 'BJ';
                        player_total_1.style.backgroundColor = 'black';
                    }
                    else
                        player_total_1.innerHTML = nr2 + '';
                }
                else {
                    player_total_1.innerHTML = nr1 + '';
                    if (pcount > 31) {
                        player_total_1.style.backgroundColor = 'red';
                        player_total_1.style.color = 'white';
                    }
                }
            }
            else {
                player_total_1.innerHTML = pcount + '';
                if (pcount > 21) {
                    player_total_1.style.backgroundColor = 'red';
                    player_total_1.style.color = 'white';
                }
            }
            resolve('counted!');
        }, 1300);
    });
}

function checksplit() {
    return new Promise(resolve => {
        setTimeout(() => {
            card1 = deckp[0];
            card2 = deckp[1]; //cele 2 cărți din teancul jucatorului
            searchpattern = "10JQK";
            match1 = searchpattern.search(card1); //cautam cartile, asemanator strstr, intr-un sir cu toate valorile speciale - 10, J, Q, K
            match2 = searchpattern.search(card2);
            if (balance >= playedbalance) {
                if (card1 == card2) //daca cele 2 carti au acelasi numar
                    allow_split = 1;
                else {
                    if (card1 == "A" && card2 == "A")// daca avem asi
                        allow_split = 1;
                    else {
                        if (match1 != -1 && match2 != -1) //daca avem carti cu valoarea 10
                            allow_split = 1;
                    }
                }
            }
            resolve('split verified!');
        }, 200);
    });
}

async function sp() {
    if (split == 0 && allow_split == 1) { 
        if (currentstack == 1) { //suntem in primul teanc
            balance -= playedbalance; //dublam balanta
            selectbalance *= 2;
            playedbalance *= 2;
            const updatebalance = await updatebal(); //actualizam balanta
            allow_hit = 0;
            allow_split = 0;
            allow_dd = 0;
            split = 1;
            const waitsplit = await makesplit(); //realizam impartirea
            const count2 = await countsplit();
            const count1 = await count();
            if (pcount < 21) { //verificam optiunile
                allow_hit = 1;
            }
            const verif = await buton_verif();
            if (pcount == 21)
                stand(); //daca avem 21 trecem la urmatorul teanc
        }
    }
    else if (currentstack == 2 && split == 1) { //daca am trecut la al doilea teanc 
        document.getElementsByClassName("stack1")[0].getElementsByClassName("activ")[0].style.display = "none";
        document.getElementsByClassName("stack2")[0].getElementsByClassName("activ")[0].style.display = "block";
        allow_split = 0;
        allow_dd = 0;
        pindex = 2;
        allow_stand = 1;
        allow_hit = 1; //resetam optiunile
        const count2 = await countsplit();
        if (pcount < 21) {
            allow_hit = 1; //verificam daca putem da hit
        }
        const verif = await buton_verif();
        if (pcount == 21)
            stand();
    }
    else if (currentstack == 3 && split == 1) { //aici intram dupa ce terminam cu ultimul teanc, calculand valoarea dealerului
        split = 0;
        stand();
    }
}

function updatebal() {
    return new Promise(resolve => {
        setTimeout(() => {
            target = document.getElementsByClassName("selector")[0];
            target.value = "$" + playedbalance;
            target2 = document.getElementsByClassName("counter")[0];
            target2.innerHTML = "$" + balance;
            resolve('updated balance!');
        }, 60);
    });
}

async function startgame() {
    if (game_over == 1 && okstart == 1) {
        //ne asiguram ca putem incepe jocul si blocam butonul de start
        document.getElementsByClassName("start")[0].setAttribute("style", "-webkit-filter:grayscale(" + 100 + "%)");
        document.getElementsByClassName("start")[0].setAttribute("style", "filter:grayscale(" + 100 + "%)");
        document.getElementsByClassName("start")[0].classList.remove("bighover");
        game_over = 0;
        //scadem balanta 
        balance -= selectbalance;
        playedbalance = selectbalance;
        const updatebalance = await updatebal(); //actualizam balanta
        const gata_reset = await resetgame(); //resetam jocul
        const gata_first_deal = await firstdeal(); //impartim cele 3 carti cu fata in sus si 1 cu fata  in jos
        const gata_count = await count(); //calculam valoarea mainilor
        const splitcheck = await checksplit(); //verificam daca putem face split
        if (pcount < 21) {
            //daca suma e mai mica decat 21
            allow_hit = 1;
            allow_stand = 1;
            if (balance < playedbalance)
                allow_dd = 0;
        }
        else {
            //altfel oprim jocul
                allow_dd = 0;
                allow_split = 0;
        }
        const verif = await buton_verif();
        if (pcount == 21) //blackjack
            stand();
    }
}

async function hit(dd) {
    if (allow_hit == 1) { //dacă poate trage
        allow_hit = 0;
        allow_split = 0; //am tras, deci nu mai putem da split
        if (dd == 1 && allow_dd == 1 && hashit == 0) {
            balance -= playedbalance; //daca jucătorul a dat double down
            selectbalance *= 2; //dublăm miza
            playedbalance *= 2;
            const updatebalance = await updatebal();
            allow_hit = 0; //nu ii permitem sa mai traga carte
            allow_dd = 0;
        }
        if (split == 1) { //dacă a dat split
            allow_split = 0; 
            allow_dd = 0; //nu ii permitem sa mai dea double down
        }
        hashit = 1;
        allow_dd = 0;
        var cartenoua1 = document.createElement("div");
        cartenoua1.classList.add("card");
        var imgnoua1 = document.createElement("img");
        imgnoua1.classList.add("card-png");
        path = "assets/png/";
        carte = card_array[Math.floor(Math.random() * Math.floor(13))];
        if (currentstack == 1) //dacă ne aflam pe primul teanc
            deckp[pindex++] = carte; //introducem cartea acolo
        else
            deckp2[pindex++] = carte;//altfel o introducem in al doilea
        semn = signs[Math.floor(Math.random() * Math.floor(4))];
        numecarte = carte.concat(semn);
        link = path.concat(numecarte.concat(".png"));
        imgnoua1.src = link;
        cartenoua1.append(imgnoua1);
        stackp = document.getElementsByClassName("stack1")[0];
        stackp.insertBefore(cartenoua1, player_total_1);
        if (currentstack == 1) { //afisam cartea in primul teanc
            stackp = document.getElementsByClassName("stack1")[0];
            stackp.insertBefore(cartenoua1, player_total_1);
            const count_cur = await count(); //verificăm valoarea cartilor iar
        }
        else {
            stackp = document.getElementsByClassName("stack2")[0]; //afidsam carteain al doilea teanc
            stackp.insertBefore(cartenoua1, player_total_2);
            const count_cur = await countsplit(); //verificam valoarea iar, dar cu al doilea teanc
        }
        if (psoft == 1 && pcount >= 31) {
            allow_hit = 0;
            allow_dd = 0;
        }
        else if (psoft == 0 && pcount >= 21) {
            allow_hit = 0;
            allow_dd = 0;
        }
        const verif = await buton_verif();
        if (split == 0) {
            if (dd == 1)
                stand();
            else if (psoft == 1 && (pcount >= 31 || pcount == 21)) {
                stand();
            }
            else if (psoft == 0 && pcount >= 21) {
                stand();
            }
            else {
                allow_hit = 1;
                const verif = await buton_verif();
            }
        }
        else {
            if (psoft == 1 && (pcount >= 31 || pcount == 21)) {
                stand();
            }
            else if (psoft == 0 && pcount >= 21) {
                stand();
            }
            else
            {
                allow_hit = 1;
                const verif = await buton_verif();
            }
        }
    }
}

function show_hidden_card() {
    return new Promise(resolve => {
        setTimeout(() => {
            stackd = document.getElementsByClassName("stack-dealer")[0];
            carteascunsa = stackd.getElementsByClassName("card")[1];
            stackd.removeChild(carteascunsa);
            var cartenoua1 = document.createElement("div");
            cartenoua1.classList.add("card");
            var imgnoua1 = document.createElement("img");
            imgnoua1.classList.add("card-png");
            carte = card_array[Math.floor(Math.random() * Math.floor(13))];
            semn = signs[Math.floor(Math.random() * Math.floor(4))];
            numecarte = carte.concat(semn);
            link = path.concat(numecarte.concat(".png"));
            imgnoua1.src = link;
            deckd[dindex++] = carte;
            cartenoua1.append(imgnoua1);
            stackd.insertBefore(cartenoua1, dealer_total);
            resolve('shown first!');
        }, 100);
    });

}

function dealer_hit() {
    return new Promise(resolve => {
        setTimeout(() => {
            var cartenoua2 = document.createElement("div");
            cartenoua2.classList.add("card");
            var imgnoua2 = document.createElement("img");
            imgnoua2.classList.add("card-png");
            carte = card_array[Math.floor(Math.random() * Math.floor(13))];
            deckd[dindex++] = carte;
            semn = signs[Math.floor(Math.random() * Math.floor(4))];
            numecarte = carte.concat(semn);
            link = path.concat(numecarte.concat(".png"));
            imgnoua2.src = link;
            cartenoua2.append(imgnoua2);
            stackd = document.getElementsByClassName("stack-dealer")[0];
            stackd.insertBefore(cartenoua2, dealer_total);
            resolve('dealer hit!');
        }, 500);
    });
}

function count_dealer_only() {
    return new Promise(resolve => {
        setTimeout(() => {
            dcount = 0;
            dsoft = 0;
            for (var i = 0; i < dindex; i++) {
                if (deckd[i] == "A") {
                    if (dsoft == 0) {
                        dcount += 11;
                        dsoft = 1;
                    }
                    else dcount++;
                }
                else if (deckd[i] == "J" || deckd[i] == "Q" || deckd[i] == "K") {
                    dcount += 10;
                }
                else {
                    dcount += parseInt(deckd[i]);
                }
            }
            if (dsoft == 1) {
                nr1 = (dcount - 10) + '';
                nr2 = dcount + '';
                if (dcount < 21)
                    dealer_total.innerHTML = nr1 + '/' + nr2;
                else if (dcount == 21) {
                    if (deckd.length == 2) {
                        dealer_total.innerHTML = 'BJ';
                        dealer_total.style.backgroundColor = 'black';
                    }
                    else {
                        dealer_total.innerHTML = nr2 + '';
                    }
                }
                else {
                    dealer_total.innerHTML = nr1 + '';
                    if (dcount > 31) {
                        dealer_total.style.backgroundColor = 'red';
                        dealer_total.style.color = 'white';
                    }
                }
            }
            else {
                dealer_total.innerHTML = dcount + '';
                if (dcount > 21) {
                    dealer_total.style.backgroundColor = 'red';
                    dealer_total.style.color = 'white';
                }
            }
            resolve('counted!');
        }, 1300);
    });
}


async function stand() {
    if (allow_stand == 1) { //verificăm să putem da stand
        if (split == 0) { //dacă nu suntem în split
            allow_hit = 0;
            allow_split = 0;
            allow_dd = 0;
            allow_stand = 0;
            const verif = await buton_verif(); //dezactivăm butoanele
            const show_card = await show_hidden_card(); //arătăm cartea cu fața în jos a dealerului
            const count_again = await count_dealer_only(); //calculăm valoarea dealerului
            while ((dcount < 17) || ((dcount < 27 && dcount > 21) && dsoft == 1)) { 
                const dealer_hitter = await dealer_hit();//tragem cărți pentru dealer cat timp nu depasim 17 
                const count_again = await count_dealer_only(); //numărăm iar
            }
            checkwinner(); //verificăm cine câștigă
        }
        else { //ne aflam pe primul teanc din split, deci schimbăm teancul si repetam procedeele
            currentstack++;
            sp();
        }
    }
}

function makesplit() {
    return new Promise(resolve => {
        setTimeout(() => {
            stack2 = document.getElementsByClassName("stack2")[0];
            stack2.style.display = "block";
            stack1 = document.getElementsByClassName("stack1")[0];
            carte2 = deckp[1];
            card2src = stack1.getElementsByClassName("card")[1].getElementsByClassName("card-png")[0].src;
            card2 = stack1.getElementsByClassName("card")[1];
            stack1.removeChild(card2); //scoatem cartea din prmul teanc
            pindex--;
            deckp.splice(1, 1);
            deckp2[0] = carte2; //o introducem in cel de-al doilea teanc
            var cartenoua1 = document.createElement("div");
            cartenoua1.classList.add("card");
            var imgnoua1 = document.createElement("img");
            imgnoua1.classList.add("card-png");
            imgnoua1.src = card2src;
            cartenoua1.append(imgnoua1);
            stackp2 = document.getElementsByClassName("stack2")[0];
            stackp2.insertBefore(cartenoua1, player_total_2);
            //de dat la prima a doua carte
            var cartenoua1 = document.createElement("div");
            cartenoua1.classList.add("card");
            var imgnoua1 = document.createElement("img");
            imgnoua1.classList.add("card-png");
            path = "assets/png/";
            carte = card_array[Math.floor(Math.random() * Math.floor(13))];
            deckp[pindex++] = carte;
            semn = signs[Math.floor(Math.random() * Math.floor(4))];
            numecarte = carte.concat(semn);
            link = path.concat(numecarte.concat(".png"));
            imgnoua1.src = link;
            cartenoua1.append(imgnoua1);
            stackp = document.getElementsByClassName("stack1")[0];
            stackp.insertBefore(cartenoua1, player_total_1);
            //de dat la a doua a doua carte
            var cartenoua1 = document.createElement("div");
            cartenoua1.classList.add("card");
            var imgnoua1 = document.createElement("img");
            imgnoua1.classList.add("card-png");
            path = "assets/png/";
            carte = card_array[Math.floor(Math.random() * Math.floor(13))];
            deckp2[1] = carte;
            semn = signs[Math.floor(Math.random() * Math.floor(4))];
            numecarte = carte.concat(semn);
            link = path.concat(numecarte.concat(".png"));
            imgnoua1.src = link;
            cartenoua1.append(imgnoua1);
            stackp = document.getElementsByClassName("stack2")[0];
            stackp.insertBefore(cartenoua1, player_total_2);
            resolve('cards split!');
        }, 300);
    });
}

function countsplit() {
    return new Promise(resolve => {
        setTimeout(() => {
            pcount = 0;
            dcount = 0;
            psoft = 0;
            dsoft = 0;
            for (var i = 0; i < pindex; i++) {
                if (deckp2[i] == "A") {
                    if (psoft == 0) {
                        pcount += 11;
                        psoft = 1;
                    }
                    else pcount++;
                }
                else if (deckp2[i] == "J" || deckp2[i] == "Q" || deckp2[i] == "K") {
                    pcount += 10;
                }
                else {
                    pcount += parseInt(deckp2[i]);
                }
            }
            for (var i = 0; i < dindex; i++) {
                if (deckd[i] == "A") {
                    if (dsoft == 0) {
                        dcount += 11;
                        dsoft = 1;
                    }
                    else dcount++;
                }
                else if (deckd[i] == "J" || deckd[i] == "Q" || deckd[i] == "K") {
                    dcount += 10;
                }
                else {
                    dcount += parseInt(deckd[i]);
                }
            }
            if (dsoft == 1) {
                nr1 = (dcount - 10) + '';
                nr2 = dcount + '';
                if (dcount < 21)
                    dealer_total.innerHTML = nr1 + '/' + nr2;
                else if (dcount == 21) {
                    if (deckd.length == 2) {
                        dealer_total.innerHTML = 'BJ';
                        dealer_total.style.backgroundColor = 'black';
                    }
                    else {
                        dealer_total.innerHTML = nr2 + '';
                    }
                }
                else {
                    dealer_total.innerHTML = nr1 + '';
                    if (dcount > 31) {
                        dealer_total.style.backgroundColor = 'red';
                        dealer_total.style.color = 'white';
                    }
                }
            }
            else {
                dealer_total.innerHTML = dcount + '';
                if (dcount > 21) {
                    dealer_total.style.backgroundColor = 'red';
                    dealer_total.style.color = 'white';
                }
            }
            if (psoft == 1) {
                nr1 = (pcount - 10) + '';
                nr2 = pcount + '';
                if (pcount < 21)
                    player_total_2.innerHTML = nr1 + '/' + nr2;
                else if (pcount == 21) {
                        player_total_2.innerHTML = nr2 + '';
                }
                else {
                    player_total_2.innerHTML = nr1 + '';
                    if (pcount > 31) {
                        player_total_2.style.backgroundColor = 'red';
                        player_total_2.style.color = 'white';
                    }
                }
            }
            else {
                player_total_2.innerHTML = pcount + '';
                if (pcount > 21) {
                    player_total_2.style.backgroundColor = 'red';
                    player_total_2.style.color = 'white';
                }
            }
            resolve('counted!');
        }, 1300);
    });
}


async function checkwinner() {
    dealer = dealer_total.innerHTML;
    ld = dealer_total.innerHTML.length;
    l1 = player_total_1.innerHTML.length;
    l2 = player_total_2.innerHTML.length;
    p1 = player_total_1.innerHTML;
    p2 = player_total_2.innerHTML;
    dealer = dealer_total.innerHTML;
    //formam stringurile corespunzatoare
    if(l1 > 1)
    p1 = (player_total_1.innerHTML).substr(l1-2,2);
    if(l2 > 1)
    p2 = (player_total_2.innerHTML).substr(l2-2,2);
    if(ld > 1)
    dealer = (dealer_total.innerHTML).substr(ld-2,2);
    miza = playedbalance;
    deupdate = 0;
    //daca nu am dat split
    if (currentstack == 1) {
        if (p1 == "BJ" && dealer != "BJ") //jucatorul primeste 2,5* miza jucata - BJ
            deupdate += miza * 5 / 2;
        else if (p1 == dealer && (p1 <= 21 || p1 == "BJ")) //remiza = miza inapoi
            deupdate += miza;
        else if (p1 > dealer && p1 <= 21) { //castig standard
            deupdate += miza * 2;
        }
        else if (p1 <= 21 && dealer > 21) {
            deupdate += miza * 2;
        }
    }
    else if (currentstack != 1) { //daca ne aflam in split trebuie verificate 2 teancuri
        miza /= 2; //deducem ca un teanc are jumate din suma totala ca miza
        if (p1 == "BJ" && dealer != "BJ") //blackjack pe split se ia ca 21 simplu
            deupdate += miza * 2;
        else if (p1 == dealer && (p1 <= 21 || p1 == "BJ"))
            deupdate += miza;
        else if (p1 > dealer && p1 <= 21) {
            deupdate += miza * 2;
        }
        else if (p1 <= 21 && dealer > 21) {
            deupdate += miza * 2;
        }
        if (p2 == "BJ" && dealer != "BJ")
            deupdate += miza * 2;
        else if (p2 == dealer && (p1 <= 21 || p1 == "BJ"))
            deupdate += miza;
        else if (p2 > dealer && p2 <= 21) {
            deupdate += miza * 2;
        }
        else if (p2 <= 21 && dealer > 21) {
            deupdate += miza * 2;
        }
    }
    balance += deupdate; //updatam balanta 
    var updatebalance = await updatebal();
    var modal = await showmodal(deupdate, playedbalance);
    if (selectbalance >= balance) { //actualizam suma maxim posibila de jucat in cazul in care balanta e mai mica decat miza anterioara
        playedbalance = balance;
        selectbalance = balance;
    }
    var updatebalance = await updatebal(); //actualizam iar balanta afisata
    playedbalance = 0;
    game_over = 1; 
    document.getElementsByClassName("start")[0].setAttribute("style", "-webkit-filter:grayscale(" + 0 + "%)");
    document.getElementsByClassName("start")[0].setAttribute("style", "filter:grayscale(" + 0 + "%)");
    document.getElementsByClassName("start")[0].classList.add("bighover"); //reactivam butonul de start
    losecheck(); //verificam daca mai avem bani sau este sfarsitul jocului
}

function showmodal(castigat, pierdut) //2 parametri, suma castigata si suma pariata
{
    return new Promise(resolve => {
        setTimeout(() => {
            modalul = document.getElementsByClassName("modal")[0];
            mesaj = modalul.getElementsByClassName("mesaj")[0];
            winlose = modalul.getElementsByClassName("winlose")[0];
            if(pierdut == castigat) //remiza
                {
                    mesaj.innerHTML = "Remiză!";
                    winlose.innerHTML = "+$0";
                    winlose.style.color = "yellow";
                }
            if(pierdut < castigat) //castiga jucatorul
            {
                var audio = new Audio('assets/png/applause4.mp3'); //sunet de aplauze redat 
                audio.play();
                mesaj.innerHTML = "Ai câștigat!";
                winlose.innerHTML = "+$" + (castigat - pierdut);
                winlose.style.color = "green";
            }
            if(pierdut > castigat) //castiga dealerul
            {
                var audio = new Audio('assets/png/boo2.mp3'); //huiduieli - boo!
                audio.play();
                mesaj.innerHTML = "Ai pierdut!";
                winlose.innerHTML = "-$" + (pierdut - castigat);
                winlose.style.color = "red";
            }
            modalul.style.display = "flex";
            setTimeout(() => {
                modalul.style.display = "none";
            },3000);
            resolve('verificat!');
        }, 100);
    });
}

function closemodal()
{
    modalul = document.getElementsByClassName("modal")[0];
    modalul.style.display = "none";
}

function losecheck()
{
    if(balance < 50)
    {
        if(confirm("Jocul s-a terminat! Doriți să jucați din nou?") == 1)
            location.reload();
    }
}

function increasebal() {
    if (selectbalance + 50 <= balance && game_over == 1) {
        selectbalance += 50;
        target = document.getElementsByClassName("selector")[0];
        target.value = "$" + selectbalance;
        okstart = 1;
        input.style.border = "2px double green";
    }
}

function decreasebal() {
    if (selectbalance - 50 >= 50 && game_over == 1) {
        selectbalance -= 50;
        target = document.getElementsByClassName("selector")[0];
        target.value = "$" + selectbalance;
        okstart = 1;
        input.style.border = "2px double green";
    }
}

document.addEventListener("input" , function(){
    input = document.getElementsByClassName("selector")[0];
    text = input.value;
    text = text.replace("$", "");
    bani = parseInt(text);
    if(isNaN(bani))
        {
            okstart = 0;
            input.style.border = "2px double red";
        }
    else
    {
        if(bani >= 50 && bani <= balance)
        {
            selectbalance = bani;
            input.value = "$" + selectbalance;
            okstart = 1;
            input.style.border = "2px double green";
        }
        else
        {
            okstart = 0;
            input.style.border = "2px double red";
        }
    }
});

function loadBalance() {
    var count_id = this.value;
    $("#counter").html("");
    $.ajax({
      url: "http://localhost:8888/fetch-balance",
      type: "GET",
      dataType: "json",
      success: function (res) {
        console.log(res);
        $("#counter").html("$"+res.balance[0].balance);
      },
    });
  }

$(document).ready(function () {
    loadBalance();
  });