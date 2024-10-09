const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config(); // Add this line

app.use(cors());
app.use(express.json());
app.use('/api', require('./routes/upload'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
