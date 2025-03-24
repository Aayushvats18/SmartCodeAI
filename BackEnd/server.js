const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({ origin: '*' }));  
app.use(bodyParser.json());

app.post('/ai/get-review', async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) return res.status(400).json({ error: "No code provided" });

        res.json({ review: `✅ Code looks fine! But consider adding comments.` });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
