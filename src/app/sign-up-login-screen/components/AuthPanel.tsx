'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Icon from '@/components/ui/AppIcon';
import AppLogo from '@/components/ui/AppLogo';
import CredentialsBox from '@/app/sign-up-login-screen/components/CredentialsBox';

interface FormValues {
  name: string;
  email: string;
  password: string;
  condition: string;
  remember: boolean;
  terms: boolean;
}

const DEMO_EMAIL = 'paciente.demo@rehabmuscular.pe';
const DEMO_PASSWORD = 'Rehab2026!';

export default function AuthPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: { name: '', email: '', password: '', condition: '', remember: true, terms: false },
  });

  const switchMode = (m: 'login' | 'signup') => {
    setMode(m);
    setAuthError('');
    reset();
  };

  const onSubmit = (v: FormValues) => {
    setAuthError('');
    setLoading(true);
    // Backend integration: call authentication endpoint (login / signup) here
    setTimeout(() => {
      if (mode === 'login' && (v.email !== DEMO_EMAIL || v.password !== DEMO_PASSWORD)) {
        setLoading(false);
        setAuthError('Credenciales inválidas — usa la cuenta de demostración que aparece abajo para ingresar');
        return;
      }
      setLoading(false);
      router.push('/');
    }, 900);
  };

  return (
    <main className="flex items-center justify-center px-4 py-10 sm:px-8">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center gap-2 lg:hidden">
          <AppLogo size={40} />
          <span className="text-lg font-bold tracking-tight text-foreground">RehabMuscular</span>
        </div>

        <div className="inline-flex w-full rounded-lg bg-muted p-1" role="tablist" aria-label="Acceso">
          {(['login', 'signup'] as const).map((m) => (
            <button
              key={`mode-${m}`}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => switchMode(m)}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-all duration-150 active:scale-95 ${
                mode === m ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {m === 'login' ? 'Ingresar' : 'Crear cuenta'}
            </button>
          ))}
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
          {mode === 'login' ? 'Bienvenido de nuevo' : 'Comienza tu recuperación'}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === 'login' ? 'Ingresa para ver tu plan de ejercicios de hoy.' : 'Crea tu cuenta de paciente en pocos pasos.'}
        </p>

        {authError && (
          <div role="alert" className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3">
            <Icon name="ExclamationCircleIcon" size={18} className="mt-0.5 shrink-0 text-destructive" />
            <p className="text-sm text-foreground">{authError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4" noValidate>
          {mode === 'signup' && (
            <>
              <div>
                <label htmlFor="auth-name" className="block text-sm font-medium text-foreground">Nombre completo *</label>
                <input
                  id="auth-name"
                  placeholder="Ej. Rosa Quispe Mendoza"
                  {...register('name', { required: 'Ingresa tu nombre', minLength: { value: 3, message: 'Mínimo 3 caracteres' } })}
                  className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="auth-condition" className="block text-sm font-medium text-foreground">Motivo de rehabilitación</label>
                <select
                  id="auth-condition"
                  {...register('condition')}
                  className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="hombro">Lesión de hombro / manguito</option>
                  <option value="lumbar">Dolor lumbar</option>
                  <option value="rodilla">Rodilla (ligamentos / menisco)</option>
                  <option value="cadera">Cadera / posoperatorio</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-sm font-medium text-foreground">Correo electrónico *</label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              placeholder="tucorreo@ejemplo.pe"
              {...register('email', { required: 'Ingresa tu correo', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo no válido' } })}
              className="mt-1 w-full rounded-lg border border-input bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-sm font-medium text-foreground">Contraseña *</label>
            <div className="relative">
              <input
                id="auth-password"
                type={showPass ? 'text' : 'password'}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                {...register('password', { required: 'Ingresa tu contraseña', minLength: { value: 8, message: 'Mínimo 8 caracteres' } })}
                className="mt-1 w-full rounded-lg border border-input bg-card py-2.5 pl-3 pr-10 text-sm text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon name={showPass ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
          </div>

          {mode === 'login' ? (
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
                <input type="checkbox" {...register('remember')} className="h-4 w-4 accent-primary" />
                Recordarme
              </label>
              <button type="button" className="text-sm font-semibold text-primary hover:underline">¿Olvidaste tu contraseña?</button>
            </div>
          ) : (
            <div>
              <label className="flex cursor-pointer items-start gap-2 text-sm text-foreground">
                <input type="checkbox" {...register('terms', { required: 'Debes aceptar los términos' })} className="mt-0.5 h-4 w-4 accent-primary" />
                <span>Acepto los <span className="font-semibold text-primary">términos de uso</span> y la <span className="font-semibold text-primary">política de privacidad</span>. Entiendo que esta herramienta no reemplaza la consulta médica.</span>
              </label>
              {errors.terms && <p className="mt-1 text-xs text-destructive">{errors.terms.message}</p>}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all duration-150 hover:bg-primary/90 active:scale-95 disabled:opacity-70"
          >
            {loading ? <Icon name="ArrowPathIcon" size={18} className="animate-spin" /> : <Icon name={mode === 'login' ? 'ArrowRightOnRectangleIcon' : 'UserPlusIcon'} size={18} />}
            {loading ? 'Verificando…' : mode === 'login' ? 'Ingresar a mi plan' : 'Crear mi cuenta'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          {mode === 'login' ? '¿Primera vez aquí?' : '¿Ya tienes cuenta?'}{' '}
          <button type="button" onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')} className="font-semibold text-primary hover:underline">
            {mode === 'login' ? 'Crear cuenta' : 'Ingresar'}
          </button>
        </p>

        {mode === 'login' && (
          <CredentialsBox
            email={DEMO_EMAIL}
            password={DEMO_PASSWORD}
            onUse={() => {
              setValue('email', DEMO_EMAIL, { shouldValidate: true });
              setValue('password', DEMO_PASSWORD, { shouldValidate: true });
              setAuthError('');
            }}
          />
        )}

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="font-medium text-primary hover:underline">Explorar el modelo anatómico</Link> sin iniciar sesión
        </p>
      </div>
    </main>
  );
}