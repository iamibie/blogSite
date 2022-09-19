import {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {listArticlesReducer, getArticleReducer, loginReducer, createArticleReducer, updateArticleReducer} from './reducers'



const reducer = combineReducers({
    
    listArticles: listArticlesReducer,
    getArticle: getArticleReducer,
    createArticle: createArticleReducer,
    updateArticle: updateArticleReducer,
    login:loginReducer,
   
})

const middleWare = [thunk]

{/**c
    onst userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

    const initialState = {

    userLogin: {userInfo: userInfoFromStorage},
    
} */}

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    
    login: {userInfo: userInfoFromStorage},
    
}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)))

export default store
