const arrayOfSymbols = [
    ['а', 'б', 'в', 'г', 'д', 'е'],
    ['є', 'ж', 'з', 'и', 'і', 'й'],
    ['к', 'л', 'м', 'н', 'о', 'п'],
    ['р', 'с', 'т', 'у', 'ф', 'х'],
    ['ц', 'ч', 'ш', 'ь', 'ю', 'я']
];

const hashOfSymbols = []

arrayOfSymbols.map((row, rowIndex) => {
    row.map((item,index) => {
        hashOfSymbols.push({symbol: item, code: `${rowIndex}${index}`})
    })
})

const encryption = (word) => {
    const numbers = word.split('').map((letter, index) => {
        return hashOfSymbols.find(item => item.symbol === letter).code
    })

    const arrayEncryptedNumbersStart = []
    const arrayEncryptedNumbersEnd = []
    numbers.map((number, index) => {

        if (index % 2 === 0 ) {
            const substringStart = `${number[0]}${numbers[index +1][0]}`;
            const substringEnd = `${number[1]}${numbers[index +1][1]}`;
            arrayEncryptedNumbersStart.push(substringStart)
            arrayEncryptedNumbersEnd.push(substringEnd)
        }
    })

    const encryptedNumber = [...arrayEncryptedNumbersStart, ... arrayEncryptedNumbersEnd];

    const encriptedText = encryptedNumber.map(number => {
        return hashOfSymbols.find(item => item.code === number).symbol
    })

    return encriptedText.join('');
}

const decryption = (word) => {
    const wordToArray = word.split("")

    const arrayOfSymbols = wordToArray.map(symbol => {
        return hashOfSymbols.find(item => item.symbol === symbol).code.split("")
    })

    const middleIndex = Math.ceil(arrayOfSymbols.length / 2);

    const firstHalf = arrayOfSymbols.slice().splice(0, middleIndex);   
    const secondHalf = arrayOfSymbols.slice().splice(-middleIndex);

    const decryptedArray = []

    firstHalf.map((item, index) => {
        item.map((codeItem, indexInner) => {
            decryptedArray.push(hashOfSymbols.find(item => item.code === `${codeItem}${secondHalf[index][indexInner]}`).symbol)
        })
    })

    return decryptedArray.join('');
}


const word = 'заміна';

console.log(`Початкове слово: "${word}"`)

const encryptedText = encryption(word);

console.log(`Закодоване слово: "${encryptedText}"`)

const decryptedText = decryption(encryptedText);

console.log(`Розкодоване слово: "${decryptedText}"`)