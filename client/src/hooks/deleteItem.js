const deleteItem  = async (url) =>{
   let token = localStorage.getItem("token");
let res = await fetch(url,{
   method: "DELETE",
   headers:{
      authorization: `Bearer ${token}`
   }
});
const result = await res.json();

return result
}

export default deleteItem;
