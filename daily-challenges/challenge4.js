async function getFakeData() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("User Name: " + data.name);
    } catch (error) {
        console.log(error.message);
    }
}

getFakeData();