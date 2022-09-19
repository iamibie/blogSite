import React,{useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams} from 'react-router-dom'
import { getArticleAction } from './actions'
import Footer from './Footer'
import Nav from './Nav'


const ArticleScreen = ({match}) => {
    const dispatch = useDispatch()
    const params = useParams()

    const getArticle = useSelector(state => state.getArticle)
    const {article} = getArticle

   
  


    useEffect(() => {

        dispatch(getArticleAction(params.id))
        
       
    }, [dispatch,match])
    return (

    <>
        <div className="logo-div"></div>
         <Nav/>
           
           
           {article ? 
            <div key={article._id} className="article-div">
               <h1>{article.title}</h1>
               <div className="d-a">
               <p>By:{article.author}</p>
               <p>Posted:{article.date}</p>
               </div>
               <img src={article.image} alt="" />
               <div  className='art-body' dangerouslySetInnerHTML={{__html: article.body}} id={article._id}></div>
            </div> : null }
       

           <Footer/> 
        
    </>    
    )
}

export default ArticleScreen