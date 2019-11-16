let fs = require('fs');
let obj = {};
['readFile', 'readdir'].forEach(item => {
    obj[item] = function (url, encoding = null) {
        if (/\.(js|css|html|txt|md)$/.test(url)) {
            encoding = 'utf-8'
        }
        return new Promise((res, rej) => {
            fs[item](url, encoding, (err, data) => {
                !err ? res(data) : rej(err)
            })
        })
    }
});

['mkdir', 'rmdir', 'unlink'].forEach(item => {
    obj[item] = function (url) {
        return new Promise((res, rej) => {
            fs[item](url, (err) => {
                !err ? res() : rej(err)
            })
        })
    }
});

['writeFile', 'appendFile'].forEach(item => {
    obj[item] = function (url, data = '', encoding = null) {
        if (/\.(js|css|html|txt|md)$/.test(url)) {
            encoding = 'utf-8'
        }
        return new Promise((res, rej) => {
            fs[item](url, data, encoding, (err) => {
                !err ? res() : rej(err)
            })
        })
    }
});
obj.copyFile = function (oldUrl, newUrl) {
    return new Promise((res, rej) => {
        fs.copyFile(oldUrl, newUrl, (err) => {
            !err ? res() : rej(err)
        })
    })
}
module.exports = obj;
