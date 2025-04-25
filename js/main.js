const delay = ms => new Promise(res => setTimeout(res, ms));


window.onload = async function() {
  var childDivs = document.getElementById('container').getElementsByTagName('div');

  for( i=0; i< childDivs.length; i++ ) {
    childDivs[i].classList.toggle("move");
    delay(500);
  }
}
