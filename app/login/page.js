'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';

import { auth } from '../../lib/firebase';

import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

   const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential.user.emailVerified) {
        alert('Please verify your email first');
        return;
      }

      router.push('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const forgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);

      alert('Password reset email sent');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 text-black">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md space-y-5">
        <h1 className="text-3xl font-bold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-4 rounded-xl"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
           placeholder="Password"
          className="w-full border p-4 rounded-xl"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white p-4 rounded-xl"
        >
          Login
        </button>

        <button
          onClick={forgotPassword}
          className="text-indigo-600"
        >
          Forgot Password?
        </button>

 <Link href="/signup">
          <p className="text-indigo-600 mt-4 cursor-pointer">
            Don’t have an account? Sign Up
          </p>
        </Link>

      </div>
    </main>
  );
}