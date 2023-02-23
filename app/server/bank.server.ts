const p = 853;
const q = 157;

export function generateKeys(): {
    publicKey: [number, number];
    privateKey: [number, number];
} {
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    let e = 2;

    while (e < phi) {
        if (gcd(phi, e) === 1) {
            break;
        }
        e++;
    }

    const d = modInverse(e, phi);

    return {
        publicKey: [e, n],
        privateKey: [d, n],
    };
}

function gcd(a: number, b: number): number {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

function modInverse(a: number, m: number): number {
    let [m0, x0, x1] = [m, 0, 1];
    if (m === 1) {
        return 0;
    }

    while (a > 1) {
        const q = Math.floor(a / m);
        let [t, m2] = [m, a % m];
        [a, m] = [m, m2];
        [t, x0] = [x0, x1 - q * x0];
        x1 = t;
    }

    if (x1 < 0) {
        x1 += m0;
    }

    return x1;
}

export function encrypt(message: number, publicKey: [number, number]): number {
    const [e, n] = publicKey;
    return modPow(message, e, n);
}

export function decrypt(
    ciphertext: number,
    privateKey: [number, number]
): number {
    const [d, n] = privateKey;
    return modPow(ciphertext, d, n);
}

function modPow(base: number, exponent: number, modulus: number): number {
    if (modulus === 1) {
        return 0;
    }

    let result = 1;
    base = base % modulus;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        exponent = Math.floor(exponent / 2);
        base = (base * base) % modulus;
    }

    return result;
}

// Example usage:

// const message = 12345;
// const ciphertext = encrypt(message, publicKey);
// const plaintext = decrypt(ciphertext, privateKey);
