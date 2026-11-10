const myPromise = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        resolve("Promise resolved!");
    } else {
        reject("Promise rejected!");
    }
});

myPromise.then((message) => {
    console.log(message);
}).catch((error) => {
    console.log(error);
});