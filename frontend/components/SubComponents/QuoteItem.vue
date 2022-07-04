<template>
  <div class="card">
    <p class="quote">“{{ quote }}”</p>
    <span class="author">- {{ author }}</span>
  </div>
</template>

<script>
export default {
  props: {
    quote: String,
    author: String,
  },
};
</script>

<style scoped>
.card .quote {
  color: white;
  font-style: italic;
  font-weight: 400;
  font-size: 1rem;
  text-align: center;
}

.card .author {
  text-align: right;
  color: #BDBDBD;
  margin-top: 8px;
  display: block;
}
</style>
