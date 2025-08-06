const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function enhanceResume(resume, jd) {
  // ✅ Updated model name
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are an expert resume optimizer. Rewrite the following resume to align with the job description below. Use clear, ATS-friendly language and formatting, and highlight relevant skills.

Resume:
${resume}

Job Description:
${jd}

Return only the improved resume.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    throw error;
  }
}

module.exports = { enhanceResume };
