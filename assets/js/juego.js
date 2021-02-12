/* 
    2C = Two of Clubs (Tréboles)
    2D = Two of Diamonds (Diamantes)
    2H = Two of Hearts (Corazones)
    2S = Two of Spades (Espadas)
*/

//Patrón Modulo

const miModulo = (() => { // función anónima auto invocada

    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'],
        otrosTipos = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //Referencias HTML
    const btnPedir      = document.querySelector('#idPedir'),
        btnDetener      = document.querySelector('#idDetener'),
        btnNuevoJuego   = document.querySelector('#idNuevoJuego');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    // Función que inicializa el juego.
    const inicializarJuego = ( numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerText = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // Está funcion crea una nueva baraja y la retorna
    const crearDeck = () => {
        deck = [];

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

        return _.shuffle(deck);
    }

    //Esta funcion permite pedir una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en la baraja';
        }

        return deck.pop();
    } 

    // Valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);
        return (isNaN(valor)) ? 
                (valor === 'A') ? 11 : 10
                : valor * 1;
    }

    // Función acumular puntos
    // turno: 0 = primer jugador, y el último será la computadora.
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    // Función crearCarta
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('cartas__img');
        divCartasJugadores[turno].append(imgCarta);
    }

    // Función que determina a él ganador
    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if ( puntosComputadora === puntosMinimos ) {
            alert('Nadie ha ganado');
            } else if (puntosMinimos > 21) {
                alert('Computadora ha ganado');
            } else if (puntosComputadora > 21) {
                alert('Jugador ha ganado');
            } else{
                alert('Computadora Gana');
            }
        }, 100);
    }

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        
        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
            
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();
    }

    // Eventos, Botón pedir
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta(); 
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } 
        
        else if (puntosJugador === 21) {
            console.warn('21, Genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();