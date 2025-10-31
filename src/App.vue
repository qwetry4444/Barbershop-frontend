<script>
import { useAuthStore } from '@/stores/AuthStore.js'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'


export default {
  components: {Button, Menubar, InputText},
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/',
          shortcut: 'Ctrl + H',
          submenu: [

          ]
        },
        {
          label: "Услуги",
          icon: 'pi pi-fw pi-shopping-cart',
          route: '/services',
        },
        {
          label: "Барберы",
          icon: 'pi pi-fw pi-users',
          route: '/barbers',
        }
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError() {
      return this.authStore.errorMessage;
    }
  },
  methods: {
    login() {
      this.authStore.login({ email: this.email, password: this.password });
    },
    logout() {
      this.authStore.logout();
    }
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  }
};

</script>

<template>
  <div class="page-wrapper">
    <Menubar :model="items" class="custom-menubar">
      <template #start>
        <router-link to="/" class="logo-link">
          <img
            src="/src/assets/logo.svg"
            alt="Логотип"
            class="logo-image"
          />
        </router-link>
      </template>

      <template #item="{ item, props }">
        <router-link
          v-if="item.route"
          :to="item.route"
          class="menu-item-link"
          v-bind="props.action"
        >
          <span :class="item.icon" />
          <span class="menu-label">{{ item.label }}</span>
        </router-link>
      </template>

      <template #end>
        <div class="auth-section">
          <div v-if="isAuthenticated && user" class="user-info">
            <span class="user-greeting">
              <i class="pi pi-user" />
              {{ user.name }}
            </span>
            <Button
              label="Выйти"
              icon="pi pi-sign-out"
              severity="secondary"
              text
              @click="logout"
            />
          </div>

          <form v-else @submit.prevent="login" class="login-form">
            <div class="form-inputs">
              <InputText
                v-model="email"
                type="email"
                placeholder="Email"
                required
                :class="{'p-invalid': authError}"
                class="input-field"
              />
              <InputText
                v-model="password"
                type="password"
                placeholder="Пароль"
                required
                :class="{'p-invalid': authError}"
                class="input-field"
              />
              <Button
                type="submit"
                label="Войти"
                icon="pi pi-sign-in"
                class="login-button"
              />
            </div>
            <small v-if="authError" class="error-message">
              <i class="pi pi-exclamation-circle" />
              {{ authError }}
            </small>
          </form>
        </div>
      </template>
    </Menubar>

    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.custom-menubar {
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 2rem;
  background: #ffffff;
}

.content-wrapper {
  flex: 1;
  padding: 2rem;
  width: 100%;
  margin: 0 auto;
}


:deep(.p-menubar) {
  display: flex;
  align-items: center;
}

:deep(.p-menubar-start) {
  flex: 0 0 auto;
}

:deep(.p-menubar-root-list) {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 2.5rem;
}

:deep(.p-menubar-end) {
  flex: 0 0 auto;
}


.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.2s;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo-image {
  width: 48px;
  height: 48px;
  object-fit: contain;
}


.menu-item-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  color: #212121;
  border-radius: 6px;
  transition: all 0.2s;
  font-weight: 500;
  font-size: 0.95rem;
}

.menu-item-link:hover {
  background: #f5f5f5;
  color: #000000;
}

.menu-item-link .pi {
  font-size: 1.1rem;
}

.menu-label {
  font-weight: 500;
}


.auth-section {
  display: flex;
  align-items: center;
  min-width: fit-content;
}


.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-greeting {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  color: #212121;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid #e0e0e0;
}


.user-greeting .pi {
  font-size: 1rem;
}


.login-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-inputs {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.input-field {
  min-width: 150px;
  font-size: 0.9rem;
}

.input-field::placeholder {
  font-size: 0.9rem;
}

.login-button {
  white-space: nowrap;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #000000;
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  border-left: 2px solid #000000;
}


.input-field {
  min-width: 120px;
}
</style>
