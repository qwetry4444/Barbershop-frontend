<script>
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useDataStore } from "@/stores/dataStore.js"

export default {
  components: { InputText, InputNumber, Button, Toast },
  data() {
    return {
      dataStore: useDataStore(),
      serviceName: '',
      servicePrice: null,
      serviceImage: null,
    }
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage
    },
    errorCode() {
      return this.dataStore.errorCode
    },
  },

  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-file mx-3"></span>' + file.name;
        this.serviceImage = file
      } else {
        document.getElementById('file-label').innerHTML = '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
        this.serviceImage = null;
      }
    },
    async createService() {
      const formData = new FormData();
      formData.append('name', this.serviceName);
      formData.append('price', this.servicePrice);
      formData.append('image', this.serviceImage);
      await this.dataStore.create_service(formData);
      if (this.errorCode > 0) {
        this.$toast.add({severity:'error', summary: "Ошибки добавления данных", detail: `Код: ${this.errorCode} — ${this.errorMessage}`, life: 8000});
      } else {
        this.$toast.add({severity:'success', summary: "Данные успешно добавлены", life: 8000});
      }
    }
  }
}
</script>

<template>
  <div class="service-form-container">
    <div class="form-card">
      <h2 class="form-title">Создание услуги</h2>

      <form @submit.prevent="createService" class="service-form">
        <div class="form-field">
          <label for="service-name" class="form-label">
            Название услуги
          </label>
          <InputText
            id="service-name"
            v-model="serviceName"
            placeholder="Стрижка мужская"
            class="w-full"
          />
        </div>

        <div class="form-field">
          <label for="service-price" class="form-label">
            Стоимость
          </label>
          <InputNumber
            id="service-price"
            v-model="servicePrice"
            mode="currency"
            currency="RUB"
            locale="ru-RU"
            placeholder="0 ₽"
            :min="0"
            class="w-full"
          />
        </div>

        <div class="form-field">
          <input
            type="file"
            hidden
            id="file"
            name="file"
            @change="changeCaption"
            required
            accept="image/*"
          >

          <label for="file" class="w-full h-full flex flex-col items-center justify-center cursor-pointer" id="file-label">
            <span class="pi pi-upload mx-3"> Выбрать изображение</span>
          </label>
        </div>


        <div class="form-actions">
          <Button
            type="submit"
            label="Создать услугу"
            icon="pi pi-check"
          />
        </div>
      </form>
    </div>
  </div>
  <Toast position="bottom-right"/>
</template>

<style scoped>
.service-form-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  background: #fafafa;
}

.form-card {
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #212121;
  margin: 0 0 2rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.service-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #212121;
}

.w-full {
  width: 100%;
}
.upload-icon {
  font-size: 3rem;
  color: #bdbdbd;
  margin-bottom: 1rem;
}

.upload-placeholder p {
  margin: 0.5rem 0 0.25rem 0;
  font-weight: 500;
  color: #212121;
}

.upload-placeholder small {
  color: #9e9e9e;
}


.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
}

</style>
