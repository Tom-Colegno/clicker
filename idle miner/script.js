// Initialisation des variables
let gold = 150;
let minerCost = 100;
let miners = 200;
let goldMultiplierBase = 1.5; // Multiplicateur de gold de base
let goldMultiplierIncrement = 1.5; // Incrément du multiplicateur à chaque amélioration

// Fonction pour extraire de l'or manuellement
function clickGold() {
    gold += goldMultiplierBase; // Ajouter le gain de base d'or par clic
    updateUI();
}

// Fonction pour améliorer le mineur
function upMiner() {
    if (gold >= minerCost) {
        gold -= minerCost;
        miners++;
        minerCost = Math.ceil(minerCost * 1.5); // Augmentation exponentielle du coût de l'amélioration
        // Ajuster le gain d'or du mineur en fonction de l'amélioration
        goldMultiplierBase *= 2; // Augmenter le multiplicateur de gold de base
        updateUI();
    } else {
        alert("Vous n'avez pas assez d'or pour acheter un mineur.");
    }
    lvlupSound.play();
}



// Initialisation des variables pour le café
let cafeCost = 200; // Coût initial du café
let goldPerCafe = 150; // Gain initial d'or par café donné

// Fonction pour donner un café au mineur
function upCafe() {
    if (gold >= cafeCost) {
        gold -= cafeCost;
        goldMultiplierBase *= 1.5; // Augmenter le multiplicateur de gold de base
        cafeCost = Math.ceil(cafeCost * 1.2); // Augmentation exponentielle du coût du café
        goldPerCafe = Math.ceil(goldPerCafe * 1.5); // Augmentation exponentielle du gain d'or par café
        updateUI();
    } else {
        alert("Vous n'avez pas assez d'or pour donner un café au mineur.");
    }
    cafeSound.play(); // Jouer le son du café
}


// Fonction de mise à jour de l'interface utilisateur
function updateUI() {
    document.getElementById("gold").textContent = gold;
    document.getElementById("minerCost").textContent = minerCost;
    updateMiners();
}

// Fonction pour mettre à jour le nombre de mineurs visibles
function updateMiners() {
    document.getElementById("miner").innerHTML = "";
    if (miners > 0) {
        let img = document.createElement("img");
        img.src = "images/miner.svg";
        img.style.position = "absolute";
        img.style.top = Math.random() * 100 + "px";
        img.style.left = Math.random() * 100 + "px";
        document.getElementById("miner").appendChild(img);
    }
}

// Fonction pour générer de l'or automatiquement grâce aux mineurs
function autoMine() {
    gold += miners;
    updateUI();
}

// Mise à jour automatique de l'or toutes les secondes
setInterval(autoMine, 1000);

// Sauvegarde de l'état du jeu dans le localStorage
function saveGame() {
    localStorage.setItem("gold", gold);
    localStorage.setItem("minerCost", minerCost);
    localStorage.setItem("miners", miners);
}

// Chargement de l'état du jeu depuis le localStorage
function loadGame() {
    gold = parseInt(localStorage.getItem("gold")) || gold;
    minerCost = parseInt(localStorage.getItem("minerCost")) || minerCost;
    miners = parseInt(localStorage.getItem("miners")) || miners;
    cafe = parseInt(localStorage.getItem("cafe")) || miners;
    updateUI();
}

// Chargement du jeu au chargement de la page
window.onload = loadGame;

// Sauvegarde du jeu toutes les 1 seconde
setInterval(saveGame, 1000);



// Fonction pour réinitialiser le jeu
function resetGame() {
    // Réinitialiser les variables du jeu
    gold = 0;
    minerCost = 10;
    miners = 0;
    goldMultiplierBase = 2;
    
    // Réinitialiser l'interface utilisateur
    updateUI();
    
    // Effacer les données sauvegardées dans le localStorage
    localStorage.clear();
}





// SONS

let isBackgroundMusicEnabled = true;

// Fonction pour activer ou désactiver la musique de fond
function toggleBackgroundMusic() {
    if (isBackgroundMusicEnabled) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
    isBackgroundMusicEnabled = !isBackgroundMusicEnabled;
}


// Création de l'élément audio pour la musique de fond
const backgroundMusic = new Audio('sons/background.mp3');
backgroundMusic.loop = true; // Lecture en boucle

// Fonction pour démarrer la musique de fond
function startBackgroundMusic() {
    backgroundMusic.play();
}

// Fonction pour arrêter la musique de fond
function stopBackgroundMusic() {
    backgroundMusic.pause();
}

// Démarrer la musique lorsque le DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', startBackgroundMusic);

// Arrêter la musique lorsque la page est quittée
window.addEventListener('unload', stopBackgroundMusic);

// Création des éléments audio
const clickSound = new Audio('click.mp3'); // Son pour le clic d'extraction d'or
clickSound.volume = 0.3; // Réglage du volume à 30%
const lvlupSound = new Audio('sons/lvlup.mp3'); // Son pour l'achat d'un niveau
clickSound.volume = 0.3; // Réglage du volume à 30%
const cafeSound = new Audio('sons/cafe.mp3'); // Son pour donner un café au mineur
clickSound.volume = 0.3; // Réglage du volume à 30%
const redbullSound = new Audio('sons/canette.mp3') //Son pour donner une redbull
clickSound.volume = 0.3; // Réglage du volume à 30%
const powerSound = new Audio('sons/canette.mp3') //Son pour donner une redbull
clickSound.volume = 0.3; // Réglage du volume à 30%


///PLEIN ECRAN
// Sélectionnez le bouton pour activer le mode plein écran
const fullscreenButton = document.getElementById('fullscreen-button');

// Écoutez l'événement click sur le bouton
fullscreenButton.addEventListener('click', toggleFullscreen);

// Fonction pour activer ou désactiver le mode plein écran
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    // Si le mode plein écran n'est pas activé, demandez-le
    document.documentElement.requestFullscreen();
  } else {
    // Si le mode plein écran est déjà activé, quittez-le
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

// Écoutez les événements de changement d'état du plein écran
document.addEventListener('fullscreenchange', updateFullscreenButton);

// Mettez à jour l'apparence du bouton en fonction de l'état du plein écran
function updateFullscreenButton() {
  if (document.fullscreenElement) {
    // Si le mode plein écran est activé, affichez un bouton pour quitter le plein écran
    fullscreenButton.textContent = 'Exit Fullscreen';
  } else {
    // Sinon, affichez un bouton pour activer le plein écran
    fullscreenButton.textContent = 'Fullscreen';
  }
}

