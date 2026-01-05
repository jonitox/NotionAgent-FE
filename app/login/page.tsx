'use client';

import { useState } from 'react';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthFormProps = {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type AuthPanelProps = AuthFormProps & {
  onSubmit: (e: React.FormEvent) => void;
};

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', formData);
    // Login processing
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    console.log('Sign up:', formData);
    // Sign up processing
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <DescriptionPanel />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LoginPanel
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleLoginSubmit}
          />
          <SignupPanel
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSignupSubmit}
          />
        </div>
      </div>
    </div>
  );
}

function DescriptionPanel() {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Notion Agent</h1>
        <p className="text-lg text-gray-600">
          Explore your Notion page content with conversational AI.
        </p>
      </div>
    </div>
  );
}

function LoginPanel({ formData, onChange, onSubmit }: AuthPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Login</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="your@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

function SignupPanel({ formData, onChange, onSubmit }: AuthPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign up</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="your@email.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
