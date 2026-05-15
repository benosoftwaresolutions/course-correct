import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { first_name, last_name, email, phone, role, format, message } = req.body;

  if (!first_name || !last_name || !email || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = neon(process.env.DATABASE_URL);

  await sql`
    INSERT INTO registrations (first_name, last_name, email, phone, role, format, message)
    VALUES (${first_name}, ${last_name}, ${email}, ${phone || null}, ${role}, ${format || null}, ${message || null})
  `;

  return res.status(200).json({ ok: true });
}
