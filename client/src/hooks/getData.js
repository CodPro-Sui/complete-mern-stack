
const getData = async (url) => {
  let token = localStorage.getItem("token");
  let res = await fetch(url,{headers:{authorization: `Bearer ${token}`}});
  let json = await res.json();
  return json
}

export default getData
