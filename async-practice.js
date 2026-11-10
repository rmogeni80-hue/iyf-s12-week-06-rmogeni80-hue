function waitForData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data loaded");
        }, 2000);
    });
}

async function showData() {
    console.log("Loading...");
    let result = await waitForData();
    console.log(result);
}

showData();