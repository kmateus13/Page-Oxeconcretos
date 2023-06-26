// window.onscroll = function () {
//   let top = window.pageYOffset || document.documentElement.scrollTop
//   let navbar = document.querySelector('#navbar')
//   if (top > 250) {
//     navbar.style.backgroundColor = 'rgba(248, 248, 246, 1)'
//   } else {
//     navbar.style.backgroundColor = 'transparent'
//   }
// }


const btnOpen = document.getElementById('open-nav')
const btnClose = document.getElementById('close-nav')
const menu = document.getElementById('navbar-mobile')

btnOpen.addEventListener('click', () => {
  menu.classList.add('menu-active')
})

btnClose.addEventListener('click', () => {
  menu.classList.remove('menu-active')
})

menu.addEventListener('click', () => {
  setTimeout(() => {
    if (menu.classList.contains('menu-active')) {
      menu.classList.remove('menu-active')
    }
  }, 100)
})


let string = "Seja Muito Bem Vindo!";
let array = string.split("");
let timer;

function frameLooper() {
  if (array.length > 0) {
    document.querySelector(".texto1").innerHTML += array.shift();
  } else {
    clearTimeout(timer);
  }
  loopTimer = setTimeout('frameLooper()', 80);

}
frameLooper();


let texto2 = "Tudo cresce com AMOR!"
let array2 = texto2.split("");
let timer2;

function frameLooper2() {
  if (array2.length > 0) {
    document.querySelector(".texto2").innerHTML += array2.shift();
  } else {
    clearTimeout(timer2);
  }
  loopTimer2 = setTimeout('frameLooper2()', 80);
}

setInterval(() => {
  frameLooper2()
}, 2000)


const target = document.querySelectorAll('[data-anime]')

function animeScroll(){
const windowTop = window.pageYOffset ;
let navbar = document.querySelector('#navbar')

if (windowTop > 250) {
  navbar.style.backgroundColor = 'rgba(248, 248, 246, 1)'
} else {
  navbar.style.backgroundColor = 'transparent'
}

target.forEach(function(e){
  if(windowTop > e.offsetTop + 412){
    e.classList.add('animate')
  } else {
    e.classList.remove('animate')
  }
})
}

window.addEventListener('scroll', function(){
  animeScroll()
})







