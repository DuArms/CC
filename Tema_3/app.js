const express = require('express')
const app = express();
const { routerAPI } = require('./routes');

var port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.use(express.json()); 
app.use(express.urlencoded());

app.use('/api',routerAPI);

app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});