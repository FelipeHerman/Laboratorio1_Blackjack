/* 
    2C = Two of Clubs (Tréboles)
    2D = Two of Diamonds (Diamantes)
    2H = Two of Hearts (Corazones)
    2S = Two of Spades (Espadas)
*/

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'];
const otrosTipos = ['A', 'J', 'Q', 'K'];

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

    console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);

    return deck;
}

crearDeck();