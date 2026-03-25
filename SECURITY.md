## Helmet.js Configuration

### Configuration Applied

The application configures Helmet with an API-focused policy in `src/app.ts`:

```ts
const helmetConfig: Parameters<typeof helmet>[0] = {
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  hsts:
    NODE_ENV === "production"
      ? {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        }
      : false,
  referrerPolicy: { policy: "no-referrer" },
};

app.use(helmet(helmetConfig));
```

#### Justification

1. **`contentSecurityPolicy: false`**  
   - This API only returns JSON and does not render HTML content. Content Security Policy (CSP) is primarily designed to mitigate XSS attacks in browsers that render HTML and execute scripts. Disabling CSP here simplifies configuration without reducing security for this JSON-only API.  
   - Sources:  
     - Helmet documentation explains that CSP is most useful for applications serving HTML pages: https://helmetjs.github.io/  
     - MDN Web Docs describe CSP as a defense against XSS in web pages that execute scripts: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

2. **`crossOriginEmbedderPolicy: false`**  
   - COEP is meant for advanced browser isolation for web pages that embed cross-origin resources. This API does not embed resources; disabling COEP avoids compatibility issues with some clients while providing no meaningful security benefit for pure JSON APIs.  
   - Sources:  
     - MDN COEP documentation notes that it is intended for documents that load cross-origin resources: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy  
     - Helmet docs mention that some cross-origin policies can break third-party integrations if misconfigured: https://helmetjs.github.io/

3. **`hsts` (HTTP Strict Transport Security) enabled in production**  
   - When `NODE_ENV` is `production`, the API sends HSTS headers with a one-year max age, including subdomains and `preload`. This instructs browsers to only connect over HTTPS and protects against protocol downgrade attacks and some cookie hijacking risks. It is disabled in development to avoid locking localhost into HTTPS.  
   - Sources:  
     - OWASP Secure Headers Project recommends HSTS with long max-age for production APIs: https://owasp.org/www-project-secure-headers/  
     - MDN HSTS documentation describes how it enforces HTTPS and its security benefits: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security

4. **`referrerPolicy: { policy: "no-referrer" }`**  
   - This setting prevents the API from exposing sensitive URL information (such as path and query parameters) in the `Referer` header when a client follows links to other origins. This reduces the risk of leaking IDs or other identifiers through referrer headers.  
   - Sources:  
     - MDN explains that `no-referrer` avoids sending referrer data entirely: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy  
     - OWASP Secure Headers Project recommends setting an explicit, privacy-preserving `Referrer-Policy`: https://owasp.org/www-project-secure-headers/

5. **Core Helmet protections (XSS, MIME sniffing, framing)**  
   - By using `helmet(helmetConfig)` the API also benefits from:
     - `X-Content-Type-Options: nosniff` to prevent MIME type sniffing.  
     - `X-Frame-Options` (frameguard) to mitigate clickjacking by blocking framing.  
     - Other sensible defaults recommended by Helmet for secure HTTP headers.  
   - Sources:  
     - Helmet documentation describes the default header set and protections: https://helmetjs.github.io/  
     - OWASP Secure Headers Project lists these headers as best practices for APIs: https://owasp.org/www-project-secure-headers/

## CORS Configuration

### Configuration Applied

The API configures CORS in `src/app.ts` using environment-driven allowed origins:

```ts
const allowedOrigins = CORS_ALLOWED_ORIGINS.split(",").map((origin) => origin.trim());

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
```

Environment variables are defined in `.env` / `.env.example`:

```env
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

#### Justification

1. **Origin allowlist controlled via `CORS_ALLOWED_ORIGINS`**  
   - The API only allows cross-origin requests from an explicit list of trusted front-end origins. This avoids the insecure pattern of using `"*"` or reflecting the `Origin` header, which can lead to CORS misconfigurations.  
   - Making the list environment-driven allows different origins in development, staging, and production without changing code.  
   - Sources:  
     - OWASP CORS Cheat Sheet recommends explicit allowlists instead of wildcards: https://cheatsheetseries.owasp.org/cheatsheets/CORS_Cheat_Sheet.html  
     - MDN CORS documentation describes how `Access-Control-Allow-Origin` should be restricted to trusted origins: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

2. **Restricted HTTP methods**  
   - `methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]` limits cross-origin interaction to the methods actually supported by the API. This follows the principle of least privilege and avoids surprising behavior if additional methods are ever added.  
   - Sources:  
     - OWASP CORS Cheat Sheet notes that only necessary methods should be enabled: https://cheatsheetseries.owasp.org/cheatsheets/CORS_Cheat_Sheet.html  
     - MDN documents how `Access-Control-Allow-Methods` controls which methods are allowed in cross-origin requests: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Methods

3. **Limited allowed headers**  
   - `allowedHeaders: ["Content-Type", "Authorization"]` ensures that only the headers needed for typical JSON APIs and bearer-style auth are permitted in cross-origin requests. This reduces the attack surface compared to allowing arbitrary headers.  
   - Sources:  
     - OWASP CORS Cheat Sheet suggests explicitly defining allowed headers instead of using wildcards: https://cheatsheetseries.owasp.org/cheatsheets/CORS_Cheat_Sheet.html  
     - MDN describes how `Access-Control-Allow-Headers` is used during preflight requests: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers

4. **Error on disallowed origins**  
   - The `origin` callback returns an error when the request origin is not in the allowlist. This makes misconfigurations visible during development and helps ensure that only intended origins can access the API with browser credentials.  
   - Sources:  
     - MDN notes that browsers enforce CORS based on the server’s response headers; explicitly rejecting unknown origins is a common pattern in secure API implementations: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

## Environment Variable Management

### Overview

- Environment variables are loaded using `dotenv` in `src/config/env.ts` and imported where needed.  
- Sensitive values such as `FIREBASE_SERVICE_ACCOUNT_PATH` and CORS configuration are not hardcoded; they are provided via `.env`, which is excluded from version control via `.gitignore`.

This approach aligns with the Twelve-Factor App methodology for configuration and reduces the risk of accidentally committing secrets.
