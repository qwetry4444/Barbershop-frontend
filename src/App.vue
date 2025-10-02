<script setup>

</script>

<template>
    <nav>
      <div v-if="isAuthenticated && user">
        Welcome, {{ user.name }}
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <form @submit.prevent="login">
          <div>
            <label for="email">Email:</label>
            <input v-model="email" type="email" id="email" required/>
          </div>
          <div>
            <label for="password">Password:</label>
            <input v-model="password" type="password" id="password" required/>
          </div>
          <button type="submit">Login</button>
          <p v-if="authError" class="error">{{ authError }}</p>
        </form>
      </div>
    </nav>
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
      return this.authStore.errorMessage
    }
  },
  methods: {
    login() {
      this.authStore.login({email: this.email, password: this.password})
    },
    logout() {
      this.authStore.logout()
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser()
    }
  }
}
</script>





<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

.error {
  color: red;
}
</style>
