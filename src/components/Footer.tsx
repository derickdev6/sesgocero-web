'use client'

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-800 shadow-md mt-8">
        <div className="h-30 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-4">
            {/* <div className="flex justify-between items-center"> */}
            <div className="text-gray-200 text-center mb-4">
                &copy; {new Date().getFullYear()} SESGOCERO. Todos los derechos reservados.
            </div>
            <div className="space-x-4">
                <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-center transition duration-100">
                Política de Privacidad
                </Link>
                <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-center transition duration-100">
                Términos de Servicio
                </Link>
            </div>
            {/* </div> */}
        </div>
        </footer>
    );
    }