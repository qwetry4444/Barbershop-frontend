<script setup>
</script>

<template>
  <div class="layout">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/services">Услуги</router-link></li>
          <li><router-link to="/barbers">Барберы</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <div v-if="isAuthenticated && user" class="auth-block">
        <p>Welcome, {{ user.name }}</p>
        <button @click="logout">Logout</button>
      </div>

      <div v-else class="auth-block">
        <form @submit.prevent="login">
          <div>
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" required />
          </div>
          <div>
            <label for="password">Password:</label>
            <input v-model="password" type="password" id="password" required />
          </div>
          <button type="submit">Login</button>
          <p v-if="authError" class="error">{{ authError }}</p>
        </form>
        <router-view></router-view>
      </div>
    </main>

  </div>
</template>

<script>
import { useAuthStore } from '@/stores/AuthStore.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore()
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

<style scoped>
/* Основная обёртка — всё в колонку, центрируем контент */
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;   /* центрирует всё по горизонтали */
  min-height: 100vh;
}

/* Шапка */
header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

/* Меню */
nav ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  padding: 0;
  margin: 0;
}

nav a {
  text-decoration: none;
  color: inherit;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

/* Основной контент */
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 2rem;
}

/* Форма входа / приветствие */
.auth-block {
  text-align: center;
  width: 100%;
}

.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
