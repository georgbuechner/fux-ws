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

function full(card) {
  var cards = document.querySelectorAll('.card');

  if (card.classList.contains('full')) {
    // Reset card
    card.classList.remove('full'); 
    card.style.transform = '';

    if (card.id !== '') {
      card.classList.add('card-hidden');
    }

    // Reform all other cards:
    cards.forEach(c => {
      if (c !== card) {
        c.classList.remove("shatter");
        c.classList.add("reform");

        setTimeout(() => c.classList.remove('reform'), 600); 
      }
    });
  } else {
    const targetId = card.dataset.target;
    if (targetId !== undefined) {
      card = document.getElementById(targetId); 
      card.classList.remove('card-hidden');
    }

    // Expand card 
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;

    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    const offsetX = viewportCenterX - cardCenterX;
    const offsetY = viewportCenterY - cardCenterY;

    card.classList.add("full");
    card.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.5)`;
    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 500); 

    // Shatter others 
    cards.forEach(c => {
      if (c !== card) {

        const dx = (Math.random() - 0.5) * 1000;
        const dy = (Math.random() - 0.5) * 1000;
        c.style.setProperty('--x', `$(dx)px`);
        c.style.setProperty('--y', `$(dy)px`);

        c.classList.remove("reform");
        c.classList.add("shatter");
      }
    });
  }
}
