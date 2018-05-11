import axios from 'axios'

const deleteTeam = async (team) => {
  const res = await axios.post('/edit_team', {
    teams: `${team}`,
  })
  .then(response => ({
    status: response.status,
  }))
  .catch(error => ({
    status: error.response.status,
  }))
  return res
}