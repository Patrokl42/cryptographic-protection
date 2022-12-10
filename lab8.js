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

  if (isPrime(n) == false) return -1;
  let phi = n - 1;

  findPrimefactors(s, phi);

  for (let r = 2; r <= phi; r++) {
    let flag = false;
    for (let it of s) {
      if (power(r, phi / it, n) == 1) {
        flag = true;
        break;
      }
    }
    if (flag == false) return r;
  }

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
    p = getRandomInt(Number(30) - 1);

    if (millerRabinTest(p)) {
      break;
    }
  }

  return p;
};

function getRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

const deffieHellman = () => {
  let P, G, x, a, y, b, ka, kb;

  P = generateRandomP();

  G = get_g(P);

  a = 4;
  b = 3;

  x = power(G, a, P);
  y = power(G, b, P);

  ka = power(y, a, P);
  kb = power(x, b, P);

  console.log('Секретний ключ', ka);
  console.log('Отримане значення від першого користувача:', x);
  console.log('Отримане значення від другого користувача:', y);
};


const alGamal = () => {
  let P, G, X, Y, M;
  P = generateRandomP();
  G = get_g(P);

  X = getRandomIntInRange(1, P);
  Y = power(G, X, P);

  message = getRandomIntInRange(0, P)

  console.log('Повідомлення: ', message)

  const [a, b] = encrypt(message, P, G, Y);

  console.log('Зашифроване повідомлення: ', [a, b]);
  console.log('Розшифроване повідомлення: ', decrypt(a, b, X, P));

  function encrypt(value, p, g, y){
    const k = getRandomInt(1, p - 1);
    const a = power(g, k, p)
    const b = ((Math.pow(y, k)) * value) % p
    return [a, b]
  }
  
  function decrypt(a, b, x, p){
    const value = (b * (Math.pow(a,(p - 1 - x)))) % p;
    return value;
  }
}

console.log('Алгоритм Діффі-Хелмана');
deffieHellman();
console.log('==============================');
console.log('Алгоритм Ель-Гамаля');
alGamal();