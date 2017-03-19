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

/*
 * La fonction qui ajoute la fonction loadPage à l'evenement click sur tous les liens ajaxLink
 */
function addLoadPage() {
// On ajoute la fonction loadPage à l'evenement click sur tous les liens ajaxLink
    var ajaxLinks = document.getElementsByClassName("ajaxLink");
    for (var indexAjaxLinks = 0; indexAjaxLinks < ajaxLinks.length; indexAjaxLinks++) {
        ajaxLinks[indexAjaxLinks].onclick = function () {
            document.getElementById("loader").style.height = "100vh";
            document.getElementById("content").style.filter = "brightness(0)";
            loadPage(this.getAttribute("data-target"));
        }
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
                document.body.scrollTop = 0;
                var content = document.getElementById("content");
                content.innerHTML = this.responseText;
                document.getElementById("loader").style.height = "0";
                content.style.filter = "brightness(100%)";
                addLoadPage();
                toggleSlideShow();
                forceCloseNav();
            } else if (this.readyState = 4 && this.status == 404) {
                var content = document.getElementById("content");
                content.innerHTML = '<div style="padding: 128px; width: 50%; margin: auto; text-align: enter">Il semble que la page demandée n\'existe pas, contactez l\'administrateur du site si le problème persiste.</div>';
                content.style.filter = "brightness(100%)";
                document.getElementById("loader").style.height = "0";
                addLoadPage();
                forceCloseNav();
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

/***** BEGIN: THEATRES *****/
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*
 * La fonction qui permet de scroll animé jusqu'à une destination
 * @param Y la destination
 */
function scrollTo(Y) {
    var theatresLi = document.getElementsByClassName("theatre-li");
    for (var indexTheatresLi = 0; indexTheatresLi < theatresLi.length; indexTheatresLi++) {
        theatresLi[indexTheatresLi].style.opacity = "0";
    }

    var start = Date.now(),
            elem = document.documentElement.scrollTop ? document.documentElement : document.body,
            from = elem.scrollTop;

    if (from === Y) {
        for (var indexTheatresLi = 0; indexTheatresLi < theatresLi.length; indexTheatresLi++) {
            theatresLi[indexTheatresLi].style.opacity = "1";
        }
        return;
    }

    function min(a, b) {
        return a < b ? a : b;
    }

    function scroll(timestamp) {

        var currentTime = Date.now(),
                time = min(1, ((currentTime - start) / 800)),
                easedT = easeInOutCubic(time);

        elem.scrollTop = (easedT * (Y - from)) + from;

        if (time < 1)
            requestAnimationFrame(scroll);
        else {
            for (var indexTheatresLi = 0; indexTheatresLi < theatresLi.length; indexTheatresLi++) {
                theatresLi[indexTheatresLi].style.opacity = "1";
            }
            return;
        }
    }

    requestAnimationFrame(scroll)
}

function easeInOutCubic(t) {
    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}
/**** END: THEATRES *****/

// Au scroll de la fenetre...
window.onscroll = function () {
    // le menu de navigation
    var nav = document.getElementById("nav").firstElementChild;
    // Si le scroll est au dela de 100...
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        nav.className = "bar black";
    } else {
        nav.className = "bar";
    }

    var theatre = document.getElementById("theatre");
    if (theatre) {
        var screen = theatre.offsetTop;
        var synopsis = document.getElementsByClassName("synopsis")[0];
        var characters = document.getElementsByClassName("characters")[0];
        var bigQuote = document.getElementsByClassName("bigQuote")[0];
        var top = document.getElementsByClassName("top")[0];
        var middle = document.getElementsByClassName("middle")[0];
        var bottom = document.getElementsByClassName("bottom")[0];
        var theatreFooter = document.getElementsByClassName("theatre-footer")[0];
        if (document.body.scrollTop > synopsis.offsetTop - screen || document.documentElement.scrollTop > synopsis.offsetTop - screen) {
            synopsis.className = "synopsis row-padding animate-bottom";
        }
        if (document.body.scrollTop > characters.offsetTop - screen || document.documentElement.scrollTop > characters.offsetTop - screen) {
            characters.className = "characters animate-bottom";
        }
        if (document.body.scrollTop > bigQuote.offsetTop - screen || document.documentElement.scrollTop > bigQuote.offsetTop - screen) {
            bigQuote.className = "bigQuote animate-bottom";
        }
        if (document.body.scrollTop > top.offsetTop - screen || document.documentElement.scrollTop > top.offsetTop - screen) {
            top.className = "top animate-bottom";
        }
        if (document.body.scrollTop > middle.offsetTop - screen || document.documentElement.scrollTop > middle.offsetTop - screen) {
            middle.className = "middle animate-bottom";
        }
        if (document.body.scrollTop > bottom.offsetTop - screen || document.documentElement.scrollTop > bottom.offsetTop - screen) {
            bottom.className = "bottom animate-bottom";
        }
        if (document.body.scrollTop > theatreFooter.offsetTop - screen || document.documentElement.scrollTop > theatreFooter.offsetTop - screen) {
            theatreFooter.className = "theatre-footer animate-bottom";
        }
    }

    var about = document.getElementById("about");
    if (about) {
        var aboutContents = document.getElementsByClassName("about-content");
        for (var indexAboutContents = 0; indexAboutContents < aboutContents.length; indexAboutContents++) {
            var els = aboutContents[indexAboutContents].children;
            for (var indexEls = 0; indexEls < els.length; indexEls++) {
                if (document.body.scrollTop > els[indexEls].offsetTop - aboutContents[indexAboutContents].offsetTop / 2 || document.documentElement.scrollTop > aboutContents[indexAboutContents].offsetTop / 2) {
                    if (!els[indexEls].className.match(/animate-bottom/)) {
                        els[indexEls].className += " animate-bottom";
                    }
                }
            }
        }
    }
};
/***** END: SCROLL FUNCTIONS *****/

/***** BEGIN: NAVBAR FUNCTION *****/
/*
 * La fonction qui ouvre la bare de navigation
 */
function openNav() {
    var mobileBar = document.getElementById("mobileBar");
    if (mobileBar.className.indexOf("show") == -1) {
        mobileBar.className += " show";
    } else {
        mobileBar.className = mobileBar.className.replace(" show", "");
    }
}

function forceCloseNav() {
    var mobileBar = document.getElementById("mobileBar");
    mobileBar.className = mobileBar.className.replace(" show", "");
}

/*
 * La foncion qui ouvre le dropdown lié à un bouton
 * @param buttonDropdown le bouton lié
 */
function openDropdown(buttonDropdown) {
    var dropdown = buttonDropdown.nextElementSibling;
    if (dropdown.className.indexOf("show") == -1) {
        dropdown.className += " show";
    } else {
        dropdown.className = dropdown.className.replace(" show", "");
    }
}
/***** END: NAVBAR FUNCTION *****/

/***** BEGIN: SLIDESHOW FUNCTIONS *****/
var slideIndex = 1;
function toggleSlideShow() {
    if (document.getElementById("slideshow")) {
        showDivs(slideIndex);
    } else {
        return;
    }
}

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
    if (dots.length !== 0) {
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" opacity-off", "");
        }
        dots[slideIndex - 1].className += " opacity-off";
    }
    slide[slideIndex - 1].style.display = "block";
    slide[slideIndex - 1].firstElementChild.style.dislay = "block";
}
/***** END: SLIDESHOW FUNCTIONS *****/

/**** BEGIN: TAB FUNCTIONS ****/
/*
 * La fonction qui affiche un contenu tabbé
 * @param tablink le bouton qui appel la fonction
 * @param aboutContent le contenu tabbé à afficher
 */
function openTabbed(tablink, aboutContent) {
    var aboutContents = document.getElementsByClassName("about-content");
    for (var indexAboutContent = 0; indexAboutContent < aboutContents.length; indexAboutContent++) {
        aboutContents[indexAboutContent].style.display = "none";
    }
    var tablinks = document.getElementsByClassName("tablink");
    for (var indexTablinks = 0; indexTablinks < tablinks.length; indexTablinks++) {
        tablinks[indexTablinks].className = tablinks[indexTablinks].className.replace(" active", "");
    }
    document.getElementById(aboutContent).style.display = "block";
    tablink.firstElementChild.className += " active";
    scrollTo(document.getElementsByClassName("tablinks")[0].offsetTop - 100);
}
/**** END: TAB FUNCTIONS *****/
/*
 * La fonction qui affiche le label d'un input
 * @param input l'input
 */
function displayLabel(input) {
    var labels = document.getElementsByClassName("label");
    for (var indexLabels = 0; indexLabels < labels.length; indexLabels++) {
        labels[indexLabels].className = labels[indexLabels].className.replace("visible", "");
    }
    var label = input.previousElementSibling;
    if (label.className != "label visible") {
        input.previousElementSibling.className += " visible";
    }

    window.onclick = function (event) {
        if (event.target != input) {
            label.className = label.className.replace(" visible", "");
        }
    }
}