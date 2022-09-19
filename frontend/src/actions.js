import {LIST_ARTICLES_REQUEST, LIST_ARTICLES_SUCCESS, LIST_ARTICLES_FAIL, GET_ARTICLE_SUCCESS, GET_ARTICLE_FAIL, GET_ARTICLE_REQUEST, 
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOGOUT, USER_PROFILE_RESET, 
    CREATE_ARTICLE_REQUEST, CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAIL, DELETE_ARTICLE, UPDATE_ARTICLE_REQUEST, UPDATE_ARTICLE_SUCCESS, UPDATE_ARTICLE_FAIL } from './constants'
import axios from 'axios'


export const listArticlesAction = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: LIST_ARTICLES_REQUEST

        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.get('/api/articles', config)

        dispatch({
            type: LIST_ARTICLES_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({ 
            type: LIST_ARTICLES_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}

export const getArticleAction = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: GET_ARTICLE_REQUEST

        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.get(`/api/articles/${id}`, config)

        dispatch({
            type: GET_ARTICLE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: GET_ARTICLE_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}

export const createArticleAction = (category, title, date, author, body, image, summary) => async(dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ARTICLE_REQUEST

        })

        const { login: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        

        const { data } = await axios.post('/api/articles',{category, title, date, author, body, image, summary}, config)

        dispatch({
            type: CREATE_ARTICLE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: CREATE_ARTICLE_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}



export const updateArticleAction = (article) => async(dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_ARTICLE_REQUEST

        })

        const { login: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        

        const { data } = await axios.put(`/api/articles/${article._id}`, article, config)

        dispatch({
            type: UPDATE_ARTICLE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: UPDATE_ARTICLE_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}



export const deleteArticleAction = (id) => async(dispatch,getState) => {
   
        const { login: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/articles/${id}`, config)

        dispatch({
            type: DELETE_ARTICLE,
        })

        
}



export const loginAction = (email, password) => async(dispatch, ) => {
    try {
        dispatch({
            type: LOGIN_REQUEST

        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        }

        const { data } = await axios.post("/api/users/login", {email, password}, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload:error.response && 
            error.response.data.message ? 
            error.response.data.message :
            error.message,
        })
        
    }
}


export const logoutAction = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch(
        {
            type: USER_LOGOUT
        }
    )

    dispatch(
        {
            type: USER_PROFILE_RESET
        }
    )
}
