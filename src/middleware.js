import { NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

const roleRoutes = {
  admin: [
    "/",
    "/students",
    "/dashboard",
    "/options",
    "/users",
    "/access",
    "/transactions",
    "/reports",
    "/unauthorized",
    "/shopping/categories"
  ], 
  secretaria: ["/", "/students", "/dashboard", "/options", "/unauthorized"],
};

const publicRoutes = ["/login", "/forgot-password", "/reset-password"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;

  // Obtenemos la sesión
  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  //console.log("Session en middleware:", session);

  // Redirigir si no hay sesión y la ruta está protegida
  if (path === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (
    !session?.userId &&
    (roleRoutes.admin.includes(path) || roleRoutes.secretaria.includes(path))
  ) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Validación por rol
  if (session?.role) {
    const allowedRoutes = roleRoutes[session.role] || [];

    if (!allowedRoutes.includes(path)) {
      console.log("no autorizado");
      return NextResponse.redirect(new URL("/unauthorized", req.nextUrl));
    }
  }

  // Evitar que usuarios logueados entren a rutas públicas
  if (publicRoutes.includes(path) && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
