function generateVirtualPet() {
    var adjectives = ["charming", "playful", "shy", "fun-loving", "sweet", "charismatic", "crazy", "confident", "adorable", "cute"];
    var petTypes = ["dog", "cat", "bunny", "horse", "pig", "bird", "shark", "zebra", "fish"];
    var niceSayings = [", I love it!", "! Wow, that is pawwww-tastic!", "! Wow, you are so creative!", "! Sounds like an awesome choice!", ", that's magical!", ", that's perfect!", ", that is a terrific choice!"];

    var petName = prompt("Let's begin by choosing your pet's name. It can be anything! Shoot for the stars!");
    var randomNiceSaying = niceSayings[Math.floor(Math.random() * niceSayings.length)];
    var petResult = `${petName}${randomNiceSaying}`;

    document.getElementById('pet-result').innerText = petResult;

    var randomAdjective = generateRandomAdjective();
    var randomPetType = generateRandomPetType();

    alert(`You have been gifted ${petName}, a ${randomAdjective} ${randomPetType} who cannot wait to meet you!`);

    var userDecision = prompt("Do you wish to continue with your virtual pet? Type 'YES' to continue, or 'NO' to quit.");

    if (userDecision.toUpperCase() === "YES") {
        var randomMonth = generateRandomMonth();
        var randomDay = generateRandomDay(randomMonth);
        var petBirthday = `${randomMonth} ${randomDay}`;

        alert(`${petName} was born on ${petBirthday}. Let's celebrate! 🎉`);

        var userGuess = prompt(`Can you guess ${petName}'s zodiac sign based off of their birthday?`);
        var zodiacSign = getZodiacSign(randomMonth, randomDay);

        if (userGuess.toUpperCase() === zodiacSign.toUpperCase()) {
            alert(`Congratulations! You guessed ${petName}'s correct zodiac sign! You're one smart cookie!`);
        } else {
            alert(`Whoops, that was incorrect. ${petName}'s correct zodiac sign is ${zodiacSign}. Better luck next time!`);
        }

        var petAge = prompt(`How old do you think ${petName} is?`);
        var ageNextYear = parseInt(petAge) + 1;

        alert(`Wow, you guessed it! ${petName} turns ${ageNextYear} next year! They grow up so fast..`);

        // Show the GIF of the specific animal at the end
        var petGif = document.getElementById('pet-gif');
        petGif.src = getPetGif(randomPetType);
        petGif.style.display = 'block';
    } else {
        alert("We are sad to see you go, but we hope to see you again soon! 😢");
    }
}

function generateRandomAdjective() {
    var adjectives = ["charming", "playful", "shy", "fun-loving", "sweet", "charismatic", "crazy", "confident", "adorable", "cute"];
    return adjectives[Math.floor(Math.random() * adjectives.length)];
}

function generateRandomPetType() {
    var types = ["dog", "cat", "bunny", "horse", "pig", "bird", "shark", "zebra", "fish"];
    return types[Math.floor(Math.random() * types.length)];
}

function generateRandomMonth() {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[Math.floor(Math.random() * months.length)];
}

function generateRandomDay(month) {
    var daysInMonth = {
        "January": 31,
        "February": 28,
        "March": 31,
        "April": 30,
        "May": 31,
        "June": 30,
        "July": 31,
        "August": 31,
        "September": 30,
        "October": 31,
        "November": 30,
        "December": 31,
    };

    return Math.floor(Math.random() * daysInMonth[month]) + 1;
}

function getZodiacSign(month, day) {
    // This is a simple example; you may need to refine this logic
    if ((month === "March" && day >= 21) || (month === "April" && day <= 19)) {
        return "Aries";
    } else if ((month === "April" && day >= 20) || (month === "May" && day <= 20)) {
        return "Taurus";
    } else if ((month === "May" && day >= 21) || (month === "June" && day <= 20)) {
        return "Gemini";
    } else if ((month === "June" && day >= 21) || (month === "July" && day <= 22)) {
        return "Cancer";
    } else if ((month === "July" && day >= 23) || (month === "August" && day <= 22)) {
        return "Leo";
    } else if ((month === "August" && day >= 23) || (month === "September" && day <= 22)) {
        return "Virgo";
    } else if ((month === "September" && day >= 23) || (month === "October" && day <= 22)) {
        return "Libra";
    } else if ((month === "October" && day >= 23) || (month === "November" && day <= 21)) {
        return "Scorpio";
    } else if ((month === "November" && day >= 22) || (month === "December" && day <= 21)) {
        return "Sagittarius";
    } else if ((month === "December" && day >= 22) || (month === "January" && day <= 19)) {
        return "Capricorn";
    } else if ((month === "January" && day >= 20) || (month === "February" && day <= 18)) {
        return "Aquarius";
    } else {
        return "Pisces";
    }
}

// Function to get the GIF URL based on the pet type
function getPetGif(petType) {
    var gifUrls = {
        "dog": "images/dog.gif",
        "cat": "images/cat.gif",
        "bunny": "images/bunny.gif",
        "horse": "images/horse.gif",
        "pig": "images/pig.gif",
        "bird": "images/bird.gif",
        "shark": "images/shark.gif",
        "zebra": "images/zebra.gif",
        "fish": "images/fish.gif",
    };
    return gifUrls[petType] || "";
}