var generateBtn = document.querySelector("#generate")

var pwLowCase, pwUpCase, pwNum, pwSpChar, charSet

var lowCaseStr = "abcdefghijklmnopqrstuvqxyz"
var UpCaseStr = lowCaseStr.toUpperCase()
var numStr = "0123456789"
var spCharStr = "!@#$%^&*()_+~`|}{[]\:;?><,./-="  
var charSelected = []
var newLine = "\r\n"
var errCode

function booleanCheck(x) {
  if (x.toLowerCase() == "yes" || x.toLowerCase() == "y") {
    return true;
  } else if (x.toLowerCase() == "no" || x.toLowerCase() == "n") {
    return false;
  } else {
    alert("Please type either 'Yes' or 'No'.")
    throw errCode = 1
  }
}

function randNum(x) {
  return Math.floor(Math.random() * x.length)
}

function elementPickerTwoDim(x) {
  var arr1, arr2
  arr1 = randNum(x)
  arr2 = randNum(x[arr1])
  return x[arr1][arr2]
}

function generatePassword() {
  charSelected = [];
  var pwActual = [];

  var pwLength = prompt("Please enter the length of the password.", "Enter a number between 8 and 128.")
  if (isNaN(pwLength) || pwLength === null) {
    alert("Please imput a number.")
    throw errCode = 3
  } else if (pwLength < 8) {
    alert("Length cannot be less than 8")
    throw errCode = 4
  } else if (pwLength > 128) {
    alert("Length cannot be greater than 128.")
    throw errCode = 5
  }

  pwLowCase = prompt("Do you want lowercase characters?")
  pwLowCase = booleanCheck(pwLowCase)
  pwUpCase = prompt("Do you want uppercase characters?")
  pwUpCase = booleanCheck(pwUpCase)
  pwNum = prompt("Do you want numeric characters?")
  pwNum = booleanCheck(pwNum);
  pwSpChar = prompt("Do you want special characters?")
  pwSpChar = booleanCheck(pwSpChar)

  if (![pwLowCase, pwUpCase, pwNum, pwSpChar].includes(true)) {
    alert("Please type 'Yes' to at least 1 type.")
    throw errCode = 2;
  }

  alert("You have selected:" + newLine
    + "Length: " + pwLength + newLine
    + "Lowercase: " + pwLowCase + newLine
    + "Uppercase: " + pwUpCase + newLine
    + "Numeric: " + pwNum + newLine
    + "Special: " + pwSpChar);

  if (pwLowCase) {
    charSelected.push(lowCaseStr)
  }
  if (pwUpCase) {
    charSelected.push(UpCaseStr)
  }
  if (pwNum) {
    charSelected.push(numStr)
  }
  if (pwSpChar) {
    charSelected.push(spCharStr)
  }

  for (var i = 0; i < pwLength; i++) {
    pwActual.push(elementPickerTwoDim(charSelected))
  }

  return pwActual.join("")
}

function writePassword() {
  try {
    var password = generatePassword()
    var passwordText = document.querySelector("#password")
    passwordText.value = password
  }

  catch {
    switch (errCode) {
      case 1:
        console.log("Invalid answer y/n")
        break
      case 2:
        console.log("No chartypes selected")
        break
      case 3:
        console.log("PW Length was not a number.")
        break
      case 4:
        console.log("Password length cannot be less than 8.")
        break
      case 5:
        console.log("Password length cannot be greater than 128.")
        break
    }
  }
}

generateBtn.addEventListener("click", writePassword)