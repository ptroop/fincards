import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

const TARGET_HASH = '0ed4f6f1922a26d65d5640334138f52252c3e45fa6a259ee46c30bfcf3d9f220'; // Hash for 2deep001

const hashString = async (str) => {
  const msgBuffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export default function PasswordGate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('app_authenticated') === 'true';
  });
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsChecking(true);
    
    try {
      const hash = await hashString(password);
      if (hash === TARGET_HASH) {
        localStorage.setItem('app_authenticated', 'true');
        setIsAuthenticated(true);
        setError('');
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('Error verifying password');
    } finally {
      setIsChecking(false);
    }
  };

  if (isAuthenticated) {
    return children;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] px-4 font-['SF_Pro_Display',sans-serif]">
      <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.04] max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
            <Lock className="w-6 h-6 text-gray-900" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-900 tracking-tight">Fincards</h2>
        <p className="text-sm text-gray-500 text-center mb-8">Enter the password to access your flashcards</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 border-transparent focus:bg-white border focus:border-black/10 focus:ring-4 focus:ring-black/5 transition-all outline-none"
              placeholder="Password"
              autoFocus
              disabled={isChecking}
            />
            {error && <p className="text-red-500 text-sm mt-2 text-center font-medium">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={isChecking}
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-2xl transition-colors mt-2 disabled:opacity-50"
          >
            {isChecking ? 'Checking...' : 'Unlock'}
          </button>
        </form>
      </div>
    </div>
  );
}

