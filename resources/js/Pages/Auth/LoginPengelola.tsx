import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function LoginPengelola() {
    const [role, setRole] = useState<'admin' | 'manager'>('admin');

    const { data, setData, post, processing, errors, reset } = useForm({
        role: 'admin',
        username: '',
        password: '',
    });

    const switchRole = (next: 'admin' | 'manager') => {
        setRole(next);
        setData('role', next);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login.pengelola'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login Pengelola" />

            <div className="mb-6 flex gap-2">
                <button
                    type="button"
                    onClick={() => switchRole('admin')}
                    className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
                        role === 'admin'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Login sebagai Admin
                </button>
                <button
                    type="button"
                    onClick={() => switchRole('manager')}
                    className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition ${
                        role === 'manager'
                            ? 'bg-gray-800 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                    Login sebagai Manager
                </button>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex flex-col gap-3">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Log in sebagai {role === 'admin' ? 'Admin' : 'Manager'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
