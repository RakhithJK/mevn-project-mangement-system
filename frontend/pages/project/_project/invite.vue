<template>
  <div class="wrapper">
    <h2 class="title">Invite a new team member</h2>
    <form>
      <div class="input-box">
        <input
          type="text"
          id="email"
          class="input-field"
          v-model="email"
          required
        />
        <label for="email" class="input-label">Email Address</label>
      </div>
      <div class="button-wrapper">
        <button type="submit" class="btn primary" @click="invite">
          Send Invite
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import toast from "@/handlers/toast"
import { validateEmail } from "@/handlers/string"
import { checkLogin } from "@/handlers/auth"
import config from "@/config"

export default {
  components: {
    toast,
  },
  data() {
    return {
      email: "",
    }
  },
  methods: {
    invite(e) {
      e.preventDefault()

      // If email or password is empty
      if (this.email === "")
        return toast({ text: "Email is required.", type: "error" })

      // If email format is invalid
      if (!validateEmail(this.email))
        return toast({ text: "Invalid email format.", type: "error" })

      // Send request to API
      fetch(`${config.API_ENDPOINT}/team/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          projectId: this.$route.params.project,
          token: checkLogin(),
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
            // Redirect user to projects page
            this.email = ""
            return toast({
              text: "Invite successfully sent to the user.",
              type: "success",
            })
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

<style scoped>
.wrapper {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding: 4rem 0;
}

.wrapper .title {
  font-size: 1.7rem;
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
