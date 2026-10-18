import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage<PageProps>().props;

    if (!flash?.error && !flash?.success) {
        return null;
    }

    return (
        <div className="mb-4 space-y-2">
            {flash.error && (
                <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                    {flash.error}
                </div>
            )}
            {flash.success && (
                <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
                    {flash.success}
                </div>
            )}
        </div>
    );
}
