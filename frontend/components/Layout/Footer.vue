<template>
  <footer class="footer">Coded with <span class="heart">❤</span></footer>
</template>

<style scoped>
.footer {
  padding: 1rem 0;
  text-align: center;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer .heart {
  color: #a83f39;
  cursor: default;
  width: 19.44px;
  height: 28px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 100ms;
}

.footer .heart:hover {
  color: red;
  font-size: 20px;
}
</style>
