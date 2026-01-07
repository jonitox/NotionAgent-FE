'use client';

import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <DescriptionPanel />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LoginForm />
          <SignupForm />
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

