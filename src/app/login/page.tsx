'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/services/api';

export default function LoginPage() {
  const router = useRouter();
  const [documentId, setDocumentId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      const res = await axios.post('/auth/loguin', { documentId, password });
      localStorage.setItem('token', res.data.token); // ou use cookies
      router.push('/home');
    } catch (err: any) {
      if (err.response?.data?.message) {
        setErrors(err.response.data.message);
      } else {
        setErrors(['Erro inesperado.']);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md space-y-1">
            {errors.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="documentId" className="block text-sm font-medium text-gray-700">
              Documento
            </label>
            <input
              type="text"
              id="documentId"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
