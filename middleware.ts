// middleware.ts
import { authMiddleware } from '@clerk/nextjs'
import { ROLES } from '@/lib/auth/roles'

export default authMiddleware({
  publicRoutes: ['/sign-in', '/sign-up'],
  afterAuth(auth, req) {
    // Verificar roles para rutas específicas
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const userRole = auth.user?.publicMetadata?.role
      if (userRole !== ROLES.ADMIN) {
        return Response.redirect(new URL('/dashboard', req.url))
      }
    }
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}