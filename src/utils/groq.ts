import { Groq } from 'groq-sdk'

const GROQ_API = import.meta.env.VITE_GROQ_API;

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true
})

export const requestToGroqAI = async (content: string) => {
  const reply = await groq.chat.completions.create({
    model: 'llama3-8b-8192',
    messages: [{ role: 'user', content }],
    max_tokens: 1000,
    temperature: 0.7
  })
  return reply.choices[0].message.content;
}