
const addData  = async (url,data) => {
    let token = localStorage.getItem("token");
    let res = await fetch(url, {
            method: "POST",
            headers:{
                authorization: `Bearer ${token}`
            },
            body: data
        });
    let result = await res.json();

    return result
}

export default addData
