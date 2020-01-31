const functions = require('firebase-functions');
const moment = require('moment');
const cors = require('cors')({
  origin: true,
});

const legalBankHolidays = (year) => {
  const DATE_FORMAT_DASH = "DD-MM-YYYY";
  const DATE_FORMAT_SLASH = "DD/MM/YYYY";
  const getOrthodoxEasterDay = (year) => {
    //from:
    // http://webserv.lgrcat.ro/Sitevechi/Astronomie/Articole/Paste.htm
    // https://evz.ro/cum-se-calculeaza-data-pastelui-891247.html
    const a = year % 4;
    const b = year % 7;
    const c = year % 19;
    const d = (19 * c + 15) % 30;
    const e = (2 * a + 4 * b - d + 34) % 7;
    const orthodoxEasterDay = moment(`04-04-${year}`, DATE_FORMAT_DASH).add(d + e, 'days').format(DATE_FORMAT_SLASH);
    return orthodoxEasterDay;
  };

  const easter = getOrthodoxEasterDay(year);
  const secondDayOfEaster = moment(easter, DATE_FORMAT_SLASH).add(1, 'days').format(DATE_FORMAT_SLASH);
  const theFriday = moment(easter, DATE_FORMAT_SLASH).subtract(2, 'days').format(DATE_FORMAT_SLASH);
  const secondWhitsuntide = moment(easter, DATE_FORMAT_SLASH).add(50, 'days').format(DATE_FORMAT_SLASH);
  const firstWhitsuntide = moment(secondWhitsuntide, DATE_FORMAT_SLASH).subtract(1, 'days').format(DATE_FORMAT_SLASH);

  const BANK_HOLIDAYS_JSON = [
    {
      name: 'Anul nou',
      date: `01/01/${year}`
    },
    {
      name: 'Anul nou',
      date: `02/01/${year}`
    },
    {
      name: 'Ziua Unirii Principatelor Române',
      date: `24/01/${year}`
    },
    {
      name: 'Vinerea Mare',
      date: theFriday
    },
    {
      name: 'Paște ortodox',
      date: easter
    },
    {
      name: 'Paște ortodox',
      date: secondDayOfEaster
    },
    {
      name: 'Ziua Muncii',
      date: `01/05/${year}`
    },
    {
      name: 'Ziua Copilului',
      date: `01/06/${year}`
    },
    {
      name: 'Rusalii',
      date: firstWhitsuntide
    },
    {
      name: 'A doua zi de Rusalii',
      date: secondWhitsuntide
    },
    {
      name: 'Adormirea Maicii Domnului',
      date: `15/08/${year}`
    },
    {
      name: 'Sfântul Andrei',
      date: `30/11/${year}`
    },
    {
      name: 'Ziua Națională a României',
      date: `01/12/${year}`
    },
    {
      name: 'Crăciunul',
      date: `25/12/${year}`
    },
    {
      name: 'Crăciunul',
      date: `26/12/${year}`
    }
  ];
  return BANK_HOLIDAYS_JSON;
};

exports.romanian_bank_holidays = functions.https.onRequest((request, response) => {
  if (request.method === 'PUT') {
    return response.status(403).send('Forbidden!');
  }

  return cors(request, response, () => {
    let year = request.query.year;
    if (!year) {
      year = request.body.year;
    }
    year = year || parseInt(moment().format('YYYY'), 10);
    const legalBankHolidaysJSON = legalBankHolidays(year);
    response.status(200).json(legalBankHolidaysJSON);
  });
});
