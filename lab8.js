RELIABILITY = 4127;

const power = (a, b, p) => {
  if (b == 1) return a;
  else return Math.pow(a, b) % p;
};

const millerRabinTest = (number) => {
  if (number < 3 || number % 2 === 0) {
    return false;
  }

  number = BigInt(number);

  if (number === 2n || number === 3n) {
    return true;
  }

  if (number < 2n || number % 2n === 0) {
    return false;
  }

  let s = 0n,
    d = number - 1n;
  while (d & 1n) {
    d /= 2n;
    s++;
  }

  for (let i = 0; i < RELIABILITY; i++) {
    let startNewLoop = false;
    const a = BigInt(getRandomInt(Number(number) - 1));
    let x = BigInt(a ** d % number);

    if (x === 1n || x === number - 1n) {
      continue;
    }

    for (let r = 1; r < s; r++) {
      x = x ** 2n % number;
      if (x === 1n) {
        return false;
      } else if (x === number - 1n) {
        startNewLoop = true;
        break;
      }
    }

    if (startNewLoop === false) {
      return false;
    }
  }
  return true;
};

function findPrimitive(n) {
  let s = new Set();

  // Check if n is prime or not
  if (isPrime(n) == false) return -1;

  // Find value of Euler Totient function of n
  // Since n is a prime number, the value of Euler
  // Totient function is n-1 as there are n-1
  // relatively prime numbers.
  let phi = n - 1;

  // Find prime factors of phi and store in a set
  findPrimefactors(s, phi);

  // Check for every number from 2 to phi
  for (let r = 2; r <= phi; r++) {
    // Iterate through all prime factors of phi.
    // and check if we found a power with value 1
    let flag = false;
    for (let it of s) {
      // Check if r^((phi)/primefactors) mod n
      // is 1 or not
      if (power(r, phi / it, n) == 1) {
        flag = true;
        break;
      }
    }

    // If there was no power with value 1.
    if (flag == false) return r;
  }

  // If no primitive root found
  return -1;
}

const is_primitive_root = (g, p) => {
  for (let i = 1; i < p - 1; i++) {
    if (power(g, i, p) === 1) {
      return false;
    }
  }
  return true;
};

const get_g = (p) => {
  while (true) {
    const g = Math.floor(Math.random() * p) + 2;
    if (is_primitive_root(g, p)) {
      return g;
    }
  }
};

const getRandomInt = (number) =>
  Math.floor(Math.random() * Math.floor(number)) + 1;

const generateRandomP = () => {
  let p;

  while (true) {
    p = getRandomInt(Number(100) - 1);

    if (millerRabinTest(p)) {
      break;
    }
  }

  return p;
};

const deffieHellman = () => {
  let P, G, x, a, y, b, ka, kb;

  // A prime number P is taken
  P = generateRandomP();

  // A primitive root for P, G is taken
  G = get_g(P);

  console.log(P, G);

  // Alice will choose the private key a
  // a is the chosen private key
  a = 4;

  // Gets the generated key
  x = power(G, a, P);

  // Bob will choose the private key b
  // b is the chosen private key
  b = 3;

  // Gets the generated key
  y = power(G, b, P);

  // Generating the secret key after the exchange
  // of keys(millerRabinTest(9)
  ka = power(y, a, P); // Secret key for Alice
  kb = power(x, b, P); // Secret key for Bob

  console.log(ka);
  console.log(kb);
};

console.log(deffieHellman());
