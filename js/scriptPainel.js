
// Carregar tabela e verificar se existe usuario logado
window.onload = () => {
    inserir()

    // Inicio Verificar se o usuario esta logado

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log('logado')

        } else {
            window.location.replace('admin.html')
        }
    })

}


// Modal
const modal = document.querySelector('#modal')
function abrirCard() {
    modal.showModal()
}

function fecharModal() {
    modal.close()
}

// Reload pagina
function reload() {
    location.reload()
}




//(Pegar o botao que esta com a class active)

// Define a string como uma variável global
let sessao = '';

// Espera a página carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza a string com base no botão ativo
    const botaoAtivo = document.querySelector('.nav-link.active');
    sessao = `${botaoAtivo}`;


    // Pega os botões
    const botoes = document.querySelectorAll('.nav-link');

    // Adiciona um event listener para cada botão
    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            // Remove a classe "active" de todos os botões
            botoes.forEach(botao => {
                botao.classList.remove('active');
            });

            // Adiciona a classe "active" ao botão clicado
            botao.classList.add('active');

            // Atualiza a string com base no botão ativo
            const botaoAtivo = document.querySelector('.nav-link.active').innerText;
            sessao = `${botaoAtivo}`;

        });
    });
});




// Pegar imagem carregada do input
var fileItem
var fileName

function getFile(e) {
    fileItem = e.target.files[0]
    fileName = fileItem.name
}


function carregamentoFormulario(){
    const carregamento = document.querySelector('.loading')
    const formulario = document.querySelector('.dialogContainer')

    formulario.style.display = 'none'
    carregamento.style.display = 'block'
    
    setTimeout(() => {
        fecharModal()
        reload()
    }, 3000)
}


// Enviar informarcos do modal para o BD
function enviar() {

    const inptTitulo = document.querySelector('#titulo')
    const inptDescricao = document.querySelector('#descricao')
    

    const dados = {
        titulo: inptTitulo.value,
        descricao: inptDescricao.value,
        imagem: fileName
    }

    let storageRef = firebase.storage().ref("imagens/" + fileName)
    storageRef.put(fileItem)
    firebase.database().ref(sessao).push(dados)

    carregamentoFormulario()

}


// Inserir tabela nas sessoes
function inserir() {
    const insercoes = document.querySelector('#Plantinhas')
    const insercoes2 = document.querySelector('#Modelos')
    const insercoes3 = document.querySelector('#Lembrancinhas')

    firebase.database().ref().child('Plantinhas').get().then((snapshot) => {
        if (snapshot.exists()) {

            const snapshotVal = snapshot.val();
            const indici = Object.keys(snapshotVal);

            for (let i = 0; i < indici.length; i++) {
                const key = indici[i];
                const dados = snapshotVal[key];


                insercoes.innerHTML += `
                    <ul class="list-group list-group-horizontal ${key}">
                        <li class="list-group-item"><input type="checkbox" name="" id="${key}"  onchange="infochecked(${i})"></li>
                        <li class="list-group-item">${dados.titulo}</li>
                        <li class="list-group-item"><button  id="btn${key}" onclick="remover(${i})" disabled><i class="bi bi-trash"></i></button></li>
                    </ul>`
            }

        }
    }).catch((error) => {
        console.error(error);
    });

    firebase.database().ref().child('Modelos').get().then((snapshot) => {
        if (snapshot.exists()) {

            const snapshotVal = snapshot.val();
            const indici = Object.keys(snapshotVal);

            for (let i = 0; i < indici.length; i++) {
                const key = indici[i];
                const dados = snapshotVal[key];



                insercoes2.innerHTML += `
                    <ul class="list-group list-group-horizontal-sm ${key}">
                    <li class="list-group-item"><input type="checkbox" name="" id="${key}"  onchange="infochecked(${i})"></li>
                    <li class="list-group-item">${dados.titulo}</li>
                    <li class="list-group-item"><button  id="btn${key}" onclick="remover(${i})" disabled><i class="bi bi-trash"></i></button></li>
                    </ul>`
            }

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

    firebase.database().ref().child('Lembrancinhas').get().then((snapshot) => {
        if (snapshot.exists()) {

            const snapshotVal = snapshot.val();
            const indici = Object.keys(snapshotVal);



            for (let i = 0; i < indici.length; i++) {
                const key = indici[i];
                const dados = snapshotVal[key];

                insercoes3.innerHTML += `
                    <ul class="list-group list-group-horizontal-sm ${key}">
                    <li class="list-group-item"><input type="checkbox" name="" id="${key}"  onchange="infochecked(${i})"></li>
                    <li class="list-group-item">${dados.titulo}</li>
                    <li class="list-group-item"><button  id="btn${key}" onclick="remover(${i})" disabled><i class="bi bi-trash"></i></button></li>
                    </ul>`
            }


        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });


}




// Remover linha da tabela e remover do BD

function remover(e) {

    firebase.database().ref().child(sessao).get().then((snapshot) => {
        if (snapshot.exists()) {

            const snapshotVal = snapshot.val();
            const indici = Object.keys(snapshotVal)
            const dados = indici[e];
            let div = document.querySelector(`.${indici[e]}`)

            div.remove()
            firebase.database().ref().child(sessao).child(`${indici[e]}`).remove()

            let storageRef = firebase.storage().ref()
            let desertRef = storageRef.child(`imagens/${snapshotVal[dados].imagem}`);
            desertRef.delete().then(() => {
                console.log('deu certo')
            }).catch((error) => {
                console.log('ERRO')
            });


        } else {
            console.log("No data available");
        }
    })


}


// Ativar botao de excluir de acordo com checkbox

function infochecked(e) {
    firebase.database().ref().child(sessao).get().then((snapshot) => {
        if (snapshot.exists()) {

            const snapshotVal = snapshot.val();
            const indici = Object.keys(snapshotVal)
            const dados = indici[e];



            let checkbox = document.querySelector(`#${dados}`)
            let button = document.querySelector(`#btn${dados}`)

            button.disabled = !checkbox.checked;


        } else {
            console.log("No data available");
        }
    })
}









