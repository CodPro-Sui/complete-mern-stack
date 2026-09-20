const sendFormData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      body: data
    });
    const result = await res.json();
    return result
}
export default sendFormData
