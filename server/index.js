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
    'Theft From Motor Vehicle': 'property',
    'All Other Larceny': 'property',
    'Simple Assault': 'violent',
    'Destruction/Damage/Vandalism of Property': 'property',
    'Motor Vehicle Theft': 'property',
    'Aggravated Assault': 'violent',
    'Burglary/Breaking & Entering': 'property',
    'Domestic Violence/Simple Assault': 'violent',
    Robbery: 'property',
    'Identity Theft': 'whiteCollar',
    Shoplifting: 'property',
    Intimidation: 'organized',
    'Weapon Law Violations': 'organized',
    'False Pretenses/Swindle/Confidence Game': 'whiteCollar',
    'Trespass of Real Property': 'property',
    'Domestic Violence/Aggravated Assault': 'violent',
    'Child Abuse/Simple/Psychological abuse': 'violent',
    Rape: 'violent',
    'Counterfeiting/Forgery': 'whiteCollar',
    'Human Trafficking, Commercial Sex Acts': 'organized',
    'Human Trafficking, Involuntary Servitude': 'organized',
    'Assisting or Promoting Prostitution': 'organized',
    Embezzlement: 'whiteCollar',
    'Sexual Battery': 'violent',
    'Stolen Property Offenses': 'property',
    'Drug Equipment Violations': 'publicOrder',
    Drunkenness: 'publicOrder',
    Arson: 'property',
    'Drug/Narcotic Violations': 'publicOrder',
    'Disorderly Conduct': 'publicOrder',
    'Driving Under the Influence': 'publicOrder',
    'Kidnapping/Abduction': 'organized',
    'Extortion/Blackmail': 'highTech',
    'Curfew/Loitering/Vagrancy Violations': 'publicOrder',
    'Hacking/Computer Invasion': 'highTech',
    'Credit Card/Automated Teller Machine Fraud': 'highTech',
    'Murder & Non-negligent Manslaughter': 'violent'
  };

  const crimeCounts = {
    violent: 0,
    property: 0,
    publicOrder: 0,
    whiteCollar: 0,
    organized: 0,
    highTech: 0,
    other: 0,
    total: 0
  };

  const crimeRates = {
    violent: 0,
    property: 0,
    publicOrder: 0,
    whiteCollar: 0,
    organized: 0,
    highTech: 0,
    other: 0
  };

  stats.forEach(stat => {
    if (stat.type in typeMap) {
      crimeCounts[typeMap[stat.type]] += stat.count;
    } else {
      crimeCounts.other += stat.count;
    }
    crimeCounts.total += stat.count;
  });

  for (const key in crimeRates) {
    crimeRates[key] = (crimeCounts[key] / crimeCounts.total * 100).toFixed(2) + '%';
  }

  res.send(crimeRates);
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
