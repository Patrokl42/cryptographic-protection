const word = 'перестановки';

const N = 4;

const matrix = [
    [2,0,1],
    [3,0,2,1],
];

const columnMatrix = [3,0,2,1];
const rowMatrix = [2,0,1];

const encryption = (word) => {
    const wordMatrix = word.split('').map((item, index) => {
        if(index > 0) {
            if (index - 4 === 0) {
                const substring = word.split('').slice(index - 4, index);
                return substring;
            }
            if (index % 4 === 0) {
                const substring = word.split('').slice(index - 4, index);
                return substring;
            }
            if( ((word.split('').length - index) === 3)) {
                const substring = word.split('').slice(index -1, word.split('').length);
                return substring;
            } 
        }
    }).filter(item => item)
    
    const newMatrix = rowMatrix.map(position => wordMatrix[position])
    
    const sorterColumn = [...columnMatrix].sort();
    
    return sorterColumn.map((item, index) => {
        if (index <= newMatrix.length) {
            return newMatrix.map(matrix => matrix[columnMatrix.indexOf(item)]).join('')
        }
    }).join('')
}

const deCryption = (wordIncome) => {
    const word = wordIncome.split("").reverse().join("");
    const wordMatrix = word.split('').map((item, index) => {
        if(index > 0) {
            if (index - 3 === 0) {
                const substring = word.split('').slice(index - 3, index);
                return substring.reverse();
            }
            if (index % 3 === 0) {
                const substring = word.split('').slice(index - 3, index);
                return substring.reverse();
            }
            if( ((word.split('').length - index) === 2)) {
                const substring = word.split('').slice(index -1, word.split('').length);
                return substring.reverse();
            } 
        }
    }).filter(item => item).reverse()

    const newMatrix = columnMatrix.map(position => wordMatrix[position])
    
    let finalResult = '';

    rowMatrix.map((position,index) => {
        newMatrix.map(matrix => {
            console.log(matrix[rowMatrix.indexOf(index)])
            finalResult += matrix[rowMatrix.indexOf(index)]
        })
    })

    return finalResult
}

const encrypted = encryption(word);
const decrypted = deCryption(encrypted)

console.log(encrypted)
console.log(decrypted)