import { defineStore } from 'pinia'
import axios from 'axios'
const backendURL = import.meta.env.VITE_BACKEND_URL;
export const useDataStore = defineStore('data', {
  state: () => ({
    services: [],
    services_total: null,
    barbers: [],
    barbers_total: null,
    items: [],
    errorMessage: "",
    errorCode: "",
    loading: false,
  }),
  actions: {
    async get_services(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        this.loading = true;
        const response = await axios.get(backendURL + '/services', {
          params: {
            page: page,
            perpage: perpage,
          }
        });
        this.services = response.data;
      } catch (error) {
        this.handleError(error)
      }
      this.loading = false;
    },
    async get_services_total() {
      this.errorMessage = "";
      try {
        this.loading = true;
        const response = await axios.get(backendURL + '/services/total');
        this.services_total = response.data;
      } catch (error) {
        this.handleError(error)
      }
      this.loading = false;
    },

    async get_barbers(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        this.loading = true;
        const response = await axios.get(backendURL + '/barbers', {
          params: {
            page: page,
            perpage: perpage,
          }
        });
        this.barbers = response.data;
      } catch (error) {
        this.handleError(error)
      }
      this.loading = false;
    },
    async get_barbers_total() {
      this.errorMessage = "";
      try {
        this.loading = true;
        const response = await axios.get(backendURL + '/barbers/total');
        this.barbers_total = response.data;
      } catch (error) {
        this.handleError(error)
      }
      this.loading = false;
    },
    handleError(error) {
      if (error.response){
        this.errorMessage = error.response.data.message;
        console.log(error)
      } else if (error.request) {
        this.errorMessage = error.message;
        console.log(error)
      } else {
        console.log(error)
      }
    },
    async create_service(formData) {
      this.errorMessage = "";
      try {
        const response = await axios.post(backendURL + '/service', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('token')
            },
          }
        );
        this.errorCode = response.data.code;
        this.errorMessage = response.data.message;
      } catch (error) {
        if (error.response) {
          this.errorCode = 11;
          this.errorMessage = error.response.data.message;
          console.log(error)
        } else if (error.request) {
          this.errorCode = 12;
          this.errorMessage = error.message;
          console.log(error)
        } else {
          this.errorCode = 13;
          console.log(error)
        }
      }
    }
  }
})
