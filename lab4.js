let x, y;
 
const gcdex = (a, b) => {
      
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
 
const inverse_element = (a, m) => {
    const g = gcdex(a, m);
    if (g != 1) {
        console.warn("Inverse doesn't exist");
    }
    else {
        const res = (x % m + m) % m;
        return res
    }
}

const phi = (m) => {
    let result = 1;
    for (let i = 2; i < m; i++)
        (gcdex(i, m) == 1) && result++;
    return result;
}

const inverse_element_2 = (a, m) => {
    let b = m - 2;
    const MOD = m || 1000000007

    ans = 1;
    a = a % MOD;

    while(b > 0){
        if (b % 2 === 1){
            ans = (ans * a) % MOD;
        }
        a = (a * a) % MOD;
        b = b / 2;
    }
    return ans;
}

console.log('gcdex: ',gcdex(612, 342));
console.log('inverse_element: ',inverse_element(5, 18));
console.log('phi: ',phi(9))
console.log('inverse_element_2: ', inverse_element_2(5, 18));