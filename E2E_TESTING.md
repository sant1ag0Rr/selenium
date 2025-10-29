# Pruebas E2E con Selenium (Node.js + Mocha)

## Requisitos
- Node.js 18+
- Chrome/Chromium instalado localmente
- Backend corriendo con `mongo_uri` válido

## Estructura
```
/e2e
  /helpers
    driver.js
    utils.js
  /tests
    01_auth.test.js
    02_search.test.js
    03_reservation.test.js
  /fixtures
    users.json
  seed.js
```

## Scripts
- `npm run e2e` — Ejecuta Mocha sobre `/e2e` (headless)
- `npm run e2e:seed` — Inserta datos dummy vía `/api/admin/dummyData`

## Ejecución local (headless)
1. Arranca backend: `mongo_uri` en `backend/.env` o entorno
   - `mongo_uri=mongodb://localhost:27017/e2e_db`
   - `npm run start` (o `npm run dev` para nodemon)
2. Arranca frontend: `cd client && npm run dev`
3. Opcional: `npm run e2e:seed` (puebla MasterData)
4. Ejecuta pruebas: `npm run e2e`

Consejo: si depuras, cambia a headed pasando `false` a `buildDriver(false)` en los `before()` de tests.

## Ejecución en CI (GitHub Actions)
- Workflow en `.github/workflows/e2e.yml`:
  - Levanta `mongo:6`
  - Instala Chrome
  - Arranca backend (`PORT=5000`, `mongo_uri`)
  - Arranca Vite (`5173`)
  - `wait-on` a endpoints
  - `npm run e2e:seed` y `npm run e2e`
  - Publica reporte Mochawesome como artifact

## Selectores y estabilidad
- Preferir IDs y `data-testid` cuando estén disponibles.
- Evitar selectores frágiles basados únicamente en texto o estructura profunda.
- Usar `waitForVisible` y `waitForUrl` (helpers) para sincronización robusta.
- Tomar screenshots con `screenshot(driver, './e2e/.artifacts/xyz.png')`.
- Mantener fixtures (usuarios, fechas) en `/e2e/fixtures`.

## Datos
- Fixture base en `e2e/fixtures/users.json`.
- `seed.js` usa `/api/admin/dummyData` para poblar modelos de coches.

## Debugging rápido
- Cambia `headless` a `false` en `buildDriver`.
- Añade más `screenshot` en puntos clave.
- Aumenta `--timeout` en el script si tu app tarda en cargar.

## Notas
- El proxy `/api` en `vite.config.js` apunta a `http://localhost:5000`.
- Si usas `vite preview`, ajusta el proxy o usa el dev server para E2E.