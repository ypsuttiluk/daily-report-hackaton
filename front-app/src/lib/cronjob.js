import axios from 'axios'
const setTimeJob = async (hour,min) => {
  const res = await axios.get(`https://www.easycron.com/rest/edit?token=f0f75433a090687a155e3f06c46617b9&id=548917&cron_expression=${min} ${hour} * * *`)
  .then(response => {
    console.log(response)
    })
  .catch(error => {
    console.log(error)
  })
  return res
}

export default setTimeJob
