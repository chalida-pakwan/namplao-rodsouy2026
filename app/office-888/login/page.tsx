'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';

export default function OfficeLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/office-auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/office-888/dashboard');
        router.refresh(); // Sync server state
      } else {
        const data = await res.json();
        setError(data.error || 'Access Denied');
        setPassword('');
      }
    } catch (err) {
      setError('Connection refused.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        
        <h2 className="text-xl font-medium text-center text-gray-300 mb-8 tracking-wide">
          RESTRICTED AREA
        </h2>
        
        {error && (
          <div className="bg-red-900/30 border border-red-800/50 text-red-400 p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
              placeholder="System ID"
              required
              autoFocus
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder-gray-600"
              placeholder="Passcode"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] flex justify-center items-center shadow-lg shadow-indigo-900/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Authenticate'}
          </button>
        </form>
      </div>
      <div className="mt-8 text-gray-600 text-xs text-center font-mono">
        Authorized Personnel Only<br/>
        IP Logged: {typeof window !== 'undefined' ? 'Recorded' : '...'}
      </div>
    </div>
  );
}
