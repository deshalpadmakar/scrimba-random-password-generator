// Selecting DOM elements
const passwordOneEl = document.getElementById("password-one") // First password display element
const passwordTwoEl = document.getElementById("password-two") // Second password display element
const copyOneBtnEl = document.getElementById("copy-one-btn") // Copy button for first password
const copyTwoBtnEl = document.getElementById("copy-two-btn") // Copy button for second password
const lengthValueEl = document.getElementById("length-value") // Display element for password length
const uppercaseCheckboxEl = document.getElementById("uppercase-checkbox") // Checkbox for uppercase letters
const lowercaseCheckboxEl = document.getElementById("lowercase-checkbox") // Checkbox for lowercase letters
const numberCheckboxEl = document.getElementById("number-checkbox") // Checkbox for numbers
const specialCharacterCheckboxEl = document.getElementById("special-character-checkbox") // Checkbox for special characters
const sliderEl = document.getElementById("slider") // Slider input for password length
const generatePasswordBtnEl = document.getElementById("generate-password-btn") // Button to generate new password

// Character sets for password generation
let uppercaseCharactersArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const lowercaseCharactersArr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const numbersArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const specialCharacterArr = ["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?", "/"]

// Triggers vibration on mobil
function triggerHapticFeedback() {
    if ("vibrate" in navigator) {
        // Android Vibration API
        navigator.vibrate(5) // Vibrates for 5ms
    } else if (window?.webkit?.messageHandlers?.haptic) {
        // iOS WebKit Haptic Feedback
        window.webkit.messageHandlers.haptic.postMessage("light")
    } else if (window?.navigator?.vibrate) {
        // Fallback for other browsers supporting vibration
        window.navigator.vibrate(5)
    }
}

// Function to generate and display new passwords
function renderPassword() {
    passwordOneEl.textContent = getRandomPassword()
    passwordTwoEl.textContent = getRandomPassword()
}

renderPassword()


// Function to generate a random password based on selected settings
function getRandomPassword() {
    ensureValidPasswordSettings() // Ensure at least one character type is selected
    const passwordSettings = getPasswordSettings() // Retrieve user settings
    const characterArr = getCharacterArr(passwordSettings) // Get array of allowed characters
    let randomPassword = ""
    for(let i = 0; i < passwordSettings.length; i++ ) {
        let randomIndex = Math.floor( Math.random() * characterArr.length )
        randomPassword += characterArr[randomIndex] // Append random character
    }
    return randomPassword
}


// Ensures at least one character type is selected; defaults to uppercase & lowercase if none
function ensureValidPasswordSettings() {
    const isUppercase = uppercaseCheckboxEl.checked
    const isLowercase = lowercaseCheckboxEl.checked
    const isNumber = numberCheckboxEl.checked
    const isSpecialCharacter = specialCharacterCheckboxEl.checked
    if(!isUppercase && !isLowercase && !isNumber && !isSpecialCharacter) {
        uppercaseCheckboxEl.checked = true
        lowercaseCheckboxEl.checked = true
    }
}


// Retrieves password settings based on user selections
function getPasswordSettings() {
    const passwordSettings = {
        length: sliderEl.value,
        isUppercase: uppercaseCheckboxEl.checked,
        isLowercase: lowercaseCheckboxEl.checked,
        isNumber: numberCheckboxEl.checked,
        isSpecialCharacter: specialCharacterCheckboxEl.checked
    }
    return passwordSettings
}


// Returns an array of characters based on user-selected password settings
function getCharacterArr(passwordSettings) {
    const characterArr = []
    if(passwordSettings.isUppercase) {
        characterArr.push(...uppercaseCharactersArr)
    }
    if(passwordSettings.isLowercase) {
        characterArr.push(...lowercaseCharactersArr)
    }
    if(passwordSettings.isNumber) {
        characterArr.push(...numbersArr)
    }
    if(passwordSettings.isSpecialCharacter) {
        characterArr.push(...specialCharacterArr)
    }
    return characterArr
}


// Updates slider background and displays password length in real-time
sliderEl.addEventListener("input", function () {
    const min = 6
    const max = 100
    const value = sliderEl.value

    // Normalize value to 0-100 range for gradient effect
    const percentage = ((value - min) / (max - min)) * 100

    // Apply background gradient based on selected length
    const backgroundColor = `linear-gradient(to right, oklch(0.488 0.243 264.376 / 0.8) ${percentage}%, oklch(0.551 0.027 264.364 / 0.6) ${percentage}%)`
    sliderEl.style.background = backgroundColor

    // Update displayed length
    lengthValueEl.textContent = value
    
    // Re-render password
    renderPassword()

    triggerHapticFeedback() // trigger haptic feedback on mobil
})


// Event listeners for checkboxes to regenerate password on toggle
uppercaseCheckboxEl.addEventListener("click", function () {
    renderPassword()
    triggerHapticFeedback() // trigger haptic feedback on mobil
})

lowercaseCheckboxEl.addEventListener("click", function () {
    renderPassword()
    triggerHapticFeedback() // trigger haptic feedback on mobil
})

numberCheckboxEl.addEventListener("click", function () {
    renderPassword()
    triggerHapticFeedback() // trigger haptic feedback on mobil
})

specialCharacterCheckboxEl.addEventListener("click", function () {
    renderPassword()
    triggerHapticFeedback() // trigger haptic feedback on mobil
})


// Event listeners for copy buttons to copy generated passwords
copyOneBtnEl.addEventListener("click", function () {
    navigator.clipboard.writeText(passwordOneEl.textContent)
})

copyTwoBtnEl.addEventListener("click", function () {
    navigator.clipboard.writeText(passwordTwoEl.textContent)
})


// Event listener for password generation button
generatePasswordBtnEl.addEventListener("click", function() {
    // re-render new password
    renderPassword()
    triggerHapticFeedback() // trigger haptic feedback on mobil
})