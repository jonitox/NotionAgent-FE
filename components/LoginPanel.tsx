"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPanel() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", form);
    // TODO: call login API
    router.push("/chat");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
