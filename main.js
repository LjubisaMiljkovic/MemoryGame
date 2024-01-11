let iconsGame = [
    "A", "S", "D", "F", "G", "H", "J", "K", "L", "M", "N", "B", "V", "C", "X", "Z", "Q", "W",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", "M", "N", "B", "V", "C", "X", "Z", "Q", "W"
];
let lewels = [{
    kolone: 2,
    board: `200px`, 
    },{
        kolone: 4,
        board: `400px`,        
    },
    {
    kolone: 6,
    board: `600px`, 
    },
    {
    kolone: 8,
    board: `800px`, 
    },
    {
    kolone: 9,
    board: `900px`, 
    }
    ]
let lewel = 0;
let wins = 0;

let twoFipped = [];

let container = document.querySelector(`.container`);


createGrid()
var allCards = document.querySelectorAll(`.card`);

allCards.forEach(card => card.addEventListener(`click`, flipCard)); 

function flipCard(){
    // let front = this.querySelector(`.front`)
    // let back = this.querySelector('.back')

    //front.style.transform = "perspective(900px) rotateY(180deg)";
    //back.style.transform = "perspective(900px) rotateY(0deg)";
    console.log(this);
    this.removeEventListener(`click`,flipCard); // ukida se klik da ne bi moglo da se klikce dva puta na istu kartu
    twoFipped.push(this);
    console.log(twoFipped)
    this.classList.add(`active`);
    if(twoFipped.length === 2){
        checkCards()
    }
}

function checkCards(){
    removeAllCliks();
    let back1 = twoFipped[0].querySelector(`.back`);
    let back2 = twoFipped[1].querySelector(`.back`);
    let icons = ((lewels[lewel].kolone) * (lewels[lewel].kolone)/2);
    
    console.log(icons)
    if(back1.innerHTML === back2.innerHTML) {
        wins++;
        if(wins === (icons)){
          // next level
          lewel++;
          wins = 0;
          twoFipped = [];
          createGrid();  
        }
        twoFipped = [];
        console.log(twoFipped);
        returnCliks();
     
      
    }else{
        setTimeout(() => {
        twoFipped[0].className = "card";   //moze ovako
        twoFipped[1].classList.remove(`active`);    //moze i ovako
        twoFipped.length = 0;  //mora da se ispazni arrey da bi mogao ponovo da se puni (klikcu karte)
        returnCliks();
        },700)
    }
}

 function returnCliks(){
     let cardsNoActiv = document.querySelectorAll(`.card:not(.activ)`);     //ovo je CSS daj svaku karticukoja nema klacu activ
     cardsNoActiv.forEach(card => card.addEventListener(`click`,flipCard));
     }


function removeAllCliks(){
    allCards.forEach(card => card.removeEventListener(`click`,flipCard))
}

function createGrid() {
    
    let cardsHtml = "";
    let numberCard = (lewels[lewel].kolone * lewels[lewel].kolone)
    let numberIcon = numberCard/2;
    let icons = addArrey(iconsGame.slice(0,numberIcon));
    
    container.style.width = lewels[lewel].board;
    container.style.height = lewels[lewel].board;
    
            
       
    for (let i = 0; i < numberCard; i++) {
        let rand = Math.floor(Math.random() * icons.length);
        cardsHtml += `
        <div class="card">
          <div class="back">${icons[rand]}</div>
          <div class="front"></div>
        </div>
`.trim();
        icons.splice(rand, 1);
    }
    container.innerHTML = cardsHtml;
    
}

function addArrey(iconArrey){    //   spajanje nizova

    let icons = iconArrey;
    lengthArrey= iconArrey.length;
    for(i=0;i< lengthArrey; i++){
        
        icons.push(`${iconArrey[i]}`);
    }
    console.log(icons)
    return icons
}

