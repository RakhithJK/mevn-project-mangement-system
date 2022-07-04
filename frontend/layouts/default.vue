<template>
  <div class="container">
    <LayoutHeader />
    <nuxt />
    <LayoutFooter />
  </div>
</template>

<script>
const { checkLogin } = require("@/handlers/auth.js")

export default {
  mounted() {
    // If user is in auth page such as login, register
    if (window.location.href.search("/auth/") != "-1") {
      if (checkLogin()) this.$router.push("/")
    } else {
      if (!checkLogin()) this.$router.push("/auth/login")
    }
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

:root {
  --theme-color-1: #00dc82;
  --theme-color-2: #001e26;
  --theme-color-3: #098466;
  --theme-color-4: #4ce6a7;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  background-color: var(--theme-color-2);
}

/* Scrollbar */
/* Customize website's scrollbar like Mac OS
Not supports in Firefox and IE */

/* total width */
::-webkit-scrollbar {
  background-color: var(--theme-color-2);
  width: 16px;
}

/* background of the scrollbar except button or resizer */
::-webkit-scrollbar-track {
  background-color: var(--theme-color-2);
}

/* scrollbar itself */
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  border: 4px solid var(--theme-color-2);
}

/* set button(top and bottom of the scrollbar) */
::-webkit-scrollbar-button {
  display: none;
}

/* Some others */
.py-50px {
  padding: 50px 0;
}

.mt-20px {
  margin-top: 20px;
}

.container {
  max-width: 1140px;
  padding-inline: 1rem;
  margin: 0 auto;
}

/* Row */
.row {
  display: flex;
  flex-wrap: wrap;
  margin-inline: -1rem;
}

.row > .col-1-3 {
  width: 33.33%;
  padding-inline: 1rem;
}

.row > .col-1-2 {
  width: 50%;
  padding-inline: 1rem;
}

.row > .col-1-4 {
  width: 25%;
  padding-inline: 1rem;
}

/* Loading */
.loading {
  font-size: 1.3rem;
  color: #ddd;
  font-weight: 500;
  margin-top: 1rem;
}

/* Card */
.card {
  background-color: #0e2930;
  border-radius: 5px;
  padding: 22px 33px;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  transition: 100ms;
}

.card:hover,
.card:focus {
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
}

/* Input field styles */
.input-box {
  position: relative;
  width: 100%;
  margin-bottom: 1.3rem;
}

.input-box .input-field {
  border: none;
  outline: none;
  background-color: #002c37;
  border-radius: 5px;
  padding: 10px 16px;
  font-size: 16px;
  color: white;
  display: block;
  width: 100%;
  border: 2px solid transparent;
  transition: 100ms;
}

.input-box .input-field ~ .input-label {
  color: #9a9a9a;
  font-size: 16px;
  font-weight: 500;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
  transition: 100ms;
  pointer-events: none;
}

.input-box textarea.input-field {
  resize: vertical;
}

.input-box textarea.input-field ~ .input-label {
  top: 10px;
  transform: translateY(0);
}

.input-box .input-field:focus {
  border-color: var(--theme-color-1);
}

.input-box .input-field:focus ~ .input-label,
.input-box .input-field:valid ~ .input-label {
  top: -20px;
  left: 0;
  font-size: 14px;
  transform: translateY(0);
}

/* Button */
.btn {
  padding: 0.6rem 1.5rem;
  border-radius: 5px;
  display: inline-block;
  background-color: #002c37;
  border: none;
  outline: none;
  font-size: 1rem;
  text-decoration: none;
  cursor: pointer;
  color: white;
  font-weight: 500;
}

.btn.sm {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn:hover,
.btn:focus {
  background-color: var(--theme-color-3);
}

.btn.primary {
  background-color: var(--theme-color-1);
  color: var(--theme-color-2);
  transition: 100ms;
}

.btn.primary:hover,
.btn.primary:focus {
  background-color: var(--theme-color-4);
}

/* Project Item */
.project-item .title {
  color: white;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 8px;
}

.project-item .description {
  color: #bdbdbd;
  font-size: 14px;
  line-height: 22px;
}

.project-item .stats {
  list-style: none;
  margin-top: 25px;
  display: flex;
  flex-wrap: wrap;
}

.project-item .stats li {
  margin-right: 37px;
  font-size: 14px;
  color: #bdbdbd;
  font-weight: 500;
}

/* Todo Item */
.todo-item {
  background-color: #0e2930;
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 12px 13px;
  margin-bottom: 16px;
  cursor: pointer;
}

.todo-item:hover,
.todo-item:focus {
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
}

.todo-item .title {
  color: #e4e4e4;
  font-size: 14px;
  line-height: 20px;
}

.todo-item .info {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin-top: 10px;
}

.todo-item .info li {
  margin-right: 9px;
  height: 19px;
}

.todo-item .info li svg {
  width: 19px;
  height: 19px;
}
</style>
