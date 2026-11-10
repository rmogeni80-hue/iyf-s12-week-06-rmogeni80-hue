async function checkError() {
    try {
        throw new Error("Something went wrong!");
    } catch (error) {
        console.log("Caught an error: " + error.message);
    }
}

checkError();