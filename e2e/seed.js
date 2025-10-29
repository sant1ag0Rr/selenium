/*
  Seed de datos para E2E.
  - Inserta datos dummy en la colección MasterData vía endpoint admin.
*/

const BASE_API = process.env.BASE_API || 'http://localhost:5000';

async function main() {
  try {
    const url = `${BASE_API}/api/admin/dummyData`;
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Seed failed: ${res.status} ${text}`);
    }
    const data = await res.json();
    console.log('Seed OK:', Array.isArray(data) ? `${data.length} registros` : data.message || 'insertado');
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exitCode = 1;
  }
}

main();