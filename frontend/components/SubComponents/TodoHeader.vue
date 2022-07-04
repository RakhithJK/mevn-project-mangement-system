<template>
  <div :class="`todo-head todo-item ${type}`">
    <h4 class="title">{{ title }}</h4>
    <button @click="onClick" class="add-link" v-if="type === 'todo'">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
          fill="#001E26"
        />
        <path
          d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
          fill="#001E26"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    onClick: Function,
    type: String,
  },
}
</script>

<style scoped>
.todo-head {
  --todo-color: #ffc700;
  --pending-color: #00fff0;
  --complete-color: #00ff47;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 2px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  min-height: 50px;
}

.todo-head:hover {
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
}

.todo-head.todo {
  border-color: var(--todo-color);
}

.todo-head .add-link {
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-radius: 2px;
  transition: 100ms;
}

.todo-head .add-link svg path {
  fill: white;
  transition: 100ms;
}

.todo-head:hover .add-link {
  background-color: var(--todo-color);
}

.todo-head:hover .add-link svg path {
  fill: var(--theme-color-2);
}

.todo-head.pending {
  border-color: var(--pending-color);
}

.todo-head.complete {
  border-color: var(--complete-color);
}

.todo-head .title {
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
}
</style>
