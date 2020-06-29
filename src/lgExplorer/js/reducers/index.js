import { combineReducers } from 'redux'
import Toggle from './Toggle'

import HomeDataUpdate from './HomeDataUpdate'
import AppAlert from './AppAlert'
// import HomeData from './'

const Index = combineReducers({
    Toggle,
  
    HomeDataUpdate,
    AppAlert

})

export let initialState = {



};
export default Index