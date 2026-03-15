import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { successEmitter } from "../Component/ToastEmitter";
import { Baseurl} from "../Component/Baseurl";


export const authContext = createContext(null);

function AuthState({ children }) {
  const navigate = useNavigate();
  let [myNotes,setMyNotes] = useState([]);
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile"))||null);
 const [isLogin, setIsLogin] = useState(() => {
  return localStorage.getItem("auth-token") ? true : false;
});

  const [token, setToken] = useState(localStorage.getItem("auth-token") || ""); 
  const logoutHandler = () => {
    localStorage.removeItem("auth-token");
    setToken("")
    setIsLogin(false);
    navigate("/login");
    successEmitter("Logout Successfully")
  };

  const getmynotes = async ()=>{
    try {
      let res = await fetch(`${Baseurl}/Note/mynote`,{
        method:"GET",
       headers:{
      "auth-token":token,
      "Content-Type":"application/json"
    }
      })
      const data = await res.json()
        console.log(data);
        if (data.success) {
          setMyNotes(data.note);
        }
    } catch (error) {
      console.log(error);
      
    }
  }

  const getProfileFun = async ()=>{
      try {
        const res = await fetch(`${Baseurl}//profile`,{
        method:"GET",
        headers:{
          "auth-tokken":token
        }
      });
      const data = await res.json();
      if(data.success){
        setProfile(data.user);
        setIsLogin(true)
      }else{
        setProfile(null)
      }
      } catch (error) {
        console.log(error);
      }
  }
  
 const createnote = async (notes)=>{
 try {
  
   const res = await fetch(`${Baseurl}/Note/create`,{
    method:"POST",
    headers:{
      "auth-token":token,
      "Content-Type":"application/json"
    },
    body:JSON.stringify(notes)

  })
  const data =await res.json()
  console.log(data);
  
 } catch (error) {
  console.log(error);
  
 }
 }

  return (
    <authContext.Provider value={{ isLogin, setIsLogin, profile, setProfile,logoutHandler,setToken,createnote,getmynotes,myNotes,setMyNotes}}>
      {children}
    </authContext.Provider>
  );
}

export default AuthState;

export const useAuthState = () => useContext(authContext);
