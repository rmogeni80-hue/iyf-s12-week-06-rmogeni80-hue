async function loadMultipleThings() {
    let promise1 = Promise.resolve("Item 1 loaded");
    let promise2 = Promise.resolve("Item 2 loaded");
    let promise3 = Promise.resolve("Item 3 loaded");

    let results = await Promise.all([promise1, promise2, promise3]);
    console.log(results);
}

loadMultipleThings();