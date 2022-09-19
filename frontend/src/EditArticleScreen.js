import React, {useState, useEffect,} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import FileBase64 from 'react-file-base64'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Quill from 'quill';
import ImageResize from 'quill-image-resize-module-react'
import { createArticleAction, updateArticleAction, getArticleAction } from './actions'
import { UPDATE_PRODUCT_RESET } from './constants'
Quill.register('modules/imageResize', ImageResize)



const EditArticleScreen = ({match}) => {
  const params = useParams()
  const articleId = params.id

  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [author, setAuthor] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [summary, setSummary] = useState("")

  

  const modules = {
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
   },
  
   toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
    }

    const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]





  const dispatch = useDispatch()

  
  const getArticle = useSelector(state => state.getArticle)
  const {article} = getArticle

  

  


  const updateArticle = useSelector(state => state.updateArticle)
  const {success} = updateArticle
  
  const location = useLocation()
  const navigate = useNavigate()

  const redirect = location.search ? location.search.split('=')[1] : '/'
 

  useEffect(() =>{
    
        if(success){

            dispatch({type: UPDATE_PRODUCT_RESET})
            navigate(redirect)

        } else{

            if(!article?.title || article._id !== articleId){

                dispatch(getArticleAction(articleId))

            } else{
            setCategory(article.category)
            setTitle(article.title)
            setBody(article.body)
            setImage(article.image)
            setAuthor(article.author)
            setSummary(article.summary)
            }
            
          
        }
          

  }, [dispatch,article, articleId,updateArticle,navigate])



  const updateHandler = (e) => {
    e.preventDefault()

    dispatch(updateArticleAction({_id: articleId, category, title, author, body, image, summary}))

}




  return (<> 
        
    
    <form  onSubmit={updateHandler} className="create-post-form">


    <ReactQuill 
              theme="snow"
              defaultValue={body}
              onChange={(body) => setBody(body)}
              modules={modules}
              formats={formats}
              className="body input"
              style={{width:"70%", height:"100vh",  backgroundColor:"white", color:"black", margin:"30px"}}
             /> 



      <div  className="edit-input">

                
                <input
                className="category input" 
                type='text'
                placeholder='Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                
                ></input>
        
                <input
                className="title input" 
                type='text'
                placeholder='Tile'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                ></input>


                <input
                className="date input" 
                type='text'
                placeholder='Date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                ></input>
        
                <input
                className="author input"
                type='text'
                placeholder='Author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                
                ></input>

                <textarea
                className="summary txt-input"
                type='text'
                placeholder='Summary'
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                
                ></textarea>
                

                
                <img src={image} alt="" width="90%"  height="20%"/>
                <div  className="image img-input" style={{width:"200px", border:"none", height:"35px", margin:"5px"}} >
                  <FileBase64 
                      multiple={ false }
                      onDone={ ({base64}) => setImage(base64)} 
                  />
                </div>
               
                <button className="create img-input" type='submit' variant='primary' style={{width:"200px", border:"none", height:"45px", margin:"5px"}} >UPDATE POST</button>
                <a className='edit-btns-a' href="/">Home</a>
                
      </div>

      


    </form>  
    
    </>
  )
}

export default EditArticleScreen
