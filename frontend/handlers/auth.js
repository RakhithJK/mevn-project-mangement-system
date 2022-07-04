// Check login
export const checkLogin = () => {
  const token = localStorage.getItem("token")
  // Checking token in localstorage
  if (token) {
    return token
  } else {
    return false
  }
}
