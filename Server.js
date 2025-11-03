const express = require('express');
const fetch = require('node-fetch');
const { parse } = require('csv-parse/sync');

const app = express();

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7IH9Pni9WT0aVXicV4fHCbrxDY_LLf_k5Tfd6VmP880I4isXxGMRdsh3-NHbceR0rnuptZpKYKZNF/pub?output=csv';

app.get('/products', async (req, res) => {
  try {
    const response = await fetch(CSV_URL);
    const csvText = await response.text();

    const records = parse(csvText, {
      columns: true,
      skip_empty_lines: true,
    });

    res.json(records);
  } catch (error) {
    console.error('Error fetching or parsing CSV:', error);
    res.status(500).json({ error: 'Failed to fetch or parse data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
