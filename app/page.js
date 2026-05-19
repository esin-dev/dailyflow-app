import Link from 'next/link';

export default function Home() {

  return (

    <main className="min-h-screen flex flex-col items-center justify-center gap-6">

      <h1 className="text-5xl font-bold">
        DailyFlow
      </h1>

      <div className="flex gap-4">

        <Link href="/signup">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
            Get Started
          </button>
        </Link>

        <Link href="/login">
          <button className="border px-6 py-3 rounded-xl">
            Login
          </button>
        </Link>

      </div>

    </main>
  );
}