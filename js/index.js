const config = require('./server/config/config');
const app = require('./server/server');

app.listen(config.port);
console.log(`Magic happens on port ${config.port}`);
