import { defineStore } from 'pinia'
import axios from 'axios';
const backendURL = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    errorMessage: "",
  }),
  actions: {
    async login(credentials) {
      this.errorMessage = "";
      try {
        const response = await axios.post(backendURL + '/login', credentials);
        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response.data);
        } else if (error.request) {
          this.errorMessage = error.request.data.message;
          console.log(error.request);
        } else {
          console.log(error);
        }
      }
    },
    async getUser() {
      this.errrorMessage = "";
      try {
        const response = await axios.get(backendURL + '/user',
          { headers: {
            Authorization: `Bearer ` + this.token
            }});
        this.user = response.data.user;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error.response.data);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
      await axios.get(backendURL + '/logout')
    }
  }
})
