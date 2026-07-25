import { betterAuth } from "better-auth"
import { pool } from "@/lib/db"

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV

const productionURL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : null
const previewURL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : null
const runtimeURL = process.env.V0_RUNTIME_URL ?? null
const explicitURL = process.env.BETTER_AUTH_URL ?? null

const baseURL =
  explicitURL ?? productionURL ?? previewURL ?? runtimeURL ?? "http://localhost:3000"

// Collect every known origin — wildcards let us cover all Vercel preview and v0 subdomains
const trustedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://v0.dev",
  // Wildcard patterns — covers all *.vercel.app and *.vusercontent.net preview URLs
  "*.vercel.app",
  "*.vusercontent.net",
  // Explicit known URLs
  explicitURL,
  productionURL,
  previewURL,
  runtimeURL,
].filter(Boolean) as string[]

export const auth = betterAuth({
  database: pool,
  baseURL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
    },
  },
  trustedOrigins,
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  advanced: {
    // Development (localhost): use sameSite: lax + secure: false so cookies persist
    // Production (HTTPS): use sameSite: none + secure: true for cross-site iframe support
    defaultCookieAttributes: {
      sameSite: isDev ? "lax" : ("none" as const),
      secure: !isDev,
    },
    // Skip CSRF header check in dev — the v0 preview iframe cannot set
    // Sec-Fetch-Site / Origin headers that satisfy the same-origin requirement
    disableCSRFCheck: isDev,
  },
})
