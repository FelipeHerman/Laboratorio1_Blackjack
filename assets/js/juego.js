/* 
    2C = Two of Clubs (Tréboles)
    2D = Two of Diamonds (Diamantes)
    2H = Two of Hearts (Corazones)
    2S = Two of Spades (Espadas)
*/

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const otrosTipos = ['A', 'J', 'Q', 'K'];

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

    console.log(deck);
    console.log(carta);

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

const valor = valorCarta(pedirCarta());
console.log({valor})