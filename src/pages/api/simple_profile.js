import axios from 'axios';
import { simpleProfiles } from '../../urls/index'

export const postSimpleProfile = (params) => {
  return axios.post(simpleProfile,
    {
      line_food_ids: params.line_food_ids
    },
  )
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
