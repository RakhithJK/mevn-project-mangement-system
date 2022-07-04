<template>
  <div class="wrapper">
    <h2 class="title">Add a new project</h2>
    <form>
      <div class="row" style="margin-inline: -0.5rem">
        <div class="col-1-2" style="padding-inline: 0.5rem">
          <div class="input-box">
            <input
              type="text"
              id="title"
              class="input-field"
              v-model="title"
              required
            />
            <label for="title" class="input-label">Title</label>
          </div>
        </div>
        <div class="col-1-2" style="padding-inline: 0.5rem">
          <div class="input-box">
            <input
              type="text"
              id="deadline"
              class="input-field"
              v-model="deadline"
              required
            />
            <label for="deadline" class="input-label">Deadline</label>
          </div>
        </div>
      </div>
      <div class="input-box">
        <textarea
          id="description"
          class="input-field"
          v-model="description"
          style="height: 200px"
          required
        ></textarea>
        <label for="description" class="input-label">Description</label>
      </div>
      <div class="button-wrapper">
        <button type="submit" class="btn primary" @click="add">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
import toast from "@/handlers/toast"
import config from "@/config"
import { checkLogin } from "@/handlers/auth"

export default {
  components: {
    toast,
  },
  data() {
    return {
      title: "",
      description: "",
      deadline: "--",
    }
  },
  methods: {
    add(e) {
      e.preventDefault()

      // If email or password is empty
      if (this.title === "")
        return toast({ text: "Title is required.", type: "error" })

      // Send request to API
      fetch(`${config.API_ENDPOINT}/projects/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.title,
          description: this.description,
          deadline: this.deadline,
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
            this.$router.push("/projects")
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
  max-width: 800px;
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
