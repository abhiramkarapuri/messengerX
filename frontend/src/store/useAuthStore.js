import {create} from 'zustand'
import {axiosInstance} from "../lib/axios"
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
  authUser: null,
  isCheckingAuth:true,
  isSigningUp:false,

  checkAuth: async () =>{
    try {
      const res = await axiosInstance.get("/auth/check")
      set({authUser: res.data})
    } catch (error) {
      console.log("error in authCheck:",error)
      set({authUser:null})
    }
      finally {
        set({isCheckingAuth: false});
      }
  },

  signup: async(data) =>{
    set({isSigningUp:true})
    try {
      const res = await axiosInstance.post("/auth/signup",data);
      set({authUser: res.data}); //data we sent through backend

      toast.success("Account created successfully")
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({isSigningUp:true})
    }
  }
  // authUser: {name:"john",_id:123,age:25},
  // isLoggedIn:false,
  // isLoading:false,

  // login:()=>{
  //   console.log("We just logged in");
  //   set({ isLoggedIn:true, isLoading: true});
  // }
}));