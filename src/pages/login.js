import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

const ParticlesBackground = dynamic(
  () => {
    return Promise.resolve(() => {
      useEffect(() => {
        const initializeParticles = (attempt = 1, maxAttempts = 5) => {
          if (typeof window !== 'undefined' && window.particlesJS) {
            window.particlesJS('particles-js', {
              particles: {
                number: { 
                  value: 300,
                  density: { enable: true, value_area: 800 }
                },
                color: { value: ['#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6'] },
                shape: {
                  type: 'circle',
                  stroke: { width: 0, color: '#000000' },
                },
                opacity: {
                  value: 0.5,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.1,
                    sync: false
                  },
                },
                size: {
                  value: 2,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.3,
                    sync: false
                  },
                },
                line_linked: { 
                  enable: true,
                  distance: 150,
                  color: '#99f6e4',
                  opacity: 0.15,
                  width: 1
                },
                move: {
                  enable: true,
                  speed: 1,
                  direction: 'none',
                  random: true,
                  straight: false,
                  out_mode: 'out',
                  bounce: false,
                },
              },
              interactivity: {
                detect_on: 'canvas',
                events: {
                  onhover: { enable: false },
                  onclick: { enable: false },
                  resize: true,
                },
              },
              retina_detect: true,
            });
          } else if (attempt <= maxAttempts) {
            setTimeout(() => initializeParticles(attempt + 1, maxAttempts), 500);
          }
        };

        initializeParticles();
      }, []);

      return (
        <div 
          id="particles-js" 
          className="absolute inset-0 z-0 opacity-60"
          style={{
            background: 'radial-gradient(circle at center, #f0fdfa 0%, #ccfbf1 100%)'
          }}
        />
      );
    });
  },
  { ssr: false }
);

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      router.push('/dashboard')
    } else {
      setErrorMessage(data.message || 'Login failed, please try again.')
    }
  }

  return (
    <>
      <Head>
        <title>Login | Task Manager</title>
        <meta name="theme-color" content="#0a0a23" />
        <script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" async />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0fdfa] via-[#ccfbf1] to-[#99f6e4] px-4 overflow-hidden relative">
        <ParticlesBackground />
        
        {/* Glowing orb decoration */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#99f6e4] opacity-30 blur-[80px] animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#5eead4] opacity-30 blur-[80px] animate-float-delay"></div>
        
        <div className="w-full max-w-md p-8 bg-[rgba(15,15,35,0.7)] backdrop-blur-xl rounded-2xl border border-[rgba(255,255,255,0.15)] shadow-2xl z-10 transition-all duration-500 hover:border-[rgba(255,255,255,0.25)] hover:shadow-[0_0_30px_rgba(153,246,228,0.15)]">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#e6e6fa] bg-clip-text text-transparent bg-gradient-to-r from-[#99f6e4] to-[#5eead4]">Login to your account</h2>
          {errorMessage && (
            <div className="bg-red-500/20 text-red-400 p-2 rounded mb-4 border border-red-500/30">{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#e6e6fa]">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-[rgba(230,230,250,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-[#e6e6fa] placeholder-[#d3d3d3]/60"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#e6e6fa]">
                Password
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 bg-[rgba(230,230,250,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-[#e6e6fa] placeholder-[#d3d3d3]/60"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-[#e6e6fa] py-2 px-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 backdrop-blur-md border border-[rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(230,230,250,0.3)]"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-[#d3d3d3]/80">
            Don't have an account?{' '}
            <Link href="/register" className="text-indigo-400 hover:text-indigo-300 transition-all">
              Register
            </Link>
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 10s ease-in-out infinite 2s;
        }
      `}</style>
    </>
  )
}