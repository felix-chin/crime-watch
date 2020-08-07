require('dotenv/config');
const express = require('express');
const db = require('./database');
const ClientError = require('./client-error');

const crimesJSON = require('../data/crimes1.json');
const statsJSON = require('../data/stats1.json');

const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

const stats = statsJSON.report_types;
const incidentsList = crimesJSON.incidents;

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

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/search', (req, res, next) => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push(
      {
        type: statsJSON.report_types[i].type,
        percent: ((statsJSON.report_types[i].count / statsJSON.total_incidents) * 100).toFixed(2)
      }
    );
  }
  res.status(200).json(result);
});

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/crimes', (req, res, next) => {
  res.json(crimesJSON);
});

app.get('/api/crime-details', (req, res, next) => {
  res.json(incidentsList);
});

app.get('/api/default-location', (req, res, next) => {
  const sql = `
    select *
    from "users"
  `;
  db.query(sql)
    .then(result => {
      const users = result.rows;
      res.json(users);
    })
    .catch(err => next(err));
});

app.post('/api/default-location', (req, res, next) => {
  const sql = `
    insert into "users" ("username", "name", "defaultLocation")
    values ($1, $2, $3)
    returning *;
  `;
  const username = req.body.username;
  const name = req.body.name;
  const location = req.body.defaultLocation;

  const params = [username, name, location];

  db.query(sql, params)
    .then(result => {
      if (!result.rows) {
        throw new ClientError('Please provide a valid location', 400);
      } else {
        const location = result.rows[0];
        res.status(201).json(location);
      }
    })
    .catch(err => next(err));

});

app.get('/api/stats', (req, res, next) => {
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
    violent: {
      crimeType: 'Violent',
      image: './images/crimes/violent.png',
      rate: 0
    },
    property: {
      crimeType: 'Property',
      image: './images/crimes/property.png',
      rate: 0
    },
    publicOrder: {
      crimeType: 'Public Order',
      image: './images/crimes/public-order.png',
      rate: 0
    },
    whiteCollar: {
      crimeType: 'White Collar',
      image: './images/crimes/white-collar.png',
      rate: 0
    },
    organized: {
      crimeType: 'Organized',
      image: './images/crimes/organized-crime.png',
      rate: 0
    },
    highTech: {
      crimeType: 'High Tech',
      image: './images/crimes/high-tech.png',
      rate: 0
    },
    other: {
      crimeType: 'Other',
      image: './images/crimes/other.png',
      rate: 0
    }
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
    crimeRates[key].rate = (crimeCounts[key] / crimeCounts.total * 100).toFixed(1) + '%';
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
