/***** BEGIN: NAVIGATATION FUNCTION *****/
// URL n a pas de parametre
var pop = false;

window.onpopstate = function () {
    hasParamURL();
}

/*
 * La fonction vérifie si l'URL à un parametre valide
 */
function hasParamURL() {
    // Le parametre valide contenu dans l URL
    var queryURL = location.search.match(/page=([a-z]*)/);
    if (queryURL) {
        pop = true;
        document.getElementById("loader").style.height = "100vh";
        document.getElementById("content").style.filter = "brightness(0)";
        loadPage(queryURL[1]);
    } else {
        loadPage("home");
    }
}

hasParamURL();

// On ajoute la fonction loadPage à l'evenement click sur tous les liens ajaxLink
var ajaxLinks = document.getElementsByClassName("ajaxLink");
for (var indexAjaxLinks = 0; indexAjaxLinks < ajaxLinks.length; indexAjaxLinks++) {
    ajaxLinks[indexAjaxLinks].onclick = function () {
        document.getElementById("loader").style.height = "100vh";
        document.getElementById("content").style.filter = "brightness(0)";
        loadPage(this.getAttribute("data-target"));
    }
}

/*
 * La fonction qui charge une page
 * @param id l'id de la page à chargé
 */
function loadPage(id) {
    setTimeout(openHTML, 800);
    function openHTML() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var content = document.getElementById("content");
                content.innerHTML = this.responseText;
                document.getElementById("loader").style.height = "0";
                content.style.filter = "brightness(100%)";
            } else if (this.readyState = 4 && this.status == 404) {
                var content = document.getElementById("content");
                content.innerHTML = "Il semble que la page demandée n\'existe pas, contactez l'administrateur du site si le problème persiste.";
                content.style.filter = "brightness(100%)";
                document.getElementById("loader").style.height = "0";
            }
        };
        xhttp.open("GET", "./" + id + ".html", true);
        xhttp.send();
        if (!pop) {
            history.pushState(null, null, "?page=" + id);
        }
        pop = false;
    }
}
/***** END: NAVIGATATION FUNCTION *****/

/***** BEGIN: SCROLL FUNCTIONS *****/
// Au scroll de la fenetre...
window.onscroll = function () {
    // le menu de navigation
    var nav = document.getElementById("nav").firstElementChild;
    // Si le scroll est au dela de 100...
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        nav.className = "w3-bar black";
    } else {
        nav.className = "w3-bar";
    }

    var synopsis = document.getElementsByClassName("synopsis")[0];
    if (synopsis) {
        // Si le scroll est au dela de 700...
        if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
            synopsis.className = "synopsis animate-opacity";
        }
    }
};
/***** END: SCROLL FUNCTIONS *****/

/***** BEGIN: NAVBAR FUNCTION *****/
/*
 * La fonction qui ouvre la bare de navigation
 */
function openNav() {
    var x = document.getElementById("demo");
    console.log(x);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

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
/***** END: NAVBAR FUNCTION *****/

/***** BEGIN: SLIDESHOW FUNCTIONS *****/
var slideIndex = 1;
showDivs(slideIndex);

/*
 * La fonction qui avance le slideshow de n slide
 * @param n le nombre de slides avancé
 */
function plusDivs(n) {
    showDivs(slideIndex += n);
}

/*
 * La fonction qui avance le slideshow à un indice n
 * @param {type} n l'indice
 */
function currentDiv(n) {
    showDivs(slideIndex = n);
}

/*
 * La fonction qui affiche un slide
 * @param n le slide a afficher
 */
function showDivs(n) {
    var i;
    var slide = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("indicator");
    if (n > slide.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slide.length;
    }
    for (i = 0; i < slide.length; i++) {
        slide[i].style.display = "none";
        slide[i].firstElementChild.style.dislay = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    slide[slideIndex - 1].style.display = "block";
    slide[slideIndex - 1].firstElementChild.style.dislay = "block";
    dots[slideIndex - 1].className += " w3-opacity-off";
}
/***** END: SLIDESHOW FUNCTIONS *****/
