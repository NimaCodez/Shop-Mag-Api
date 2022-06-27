function GenerateRandomNumber() {
    return Math.floor((Math.random() * 10000) + 90000)
}

module.exports = {
    GenerateRandomNumber,
}
