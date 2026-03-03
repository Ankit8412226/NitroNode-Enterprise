const { Parser } = require('json2csv');
const logger = require('../config/logger');

const exportToCsv = (data, fields) => {
  try {
    const parser = new Parser({ fields });
    return parser.parse(data);
  } catch (err) {
    logger.error({ message: 'CSV export failed', error: err.message });
    throw err;
  }
};

const sendCsvResponse = (res, fileName, csvData) => {
  res.header('Content-Type', 'text/csv');
  res.attachment(`${fileName}_${Date.now()}.csv`);
  return res.send(csvData);
};

module.exports = {
  exportToCsv,
  sendCsvResponse,
};
