function toAscii(character = "") {
    return character.charCodeAt(0);
}

function toBinary(ascii) {
    return ascii.toString(2);
}

function padBackZero(bin, nums) {
    const array = bin.split("");
    if (array.length > nums) {
        return bin;
    }
    while (array.length < nums) {
        array.unshift("0");
    }
    return array.join("");
}

function divideInBlocks(message, blockSize) {
    const block = [];
    for (let i = 0; i < message.length; i += blockSize) {
        block.push(message.slice(i, i + blockSize));
    }
    return block;
}

function and(bitA, bitB) {
    const arrayA = bitA.split("").map(letter => +letter);
    const arrayB = bitB.split("").map(letter => +letter);
    const andArray = arrayA.map((num, index) => num & arrayB[index]);
    return andArray.join("").toString();
}

function or(bitA, bitB) {
    const arrayA = bitA.split("").map(letter => +letter);
    const arrayB = bitB.split("").map(letter => +letter);
    const ORarray = arrayA.map((num, index) => num | arrayB[index]);
    return ORarray.join("").toString();
}

function XOR(binA, binB) {
    const arrayA = binA.split("").map(letter => +letter);
    const arrayB = binB.split("").map(letter => +letter);
    const xORarray = arrayA.map((num, index) => num ^ arrayB[index]);
    return xORarray.join("").toString();
}

function not(bin) {
    return bin
        .split("")
        .map(bit => (bit === "1" ? "0" : "1"))
        .join("");
}

function binAddition(a, b) {
    const addition = parseInt(a, 2) + parseInt(b, 2);
    return toBinary(addition);
}

function truncate(val, length) {
    while (val.length > length) {
        val = val.slice(1);
    }
    return val;
}

function leftShift(value, amount) {
    if (amount > value.length) {
        return value;
    }
    return value.slice(amount) + value.slice(0, amount);
}

function binToHex(bin) {
    return parseInt(bin, 2).toString(16);
}

const SHA1 = function (message) {
    let h0 = "01100111010001010010001100000001";
    let h1 = "11101111110011011010101110001001";
    let h2 = "10011000101110101101110011111110";
    let h3 = "00010000001100100101010001110110";
    let h4 = "11000011110100101110000111110000";

    const asciiMessage = message.split("").map(message => toAscii(message));


    const binMessage = asciiMessage
        .map(ascii => toBinary(ascii))
        .map(bin => padBackZero(bin, 8));



    let messageBlock = binMessage.join("") + "1";
    while (messageBlock.length % 512 !== 448) {
        messageBlock += "0";
    }

    const paddedMessage =
        messageBlock + padBackZero(toBinary(binMessage.join("").length), 64);

    const chunks = divideInBlocks(paddedMessage, 512);

    const words = chunks.map(block => divideInBlocks(block, 32));

    words.forEach(chunk => {
        for (let i = 16; i <= 79; i++) {
            let word0 = chunk[i - 3];
            let word1 = chunk[i - 8];
            let word2 = chunk[i - 14];
            let word3 = chunk[i - 16];

            let xorA = XOR(word0, word1);
            let xorB = XOR(xorA, word2);
            let xorC = XOR(xorB, word3);
            chunk[i] = leftShift(xorC, 1);
        }
    });


    words.forEach(chunk => {
        let a = h0;
        let b = h1;
        let c = h2;
        let d = h3;
        let e = h4;
        for (let i = 0; i < 80; i++) {
            let f;
            let k;
            if (i < 20) {
                f = or(and(b, c), and(not(b), d));
                k = "01011010100000100111100110011001";
            } else if (i < 40) {
                let bXorc = XOR(b, c);
                f = XOR(bXorc, d);
                k = "01101110110110011110101110100001";
            } else if (i < 60) {
                let bAndc = and(b, c);
                let bAndd = and(b, d);
                let cAndd = and(c, d);
                f = or(bAndc, or(bAndd, cAndd));
                k = "10001111000110111011110011011100";
            } else {
                let bXorc = XOR(b, c);
                f = XOR(bXorc, d);
                k = "11001010011000101100000111010110";
            }

            let temp3 = truncate(
                binAddition(
                    binAddition(binAddition(binAddition(e, f), leftShift(a, 5)), k),
                    chunk[i]
                ),
                32
            );
            e = d;
            d = c;
            c = leftShift(b, 30);
            b = a;
            a = temp3;
        }
        h0 = truncate(binAddition(h0, a), 32);
        h1 = truncate(binAddition(h1, b), 32);
        h2 = truncate(binAddition(h2, c), 32);
        h3 = truncate(binAddition(h3, d), 32);
        h4 = truncate(binAddition(h4, e), 32);
    });
    return [h0, h1, h2, h3, h4].map(hex => binToHex(hex)).join("");
};

const message = 'message';
console.log('Алгоритм шифрування SHA-1');
console.log('Повідомлення: ', message);
console.log('Захешоване повідомлення: ', SHA1(message))