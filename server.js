const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config');
const { STATUS_CODE } = require('./constants/statusCode');
const { getInfoLog, getErrorLog } = require('./utils/logger');
const productRoutes = require('./routing/product');
const logoutRoutes = require('./routing/logout');
const killRoutes = require('./routing/kill');
const homeRoutes = require('./routing/home');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(getInfoLog(req.method, req.url));
  next();
});

app.use('/product', productRoutes);
app.use('/logout', logoutRoutes);
app.use('/kill', killRoutes);
app.use('/', homeRoutes);

app.use((req, res) => {
  res
    .status(STATUS_CODE.NOT_FOUND)
    .sendFile(path.join(__dirname, 'views', '404.html'));
  console.warn(getErrorLog(req.url));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
