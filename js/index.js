import config from 'server/config';
import app from 'server/server';

app.listen(config.port);

console.log(`Magic happens on port ${config.port}`);
