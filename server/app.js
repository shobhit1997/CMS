const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const workerRouter = require('./routes/WorkerRoutes');
const workRouter = require('./routes/WorkRoutes');
const billRouter = require('./routes/BillRoutes');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(publicPath, {
    extensions: ['html']
}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'x-auth');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, Accept , x-auth');

    next();
});

app.use('/api/work', workRouter);
app.use('/api/worker', workerRouter);
app.use('/api/bill', billRouter);
module.exports = app;