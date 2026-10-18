import { router } from '@inertiajs/react';

export function confirmDelete(url: string, message = 'Yakin ingin menghapus data ini?') {
    if (confirm(message)) {
        router.get(url);
    }
}
