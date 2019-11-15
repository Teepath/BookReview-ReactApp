const express = require ('express');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');
const mongoose = require ('mongoose');

const app = express();

const config = require('./config/config').get(process.env.NODE_ENV);

mongoose.connect(config.DATABASE);

const { User } = require ('./models/users');
const { Book } = require ('./models/books'); 
const { auth } = require ('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

// GET

app.get('/api/auth', auth, (req, res)=>{
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    })
})
app.get('/api/getBook', (req, res) =>{
    const id = req.query.id;

    Book.findById(id, (err, doc)=>{
        if(err) res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/books', (req, res) =>{

    //the url will look: localhost:3001/api/books?skip=3&limit=2&order=asc

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const order = req.query.order;

    Book.find().skip(skip).sort({_id: order}).limit(limit).exec((err, doc)=>{
        if(err) res.status(400).send(err);
        res.send(doc);
    })
})

//get reviewer name

app.get('/api/getReviewer', (req, res)=>{
    let id = req.query.id;

    User.findById(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname
        })
    })
});

// find book by ownerId

app.get('/api/user_posts',(req, res)=>{
    Book.find({ownerId: req.query.user}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs);

    });
})

//logout

app.get('/api/logout', auth, function(req, res){
    req.user.deleteToken(req.token, (err, user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    })
})



app.get('/api/users', (req, res)=>{
    User.find({}, (err, users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users);
        })

    })

//POST

app.post('/api/book', (req, res)=>{

    const book = new Book(req.body);

    book.save((err, doc)=>{
        if(err) res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        })

    })

})

//UPDATE

app.post('/api/book_update', (req, res)=>{
    Book.findByIdAndUpdate(req.body._id, req.body, {new:true}, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})


//login

app.post('/api/login', (req, res)=>{
    User.findOne({'email': req.body.email}, (err, user)=>{
        if(!user) return res.json({isAuth:false, message: "Auth failed, email cannot be found"})
        user.comparePassword(req.body.password, function(err, isMatch){
            if(!isMatch) return res.json({
                isAuth: false,
                message: 'Wrong password'
            });

            user.generateToken((err, user)=>{
                if(err) res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })
    })
})

//register

app.post('/api/register', (req,res)=>{
    const user = new User(req.body);

    user.save((err, doc)=>{
        if(err) return res.json({success:false});
        res.status(200).json({
            success:true,
            user: doc
        })
    })
})


//DELETE


app.delete('/api/delete_book', (req, res)=>{
    let id = req.query.id;
    Book.findByIdAndRemove(id, (err, doc)=>{
        if(err) return res.status(400).send(err);
        res.json({success: true});
    })
})

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
    res.sendFile(path.resolve(--__dirname, "client", "build", "index.html"))
}

const port = process.env.PORT ||3001;


app.listen(port, () =>{
    console.log(`App now listen to port`)
})