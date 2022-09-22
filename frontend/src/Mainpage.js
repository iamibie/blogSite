import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { listArticlesAction, deleteArticleAction} from './actions'
import Nav from './Nav'
import Footer from './Footer'
import {useNavigate} from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'




const Mainpage = () => {
    const myRef = useRef()
    const [showBox, setShowBox] = useState(false)
    
   


    const navigate = useNavigate()


    const dispatch = useDispatch()

    
    const listArticles = useSelector( state => state.listArticles)
    const { loading, error, articles} = listArticles

    const login = useSelector(state => state.login)
    const {userInfo} = login
    


    useEffect(() => {
        dispatch(listArticlesAction())
        
    },[dispatch])


    
    const [category, setCategory] = useState(articles) 
        const catHandler = (catItems) => {

            const filteredItems = articles ? articles.filter(item => {
                return item.category === catItems;
            }): null 
    
            setCategory(filteredItems)
    
        }

        const deleteArticle = (id) => {
            dispatch(deleteArticleAction(id))
            navigate('/')
        }
 
    
  
   
    return(
        <> 
        <div className="logo-div"></div>
        <Nav/>
        <div id="cat-section">
                            <button onClick={() => catHandler("Technology")} className="li" >Tech</button>
                            <button onClick={() => catHandler("Science")} className="li" >Science</button>
                            <button onClick={() => catHandler("Politics")}className="li" >Politics</button>
                            <button onClick={()=> setCategory(articles)}className="li" >All</button>
        </div>
        
    

         <div className="main-screen">
                {loading ? ( <Loader/> ) : error ? (<Message variant='danger'>{error}</Message>) : (

                            category ? category.map(article =>  { 
                            return(
                                <>
                                
                                <div className='card-container'>
                                <h3 onClick={()=>navigate(`/articles/${article._id}`)} >{article.title}</h3>
                                <img onClick={()=>navigate(`/articles/${article._id}`)} src={article.image} alt="" />
                                    <p className='summ'>{article.summary}</p>
                                    <div className="date-auth">
                                    <p>By:{article.author}</p>
                                    <p>Posted:{article.date}</p>
                                    </div>
                                    {userInfo ? userInfo.isAdmin && <div className='edit-btns'> <a href='#' onClick={()=>navigate(`/articles/edit/${article._id}`)}>Edit</a><a href='#' onClick={() => deleteArticle(article._id)}>Delete</a></div>:null}
                                </div>
                                
                            
                                </>)

                                            }):articles ? articles.map(article =>  { 

                            return(
                                <>
                                
                                    <div className='card-container'>
                                    <h3 onClick={()=>navigate(`/articles/${article._id}`)}>{article.title}</h3>
                                    <img onClick={()=>navigate(`/articles/${article._id}`)} src={article.image} alt=""/>
                                    <p className='summ'>{article.summary}</p>
                                    <div className="date-auth">
                                    <p>By:{article.author}</p>
                                    <p>Posted:{article.date}</p>
                                </div>
                                    {userInfo ? userInfo.isAdmin && <div className='edit-btns' > <a onClick={()=>navigate(`/articles/edit/${article._id}`)}>Edit</a><a onClick={() => deleteArticle(article._id)}>Delete</a></div>:null}
                                    </div>
                                    
                            
                </>) }) : error)}
         </div>
                
        <Footer/> 
         </>
    )
    
}

///<div className="main-screen">
export default Mainpage