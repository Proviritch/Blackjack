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
let valor_carta, cartas, elegida, suma, suma2, desicion,turno, cont, x;
let tres_segundos;
/* const body = document.getElementsByTagName("body")[0]; */
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

const esperar_pedir_carta = () => {
    if (suma < suma2 || desicion === 0) {
        pedir_carta();
        if (suma === 21) {
            desicion = 1;
            /* console.log("GANASTE IA"); */
            boton_parar.removeEventListener("click", parar_pedir_cartas);
        }
        if (suma === suma2) {
            desicion = Math.round(Math.random());
            console.log("desicion: ",desicion);
            if (desicion === 1) {
                console.log("EMPATE");
                span.textContent = "EMPATE";
                main.append(span);
                /* main.insertAdjacentHTML("beforebegin",'<span id="resultado">EMPATE</span>'); */
                clearInterval(tres_segundos);
            }
        } else if (suma > suma2) {
            desicion = 1;
            if (suma < 22) {
                console.log("GANASTE IA");
                span.textContent = "GANASTE IA";
                main.append(span);
                /* main.insertAdjacentHTML("beforebegin",'<span id="resultado">GANASTE IA</span>'); */
            }
            boton_parar.removeEventListener("click", parar_pedir_cartas);
            clearInterval(tres_segundos);
        }
    } else {
        clearInterval(tres_segundos);
    }
}

const pedir_carta = () => {
    valor_carta = Math.trunc(Math.random()*ARREGLO.length);
    cartas = Math.trunc(Math.random()*4);
    while (cartas > BARAJA[valor_carta].length-1) {
        --cartas;
    }
    sumar_cartas();
    elegida = BARAJA[valor_carta][cartas];
    BARAJA[valor_carta].splice(cartas,1);
    if (BARAJA[valor_carta].length===0) {
        BARAJA.splice(valor_carta,1);
        ARREGLO.splice(valor_carta,1);
    }
    console.log(elegida);
    if (turno === 0) {
        section_jugador1.insertAdjacentHTML('beforeend',`<img style="transform: translateX(-35%) translateY(${x}%) rotate(35deg);" src="${elegida}">`);
        puntuacion1.textContent = suma;
    } else if (turno === 1) {
        section_jugador2.insertAdjacentHTML('beforeend',`<img style="transform: translateX(35%) translateY(${x}%) rotate(35deg);" src="${elegida}">`);
        puntuacion2.textContent = suma;
    }
    cont++;
    x+=50;
}

const sumar_cartas = () => {
    console.log("turno: ", turno);
    if (suma < 21) {
        suma = suma + ARREGLO[valor_carta];
        console.log(suma);
    }
    if (suma === 21) {
        if (turno === 0) {
            console.log("GANASTE JUGADOR");
            span.textContent = "GANASTE JUGADOR";
            main.append(span);
            /* main.insertAdjacentHTML("beforebegin",'<span id="resultado">GANASTE JUGADOR</span>'); */
        } else if (turno === 1) {
            console.log("GANASTE IA");
            span.textContent = "GANASTE IA";
            main.append(span);
            /* main.insertAdjacentHTML("beforebegin",'<span id="resultado">GANASTE IA</span>'); */
            clearInterval(tres_segundos);
        }
        boton_parar.removeEventListener("click", parar_pedir_cartas);
        boton_pedir_carta.removeEventListener("click", pedir_carta);
    } else if (suma > 21) {
        if (turno === 0) {
            console.log("perdiste jugador :(");
            span.textContent = "GANASTE IA";
            main.append(span);
            /* main.insertAdjacentHTML("beforebegin",'<span id="resultado">GANASTE IA</span>'); */
        } else if (turno === 1) {
            console.log("perdiste IA :(");
            span.textContent = "GANASTE JUGADOR";
            main.append(span);
            /* main.insertAdjacentHTML("beforebegin",'<span id="resultado">GANASTE JUGADOR</span>'); */
            clearInterval(tres_segundos);
        }
        boton_pedir_carta.removeEventListener("click", pedir_carta);
        boton_parar.removeEventListener("click", parar_pedir_cartas);
    }

};

const parar_pedir_cartas = () => {
    boton_parar.setAttribute("disabled","");
    console.log("PARAR");
    turno = 1;
    boton_pedir_carta.removeEventListener("click", pedir_carta);
    suma2 = suma;
    suma = 0;
    x = 0;
    tres_segundos = setInterval(esperar_pedir_carta,2500);
};

boton_comenzar_juego.addEventListener("click", () => {
    ARREGLO = [...ARREGLO_ORIGINAL];
    BARAJA = [...BARAJA_ORIGINAL];
    for (let i = 0; i < ARREGLO.length; i++) {
        BARAJA[i] = [...BARAJA_ORIGINAL[i]];
    }
    console.log(ARREGLO, BARAJA);
    borrar_img();
    suma = 0;
    desicion = 0;
    turno = 0;
    cont = 0;
    x = 0;
    span.remove();
    puntuacion1.textContent = 0;
    puntuacion2.textContent = 0;
    boton_parar.removeAttribute("disabled");
    boton_parar.addEventListener("click", parar_pedir_cartas);
    boton_pedir_carta.addEventListener("click", pedir_carta);
    console.log("YA SALÍ");
});

