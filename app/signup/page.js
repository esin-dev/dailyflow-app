'use client';

import Link from 'next/link';

import { useState } from 'react';

import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from 'firebase/auth';

import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';

import { auth, db } from '../../lib/firebase';

export default function SignupPage() {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {

    try {

      const usernameRef = doc(db, 'usernames', username);

      const usernameSnap = await getDoc(usernameRef);

      if (usernameSnap.exists()) {
        alert('Username already exists');
        return;
      }

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await sendEmailVerification(userCredential.user);

      await setDoc(
        doc(db, 'users', userCredential.user.uid),
        {
          email,
          username
        }
      );

      await setDoc(
        doc(db, 'usernames', username),
        {
          uid: userCredential.user.uid
        }
      );

      alert('Verification email sent.');

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-slate-100 flex items-center justify-center p-6 text-black">

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">

        <div className="space-y-6">

          <h1 className="text-5xl font-bold text-slate-900">
            DailyFlow
          </h1>

          <p className="text-lg text-slate-600 leading-8">
            Organize your shopping lists and productivity workflow.
          </p>

          <div className="space-y-4">

            <div className="bg-white p-5 rounded-2xl shadow-lg animate-bounce">
              ✅ Create unlimited lists
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-lg animate-pulse">
              🔒 Secure authentication system
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-lg animate-bounce">
              📱 Responsive on all devices
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-5">

          <h2 className="text-3xl font-semibold">
            Create Account
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-4 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Username"
            className="w-full border p-4 rounded-xl"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-4 rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="w-full bg-indigo-600 text-white p-4 rounded-xl"
          >
            Sign Up
          </button>

 <Link href="/login">
    <p className="text-indigo-600 mt-4 cursor-pointer">
      Already have an account? Login
    </p>
  </Link>

        </div>

      </div>

    </main>
  );
}