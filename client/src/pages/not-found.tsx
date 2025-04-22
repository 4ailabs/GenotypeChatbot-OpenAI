import React from "react";
import { Link } from "wouter";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        La página que estás buscando no existe o ha sido eliminada.
      </p>
      <Link href="/">
        <a className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          Volver al inicio
        </a>
      </Link>
    </div>
  );
}