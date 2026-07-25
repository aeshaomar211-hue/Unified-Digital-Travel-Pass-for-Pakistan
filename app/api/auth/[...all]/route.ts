import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV
const { GET: originalGET, POST: originalPOST } = toNextJsHandler(auth.handler)

export const GET = async (req: Request, ctx: any) => {
  const res = await originalGET(req, ctx)
  
  if (isDev) {
    // In dev: strip __Secure- prefix and Secure flag so cookies work on http://
    const headers = new Headers(res.headers)
    const cookies = headers.getSetCookie()
    headers.delete("set-cookie")
    
    for (const cookie of cookies) {
      let fixed = cookie.replace(/^__Secure-/, "")
      fixed = fixed.replace(/;\s*Secure(?=;|$)/i, "") // Remove Secure flag
      headers.append("set-cookie", fixed)
    }
    
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers })
  }
  
  return res
}

export const POST = async (req: Request, ctx: any) => {
  const res = await originalPOST(req, ctx)
  
  if (isDev) {
    // In dev: strip __Secure- prefix and Secure flag so cookies work on http://
    const headers = new Headers(res.headers)
    const cookies = headers.getSetCookie()
    headers.delete("set-cookie")
    
    for (const cookie of cookies) {
      let fixed = cookie.replace(/^__Secure-/, "")
      fixed = fixed.replace(/;\s*Secure(?=;|$)/i, "") // Remove Secure flag
      headers.append("set-cookie", fixed)
    }
    
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers })
  }
  
  return res
}
