function logs(error) {
    console.log(error);
}

async function readDatabase () {
    let response = {}
    await fetch('../database.json')
        .then((response) => response.json())
        .then((data) => response = data)
        .catch((error) => {
            logs(error);
        })
    return response;
}

export { readDatabase }