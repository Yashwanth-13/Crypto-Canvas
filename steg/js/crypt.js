
async function deriveKey(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        enc.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );

    const key = await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
    );

    return key;
}


async function encrypt(data, password) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const key = await deriveKey(password, salt);
    const enc = new TextEncoder();
    const encryptedData = await crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        enc.encode(data)
    );

    const encryptedArray = new Uint8Array(encryptedData);
    const combinedArray = new Uint8Array(salt.byteLength + iv.byteLength + encryptedArray.byteLength);
    combinedArray.set(salt, 0);
    combinedArray.set(iv, salt.byteLength);
    combinedArray.set(encryptedArray, salt.byteLength + iv.byteLength);

    return combinedArray;
}


async function decrypt(encryptedData, password) {
    const salt = encryptedData.slice(0, 16);
    const iv = encryptedData.slice(16, 28);
    const data = encryptedData.slice(28);

    const key = await deriveKey(password, salt);
    const decryptedData = await crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: iv
        },
        key,
        data
    );

    const dec = new TextDecoder();
    return dec.decode(decryptedData);
}
