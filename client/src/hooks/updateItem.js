
const updateItem = async (url,data) => {
  let token = localStorage.getItem("token");
  const response = await fetch(url,{
    method: "PUT",
    headers:{
      authorization: `Bearer ${token}`
    },
    body: data
  });
  const json = await response.json();
  return json;
}

export default updateItem;
