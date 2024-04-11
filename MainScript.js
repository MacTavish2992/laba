document.addEventListener('DOMContentLoaded', () => {
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

    const gameContainer = document.getElementById('game-container');
    let flippedCards = [];
    let lockBoard = false;

    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);

    // Create game board
    cards.forEach((cardValue, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
        const front = document.createElement('div');
        front.classList.add('front');
        const back = document.createElement('div');
        back.classList.add('back');
        back.innerHTML = cardValue;
        cardInner.appendChild(front);
        cardInner.appendChild(back);
        card.appendChild(cardInner);

        card.addEventListener('click', () => flipCard(card, cardValue, index));
        gameContainer.appendChild(card);
    });

    function flipCard(card, cardValue, index) {
        if (lockBoard || card.classList.contains('flip') || flippedCards.length === 2) return;

        card.classList.add('flip');
        flippedCards.push({ card, value: cardValue, index });

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.value === card2.value;

        if (isMatch) {
            card1.card.classList.add('matched');
            card2.card.classList.add('matched');
        }

        lockBoard = true;

        setTimeout(() => {
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        flippedCards.forEach(({ card, index }) => {
            if (!card.classList.contains('matched')) {
                card.classList.remove('flip');
            }
        });

        flippedCards = [];
        lockBoard = false;
    }
});
