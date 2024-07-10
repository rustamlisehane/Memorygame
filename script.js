// evvelki card ID
let persistedPairData = '';
// tapilmis cut kartlarin sayi
let phoundCount = 0
// butun kartlarini get elemetbyclassname ile secirik
var cards = document.getElementsByClassName("card");
console.log(cards);
//
for (var i = 0; i < cards.length; i++) {
    // her bir kard ucun OnClick function elave edilib
    cards[i].addEventListener("click", onClick)
}

function onClick(e) {
    //klik olunan elementi goturur
    let targetElemt = e.currentTarget
    console.log(targetElemt)
    // bu kartin tapilib tapilmadagini yoxlanir
    let isPhound = targetElemt.getAttribute('data-isphound') === 'tapildi';
    // klik olunan kartin Id-sini goturur
    let pairId = targetElemt.getAttribute('data-pairid');

    console.log('data-pairid', pairId)
    console.log('data-isphound', isPhound)
    console.log('data-persistedPairData', persistedPairData)
    // "tapildi" statusu varsa koddan cixiriq 
    // yeni istifadeci ikinci defe aciq olan karta klikledikde hecne bas vermir
    if (isPhound) {
        return;
    }

    // Karti cevirmek ucun card-open statusu elave edir
    targetElemt.classList.add('card-open')

    //acilan kartin id goturub nobeti acilan kart ile yoxlayir.
    if (persistedPairData === '') {
        persistedPairData = pairId;
    } else {
        if (persistedPairData === pairId) {

            // eger idler beraberdise onlara tapildi statusu elave edilir 
            const allPairs = document.querySelectorAll(`[data-pairid='${pairId}']`)
            allPairs.forEach(function (item) {
                item.setAttribute('data-isphound', 'tapildi')
            })
            persistedPairData = ''
            //tapilmis kartlarin sayini artirir 
            phoundCount = phoundCount + 1
            if (phoundCount === cards.length / 2) {//eger butunn kartlar t6apilibsa You Win! yazisini ekranda gorunur
                document.getElementById('you-win').style.display = 'block'
            }
        } else {//eger data idleri eynidirse onlara "data-pairid" statusu verilir
            let prevCards = document.querySelectorAll(`[data-pairid='${persistedPairData}']`)
            prevCards.forEach(function (item) {
                //hər bir acılan karta "card-open" statusu verilir ancaq o kartlardan sonra kilik etdiyimiz kart ilə idləri bir deilsə həmin kartda "card-open" statusu yox edilir 
                item.classList.remove('card-open');
            })
            persistedPairData = pairId;
        }
    }
}