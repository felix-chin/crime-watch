require('dotenv/config');
const express = require('express');
const statsJSON = require('../data/stats1.json');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

const stats = statsJSON.report_types;

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/stats', (req, res, next) => {
  const typeMap = {
    'Theft From Motor Vehicle': 'vehicleRelated',
    'All Other Larceny': 'theft',
    'Simple Assault': 'assault',
    'Destruction/Damage/Vandalism of Property': 'vandalism',
    'Motor Vehicle Theft': 'vehicleRelated',
    'Aggravated Assault': 'assault',
    'Burglary/Breaking & Entering': 'theft',
    'Domestic Violence/Simple Assault': 'assault',
    Robbery: 'theft',
    'Identity Theft': 'theft',
    Shoplifting: 'theft',
    'Domestic Violence/Aggravated Assault': 'assault',
    'Stolen Property Offenses': 'theft',
    'Murder & Non-negligent Manslaughter': 'homicide'
  };
  const statsObj = {
    vehicleRelated: 0,
    assault: 0,
    vandalism: 0,
    theft: 0,
    homicide: 0,
    other: 0
  };
  stats.forEach(stat => {
    if (stat.type in typeMap) {
      statsObj[typeMap[stat.type]] += stat.count;
    } else {
      statsObj.other += stat.count;
    }
  });
  res.send(statsObj);
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
