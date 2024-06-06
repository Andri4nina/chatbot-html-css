know = {
    "salut":"Bonjour en quoi puis-je vous aidez",
    "comment effectuer une recherche dans le catalogue en ligne" : "Utilisez la barre de recherche en haut de la page d'accueil du catalogue. Saisissez le titre, l'auteur, le sujet ou tout autre mot-clé pertinent.",
    "comment savoir si un livre est disponible" : "Lorsque vous consultez la fiche d'un livre dans le catalogue, cela indique s'il est \"disponible\" ou s'il est \"emprunté\". Vous pourrez également voir dans quelles bibliothèques il est disponible.",
    "comment réserver un livre qui est actuellement emprunté" : "Si le livre que vous souhaitez emprunter est déjà emprunté, vous pouvez le réserver en cliquant sur le bouton \"Réserver\". Une fois que le livre sera de nouveau disponible, la bibliothèque vous le mettra de côté.",
    "comment affiner ma recherche en utilisant des filtres" : "Utilisez les filtres proposés sur la page pour affiner vos résultats par titre, catégorie, auteur, date de publication, etc.",
    "comment obtenir des détails sur un livre" : "En cliquant sur le titre du livre dans les résultats de recherche, vous accéderez à sa fiche complète. Celle-ci devrait inclure des détails comme le résumé, la table des matières, la couverture, et parfois des avis d'autres lecteurs.",
    "comment accéder à une ressource numérique d'un document" : "Vous pouvez voir dans la fiche d'un document si une ressource numérique lui est associée, il vous suffit de cliquer sur le lien affiché.",
    "comment enregistrer des livres pour les consulter ultérieurement" : "Connectez-vous à votre compte lecteur, si ce n’est pas déjà fait. Vous devriez avoir un panier à votre disposition où vous pouvez ajouter les livres que vous souhaitez.",
    "comment savoir dans quelle bibliothèque un livre est disponible physiquement" : "Sur la fiche d'un livre, vous devriez voir les bibliothèques où le livre est disponible.",
    "comment avoir un compte lecteur" : "Pour bénéficier d’un compte lecteur, vous devez vous inscrire personnellement auprès de la médiathèque.",
    "comment vérifier les horaires de fonctionnement de la médiathèque" : "Vous pouvez consulter le site web de l'établissement pour voir des informations supplémentaires comme les heures et les jours ouvrables. Les horaires peuvent varier en fonction des jours de la semaine et des événements spéciaux."

};

function scrollToBottom() {
    const chatLog = document.getElementById("chatLog");
    chatLog.scrollTop = chatLog.scrollHeight;
}

let selectedQuestions = []; // Variable pour stocker les questions déjà sélectionnées

// Fonction pour obtenir trois questions aléatoires en excluant les questions déjà sélectionnées
function getRandomQuestions() {
    const keys = Object.keys(know).filter(key => key !== "salut" && !selectedQuestions.includes(key));
    const randomKeys = [];

    while (randomKeys.length < 10 && keys.length > 0) {
        const randomIndex = Math.floor(Math.random() * keys.length);
        randomKeys.push(keys[randomIndex]);
        keys.splice(randomIndex, 1);
    }

    return randomKeys;
}

// Fonction pour afficher les questions aléatoires dans la section de proposition
function displayRandomQuestions() {
    const propositionContainer = document.createElement("div");
  

    const randomQuestionKeys = getRandomQuestions(); // Obtenez les clés des questions aléatoires

    const chatLog = document.getElementById("chatLog"); // Obtenez la référence à l'élément chatLog

    randomQuestionKeys.forEach(questionKey => {
        const questionElement = document.createElement("p");
        questionElement.classList.add("chat-prop");
        questionElement.textContent = questionKey;
        questionElement.addEventListener("click", function () {
            document.getElementById("msg").value = questionKey;
            selectedQuestions.push(questionKey); // Stocker la question sélectionnée
            propositionContainer.innerHTML = ""; // Vider le contenu de la section de proposition
            talk(); // Appeler la fonction talk() après avoir modifié l'entrée
        });

        const chatElement = document.createElement("div"); // Créez un élément de chat distinct
        chatElement.className = "Proposition";
        chatElement.id = "propositionSection";
        chatElement.appendChild(questionElement);
        propositionContainer.appendChild(chatElement); // Ajouter l'élément de chat à la section de proposition
    });

    chatLog.appendChild(propositionContainer); // Ajouter la section de proposition à la fin de chatLog

    if (randomQuestionKeys.length === 0) {
        selectedQuestions = []; // Réinitialiser les questions sélectionnées
    }
}



// Fonction pour afficher les messages du bot et de l'utilisateur
function talk() {
    var text1 = "Je ne comprends pas.";
    var user = document.getElementById("msg").value;
    var t = user.toLowerCase();
    t = t.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    document.getElementById("msg").value = "";
    document.getElementById("msg").focus();

    const chatLog = document.getElementById("chatLog"); // Référence à l'élément chatLog

    // Créer un nouvel élément pour le message de l'utilisateur
    const userMessage = document.createElement("div");
    userMessage.className = "chat self";
    userMessage.innerHTML = '<div class="user-photo"><img src="images/github.png"></div>' +
                            '<p class="chat-msg" id="self">' + user + '</p>';
    chatLog.appendChild(userMessage);

    if (t in know) {
        setTimeout(function () {
            // Créer un nouvel élément pour la réponse du bot
            const botResponse = document.createElement("div");
            botResponse.className = "chat bot";
            botResponse.innerHTML = '<div class="user-photo"><img src="images/default.png"></div>' +
                                    '<p class="chat-msg" id="chat-bot">' + know[t] + '</p>';
            chatLog.appendChild(botResponse);

            setTimeout(function () {
                // Créer un nouvel élément pour le message de suivi
                const followUpMessage = document.createElement("div");
                followUpMessage.className = "chat bot";
                followUpMessage.innerHTML = '<div class="user-photo"><img src="images/default.png"></div>' +
                                            '<p class="chat-msg" id="chat-bot">Vous voulez autre chose ?</p>';
                chatLog.appendChild(followUpMessage);

                // Afficher les propositions de questions aléatoires
                displayRandomQuestions();
            }, 500);
        }, 500);
    } else {
        setTimeout(function () {
            // Créer un nouvel élément pour la réponse du bot en cas de non-correspondance
            const botResponse = document.createElement("div");
            botResponse.className = "chat bot";
            botResponse.innerHTML = '<div class="user-photo"><img src="images/default.png"></div>' +
                                    '<p class="chat-msg" id="chat-bot">' + text1 + '</p>';
            chatLog.appendChild(botResponse);

            setTimeout(function () {
                // Créer un nouvel élément pour le message de suivi
                const followUpMessage = document.createElement("div");
                followUpMessage.className = "chat bot";
                followUpMessage.innerHTML = '<div class="user-photo"><img src="images/default.png"></div>' +
                                            '<p class="chat-msg" id="chat-bot">Vous voulez autre chose ?</p>';
                chatLog.appendChild(followUpMessage);
         
                // Afficher les propositions de questions aléatoires
                displayRandomQuestions();

             
            }, 500);
        }, 500);
    }
}


// Appeler la fonction pour afficher les questions aléatoires au chargement de la page
window.onload = function () {
    displayRandomQuestions();
};
