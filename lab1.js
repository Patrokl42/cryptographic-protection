const N = 4;

const columnMatrix = [3,0,2,1];
const rowMatrix = [2,0,1];

const encryption = (word) => {
    const wordMatrix = word.split('').map((item, index) => {
        if(index > 0) {
            if (index - N === 0) {
                const substring = word.split('').slice(index - N, index);
                return substring;
            }
            if (index % N === 0) {
                const substring = word.split('').slice(index - N, index);
                return substring;
            }
            if( ((word.split('').length - index) === N - 1)) {
                const substring = word.split('').slice(index -1, word.split('').length);
                return substring;
            } 
        }
    }).filter(item => item)
    
    const sortedMatrix = rowMatrix.map(position => wordMatrix[position])
    
    const sortedColumnValues = [...columnMatrix].sort();
    
    return sortedColumnValues.map((item, index) => {
        if (index <= sortedMatrix.length) {
            return sortedMatrix.map(matrix => matrix[columnMatrix.indexOf(item)]).join('')
        }
    }).join('')
}

const decryption = (wordIncome) => {
    const wordReversed = wordIncome.split("").reverse().join("");
    const wordMatrix = wordReversed.split('').map((item, index) => {
        if(index > 0) {
            if (index - (N - 1) === 0) {
                const substring = wordReversed.split('').slice(index - (N - 1), index);
                return substring.reverse();
            }
            if (index % (N - 1) === 0) {
                const substring = wordReversed.split('').slice(index - (N - 1), index);
                return substring.reverse();
            }
            if( ((wordReversed.split('').length - index) === (N / 2))) {
                const substring = wordReversed.split('').slice(index -1, wordReversed.split('').length);
                return substring.reverse();
            } 
        }
    }).filter(item => item).reverse()

    const sortedMatrix = columnMatrix.map(position => wordMatrix[position])
    
    let finalResult = '';

    rowMatrix.map((position,index) => {
        sortedMatrix.map(matrix => {
            finalResult += matrix[rowMatrix.indexOf(index)]
        })
    })

    return finalResult
}

const word = 'перестановки';

console.log(`Початкове слово: "${word}"`)

const encryptedText = encryption(word);

console.log(`Закодоване слово: "${encryptedText}"`)

const decryptedText = decryption(encryptedText);

console.log(`Розкодоване слово: "${decryptedText}"`)
