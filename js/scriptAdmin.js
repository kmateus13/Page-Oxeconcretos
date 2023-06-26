



function entrar() {
    const email = document.querySelector("#email")
    const senha = document.querySelector('#senha')

    firebase.auth().signInWithEmailAndPassword(email.value, senha.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log('conectado')
            window.location.replace('painel.html')
        })
        .catch((error) => {
            console.log('erro2')
        });
}



