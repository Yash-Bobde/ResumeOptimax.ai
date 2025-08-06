const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function enhanceResume(resume, jd) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
Instructions for Gemini:

Based on the provided Job Description (JD) and My Current Resume (CR), please:

1. Extract Key Phrases & Action Verbs from the JD.

2. Align My Resume with the JD by:
   - Crafting a Professional Summary/Objective (if not present) incorporating 2-3 High-Frequency Key Phrases.
   - Modifying Work Experience bullet points to start with JD's Action Verbs and directly aligning 1-2 bullet points with Key Phrases.
   - Updating the Skills Section to include All Required Skills, Strategically Adding up to 2 Preferred Skills (if genuinely possessed or easily learnable), and Limiting Forged Skills to a maximum of 1-2 (if closely related and not critical to the job's core).

3. Optimize for ATS:
   - Achieve a Keyword Density of 1.5% to 2.5% for High-Frequency Key Phrases.
   - Ensure a clean, standard font and keep the resume to 1-2 pages.

4. Maintain Authenticity & Natural Flow:
   - Only claim experiences and skills that can be discussed in an interview.
   - Review for a natural flow, ensuring the resume sounds genuine.

5. Output Requested:
   - Provide my Tailored Resume, aiming for a 100/100 ATS Score.
   - Incorporate meaningful metrics wherever possible.
   - It’s fine to forge bullet points but they must sound credible.
   - Include **6 bullet points for Resilience Inc.** experience.
   - Follow a clear, professional format.

Resume:
${resume}

Job Description:
${jd}

Only return the improved resume. Do not include explanations or commentary in the response.
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
