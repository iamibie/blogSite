import express from 'express'
import dotenv from 'dotenv'
import connectDB from './connectDB.js'
import Article from './ArticleSchema.js'
import User from './UserSchema.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import path from 'path'

dotenv.config()

const app = express()

app.use(express.json({limit: "200mb"}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }));






connectDB();




//////JSONWEBTOKEN


const generateToken = (id) => {
   return jwt.sign({id}, process.env.JWT_SECRETE,{ expiresIn: "30d" })
}

/////////////////PROTECTED ROUTES/////////////////
const protect = asyncHandler(async (req, res, next) => {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRETE)


            req.user = await User.findById(decoded.id).select('-password')

            next()
            
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized')
            
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not auhtorized, no token')
    }

  
})


const admin = asyncHandler(
    async (req, res, next) => {
    
        if (req.user && req.user.isAdmin) {
    
            next()
            
        } else {
    
            res.status(401)
            throw new Error('Not Authorized as an admin')
            
        }
    }
)



//////// User Routes ///////

app.post('/api/users', asyncHandler(
    async (req, res)  => {
        const {name, email, password, isAdmin} = req.body;
     
         const userExists = await User.findOne({email})
     
         if(userExists){
             res.status(400)
             throw new error("User already exist!")
         }
     
         const user = await User.create({name, email, password, isAdmin})
     
         if(user){
             res.status(201).json({
                 _id: user._id,
                 name: user.name,
                 email: user.email,
                 isAdmin: user.isAdmin,
                 token:generateToken(user._id)
             })
         }else{
             res.status(400)
             throw new error("Invalid user data!")
         }
     
     }
))


app.post('/api/users/login', asyncHandler(
    async (req, res) => {
        const { email, password } = req.body
    
        const user = await User.findOne({email})
    
        if (user && (await user.matchPassword(password))){
           res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token:generateToken(user._id)
           })
    
        }else{
            res.status(401)
            throw new error ("Invalid email or password")
        }
    
    
    
    }
))

app.get('/api/users',protect, admin, asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)

}))

app.put('/api/users/:id',protect,admin, asyncHandler(
    async (req, res) => {
        const user = await User.findById(req.params.id)
    
        if (user){
    
            user.name = req.body.name || user.name
            user.email = req.body.email || user.email
    
            if(req.body.password) {
                user.password = req.body.password
            }
    
            const updateUser = await user.save()
    
            res.json({
                _id: updateUser._id,
                name: updateUser.name,
                email:updateUser.email,
                isAdmin:updateUser.isAdmin,
                token:generateToken(user._id)
            })
           
        } else{
            res.status(404)
            throw new Error ('User Not Found')}
    
    }
))

app.delete('/api/users/:id', protect,admin, asyncHandler(
    async (req, res) => {

        const user =  await User.findById(req.params.id)
     
        if(user){
            await user.remove()
            res.json({message:"user removed!"})
        } else{
            res.status(401)
            throw new error("user not found")
        }
     
     }
))






//////// Article Routes ///////

app.post('/api/articles',protect,admin, asyncHandler(
    async (req, res) => {

        const {category, title ,date, author, body, image, summary} = req.body;
    
    
        const article = await Article.create({category, title, date, author, body, image, summary})
    
        if(article){
            res.status(201).json({
                _id: article._id,
                category: article.category, 
                title: article.title, 
                date: article.date, 
                author: article.author, 
                body: article.body, 
                image: article.image, 
                summary: article.summary
            })
        }else{
            res.status(400)
            throw new error("Article not created!")
        }
    
    }
))

app.get('/api/articles/:id', asyncHandler(
    async (req, res) => {

        const article = await Article.findById(req.params.id)
    
        if(article){
            res.status(201).json({
                _id: article._id,
                category: article.category, 
                title: article.title, 
                date: article.date,
                author: article.author, 
                body: article.body, 
                image: article.image, 
                summary: article.summary
            })
    
        } else {
            res.status(404)
            throw new error ('Article not found!')
        }
    
    
    }
))

app.get('/api/articles', asyncHandler(
    async (req, res) => {

        const articles = await Article.find({})
        res.json(articles)
        
    }
))

app.put('/api/articles/:id', protect, admin, asyncHandler(
    async (req, res) => {
        const article = await Article.findById(req.params.id)
    
        if(article){
            article.category = req.body.category || article.category
            article.title = req.body.title || article.title
            article.author = req.body.author|| article.author
            article.date = req.body.date|| article.date
            article.body = req.body.body || article.body
            article.image =  req.body.image || article.image
            article.summary = req.body.summary || article.summary
    
            const updateArticle = await article.save()
    
            res.json({
                _id: updateArticle._id,
                category:updateArticle.category,   
                title: updateArticle.title,
                author:updateArticle.author,
                date:updateArticle.date,
                body:updateArticle.body,
                image:updateArticle.image,
                summary:updateArticle.summary

            })
    
        } else {
            res.status(401)
            throw new Error ('Article not found')
        }
    
    }
))

app.delete('/api/articles/:id',protect,admin, asyncHandler(
    async (req, res) => {
        const article = await Article.findById(req.params.id)
    
        if (article){
            await article.remove()
             res.json({message:"Article removed!"}) 
        } else{
            res.status(401)
            throw new Error ('Article not found')
    
        }
    
    }
))

//////// Comments Routes ///////

app.post('/api/articles/:id/comments', asyncHandler(async (req, res) => {

        const {comment} = req.body;
    
        const article = await Article.findById(req.params.id)

        const saveComment = {
            comment
        }
    
        article.comments.unshift(saveComment)
    
        const saveArticle = await article.save()
    
        if(saveArticle){
            res.status(201).json(article)
        } else{
            res.status(404)
            throw new Error('Comment not saved!')
        }   
}))


app.delete('/api/articles/:id/comments/:comment_id',admin,protect, asyncHandler(async (req, res) => {

        const article = await Article.findById(req.params.id)
    
        const comment = article.comments.find(comment => comment.id === req.params.comment_id)

        if(!comment){
                res.status(404)
                throw new Error ('Comments not found')
        } else{
           await comment.remove()

           await article.save()
            res.json(article.comments)
        }

      
        
    
 

    
}))

const __dirname = path.resolve
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('/frontend/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
}else{
    app.get("/", async (req, res)=>{
        res.send('Server running on this port')
    })

}


const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
})