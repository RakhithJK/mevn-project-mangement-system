<template>
  <div>
    <main class="py-50px">
      <NuxtLink to="/project/add" class="btn" style="margin-bottom: 1rem">
        Add project
      </NuxtLink>
      <div class="project-layout">
        <div class="left" v-if="projects.length > 0">
          <SubComponentsProjectItem
            v-for="project of projects"
            :key="project._id"
            :title="project.title"
            :description="project.description"
            :slug="`/project/${project._id}`"
            :startedOn="new Date(project.createdAt).toDateString()"
            :deadline="project.deadline"
            totalWorked="10 hours"
          />
        </div>
        <div v-else class="left no-projects">No projects available</div>
        <div class="right">
          <SubComponentsQuoteItem
            quote="Any fool can write code that a computer can understand. Good programmers write code that humans can understand."
            author="Martin Fowler"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import config from "@/config"
import { checkLogin } from "@/handlers/auth"

export default {
  data() {
    return {
      projects: [],
      token: null,
    }
  },
  async mounted() {
    this.token = checkLogin()
    this.projects = this.fetchProjects()
    this.projects = await this.projects
  },
  methods: {
    async fetchProjects() {
      return fetch(`${config.API_ENDPOINT}/projects`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
      }).then((res) => res.json())
    },
  },
}
</script>

<style>
.project-layout {
  display: flex;
  flex-wrap: wrap;
}

.project-layout .left {
  flex: 4;
  padding-right: 30px;
}

.project-layout .right {
  flex: 2;
}

.no-projects {
  font-size: 1.3rem;
  color: #ddd;
  font-weight: 500;
  margin-top: 1rem;
}
</style>
