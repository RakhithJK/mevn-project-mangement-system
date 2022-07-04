<template>
  <div class="login-wrapper">
    <h2 class="title">Login to your account</h2>
    <form>
      <div class="input-box">
        <input
          type="text"
          id="email"
          class="input-field"
          v-model="email"
          required
        />
        <label for="email" class="input-label">Email</label>
      </div>
      <div class="input-box">
        <input
          type="password"
          id="password"
          class="input-field"
          v-model="password"
          required
        />
        <label for="password" class="input-label">Password</label>
      </div>
      <div class="button-wrapper">
        <button type="submit" class="btn primary" @click="login">
          Sign In
        </button>
        <p class="bottom-text">
          Forgot Password?
          <NuxtLink to="/auth/forgot-password">Click Here</NuxtLink>
        </p>
      </div>
      <p class="bottom-text" style="margin-top: 1rem; font-size: 0.9rem">
        Don't have an account?
        <NuxtLink to="/auth/register">Sign Up</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script>
import toast from "@/handlers/toast"
import { validateEmail } from "@/handlers/string"
import config from "@/config"

export default {
  components: {
    toast,
  },
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login(e) {
      e.preventDefault()

      // If email or password is empty
      if (this.email === "" || this.password === "")
        return toast({ text: "All fields are required.", type: "error" })

      // If email format is invalid
      if (!validateEmail(this.email))
        return toast({ text: "Invalid email format.", type: "error" })

      // Send request to API
      fetch(`${config.API_ENDPOINT}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      })
        .then((req) => req.json())
        .then((res) => {
          // If there is any error
          if (res.error) {
            return toast({
              text: res.error,
              type: "error",
            })
          }

          // Check if user is logged in
          if (res._id) {
            // Set token in localstorage
            localStorage.setItem("token", res.password)
            this.$router.push("/")
          } else {
            return toast({
              text: "Something wrong went.",
              type: "error",
            })
          }
        })
    },
  },
}
</script>

<style>
.login-wrapper {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 4rem 0;
}

.login-wrapper .title {
  font-size: 1.7rem;
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-wrapper .button-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.bottom-text {
  font-family: "Poppins", sans-serif;
  color: #e4e4e4;
}

.bottom-text a {
  color: var(--theme-color-1);
}
</style>
