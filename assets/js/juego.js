/*
implementacion de patron modulo
*/
//funcion anonima autoinvocada
const miModulo = (() => {
    'use strict'  //modo estricto a~la hora de evaluar codigo
    //creacion de deck
let deck = [];
const tipos = ['C', 'D', 'H', 'S'],
      especiales = ['A', 'J', 'Q', 'K'];

// let puntosJugador = 0,
//     puntosComputadora = 0;
let puntosJugadores = []; //para incializar el numero de jugadores

//referencias de html
const btnPedir = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener'),
      btnNuevo = document.querySelector('#btnNuevo');

const puntosHtml = document.querySelectorAll('small'),
      divCartasJugadores = document.querySelectorAll('.divCartas');
      

const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i =0; i < numJugadores; i++){
        puntosJugadores.push(0);
    }
    puntosHtml.forEach( elem => elem.innerText = 0 );
    divCartasJugadores.forEach( elem => elem.innerHTML = '' );

    btnPedir.disabled = false;
    btnDetener.disabled = false;
    
}

const crearDeck = () => {

    deck = [];
    //creacion del deck
    for(let i = 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo);
        }
    }

    // console.log(deck);

    // Algoritmo de Fisher-Yates para mezclar el deck
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    
    // console.log(deck);
    return deck;
}



//funcion para tomar una carta
 
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    
    return deck.pop();
}


//funcion para obtener el valor de la carta usando el operador ternario
const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length -1);
    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

}
//turno: 0 = primer jugador y el ultimo sera la computadora
const acumularPuntos = (carta, turno) => {

    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}

const crearCarta = (carta, turno)=> {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);
}

const determinarGanador = () => {

    const [puntosMinimos, puntosComputadora] = puntosJugadores;

     setTimeout(() => {
        if(puntosComputadora > 21){
        alert('Gano la compu!');
    }else if(puntosComputadora === puntosMinimos){
        alert('empate papus!');
    }else if (puntosComputadora > 21){
        alert('Gano el cabroncete!');
    }else {
        alert('Gano la compu!');
    }
    },100);

}

//turno computadora
const turnoComputador = (puntosMinimos)=>{
    let puntosComputadora = 0;
    do{
     const carta = pedirCarta();
    // puntosComputadora = puntosComputadora + valorCarta(carta);
    // puntosHtml[1].innerText = puntosComputadora;
    puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1);

    // <img class="carta" src="assets/cartas/cartas/2C.png" alt=""></img>
    // const imgCarta = document.createElement('img');
    // imgCarta.src = `assets/cartas/cartas/${carta}.png`;
    // imgCarta.classList.add('carta');
    // divCartasComputadora.append(imgCarta);
    crearCarta(carta, puntosJugadores.length -1);

    } while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

   determinarGanador();
}

//eventos 

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    // puntosJugador = puntosJugador + valorCarta(carta);
    // puntosHtml[0].innerText = puntosJugador;
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);

    // <img class="carta" src="assets/cartas/cartas/2C.png" alt=""></img>
    // const imgCarta = document.createElement('img');
    // imgCarta.src = `assets/cartas/cartas/${carta}.png`;
    // imgCarta.classList.add('carta');
    // divCartasJugador.append(imgCarta);
    
    if(puntosJugador > 21){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);
    } else if (puntosJugador === 21){
        console.warn('21, PAPU!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputador(puntosJugador);
    }

}); //funcion call-back

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputador(puntosJugadores[0]);
});

btnNuevo.addEventListener('click', () => {
    
    inicializarJuego();


    


});

    return {
        nuevoJuego : inicializarJuego
    }

})();


