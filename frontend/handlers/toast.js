import Toastify from "toastify-js"
import "toastify-js/src/toastify.css"

export default function toast(
  info = {
    text: "Toast",
    type: "info",
    duration: 3000,
    position: "right",
    gravity: "top",
  }
) {
  let color
  if (info.type === "success") color = "#5ac146"
  if (info.type === "error") color = "#fa5838"
  if (info.type === "warning") color = "#ffbc34"
  if (info.type === "info") color = "#137eff"

  Toastify({
    text: info.text,
    duration: info.duration,
    gravity: info.gravity, // `top` or `bottom`
    position: info.position, // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
    },
  }).showToast()
}
