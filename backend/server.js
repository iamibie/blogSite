import express from 'express'
import dotenv from 'dotenv'
import connectDB from './connectDB.js'
import Article from './ArticleSchema.js'
import User from './UserSchema.js'
import asyncHandler from 'express-async-handler'

dotenv.config()

const app = express()

app.use(express.json())
const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
})

app.get("/", async (req, res)=>{
    res.send('Server running on this port')
})

connectDB();


//////// User Routes ///////

app.post('/api/users', asyncHandler(
    async (req, res)  => {
        const {name, email, password} = req.body;
     
         const userExists = await User.findOne({email})
     
         if(userExists){
             res.status(400)
             throw new error("User already exist!")
         }
     
         const user = await User.create({name, email, password})
     
         if(user){
             res.status(201).json({
                 _id: user._id,
                 name: user.name,
                 email: user.email,
                 isAdmin: user.isAdmin
             })
         }else{
             res.status(400)
             throw new error("Invalid user data!")
         }
     
     }
))


app.post('/api/users/login', asyncHandler(
    async (req, res) => {
        const { email, password} = req.body
    
        const user = await User.findOne({email})
    
        if (user && (await user.matchPassword(password))){
           res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
           })
    
        }else{
            res.status(401)
            throw new error ("Invalid email or password")
        }
    
    
    
    }
))

app.get('/api/users', asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)

}))

app.put('/api/users/:id', asyncHandler(
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
            })
           
        } else{
            res.status(404)
            throw new Error ('User Not Found')}
    
    }
))

app.delete('/api/users/:id', asyncHandler(
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

app.post('/api/articles', asyncHandler(
    async (req, res) => {

        const {category, title, author, body, image, summary} = req.body;
    
    
        const article = await Article.create({category, title, author, body, image, summary})
    
        if(article){
            res.status(201).json({
                _id: article._id,
                category: article.category, 
                title: article.title, 
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

app.put('/api/articles/:id', asyncHandler(
    async (req, res) => {
        const article = await Article.findById(req.params.id)
    
        if(article){
            article.category = req.body.category || article.category
            article.title = req.body.title || article.title
            article.author = req.body.author|| article.author
            article.body = req.body.body || article.body
            article.image =  req.body.image || article.image
            article.summary = req.body.summary || article.summary
    
            const updateArticle = await article.save()
    
            res.json({
                _id: updateArticle._id,
                category:updateArticle.category,   
                title: updateArticle.title,
                author:updateArticle.author,
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

app.delete('/api/articles/:id', asyncHandler(
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


app.delete('/api/articles/:id/comments/:comment_id', asyncHandler(async (req, res) => {

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



