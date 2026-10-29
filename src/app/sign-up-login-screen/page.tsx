import React from 'react';
import AuthPanel from '@/app/sign-up-login-screen/components/AuthPanel';
import AuthBrandSide from '@/app/sign-up-login-screen/components/AuthBrandSide';

export default function SignUpLoginPage() {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-2">
      <AuthBrandSide />
      <AuthPanel />
    </div>
  );
}