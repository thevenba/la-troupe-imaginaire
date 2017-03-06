/*
 * La foncion qui ouvre le dropdown lié à un bouton
 * @param buttonDropdown le bouton lié
 */
function openDropdown(buttonDropdown) {
    var dropdown = buttonDropdown.nextElementSibling;
    if (dropdown.className.indexOf("w3-show") == -1) {
        dropdown.className += " w3-show";
    } else { 
        dropdown.className = dropdown.className.replace(" w3-show", "");
    }
}

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var slide = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("indicator");
  if (n > slide.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slide.length}
  for (i = 0; i < slide.length; i++) {
     slide[i].style.display = "none";
     slide[i].firstElementChild.style.dislay = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
  }
  slide[slideIndex-1].style.display = "block";
  slide[slideIndex-1].firstElementChild.style.dislay = "block";
  dots[slideIndex-1].className += " w3-opacity-off";
}
