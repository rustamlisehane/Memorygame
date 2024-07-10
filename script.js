let startButton = document.getElementsByClassName("start-button");
console.log(startButton)
startButton[0].addEventListener("click", function () {
    // əvvəlki yəni birinci acılan kartın idsini götürürük.
    let persistedPairData = '';
    // tapılmış cüt kartların sayı .
    let phoundCount = 0
    // butun kartlarini get elemetbyclassname ile secirik
    var cards = document.getElementsByClassName("card");
    console.log(cards);
    //kartların içərisindən keçmək üçün loopdan istifadə edirik.
    for (var i = 0; i < cards.length; i++) {
        // hər bir kart üçün OnClick function əlavə edilir.
        cards[i].addEventListener("click", onClick)
    }

    function onClick(e) {
        //kilik olunan element yəni(kartı)götürür.
        let targetElemt = e.currentTarget
        console.log(targetElemt)
        //bu kartın tapılıb tapılmadığı yoxlanılır.
        let isPhound = targetElemt.getAttribute('data-isphound') === 'tapildi';
        // kilik olunan kartın idsini götürür.
        let pairId = targetElemt.getAttribute('data-pairid');

        console.log('data-pairid', pairId)
        console.log('data-isphound', isPhound)
        console.log('data-persistedPairData', persistedPairData)
        // "tapıldı" statusu varsa koddan cixiriq 
        //  istifadəci ikinci dəfə acıq olan karta kliklədikdə həcnə baş vermir.
        if (isPhound) {
            return;
        }

        // Kartı çevirən zaman card-open statusu əlavə edir.
        targetElemt.classList.add('card-open')

        //acılan kartın id götürüb nöbəti acılan kart ilə yoxlayır.
        if (persistedPairData === '') {
            persistedPairData = pairId;
        } else {
            if (persistedPairData === pairId) {

                // əgər idlər bəranbərdisə onlara tapıldı statusu bərabər edilir .
                let allPairs = document.querySelectorAll(`[data-pairid='${pairId}']`)
                allPairs.forEach(function (item) {
                    item.setAttribute('data-isphound', 'tapildi')
                })
                persistedPairData = ''
                //tapılmış kartların sayını artırır 
                phoundCount = phoundCount + 1
                if (phoundCount === cards.length / 2) {//eger butunn kartlar tapilibsa You Win! yazisini ekranda gorunur
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
})

