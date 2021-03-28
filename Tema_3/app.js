const app = express();
const express = require('express')
const { routerAPI } = require('./routes');

var port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.use('/api',routerAPI);

app.listen(port, () => {
    console.log(`listening to port ${port}...`);
});