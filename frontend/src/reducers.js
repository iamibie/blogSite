
import {LIST_ARTICLES_REQUEST, LIST_ARTICLES_SUCCESS, LIST_ARTICLES_FAIL, GET_ARTICLE_REQUEST, GET_ARTICLE_SUCCESS, GET_ARTICLE_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOGOUT, CREATE_ARTICLE_REQUEST, CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAIL, UPDATE_ARTICLE_REQUEST, UPDATE_ARTICLE_SUCCESS, UPDATE_ARTICLE_FAIL,UPDATE_PRODUCT_RESET } from './constants'

export const listArticlesReducer = (state= {}, action) => {
    switch(action.type){
        case LIST_ARTICLES_REQUEST:
            return {loading: true, articles:[]}
        case LIST_ARTICLES_SUCCESS:
            return {loading: false, articles: action.payload}
        case LIST_ARTICLES_FAIL:
            return {loading: false, error: action.payload}
            default:
                return state
    }

}


export const getArticleReducer = (state= {}, action) => {
    switch(action.type){
        case GET_ARTICLE_REQUEST:
            return {loading: true, }
        case GET_ARTICLE_SUCCESS:
            return {loading: false, article: action.payload}
        case GET_ARTICLE_FAIL:
            return {loading: false, error: action.payload}
            default:
                return state
    }

}
export const createArticleReducer = (state= {}, action) => {
    switch(action.type){
        case CREATE_ARTICLE_REQUEST:
            return {loading: true, }
        case CREATE_ARTICLE_SUCCESS:
            return {loading: false, createdArticle: action.payload}
        case CREATE_ARTICLE_FAIL:
            return {loading: false, error: action.payload}
            default:
                return state
    }

}

export const updateArticleReducer = (state= {}, action) => {
    switch(action.type){
        case UPDATE_ARTICLE_REQUEST:
            return {loading: true, }
        case UPDATE_ARTICLE_SUCCESS:
            return {loading: false, success: true}
        case UPDATE_ARTICLE_FAIL:
            return {loading: false, error: action.payload}
        case UPDATE_PRODUCT_RESET:
            return {
                article:{}
            }
            default:
                return state
    }

}

export const loginReducer = (state= {}, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {loading: true, }
        case LOGIN_SUCCESS:
            return {loading: false, loginData: action.payload}
        case LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
            default:
                return state
    }

}