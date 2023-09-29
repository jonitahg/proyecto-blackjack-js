/* 
  2C = Two of Clubs
  2D = Two of Diamonds
  2H = Two of Hearts
  2S = Two of Spades
*/

//* ====== VARIABLES ====== *//

// => Contador Puntos

let puntosPlayer = 0,
	puntosComputer = 0;

// => Mazo de cartas

let deck = [];
const palos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

// => Referencias HTML

// Botones
const restBtn = document.querySelector('#rest'),
	addBtn = document.querySelector('#add'),
	stopBtn = document.querySelector('#stop');

// Contador Puntos
const pointsCounter = document.querySelectorAll('.points-counter');

// Contenedor Cartas
const playerCards = document.querySelectorAll('.player-cards');

// Contenedor mensaje
const messageResults = document.querySelector('.message-results');

//* ====== FUNCIONALIDADES ====== *//

// => Deck

// Esta funcion crea un mazo aleatorio
const crearDeck = () => {
	for (let i = 2; i <= 10; i++) {
		for (palo of palos) deck.push(`${i + palo}`);
	}
	for (especial of especiales) {
		for (palo of palos) deck.push(`${especial + palo}`);
	}

	return deck.sort(() => Math.random() - 0.5);
};

crearDeck();

// => Pedir Carta

// Esta funcion toma una carta del mazo
const pedirCarta = () => deck.pop();

// => Valor Carta

// Esta funcion retorna el valor de la carta solicitada
const valorCarta = (carta) => {
	const valor = carta.substring(0, carta.length - 1);
	return isNaN(valor) ? (valor === 'A' ? 11 : 10) : valor * 1;
};

//? "valor * 1" Pasa de string a number
//? Substring: Retorna un string recortado en base a los parametros.
//? isNaN: is not a number ('1' cuaneta como number)
//? CallBack: Una funcion como argumento.

// => Pedir Carta

addBtn.addEventListener('click', () => {
	// Contador Player
	const carta = pedirCarta();
	puntosPlayer += valorCarta(carta);

	pointsCounter[0].innerHTML = puntosPlayer;

	// Cartas Player
	const createCard = document.createElement('img');
	createCard.src = `assets/cartas/${carta}.png`;
	playerCards[0].append(createCard);

	// Puntos Player
	if (puntosPlayer > 21) {
		puntosPlayer = 0;
		addBtn.disabled = true; //? Deshabilita el boton
		stopBtn.disabled = true;
		computerTurn(puntosPlayer);
	}
});

// => Turno Computadora

const computerTurn = (puntosMinimos) => {
	do {
		// Contador Computer
		const carta = pedirCarta();
		puntosComputer += valorCarta(carta);
		pointsCounter[1].innerHTML = puntosComputer;

		// Cartas Computer
		const createCard = document.createElement('img');
		createCard.src = `assets/cartas/${carta}.png`;
		playerCards[1].append(createCard);
	} while (puntosMinimos > puntosComputer && puntosComputer <= 21);

	// Mensaje de resultados

	setTimeout(() => {
		messageResults.style.opacity = '1';
		if (puntosComputer > puntosMinimos && puntosComputer <= 21) {
			messageResults.innerHTML = '<p>Perdiste!</p>';
		} else if (puntosComputer === puntosMinimos) {
			messageResults.innerHTML = '<p>Empate!</p>';
		} else {
			messageResults.innerHTML = '<p>Ganaste!</p>';
		}
	}, 10);
};

// => Detener
stopBtn.addEventListener('click', () => {
	addBtn.disabled = true;
	stopBtn.disabled = true;
	computerTurn(puntosPlayer);
});

// => Nuevo Juego
restBtn.addEventListener('click', () => {
	deck = [];
	crearDeck();

	messageResults.style.opacity = '0';

	addBtn.disabled = false;
	stopBtn.disabled = false;
	puntosPlayer = 0;
	puntosComputer = 0;
	for (let i = 0; i < 2; i++) {
		pointsCounter[i].innerText = '0';
		playerCards[i].innerHTML = '';
	}
});
