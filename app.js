const imgs = document.querySelectorAll(".pecinha");
let lista_save = [0,0,0,0,0,0,0,0,0,0,0,0];
let lista_virada = [0,0,0,0,0,0,0,0,0,0,0,0];
let lista_sorteados = [];
let contador = 0;
let nome = "";


function virar() {

    imgs.forEach(function(img) {
        img.addEventListener("click", imgPressed);
    });
        
    function imgPressed(e) {
        let img = e.target;
        let img_source = img.getAttribute("src");
        let y = img_source.split("_");
        for (let i = 1; i <= 12; i++) {
            if (y[1] == `${i}.png`){
                img.src = y[0] + `_${i}V.png`;
                lista_virada[i - 1] = 1;
                break; 
                
            } 
            if (y[1] == `${i}V.png` && lista_save[i - 1] == 0) {
                img.src = y[0] + `_${i}.png`;
                lista_virada[i - 1] = 0;
                break; 
            }
        
        }
    }
}

function dadosRandom () {
    return Math.floor(Math.random()*12)+1;
}

function somDado () {
    let som = new Audio("img/dice_roll_2.mp3")
    som.play()
}

function girarDados() {

    if (document.getElementById("botao_gif").hidden == true) {
        document.getElementById("botao_gif").hidden = false;
        document.getElementById("numero_sorteado").hidden = true;
        somDado()
        setTimeout(() => {
            document.getElementById("botao_gif").hidden = true;
            document.getElementById("numero_sorteado").hidden = false;
            let num_sorteado = dadosRandom();
            document.getElementById("numero_sorteado").innerHTML = `<h2>O numero sorteado foi ${num_sorteado}</h2>`;
            document.getElementById("lista_sorteio").hidden = false;
            listadesorteio(num_sorteado);
               
        }, 1300);
        
    }
    contador ++;
    
    setTimeout(() => {
            derrota()
    }, 2000);
      
}


function listadesorteio(x) { 
    lista_sorteados.push(x);
    document.getElementById("lista_sorteio").innerHTML = `<h2>${lista_sorteados}`;
}

function iniciar() {
    document.getElementById("tela_inicial").hidden = true;
}

function reiniciar() {

    lista_sorteados = [];
    lista_save = [0,0,0,0,0,0,0,0,0,0,0,0];
    lista_virada = [0,0,0,0,0,0,0,0,0,0,0,0];
    contador = 0;
    document.getElementById("lista_sorteio").hidden = true;
    document.getElementById("numero_sorteado").hidden = true;
    for (i = 1; i <= 12; i++) {
        let image = document.getElementById(`peca_${i}`);
        let origem = image.getAttribute("src");
        if (origem == `img/Peça_${i}V.png`){
            let img_original = `img/Peça_${i}.png`;
            image.src = img_original;
    
        }   
    }   
}




function salvar() {
    
    let soma = 0;
    for (let x = 0; x<= 11; x++) {
        if (lista_virada[x] == 1){
            soma = soma + x + 1;
            lista_virada[x] = 2;  
        }   
    }

    if (soma == lista_sorteados[contador - 1]){
        for (let i = 0; i <= 11; i++) {
            if (lista_virada[i] >= 1){
                    lista_save[i] = i + 1;   
                }
            }

    } else {
        window.alert("Essa jogada não é possível")
    }

}   
    

function derrota(){
    let resultado = 0;
    let jogavel = 0;
    for (let x = 1; x <=12; x++){
        if (lista_save[x - 1] == 0){
            if (x == lista_sorteados[contador - 1]) {
                jogavel++;
                break;
            } else {
                for (let y = 1; y <= 12; y++){
                    if (lista_save[y - 1] == 0 && y != x) {
                        if (x + y == lista_sorteados[contador - 1]){
                            jogavel++;
                            break;
                        }
                    }
                }
            }  
        }  
    }
    if (jogavel == 0) {
        for (let i = 1; i <=12; i++) {
            if (lista_save[i - 1] == 0){
                resultado += i;
            }
        }
        window.alert("Você perdeu!");
        nome = prompt(`Qual nome você quer salvar e teu resultado foi ${resultado}`);

        let table = document.getElementById("tabela_pontuacao");
        let row = table.insertRow(-1);

        let r1 = row.insertCell(0);
        let r2 = row.insertCell(1);
        let r3 = row.insertCell(2);

        r1.innerText = nome;
        r2.innerText = resultado;
        r3.innerText = contador;

    }
}






/* 
    x Detalhar as regras num painel lateral
    x Salvar Jogada
    x Calcular Pontuação
    x Verificar se a jogada é correta na função salvar
    x Trocar a posição dos botões para a lateral do botão de dados
    x Condição de derrota
    x Nome do Jogador
    x Histórico de Pontuação
    

*/
