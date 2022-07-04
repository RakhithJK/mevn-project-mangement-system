<template>
  <NuxtLink :to="slug" style="text-decoration: none">
    <div class="project-item card">
      <h4 class="title">{{ title }}</h4>
      <p class="description">
        {{ description }}
      </p>
      <ul class="stats">
        <li>Started On: {{ startedOn }}</li>
        <li>Deadline: {{ deadline }}</li>
        <li>Total Worked: {{ totalWorked }}</li>
      </ul>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    title: String,
    description: String,
    slug: String,
    startedOn: String,
    deadline: String,
    totalWorked: String,
  },
};
</script>
