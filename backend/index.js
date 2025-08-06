const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const enhanceRoute = require('./routes/enhance');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/enhance', enhanceRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ ResumeOptimax backend running at http://localhost:${PORT}`);
});
