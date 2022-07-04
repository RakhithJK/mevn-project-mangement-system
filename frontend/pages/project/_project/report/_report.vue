<template>
  <main class="py-50px" v-if="data !== null">
    <div class="header">
      <h1 class="title">{{ data.project.title }}</h1>
      <div class="name">
        Report for {{ data.user.firstName }} {{ data.user.lastName }}. Currently
        <span :class="data.user.working == 1 ? 'working' : 'not-working'">{{
          data.user.working == 1 ? "Working" : "Not working"
        }}</span>
      </div>
    </div>
    <h3 class="item-head">Working Time</h3>
    <div class="row">
      <div class="col-1-4" v-for="report in data.reports" :key="report.text">
        <div class="card status-item">
          <span class="number">{{ convertMs(report.time) }}</span>
          <span class="text">{{ report.text }}</span>
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
      data: null,
      token: null,
    }
  },
  async mounted() {
    this.token = checkLogin()
    let response = this.fetchData()
    response = await response
    if (response.error) {
      return toast({ text: response.error, type: "error" })
    }
    this.data = response
  },
  methods: {
    convertMs,
    async fetchData() {
      return fetch(
        `${config.API_ENDPOINT}/reports/${this.$route.params.project}/${this.$route.params.report}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.token,
          },
        }
      ).then((res) => res.json())
    },
  },
}
</script>

<style scoped>
.header {
  margin-bottom: 2rem;
}

.header .title {
  color: white;
}

.header .name {
  font-size: 1rem;
  color: #ddd;
}

.header .name span {
  text-decoration: underline;
  font-style: italic;
}

.header .name .working {
  color: #00ff47;
}

.header .name .not-working {
  color: #ffc700;
}

.item-head {
  color: rgb(218, 218, 218);
  margin-bottom: 0.5rem;
  font-weight: 400;
}

.status-item .number {
  font-size: 2rem;
  color: white;
  font-weight: bold;
  display: block;
}

.status-item .text {
  display: block;
  font-size: 1rem;
  color: #ddd;
  margin-top: 5px;
}
</style>
