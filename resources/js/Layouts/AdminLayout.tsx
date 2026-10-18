import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';

const navItems = [
    { href: '/tampilpenyewa', label: 'Penyewa' },
    { href: '/tampiladmin', label: 'Admin' },
    { href: '/tampilmanager', label: 'Manager' },
    { href: '/tampillapangan', label: 'Lapangan' },
    { href: '/tampilbooking', label: 'Booking' },
    { href: '/tampilpembayaran', label: 'Pembayaran' },
    { href: '/tampillaporanpembayaran', label: 'Laporan Pembayaran' },
];

export default function AdminLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between gap-4">
                        <div className="flex items-center gap-6 overflow-x-auto">
                            <span className="shrink-0 font-semibold text-gray-800">
                                Buddhi Sports
                            </span>
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`shrink-0 text-sm font-medium ${
                                        url.startsWith(item.href)
                                            ? 'text-gray-900'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <Link
                            href={route('logout.pengelola')}
                            method="post"
                            as="button"
                            className="shrink-0 rounded-md bg-gray-800 px-3 py-1.5 text-sm text-white hover:bg-gray-700"
                        >
                            Log Out
                        </Link>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
