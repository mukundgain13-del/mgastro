export default async function handler(req, res) {
  const apiKey = process.env.TOGETHER_API_KEY;

  if (req.method === 'POST') {
    try {
      const { name, dob } = req.body;

      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3-70b-chat-hf",
          messages: [
            { role: "system", content: "आप एक विद्वान भारतीय ज्योतिषी हैं। हिंदी में विस्तृत कुंडली रिपोर्ट लिखें।" },
            { role: "user", content: `नाम: ${name}, जन्मतिथि: ${dob}। कृपया इनका भविष्यफल और ज्योतिषीय विश्लेषण विस्तार से दें।` }
          ]
        })
      });

      const data = await response.json();
      res.status(200).json({ text: data.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: "सर्वर रिस्पॉन्स नहीं दे रहा है" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
