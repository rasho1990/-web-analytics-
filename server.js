const express = require('express')
const app = express()
const port = 3000

app.get('/image', function (req, res) {
    console.log(req.get('Referer') , req.url);
    res.sendFile('image.jpg', {root: './public'});
  });
app.use(express.static('public'))
app.listen(port, () => {
    console.log(` App listening at http://localhost:${port}`)
})