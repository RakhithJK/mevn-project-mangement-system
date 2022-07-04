// Converting milliseconds
export const convertMs = (ms) => {
  let result
  /* Calculating
    1s = 1000ms
    1m = 60s
    1h = 60m
    
    sec = (ms)/1000
    min = (sec)/60
    hour = (min)/60
  */

  const sec = parseFloat(ms / 1000).toFixed(2)
  const min = parseFloat(sec / 60).toFixed(2)
  const hour = parseFloat(min / 60).toFixed(2)

  result = `${sec}/s`
  if (sec > 60) {
    result = `${min}/min`
  }
  if (min > 60) {
    result = `${hour}/h`
  }

  // Return all values as a object
  return result
}
