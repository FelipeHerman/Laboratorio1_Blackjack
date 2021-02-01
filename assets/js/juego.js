/* 
    2C = Two of Clubs (Tréboles)
    2D = Two of Diamonds (Diamantes)
    2H = Two of Hearts (Corazones)
    2S = Two of Spades (Espadas)
*/

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const otrosTipos = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0, 
    puntosComputadora = 0;

//Referencias HTML
const btnPedir         = document.querySelector('#idPedir');
const divCartasJugador = document.querySelector('#cartas__jugador');
const puntosHTML       = document.querySelectorAll('small');

// Está funcion crea una nueva baraja
const crearDeck = () => { //Funcion de flecha
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push(i + tipo);    
        }
    }

    for (let tipo of tipos) {
        for (let espc of otrosTipos) {
            deck.push(espc + tipo)
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);

    return deck;
}

crearDeck();

//Esta funcion permite pedir una carta
const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en la baraja';
    }

    const carta = deck.pop();

    return carta;
} 

//pedirCarta();

// Valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length-1);

    return (isNaN(valor)) ? 
            (valor === 'A') ? 11 : 10
            : valor * 1;
    
    /* if (isNaN(valor)) {
        puntos = (valor === 'A') ? 11 : 10;
    }else{
        puntos = valor * 1;
    }

    console.log(puntos) */
}

// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;

    //<img class="cartas__img" src="assets/cartas/10S.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('cartas__img');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
    } else if (puntosJugador === 21) {
        console.warn('21, Genial!');
        btnPedir.disabled = true;
    }

});