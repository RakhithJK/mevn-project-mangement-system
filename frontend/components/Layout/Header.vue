<template>
  <nav class="navbar" v-if="loggedIn">
    <NuxtLink to="/" class="logo"> CodeUp </NuxtLink>

    <div class="right-nav">
      <ul class="nav-links">
        <li class="nav-item">
          <NuxtLink to="/"> Home </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/projects"> Projects </NuxtLink>
        </li>
        <li class="nav-item">
          <a @click="logout">Logout</a>
        </li>
      </ul>
      <form>
        <input type="text" placeholder="Search for projects..." />
        <button>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21.75C5.85 21.75 1.25 17.15 1.25 11.5C1.25 5.85 5.85 1.25 11.5 1.25C17.15 1.25 21.75 5.85 21.75 11.5C21.75 17.15 17.15 21.75 11.5 21.75ZM11.5 2.75C6.67 2.75 2.75 6.68 2.75 11.5C2.75 16.32 6.67 20.25 11.5 20.25C16.33 20.25 20.25 16.32 20.25 11.5C20.25 6.68 16.33 2.75 11.5 2.75Z"
              fill="#292D32"
            />
            <path
              d="M22.0004 22.7499C21.8104 22.7499 21.6204 22.6799 21.4704 22.5299L19.4704 20.5299C19.1804 20.2399 19.1804 19.7599 19.4704 19.4699C19.7604 19.1799 20.2404 19.1799 20.5304 19.4699L22.5304 21.4699C22.8204 21.7599 22.8204 22.2399 22.5304 22.5299C22.3804 22.6799 22.1904 22.7499 22.0004 22.7499Z"
              fill="#292D32"
            />
          </svg>
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import { checkLogin } from "@/handlers/auth"

export default {
  data() {
    return {
      loggedIn: false,
    }
  },
  mounted() {
    this.loggedIn = checkLogin()
  },
  watch: {
    $route() {
      this.loggedIn = checkLogin()
    },
  },
  methods: {
    logout(e) {
      e.preventDefault()
      // Setting local variable to false, so the navbar will hide
      this.loggedIn = false
      // Removing token from localstorage
      localStorage.removeItem("token")
      // Redirect the user to login page
      this.$router.push("/auth/login")
    },
  },
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 15px 0;
}

.navbar .logo {
  color: var(--theme-color-1);
  font-size: 24px;
  text-decoration: none;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
}

.navbar .right-nav,
.navbar .nav-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.navbar .nav-links {
  list-style: none;
}

.navbar .nav-links .nav-item {
  margin-right: 41px;
}

.navbar .nav-links .nav-item a {
  color: #bdbdbd;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  text-decoration: none;
  transition: 100ms;
  font-size: 16px;
  cursor: pointer;
}

.navbar .nav-links .nav-item a:hover,
.navbar .nav-links .nav-item a.nuxt-link-exact-active {
  color: white;
}

.navbar .right-nav form {
  position: relative;
}

.navbar .right-nav form input {
  background-color: #002c37;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 10px 16px;
  padding-right: 54px;
  font-size: 1rem;
  color: white;
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  width: 385px;
}

.navbar .right-nav form input::placeholder {
  color: #9a9a9a;
}

.navbar .right-nav form button {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  height: 38px;
  width: 38px;
  border-radius: 5px;
  background-color: var(--theme-color-1);
  color: var(--theme-color-2);
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
