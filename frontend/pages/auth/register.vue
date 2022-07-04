<template>
  <div class="login-wrapper">
    <h2 class="title">Register a new account</h2>
    <form>
      <div class="row" style="margin-inline: -0.5rem">
        <div class="col-1-2" style="padding-inline: 0.5rem">
          <div class="input-box">
            <input
              type="text"
              id="first-name"
              class="input-field"
              v-model="firstName"
              required
            />
            <label for="first-name" class="input-label">First Name</label>
          </div>
        </div>
        <div class="col-1-2" style="padding-inline: 0.5rem">
          <div class="input-box">
            <input
              type="text"
              id="last-name"
              class="input-field"
              v-model="lastName"
              required
            />
            <label for="last-name" class="input-label">Last Name</label>
          </div>
        </div>
      </div>
      <div class="input-box">
        <input
          type="text"
          id="username"
          class="input-field"
          v-model="username"
          required
        />
        <label for="username" class="input-label">Username</label>
      </div>
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
      <div class="input-box">
        <input
          type="password"
          id="repeat-password"
          class="input-field"
          v-model="repeatPassword"
          required
        />
        <label for="repeat-password" class="input-label">
          Repeat Password
        </label>
      </div>
      <div class="button-wrapper">
        <button type="submit" class="btn primary" @click="register">
          Sign Up
        </button>
      </div>
      <p class="bottom-text" style="margin-top: 1rem; font-size: 0.9rem">
        Already have an account?
        <NuxtLink to="/auth/login">Sign In</NuxtLink>
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
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    }
  },
  methods: {
    register(e) {
      e.preventDefault()

      // If email or password is empty
      if (
        this.firstName === "" ||
        this.lastName === "" ||
        this.username === "" ||
        this.email === "" ||
        this.password === "" ||
        this.repeatPassword === ""
      )
        return toast({ text: "All fields are required.", type: "error" })

      // Checking if password and repeat password is not same
      if (this.password !== this.repeatPassword)
        return toast({ text: "Password not match.", type: "error" })

      // Send request to API
      fetch(`${config.API_ENDPOINT}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
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
