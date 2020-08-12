require('dotenv/config');
const express = require('express');

const crimesJSON = require('../data/crimes1.json');

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

app.get('/api/crimes', (req, res, next) => {
  res.json(crimesJSON);
});

app.get('/api/crime-details', (req, res, next) => {
  res.json(crimesJSON.incidents);
});

app.get('/api/users', (req, res, next) => {
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

app.get('/api/users/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const sql = `
    select *
    from "users"
    where "userId" = $1;
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/bookmarks', (req, res, next) => {
  const sql = `
    select *
    from "bookmarks"
  `;

  db.query(sql)
    .then(result => {
      const bookmarks = result.rows;
      res.json(bookmarks);
    })
    .catch(err => next(err));
});

app.get('/api/bookmarks/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);

  const sql = `
    select *
    from "bookmarks"
    where "userId" = $1
  `;

  const params = [userId];

  db.query(sql, params)
    .then(result => {
      const bookmarks = result.rows;
      res.json(bookmarks);
    })
    .catch(err => next(err));
});

app.post('/api/bookmarks/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const incident = req.body.incident;

  const sql = `
    insert into "bookmarks" ("userId", "incident")
    values ($1, $2)
    returning *
  `;
  const params = [userId, incident];

  db.query(sql, params)
    .then(result => {
      const bookmarkedIncident = result.rows[0];
      res.status(201).json(bookmarkedIncident);
    })
    .catch(err => next(err));
});

app.post('/api/users', (req, res, next) => {
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

app.patch('/api/users/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const defaultLocation = req.body.defaultLocation;
  const name = req.body.name;
  const params = [name, defaultLocation, userId];
  const sql = `
    update "users"
    set "name"            = $1,
         "defaultLocation" = $2
    where "userId"        = $3
    returning *;
  `;
  db.query(sql, params)
    .then(result => {
      const editProfile = result.rows[0];
      if (!editProfile) {
        throw new ClientError(`cannot find user with id ${userId}`, 400);
      } else {
        res.status(201).json(editProfile);
      }
    })
    .catch(err => next(err));
});

app.get('/api/searches/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const sql = `
    select *
    from "searches"
    where "userId" = $1;
  `;
  const params = [userId];
  return db.query(sql, params)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/searches/:userId', (req, res, next) => {
  const userId = parseInt(req.params.userId, 10);
  const location = req.body.location;
  const sql = `
    insert into "searches" ("userId", "location")
    values ($1, $2)
    returning *;
  `;
  const params = [userId, location];
  return db.query(sql, params)
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
