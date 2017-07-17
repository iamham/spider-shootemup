export const getFourRandomSeconds = (durationSecond) => {
    var randomNumbers = []
    while (randomNumbers.length < 4) {
      var randomnumber = Math.ceil(Math.random() * durationSecond)
      if(randomNumbers.indexOf(randomnumber) > -1) continue
      randomNumbers[randomNumbers.length] = randomnumber
    }
    return randomNumbers.sort((a, b) => a - b)
}