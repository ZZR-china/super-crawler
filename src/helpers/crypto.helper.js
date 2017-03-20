/*
 * Module description: 全局加密模块
 */

const crypto = require('crypto');

//加密
function cipher(str, callback) {
    var encrypted = "";
    console.log(str)
    this.randomWord(true, 3, 32, (key) => {
        var cip = crypto.createCipher('aes192', key);
        encrypted += cip.update(str, 'binary', 'hex');
        encrypted += cip.final('hex');
        callback(encrypted, key);
        return;
    });
}

//加密
function key_cipher(str, key, callback) {
    var encrypted = "",
        cip = crypto.createCipher('aes192', key);

    encrypted += cip.update(str, 'binary', 'hex');
    encrypted += cip.final('hex');
    callback(encrypted);
    return;
}

//解密
function decipher(str, key, callback) {
    var decrypted = "";
    var decipher = crypto.createDecipher('aes192', key);
    decrypted += decipher.update(str, 'hex', 'binary');
    decrypted += decipher.final('binary');
    callback(decrypted);
}

/**
 * 产生随机字符串
 * @param  {[Boolen]} randomFlag 3-32位 / 64位
 * @param  {[number]} min        最小个数
 * @param  {[number]} max        最大个数
 * @return {[String]}            生成的随机字符串
 */
function randomWord(randomFlag, min, max, callback) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
        if (i + 1 == range) {
            return callback(str);
        }
    }
}

//promise化加密
function cipherpromise(str, key) {
    return new Promise((resolve, reject) => {
        try {
            let encrypted = "",
                cip = crypto.createCipher('aes192', key);
            encrypted += cip.update(str, 'binary', 'hex');
            encrypted += cip.final('hex');
            resolve(encrypted);
        } catch (e) {
            reject(e);
        }
    })
}

//promise化解密
function decipherpromise(str, key) {
    return new Promise((resolve, reject) => {
        try {
            var decrypted = "";
            var decipher = crypto.createDecipher('aes192', key);
            decrypted += decipher.update(str, 'hex', 'binary');
            decrypted += decipher.final('binary');
            resolve(decrypted);
        } catch (e) {
            reject(e);
        }
    })
}


export default {
    cipher,
    key_cipher,
    decipher,
    randomWord,
    cipherpromise,
    decipherpromise
};
