import express from 'express';
import data from './data/MOCK_DATA.json'
import favicon from 'serve-favicon';
import path from 'path';

const app = express();
const PORT = 3000;

// This is for the public folder on path /
app.use(express.static('public'));

// This is for the images folder on path /images
app.use('/images', express.static('images'))

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// Express default middlewares
// app.use(express.urlencoded({extended:true}))
// app.use(express.json())

app.get('/', (req, res) => {
    res.json(data)
})

app.get('/end', (req, res) => {
    res.end()
})

app.get('/redirect', (req, res) => {
    res.redirect('http://www.linkedin.com')
})

app.get('/download', (req, res) => {
    res.download('images/kitkat.jpeg')
})

app.get('/item/:id', (req, res) => {
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(user);
    res.send(data[user])
})

app.get('/item/:category/:id', (req, res, next) => {
    //this is the middleware that pulls the data
    console.log(req.params.id);
    let user = Number(req.params.id);
    console.log(data[user]);
    //middleware that uses the request object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    //everything aove is middleware
    res.send(data[user]);
    next(); //call the next handler --> a middleware can be implemented using next()
}, (req, res) => {
    console.log('Did you get the right data');
})

app.route('/route')
    .get((req, res) => {
        res.send("This is a GET request")
    })
    .put((req, res) => {
        res.send("This is a PUT request")
    })
    .delete((req, res) => {
        res.send("This is a DELETE request")
    })

app.post('/expressJSON', (req, res) => {
    console.log(req.body.name);
    res.send("Express JSON");
})

app.get('/error', (req, res) => {
    throw new Error();
})

//Error handling functions
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Red Alert! ${err.stack}`)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})