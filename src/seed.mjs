// Sembrador de datos de demostración (T-21). Usa SOLO la API, nunca SQL directo (data-model.md §9).
// Hoy siembra lo que la API ya expone: bibliotecarios de demostración y verifica las cinco categorías.
// Uso: API_URL=http://localhost:8000/api/v1 ADMIN_USERNAME=admin ADMIN_PASSWORD=... node src/seed.mjs

const apiUrl = process.env.API_URL ?? 'http://localhost:8000/api/v1';
const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
const demoPassword = process.env.DEMO_PASSWORD ?? 'Demo12345';
const librarianCount = Number(process.env.LIBRARIANS ?? 3);

async function request(method, path, token, body) {
  const response = await fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  return { status: response.status, data: await response.json() };
}

async function main() {
  if (!adminUsername || !adminPassword) {
    console.error('Faltan ADMIN_USERNAME y ADMIN_PASSWORD en el entorno.');
    process.exit(1);
  }

  const login = await request('POST', '/auth/login', null, { username: adminUsername, password: adminPassword });
  if (login.status !== 200) {
    console.error(`No se pudo iniciar sesión: ${login.data.message}`);
    process.exit(1);
  }
  const token = login.data.access_token;

  const categories = await request('GET', '/categories', token);
  console.log(`Categorías disponibles: ${categories.data.map((c) => c.name).join(', ')}`);

  for (let i = 1; i <= librarianCount; i++) {
    const username = `librarian${i}`;
    const result = await request('POST', '/users', token, { username, password: demoPassword, role: 'librarian' });

    if (result.status === 201) {
      console.log(`Bibliotecario creado: ${username}`);
    } else if (result.data.code === 'USERNAME_TAKEN') {
      console.log(`Ya existía: ${username}`);
    } else {
      console.error(`Error con ${username}: ${result.data.message}`);
    }
  }
}

main().catch((error) => {
  console.error(`La API no respondió en ${apiUrl}: ${error.message}`);
  process.exit(1);
});
