import { create } from "zustand";
import api from "../Api";
import { jwtDecode } from "jwt-decode"



interface User {
  readonly _id: string;
  username: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  message: string | null;
  

  register: (formData: any) => Promise<void>; //represents a promise that does not return any value when it resolves. Essentially, it indicates that the asynchronous operation will complete, but there's no result to be returned.
  login: (formData: any) => Promise<void>;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (formData: any) => Promise<void>;
  resetPassword: (token: string | undefined, password: string) => Promise<void>;
  handleGoogleAuth: (credentials: any) => Promise<void>;
}


export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,
  message: null,

  register: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`/api/auth/register`, formData,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      const data = response.data;
      set({ isLoading: false, user: data.user, isAuthenticated: true, error: null });
    } catch (error: any) {
      if (error.response.data.message === "Registration failed: Your email is not authorized. Please contact support for access.") {
        set({ isLoading: false, error: "This email is not authorized. Please contact support for access" });
        throw error;
      }
      if (error.message && error.code === "ERR_NETWORK") {
        set({ isLoading: false, error: "Sorry, something went wrong and we are fixing it. Please try again later or contact support for further assistance." });
        throw error;
      }
      set({ isLoading: false, error: error.response.data.message|| "Sorry, something went wrong and we are fixing it. Please try again later or contact support for further assistance." });
      throw error;
    }
  },

  login: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`/api/auth/login`,formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      const data = response.data;
      set({ isLoading: false, user: data.user, isAuthenticated: true, error: null });
    } catch (error: any) {
      if (error.message && error.code === "ERR_NETWORK") {
        set({ isLoading: false, error: "Sorry, something went wrong and we are fixing it. Please try again later or contact support for further assistance." });
        throw error;
      }
      set({ isLoading: false, error: error.response.data.message|| "Sorry, something went wrong and we are fixing it. Please try again later or contact support for further assistance." });
      throw error;
    }
  },


  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await api.get(`/api/auth/check-auth`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = response.data
      if(data.success) {
        set({ isAuthenticated: true, user: data.user, isCheckingAuth: false });
      } else {
        set({ isAuthenticated: false, user: null, isCheckingAuth: false });
      }
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: false, user: null });
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
        await api.get(`/api/auth/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      set({ isLoading: false, isAuthenticated: false, user: null , error: null });
    } catch (error: any) {
      if (error.message && error.code === "ERR_NETWORK") {
        set({ isLoading: false, error: "Sorry, something went wrong and we are fixing it. Please try again later or contact support for further assistance." });
        throw error;
      }
      set({ isLoading: false, error: error.response.data.message|| "Sorry, something went wrong and we are fixing it. Please try again later or contact support  for further assistance." });
      throw error;
    }
  },
  forgotPassword: async (formData) => {
    set({ isLoading: true, error: null});
    try {
      const response = await api.post(`/api/auth/forgot-password`,
        formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
     const data = response.data;
     set({ isLoading: false, message: data.message, error: null });
    } catch (error: any) {
      if (error.message && error.code === "ERR_NETWORK") {
        set({ isLoading: false, error: "Sorry, something went wrong and we are fixing it. Please try again later or contact support for further assistance." });
        throw error;
      }
      set({ isLoading: false, error: error.response.data.message|| "Sorry, something went wrong and we are fixing it. Please try again later or contact support for further assistance." });
      throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post(`/api/auth/reset-password/${token}`,{
        newPassword:password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      const data = response.data;
      set({ isLoading: false, message: data.message, error: null });
    } catch (error: any) {
      if (error.message && error.code === "ERR_NETWORK") {
        set({ isLoading: false, error: "Sorry, something went wrong and we are fixing it. Please try again later or contact support for further assistance." });
        throw error;
      }
      set({ isLoading: false, error: error.response.data.message|| "Sorry, something went wrong and we are fixing it. Please try again later or contact support for further assistance." });
      throw error;
    }
  },

  handleGoogleAuth: async (credentials) => {
    try {
      credentials = jwtDecode(credentials)
      console.log(credentials);
      if (!credentials) {
        set({ isLoading: false, error:"Sorry, something went wrong and we are fixing it. Please try again later or contact support for further assistance." });
        return
      }
      else {
        const payload = {
          email: credentials.email,
          name: credentials.name,
          sub: credentials.sub,
        }
        const response = await api.post('api/auth/google-auth', payload, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        })
        const data = response.data.success;
        set({ isLoading: false, user: data.user, isAuthenticated: true, error: null });
          
      }
    } catch (error: any) {
      if (error.response.data.message === "Error during Google authentication: Your email is not authorized. Please contact support for access.") {
        set({ isLoading: false, error: "This email is not authorized. Please contact support for access" });
        throw error;
      }
      set({ isLoading: false, error: error.response.data.message|| "Sorry, something went wrong and we are fixing it. Please try again later or contact support for further assistance." });
      throw error;
     }
  }
}));
