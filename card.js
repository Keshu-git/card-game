
const icons = ['fa-dog', 'fa-cat', 'fa-fish', 'fa-frog', 'fa-spider', 'fa-hippo'];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function initializeGame() {
    const cardGrid = document.getElementById('cardGrid');
    cardGrid.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;

    const pairs = [...icons, ...icons];
    const shuffledIcons = shuffle(pairs);

    shuffledIcons.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('flip-card');
        card.dataset.icon = icon;

        card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front"></div>
          <div class="flip-card-back"><i class="fas ${icon}"></i></div>
        </div>
      `;

        card.addEventListener('click', () => flipCard(card));
        cardGrid.appendChild(card);
    });
}

function flipCard(card) {
    const inner = card.querySelector('.flip-card-inner');

    if (flippedCards.length === 2 || inner.classList.contains('flipped')) return;

    inner.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        const [card1, card2] = flippedCards;
        const val1 = card1.dataset.icon;
        const val2 = card2.dataset.icon;

        if (val1 === val2) {
            matchedPairs++;
            setTimeout(() => {
                card1.classList.add('hide');
                card2.classList.add('hide');
                flippedCards = [];
                if (matchedPairs === icons.length) {
                    showPopup();
                }
            }, 700);
        } else {
            setTimeout(() => {
                card1.querySelector('.flip-card-inner').classList.remove('flipped');
                card2.querySelector('.flip-card-inner').classList.remove('flipped');
                flippedCards = [];
            }, 900);
        }
    }
}

function showPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    initializeGame();
}



