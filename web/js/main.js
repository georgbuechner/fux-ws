const delay = ms => new Promise(res => setTimeout(res, ms));


window.addEventListener('load', async function() {
  // document.getElementById("mina-yt").currentTime = 268;
  Move();
});

async function Move() {
  var childDivs = document.getElementById('container').getElementsByTagName('div');

  let last = 1;
  while(true) {
    let ran = Math.floor(Math.random() * childDivs.length); 
    childDivs[ran].classList.add("move");
    await delay(500);
    childDivs[last].classList.remove("move");
    last = ran;
  }
}

function full(elem) {
  var childDivs = document.getElementById('container').getElementsByTagName('div');
  for ( i=0; i< childDivs.length; i++ ) {
    if (!elem.classList.contains("full")) {
      let ran = Math.floor(Math.random() * childDivs.length); 
      childDivs[ran].classList.add("shrink");
      ran = Math.floor(Math.random() * childDivs.length); 
      childDivs[ran].classList.add("shrink");
    } else {
      childDivs[i].classList.remove("shrink");
    }
  }
  elem.classList.remove("shrink");
  elem.classList.toggle("full");
}
