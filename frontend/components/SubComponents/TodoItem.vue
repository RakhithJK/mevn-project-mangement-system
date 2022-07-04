<template>
  <div>
    <div
      class="todo-item"
      @click="
        () => {
          showModal = true
        }
      "
    >
      <p class="title">{{ title }}</p>
      <ul class="info" v-if="description || attachments">
        <li v-if="description">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 5.25H3C2.59 5.25 2.25 4.91 2.25 4.5C2.25 4.09 2.59 3.75 3 3.75H21C21.41 3.75 21.75 4.09 21.75 4.5C21.75 4.91 21.41 5.25 21 5.25Z"
              fill="#ccc"
            />
            <path
              d="M12.47 10.25H3C2.59 10.25 2.25 9.91 2.25 9.5C2.25 9.09 2.59 8.75 3 8.75H12.47C12.88 8.75 13.22 9.09 13.22 9.5C13.22 9.91 12.89 10.25 12.47 10.25Z"
              fill="#ccc"
            />
            <path
              d="M21 15.25H3C2.59 15.25 2.25 14.91 2.25 14.5C2.25 14.09 2.59 13.75 3 13.75H21C21.41 13.75 21.75 14.09 21.75 14.5C21.75 14.91 21.41 15.25 21 15.25Z"
              fill="#ccc"
            />
            <path
              d="M12.47 20.25H3C2.59 20.25 2.25 19.91 2.25 19.5C2.25 19.09 2.59 18.75 3 18.75H12.47C12.88 18.75 13.22 19.09 13.22 19.5C13.22 19.91 12.89 20.25 12.47 20.25Z"
              fill="#ccc"
            />
          </svg>
        </li>
        <li v-if="attachments">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1998 17.3799C11.4998 17.3799 10.7898 17.1099 10.2598 16.5799C9.73977 16.0599 9.44977 15.3699 9.44977 14.6399C9.44977 13.9099 9.73977 13.2099 10.2598 12.6999L11.6697 11.2899C11.9597 10.9999 12.4397 10.9999 12.7297 11.2899C13.0197 11.5799 13.0197 12.0599 12.7297 12.3499L11.3198 13.7599C11.0798 13.9999 10.9498 14.3099 10.9498 14.6399C10.9498 14.9699 11.0798 15.2899 11.3198 15.5199C11.8098 16.0099 12.5998 16.0099 13.0898 15.5199L15.3098 13.2999C16.5798 12.0299 16.5798 9.96994 15.3098 8.69994C14.0398 7.42994 11.9798 7.42994 10.7098 8.69994L8.28973 11.1199C7.77973 11.6299 7.49976 12.2999 7.49976 13.0099C7.49976 13.7199 7.77973 14.3999 8.28973 14.8999C8.57973 15.1899 8.57973 15.6699 8.28973 15.9599C7.99973 16.2499 7.51974 16.2499 7.22974 15.9599C6.43974 15.1699 6.00977 14.1199 6.00977 12.9999C6.00977 11.8799 6.43974 10.8299 7.22974 10.0399L9.64978 7.61992C11.4998 5.76992 14.5198 5.76992 16.3698 7.61992C18.2198 9.46992 18.2198 12.4899 16.3698 14.3399L14.1498 16.5599C13.6098 17.1099 12.9098 17.3799 12.1998 17.3799Z"
              fill="#ccc"
            />
            <path
              d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
              fill="#ccc"
            />
          </svg>
        </li>
      </ul>
    </div>

    <!-- Modals -->
    <ModalContainer
      v-if="showModal"
      :onClose="
        () => {
          this.showModal = false
        }
      "
    >
      <div class="wrapper">
        <h2 class="title">Edit Todo</h2>
        <form>
          <div class="input-box">
            <input
              type="text"
              id="title"
              class="input-field"
              v-model="todoTitle"
              required
            />
            <label for="title" class="input-label">Title</label>
          </div>
          <div class="input-box">
            <select
              id="status"
              class="input-field"
              v-model="todoStatus"
              required
            >
              <option value="todo">Todo</option>
              <option value="pending">Pending</option>
              <option value="complete">Complete</option>
            </select>
            <label for="status" class="input-label">Status</label>
          </div>
          <div class="input-box">
            <textarea
              id="description"
              class="input-field"
              v-model="todoDescription"
              style="height: 200px"
              required
            ></textarea>
            <label for="description" class="input-label">Description</label>
          </div>
          <div class="input-box">
            <textarea
              id="attachments"
              class="input-field"
              v-model="todoAttachments"
              style="height: 100px"
              required
            ></textarea>
            <label for="attachments" class="input-label">Attachments</label>
          </div>
          <div class="button-wrapper">
            <button type="submit" class="btn primary" @click="update">
              Update
            </button>
            <button
              type="submit"
              class="btn"
              @click="deleteTodo"
              style="margin-left: 10px"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </ModalContainer>
  </div>
</template>

<script>
import toast from "@/handlers/toast"
import config from "@/config"
import { checkLogin } from "@/handlers/auth"

export default {
  data() {
    return {
      showModal: false,
      todoTitle: this.title,
      todoDescription: this._description,
      todoAttachments: this._attachments,
      todoStatus: this.status,
    }
  },
  props: {
    title: String,
    _id: String,
    description: Boolean,
    attachments: Boolean,
    status: String,
    _description: String,
    _attachments: String,
    fetchTodos: Function,
    projectId: String,
  },
  methods: {
    update(e) {
      e.preventDefault()

      // If title is empty
      if (this.todoTitle === "")
        return toast({ text: "Title is required.", type: "error" })

      // Send request to API
      fetch(`${config.API_ENDPOINT}/todo/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.todoTitle,
          description: this.todoDescription,
          attachments: this.todoAttachments,
          status: this.todoStatus,
          todoId: this._id,
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
            // Showing success message and hide modal
            toast({
              text: "Todo successfully updated.",
              type: "success",
            })
            this.showModal = false
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
    deleteTodo(e) {
      e.preventDefault()

      fetch(`${config.API_ENDPOINT}/todo/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId: this._id,
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
            // Showing success message and hide modal
            toast({
              text: "Todo successfully deleted.",
              type: "success",
            })
            this.showModal = false
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

<style>
.wrapper .title {
  font-size: 1.7rem;
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>
