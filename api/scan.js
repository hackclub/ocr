const { createWorker } = require('tesseract.js');

export default async function handler(req, res) {
    const url = req.body?.url || req.query?.url || req.params?.url;
    const key = req.body?.key || req.query?.key || req.params?.key;
    if (!url) return res.status(400).json({
        success: false,
        errors: [
            "Please pass in a valid URL"
        ]
    });
    if (process.env.API_KEY !== key) return res.status(400).json({
        success: false,
        errors: [
            "Please pass in a valid API key"
        ]
    });
    const worker = await createWorker('eng');
    const { data: { text } } = await worker.recognize(url);
    await worker.terminate();
    res.status(200).json({
        success: true,
        data: text
    });
}