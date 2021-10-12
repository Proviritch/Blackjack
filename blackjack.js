const ARREGLO_ORIGINAL = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const BARAJA_ORIGINAL = [
    ["AC.png","AD.png","AH.png","AS.png"],
    ["2C.png","2D.png","2H.png","2S.png"],
    ["3C.png","3D.png","3H.png","3S.png"],
    ["4C.png","4D.png","4H.png","4S.png"],
    ["5C.png","5D.png","5H.png","5S.png"],
    ["6C.png","6D.png","6H.png","6S.png"],
    ["7C.png","7D.png","7H.png","7S.png"],
    ["8C.png","8D.png","8H.png","8S.png"],
    ["9C.png","9D.png","9H.png","9S.png"],
    ["10C.png","10D.png","10H.png","10S.png"],
    ["JC.png","JD.png","JH.png","JS.png"],
    ["QC.png","QD.png","QH.png","QS.png"],
    ["KC.png","KD.png","KH.png","KS.png"]
];
let ARREGLO;
let BARAJA;
const boton_comenzar_juego = document.getElementById("comenzar_juego");
const boton_pedir_carta = document.getElementById("pedir_carta");
const boton_parar = document.getElementById("parar");
const boton_pedir_carta2 = document.getElementById("pedir_carta2");
const boton_parar2 = document.getElementById("parar2");
let valor_carta, cartas, elegida, suma, suma2, desicion, turno, parado, parado2, ultimo_toque, x, y, cont;
//De la rama main
let tres_segundos;
const body = document.getElementsByTagName("body")[0];
const section_jugador1 = document.getElementById("section_jugador1");
const section_jugador2 = document.getElementById("section_jugador2");
let img = document.getElementsByTagName("img");
let puntuacion1 = document.getElementById("puntuacion1");
let puntuacion2 = document.getElementById("puntuacion2");
let main = document.getElementsByTagName("main")[0];
let span = document.createElement("span");
span.classList.add("resultado");

const borrar_img = () => {
    for (let i = cont - 1; i >= 0; i--) {
        img[i].remove();
    } 
}
//

const remover_todo = () => {
    boton_pedir_carta.removeEventListener("click", pedir_carta1);
    boton_pedir_carta2.removeEventListener("click", pedir_carta2);
    boton_parar.removeEventListener("click", parar_pedir_cartas);
    boton_parar2.removeEventListener("click", parar_pedir_cartas2);
}

const pedir_carta1 = () => {
    ultimo_toque="boton 1";
    if (parado === false) {
        boton_pedir_carta.removeAttribute("enabled");
        boton_pedir_carta.setAttribute("disabled","");
        boton_pedir_carta2.removeAttribute("disabled");
        boton_pedir_carta2.setAttribute("enabled","");
    }
    turno = true;
    pedir_carta();
};

const pedir_carta2 = () => {
    ultimo_toque="boton 2";
    if (parado2 === false) {
        boton_pedir_carta2.removeAttribute("enabled");
        boton_pedir_carta2.setAttribute("disabled","");
        boton_pedir_carta.removeAttribute("disabled");
        boton_pedir_carta.setAttribute("enabled","");
    }
    turno = false;
    pedir_carta();
};

const pedir_carta = () => {
    valor_carta = Math.trunc(Math.random()*ARREGLO.length);
    cartas = Math.trunc(Math.random()*4);
    while (cartas > BARAJA[valor_carta].length-1) {
        --cartas;
    }
    if (turno === true) {
        sumar_cartas();
    } else {
        sumar_cartas2();
    }
    
    elegida = BARAJA[valor_carta][cartas];
    BARAJA[valor_carta].splice(cartas,1);
    if (BARAJA[valor_carta].length===0) {
        BARAJA.splice(valor_carta,1);
        ARREGLO.splice(valor_carta,1);
    }
    console.log(elegida);
    if (parado2 === true) {
        boton_pedir_carta.removeAttribute("disabled");
        boton_pedir_carta.setAttribute("enabled","");
    }
    if (parado === true) {
        boton_pedir_carta2.removeAttribute("disabled");
        boton_pedir_carta2.setAttribute("enabled","");
    }
    //De la rama main
    if (turno === true) {
        section_jugador1.insertAdjacentHTML('beforeend',`<img style="transform: translateX(0%) translateY(${x}%) rotate(0deg);" src="${elegida}">`);
        puntuacion1.textContent = suma;
        x+=50;
    } else if (turno === false) {
        section_jugador2.insertAdjacentHTML('beforeend',`<img style="transform: translateX(0%) translateY(${y}%) rotate(0deg);" src="${elegida}">`);
        puntuacion2.textContent = suma2;
        y+=50;
    }
    cont++;
    /* x+=50; */
    //
}

const sumar_cartas = () => {
    if (suma < 21) {
        suma = suma + ARREGLO[valor_carta];
        console.log("puntos del jugador 1: ",suma);
        if (parado2 === true && suma > suma2 && suma < 21) {
            console.warn("GANASTE jugador 1");
            remover_todo();
        }
    }
    if (suma === 21) {
        console.warn("GANASTE jugador 1");
        remover_todo();
    } else if (suma > 21) {
        console.warn("perdiste jugador 1");
        remover_todo();
    }
};

const sumar_cartas2 = () => {
    if (suma2 < 21) {
        suma2 = suma2 + ARREGLO[valor_carta];
        console.log("puntos del jugador 2: ",suma2);
        if (parado === true && suma2 > suma && suma2 < 21) {
            console.warn("GANASTE jugador 2");
            remover_todo();
        }
    }
    if (suma2 === 21) {
        console.warn("GANASTE jugador 2");
        remover_todo();
    } else if (suma2 > 21) {
        console.warn("perdiste jugador 2");
        remover_todo();
    }
};

const parar_pedir_cartas = () => {
    parado = true;
    console.log("PARAR");
    boton_pedir_carta.removeEventListener("click", pedir_carta1);
    boton_parar.removeEventListener("click", parar_pedir_cartas);
    if (ultimo_toque === "boton 2") {
        boton_pedir_carta2.removeAttribute("disabled");
        boton_pedir_carta2.setAttribute("enabled","");
    }
    if (parado2 === true && parado === true) {
        if (suma > suma2) {
            console.warn("GANASTE jugador 1");
        } else if (suma2 > suma) {
            console.warn("GANASTE jugador 2");
        } else {
            console.warn("EMPATE");
        }
    }
};

const parar_pedir_cartas2 = () => {
    parado2 = true;
    console.log("PARAR");
    boton_pedir_carta2.removeEventListener("click", pedir_carta2);
    boton_parar2.removeEventListener("click", parar_pedir_cartas2);
    if (ultimo_toque === "boton 1") {
        boton_pedir_carta.removeAttribute("disabled");
        boton_pedir_carta.setAttribute("enabled","");
    }
    if (parado2 === true && parado === true) {
        if (suma > suma2) {
            console.warn("GANASTE jugador 1");
        } else if (suma2 > suma) {
            console.warn("GANASTE jugador 2");
        } else {
            console.warn("EMPATE");
        }
    }
};

boton_comenzar_juego.addEventListener("click", () => {
    ARREGLO = [...ARREGLO_ORIGINAL];
    BARAJA = [...BARAJA_ORIGINAL];
    for (let i = 0; i < ARREGLO.length; i++) {
        BARAJA[i] = [...BARAJA_ORIGINAL[i]];
    }
    console.log(ARREGLO, BARAJA);
    x = 0;
    y = 0;
    suma = 0;
    suma2 = 0;
    desicion = 0;
    parado = false;
    parado2 = false;
    activo = true;
    activo2 = true;
    borrar_img();
    span.remove();
    cont = 0
    puntuacion1.textContent = 0;
    puntuacion2.textContent = 0;
    boton_pedir_carta.removeAttribute("disabled");
    boton_pedir_carta.setAttribute("enabled","");
    boton_pedir_carta2.removeAttribute("disabled");
    boton_pedir_carta2.setAttribute("enabled","");
    boton_parar.addEventListener("click", parar_pedir_cartas);
    boton_pedir_carta.addEventListener("click", pedir_carta1);
    boton_parar2.addEventListener("click", parar_pedir_cartas2);
    boton_pedir_carta2.addEventListener("click", pedir_carta2);
});

