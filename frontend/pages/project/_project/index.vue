<template>
  <main class="py-50px" v-if="project._id">
    <!-- Header -->
    <div class="project-layout" style="align-items: center">
      <div class="left">
        <div class="project-item project">
          <h4 class="title">{{ project.title }}</h4>
          <p class="description">
            {{ project.description }}
          </p>
          <ul class="stats">
            <li>
              Started On: {{ new Date(project.createdAt).toDateString() }}
            </li>
            <li>Deadline: {{ project.deadline }}</li>
            <li>Last Year Worked: {{ totalWorked }}</li>
          </ul>
          <button
            :class="`${
              started === true ? 'started' : 'stopped'
            } btn primary sm`"
            style="margin-top: 15px"
            @click="startWorking"
            v-if="totalWorked"
          >
            {{ started === true ? "Stop working" : "Start working" }}
          </button>
        </div>
      </div>
      <div class="right">
        <NuxtLink
          :to="`/project/${projectId}/invite`"
          class="btn sm"
          style="margin-right: 15px"
        >
          Invite
        </NuxtLink>
        <NuxtLink
          v-for="team in this.teams"
          :key="team._id"
          :title="`${team.firstName} ${team.lastName}`"
          :to="`/project/${projectId}/report/${team._id}`"
          :class="`team-item ${team.password === checkLogin() && 'active'}`"
        >
          {{ team.username.substring(0, 1).toUpperCase() }}
        </NuxtLink>
      </div>
    </div>

    <!-- Modals -->
    <ModalContainer
      v-if="showAddTodoModal"
      :onClose="
        () => {
          this.showAddTodoModal = false
        }
      "
    >
      <div class="wrapper">
        <h2 class="title">Add a new todo</h2>
        <form>
          <div class="input-box">
            <input
              type="text"
              id="title"
              class="input-field"
              v-model="addTodoTitle"
              required
            />
            <label for="title" class="input-label">Title</label>
          </div>
          <div class="input-box">
            <textarea
              id="description"
              class="input-field"
              v-model="addTodoDescription"
              style="height: 200px"
              required
            ></textarea>
            <label for="description" class="input-label">Description</label>
          </div>
          <div class="input-box">
            <textarea
              id="attachments"
              class="input-field"
              v-model="addTodoAttachments"
              style="height: 100px"
              required
            ></textarea>
            <label for="attachments" class="input-label">Attachments</label>
          </div>
          <div class="button-wrapper">
            <button type="submit" class="btn primary" @click="addTodo">
              Add
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>

    <!-- Main -->
    <div class="row" style="margin-top: 90px" v-if="todos">
      <div class="col-1-3">
        <div class="todos">
          <SubComponentsTodoHeader
            title="Todo"
            :onClick="
              () => {
                this.showAddTodoModal = true
              }
            "
            type="todo"
          />
          <div class="todos-wrapper">
            <SubComponentsTodoItem
              v-for="todo in todos.todo"
              :key="todo._id"
              :_id="todo._id"
              :title="todo.title"
              :description="todo.description != ''"
              :attachments="todo.attachments != ''"
              :_description="todo.description"
              :_attachments="todo.attachments"
              :status="todo.status"
              :fetchTodos="fetchTodos"
              :projectId="projectId"
            />
          </div>
        </div>
      </div>
      <div class="col-1-3">
        <div class="todos">
          <SubComponentsTodoHeader title="Pending" type="pending" />
          <div class="todos-wrapper">
            <SubComponentsTodoItem
              v-for="todo in todos.pending"
              :key="todo._id"
              :_id="todo._id"
              :title="todo.title"
              :description="todo.description != ''"
              :attachments="todo.attachments != ''"
              :_description="todo.description"
              :_attachments="todo.attachments"
              :status="todo.status"
              :fetchTodos="fetchTodos"
              :projectId="projectId"
            />
          </div>
        </div>
      </div>
      <div class="col-1-3">
        <div class="todos">
          <SubComponentsTodoHeader title="Complete" type="complete" />
          <div class="todos-wrapper">
            <SubComponentsTodoItem
              v-for="todo in todos.complete"
              :key="todo._id"
              :_id="todo._id"
              :title="todo.title"
              :description="todo.description != ''"
              :attachments="todo.attachments != ''"
              :_description="todo.description"
              :_attachments="todo.attachments"
              :status="todo.status"
              :fetchTodos="fetchTodos"
              :projectId="projectId"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
  <main class="py-50px loading" v-else>Loading...</main>
</template>

<script>
import toast from "@/handlers/toast"
import config from "@/config"
import { checkLogin } from "@/handlers/auth"
import { convertMs } from "@/handlers/time"

export default {
  components: {
    toast,
  },
  data() {
    return {
      started: false,
      project: [],
      teams: [],
      token: null,
      projectId: null,
      totalWorked: 0,
      showAddTodoModal: false,
      addTodoTitle: "",
      addTodoDescription: "",
      addTodoAttachments: "",
      todos: null,
    }
  },
  async mounted() {
    this.projectId = this.$route.params.project
    this.token = checkLogin()
    this.project = this.fetchProject()
    this.project = await this.project
    if (this.project.error) {
      return toast({ text: this.project.error, type: "error" })
    }
    this.teams = this.project.members
    this.project = this.project.data
    const workedTime = await this.fetchWorkedTime()
    this.totalWorked = convertMs(workedTime.reports[3].time)

    // Fetching todos
    this.fetchTodos()

    // Checking if localstorage start time isset change the started to true, otherwise change it to false
    if (localStorage.getItem("workStartedTime")) this.started = true
    else this.started = false
  },
  methods: {
    checkLogin,
    async fetchWorkedTime() {
      return fetch(`${config.API_ENDPOINT}/reports/${this.projectId}/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
      }).then((res) => res.json())
    },
    async fetchProject() {
      return fetch(`${config.API_ENDPOINT}/projects/${this.projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
      }).then((res) => res.json())
    },
    async fetchTodos() {
      const todoList = await fetch(
        `${config.API_ENDPOINT}/todo/${this.projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        }
      ).then((res) => res.json())

      this.todos = todoList
    },
    startWorking(e) {
      e.preventDefault()

      // Getting timestamps
      const timestamps = new Date()

      if (!this.started) {
        // Adding start time to localstorage
        localStorage.setItem("workStartedTime", timestamps)

        // Send request to server to set working status to 1 in profile
        fetch(`${config.API_ENDPOINT}/reports/set-working`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userToken: this.token,
            value: 1,
          }),
        })
      } else {
        // Send request to server to set working status to 0 in profile
        fetch(`${config.API_ENDPOINT}/reports/set-working`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userToken: this.token,
            value: 0,
          }),
        })

        // Getting started time from localstorage
        const startedWorking = localStorage.getItem("workStartedTime")
        // Converting it to date
        const startedTime = new Date(startedWorking)
        const totalTime = timestamps.getTime() - startedTime.getTime() // totalTime is going to be the total time of working in milliseconds
        // Removing localstorage value
        localStorage.removeItem("workStartedTime")

        // Sending request for creating a new report with time
        fetch(`${config.API_ENDPOINT}/reports/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            workedTime: totalTime,
            startingTime: startedTime.getTime(),
            endingTime: timestamps.getTime(),
            projectId: this.projectId,
            userToken: this.token,
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
              return toast({
                text: `Your working time is ${convertMs(totalTime)}.`,
                type: "success",
              })
            } else {
              return toast({
                text: "Something wrong went.",
                type: "error",
              })
            }
          })
      }

      // Set started with the opposite value
      this.started = !this.started
    },
    addTodo(e) {
      e.preventDefault()

      // If title is empty
      if (this.addTodoTitle === "")
        return toast({ text: "Title is required.", type: "error" })

      // Send request to API
      fetch(`${config.API_ENDPOINT}/todo/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.addTodoTitle,
          description: this.addTodoDescription,
          attachments: this.addTodoAttachments,
          projectId: this.projectId,
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
            // Clearing text fields
            this.addTodoTitle = ""
            this.addTodoDescription = ""
            this.addTodoAttachments = ""
            // Showing success message and hide modal
            toast({
              text: "Todo successfully added.",
              type: "success",
            })
            this.showAddTodoModal = false
            // Reloading todo container
            this.fetchTodos()
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
.todos-wrapper {
  height: 500px;
  overflow-y: scroll;
  margin-right: -16px;
}

.todos-wrapper::-webkit-scrollbar-thumb {
  display: none;
}

.todos-wrapper:hover::-webkit-scrollbar-thumb {
  display: block;
}

.right {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.team-item {
  width: 35px;
  height: 35px;
  border-radius: 3px;
  object-fit: cover;
  display: block;
  color: var(--theme-color-1);
  text-decoration: none;
  font-size: 1rem;
  background-color: #00151a;
  text-align: center;
  margin-right: 7px;
  line-height: 35px;
}

.team-item.active {
  background-color: var(--theme-color-1);
  color: #00151a;
}

.started,
.started:hover,
.started:focus {
  background-color: #ffc700;
}

.stopped,
.stopped:hover,
.stopped:focus {
  background-color: #00ff47;
}

.wrapper .title {
  font-size: 1.7rem;
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
