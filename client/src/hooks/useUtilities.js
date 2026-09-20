import { useState,useCallback,useMemo} from "react";

const useUtilities = () => {
const [startAdd, setStartAdd] = useState(false);
  const [isOpen,setIsOpen] = useState({isHide:false,deleting:false,editing:false});
  const [dataStore,setDataStore] = useState(null);
  const [toasts,setToasts] = useState([]);
  const init = useMemo(() =>{
    return {
      fname:"",
      lname:"",
      number:"",
      email:"",
      role:""
    }
  },[]);
  const [fields,setFields] = useState(init);
  const tracking = useCallback((e) =>{
    const {name,value} = e.target;
    setFields(pre =>({...pre,[name]:value.trim()}))
  },[]);
  const orginalState = useCallback(() =>{
    setFields(init)
  },[])
  const toggle = () => {
    setStartAdd(pre => !pre)
  }
  const showHide = () =>{
    setIsOpen(pre => ({...pre,isHide: !pre.isHide}))
  }
  const startDeleting = () =>{
    setIsOpen(pre => ({...pre,deleting: !pre.deleting}))
  }
  const startEditing = () =>{
    setIsOpen(pre => ({...pre,editing: !pre.editing}))
  }
  const passData = (data) =>{
     setDataStore(data)
}
  
const removeToast = useCallback((id) =>{
  setToasts(pre => pre.filter(toast => toast.id !== id)
  )
},[])
  const addToast = useCallback((type,message) =>{
    let id = Date.now() + Math.random();
    setToasts(pre =>([...pre,{id,type,message}]));
     let int = setTimeout(() =>{
      removeToast(id)
    },5000);
     
    return () => clearTimeout(int)
    
  },[removeToast])

  return {
    startAdd,
    isOpen,
    toggle,
    showHide,
    startDeleting,
    startEditing,
    passData,
    dataStore,
    removeToast,
    addToast,
    toasts,
    tracking,
    fields,
    orginalState
  }
}

export default useUtilities;
