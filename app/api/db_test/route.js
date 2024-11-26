import pool from '@/lib/db';

export async function GET(req) {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    return new Response(JSON.stringify({ success: true, timestamp: rows[0] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}