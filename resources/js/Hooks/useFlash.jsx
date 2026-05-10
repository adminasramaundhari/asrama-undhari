import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { useToast } from '@/Context/ToastContext';

export default function useFlash() {
    const { flash } = usePage().props;
    const { showToast } = useToast();

    useEffect(() => {
        if (flash?.success) {
            showToast(flash.success, 'success');
        }
        if (flash?.error) {
            showToast(flash.error, 'error');
        }
    }, [flash, showToast]);
}