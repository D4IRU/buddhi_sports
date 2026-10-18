import { Head, Link } from '@inertiajs/react';

export default function ManagerDashboard({
    manager,
}: {
    manager: { idManager: number; namaManager: string; username: string };
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
            <Head title="Dashboard Manager" />

            <div className="w-full max-w-sm rounded-lg bg-white p-8 text-center shadow-sm">
                <h1 className="text-xl font-semibold text-gray-900">
                    Halo, {manager.namaManager}
                </h1>
                <p className="mt-1 text-sm text-gray-500">Dashboard Manager</p>

                <Link
                    href={route('logout.pengelola')}
                    method="post"
                    as="button"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
                >
                    Log Out
                </Link>
            </div>
        </div>
    );
}
