RELIABILITY = 45;

const millerRabinTest = (number) => {
    if(number < 3 || number % 2 === 0 ) {
        return false
    }

    number = BigInt(number);

    if( (number === 2n ) || ( number === 3n )) {
        return true;
    }

    if( (number < 2n) || ( (number % 2n) === 0 )) {
        return false;
    }

    let s = 0n, d = number - 1n;
	while (d & 1n) {
		d /= 2n;
		s++;
	}

    for(let i = 0; i < RELIABILITY; i++ ) {
        let startNewLoop = false;
        const a = BigInt(getRandomInt(Number(number) - 1));
        let x = BigInt( (a ** d) % number );

        if( (x === 1n) || (x === (number - 1n)) ) {
            continue;
        }

        for(let r = 1; r < s; r++) {
            x = (x ** 2n) % number;
            if(x === 1n) {
                return false;
            } else if ( x === (number - 1n) ) {
                startNewLoop = true;
                break;
            }
        }

        if(startNewLoop === false) {
            return false;
        }
    }
    return true;
}

const getRandomInt = number => Math.floor(Math.random() * Math.floor(number)) + 1;

const generateRandomNumbers = () => {
    let p, q = 0;

    while(true) {
        p = getRandomInt(Number(100) - 1);

        if(millerRabinTest(p)) {
            break;
        }
    }

    let iterator = 0;
    while(true) {
        iterator += 1;
        q = p + iterator

        if(millerRabinTest(q)) {
            break;
        }
    }

    return [p, q];
}

const gcdex = (a, b) => {
    let x, y;

    if (a == 0) {
        x = 0;
        y = 1;
        return b;
    }
      
    const gcd = gcdex(b % a, a);
    const x1 = x;
    const y1 = y;
 
    x = y1 - Math.floor(b / a) * x1;
    y = x1;
  
    return gcd;
}

// const [p, q] = generateRandomNumbers();
const [p, q] = [53, 17];
const n = p*q;
let e = 2;
const phi = (p-1)*(q-1);

console.log(phi);

while (e < phi) {
    if(gcdex(e, phi) === 1) {
        break;
    } else {
        e += 1;
    }
}

console.log(e);

let k = 2;
const d = (1 + (k*phi) ) / e;

const msg = 18.0;

console.log("Message data = ", msg)
 
//  Encryption c = (msg ^ e) % n
let c = Math.pow(msg, e)
c = c % n
console.log("Encrypted data = ", c)
 
//  Decryption m = (c ^ d) % n
let m = Math.pow(c, d)
m = m % n
console.log("Original Message Sent = ", m)