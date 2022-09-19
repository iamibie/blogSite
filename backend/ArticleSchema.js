import mongoose from 'mongoose'

const ArticleSchema = mongoose.Schema({

    category:{
        type: String,
        required:true
    },
    
    title: {
        type:String,
    },
    date: {
        type:String,
    },
    author:{
        type:String
    },
    body: {
        type: String,
        required:true,
    },
    image:{
        data: Buffer,
        type: String
    },
    summary:{
        type: String
    },
    comments:[
        {
            comment: {
                type: String,
                required:true
            }
            
        },
        {
            timestamps:true
        }
    ],

},
{
    timestamps: true,
}
)

const Article = mongoose.model('article', ArticleSchema)

export default Article