// game.js

document.addEventListener('DOMContentLoaded', function () {
    // Array of Christmas-themed images (you can add more)
    const images = [
        'santa.jpg',
        'reindeer.jpg',
        'tree.jpg',
        'gift.jpg',
        'snowman.jpg',
        'candle.jpg',
        'bell.jpg',
        'ornament.png',
    ];

    // Duplicate the images to create pairs
    const cards = images.concat(images);

    // Shuffle the cards
    cards.sort(() => Math.random() - 0.5);

    const gameGrid = document.getElementById('game-grid');
    let selectedCards = [];
    let matchedCards = [];

    // Load the 'blank.png' image first
    const blankImage = new Image();
    blankImage.src = 'blank.png';
    blankImage.onload = function () {
        console.log('Images loaded');  // Add this line for debugging

        // Create the game grid as a 4x4 table
        const table = document.createElement('table');
        for (let i = 0; i < 4; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 4; j++) {
                const card = document.createElement('td');
                card.innerHTML = '<img src="blank.png" data-id="' + (i * 4 + j) + '" width="100" height="100" class="card">';
                card.addEventListener('click', flipCard);
                row.appendChild(card);
            }
            table.appendChild(row);
        }

        gameGrid.appendChild(table);
    };

    // Function to flip a card
    function flipCard() {
        const selectedId = this.firstChild.getAttribute('data-id');
        selectedCards.push({ id: selectedId, img: cards[selectedId] });
        this.firstChild.setAttribute('src', cards[selectedId]);
        if (selectedCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    // Function to check for a match
    // Function to check for a match
    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const [card1, card2] = selectedCards;
        const cardElements = [cards[card1.id], cards[card2.id]];

        if (card1.img === card2.img && card1.id !== card2.id) {
            cardElements.forEach(card => {
                card.removeEventListener('click', flipCard);
                matchedCards.push(card);
            });
        } else {
            cardElements.forEach(card => card.setAttribute('src', 'blank.png'));
        }

        selectedCards = [];

        // Check if all cards are matched
        if (matchedCards.length === images.length * 2) {
            alert('Congratulations! You matched all the cards!');
        }
    }

});
