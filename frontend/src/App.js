import './index.css'
import{ BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Mainpage from './Mainpage'
import Footer from './Footer';
import Nav from './Nav';
import ArticleScreen from './ArticleScreen';
import LoginScreen from './LoginScreen';
import CreateArticleScreen from './CreateArticleScreen';
import EditArticleScreen from'./EditArticleScreen'


function App() {
  return (
    <>
       <Router>
         
           <Routes>
               <Route path='/' element={<Mainpage/>} exact />
               <Route path='/articles/:id' element={<ArticleScreen/>} />
               <Route path='/login' element={<LoginScreen/>} />
               <Route path='/create/article' element={<CreateArticleScreen/>} />
               <Route path='/articles/edit/:id' element={<EditArticleScreen/>} />
           </Routes> 
              
       </Router>
    </>
  );
}

export default App;
