<!-- Proyecto Playwright - README en español -->
# PlayWright — Pruebas E2E con Playwright

Una colección ligera de pruebas E2E usando Playwright. Incluye casos de ejemplo para la landing y el carrito, utilidades de accesibilidad y una guía para ejecutar en BrowserStack.

## ¿Qué encontrarás en este proyecto?

- **`test/e2e`**: carpeta con especificaciones E2E (landing, cart).
- **`test/pages`** y **`test/components`**: helpers y componentes de prueba.
- **`playwright.config.ts`**: configuración de Playwright (navegadores, timeouts, reporter).
- **`helper/`**: utilidades y helpers globales (accessibility, init-page, etc.).

## Estructura del proyecto

- **Tests E2E**: [test/e2e](test/e2e) — `landing.spec.ts`, `cart.spec.ts`.
- **Páginas / Page Objects**: [test/pages](test/pages)
- **Configuración**: [playwright.config.ts](playwright.config.ts#L1)

## Comandos útiles

- Ejecutar todas las pruebas locales:

```bash
npx playwright test
```

- Ejecutar la prueba del carrito:

```bash
npm run test-cart
```

- Ejecutar la prueba de landing:

```bash
npm run test-landing
```

- Ejecutar tests marcados como smoke:

```bash
npm run test-smoke-suite
```

- Ejecutar (ejemplo) en BrowserStack usando variables de entorno:

```bash
npm run test:browserstack
```

> Nota: `test:browserstack` es un script de ejemplo que activa la variable `BROWSERSTACK=true`. Debes establecer tus credenciales y caps como se explica abajo.

## Ejecutar en BrowserStack (guía rápida)

1. Crea una cuenta en BrowserStack y obtén `BROWSERSTACK_USERNAME` y `BROWSERSTACK_ACCESS_KEY`.
2. Copia `.env.example` a `.env` y completa las credenciales.
3. Revisa `browserstack-caps.json` para ajustar navegador, versión y sistema operativo.
4. Ejecuta:

```bash
export BROWSERSTACK_USERNAME=tu_usuario
export BROWSERSTACK_ACCESS_KEY=tu_access_key
npm run test:browserstack
```

BrowserStack expone un endpoint WebSocket que Playwright puede usar para ejecutar pruebas en la infraestructura remota. Este repositorio incluye un ejemplo de `browserstack-caps.json` y un script de ejemplo en la documentación para ayudarte a construir el `wsEndpoint` requerido.

## Variables de entorno sugeridas (.env)

Rellena los valores en un archivo `.env` (no incluir secretos en el repo):

```
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
BROWSERSTACK_PROJECT=My Playwright Project
BROWSERSTACK_BUILD=Local Run
BROWSERSTACK_BROWSER=chrome
BROWSERSTACK_BROWSER_VERSION=latest
BROWSERSTACK_OS=OS X
BROWSERSTACK_OS_VERSION=Monterey
```
