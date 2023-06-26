window.onload = () => {
    inserir()
    
    const places = document.querySelectorAll('.place')
    places.forEach((places) => {
        places.style.display = 'none'
    })
    
    
}

function inserir() {

    const insercoes = document.querySelector('.container2')

    firebase.database().ref().child('Plantinhas').get().then((snapshot) => {
        if (snapshot.exists()) {

            const snapshotVal = snapshot.val();
            const indici = Object.keys(snapshotVal);

            for (let i = 0; i < indici.length; i++) {
                const key = indici[i];
                const dados = snapshotVal[key];

                firebase.storage().ref(`imagens/${dados.imagem}`).getDownloadURL().then((url) => {
                    var imgs = url


                    insercoes.innerHTML += `
                    
                        <div class="col-3 card">
                            <div class="card">
                                <div class="row g-0">
                                    <div class="col-3 col-md-5 divImg">
                                        <img src="${imgs}"
                                        class="card-img img-fluid rounded=start" alt="..." />
                                    </div>
                                    <div class="col-6 col-md-7">
                                        <div class="container">
                                            <h2>${dados.titulo}</h2>
                                            <span>${dados.descricao}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    `
                })
            }

        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });

}





