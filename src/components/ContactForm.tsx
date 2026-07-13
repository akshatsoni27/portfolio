import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear validation error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')

    try {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
    }
  }

  const handleReset = () => {
    setStatus('idle')
  }

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-stroke bg-surface/55 p-6 md:p-8 backdrop-blur-sm shadow-sm">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500 mb-6">
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="absolute inset-0 rounded-full animate-ping bg-green-500/20 opacity-75" />
            </div>
            <h3 className="text-2xl font-semibold text-text-primary mb-2">Message Sent!</h3>
            <p className="max-w-sm text-sm text-muted mb-8">
              Thank you for reaching out! Your message has been received. I will get back to you as soon as possible.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center rounded-full border border-stroke bg-surface px-6 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:border-[#4E85BF] hover:bg-bg"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs uppercase tracking-[0.15em] text-muted font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full rounded-xl border ${errors.name ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-stroke focus:border-[#4E85BF] focus:ring-[#4E85BF]/20'
                    } bg-bg/40 px-4 py-3 text-sm text-text-primary placeholder-muted/40 transition-all duration-300 focus:outline-none focus:ring-2`}
                  disabled={status === 'submitting'}
                />
                {errors.name && (
                  <span className="text-xs text-red-500/80 mt-1">{errors.name}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs uppercase tracking-[0.15em] text-muted font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full rounded-xl border ${errors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-stroke focus:border-[#4E85BF] focus:ring-[#4E85BF]/20'
                    } bg-bg/40 px-4 py-3 text-sm text-text-primary placeholder-muted/40 transition-all duration-300 focus:outline-none focus:ring-2`}
                  disabled={status === 'submitting'}
                />
                {errors.email && (
                  <span className="text-xs text-red-500/80 mt-1">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-xs uppercase tracking-[0.15em] text-muted font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Collaboration Proposal"
                className={`w-full rounded-xl border ${errors.subject ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-stroke focus:border-[#4E85BF] focus:ring-[#4E85BF]/20'
                  } bg-bg/40 px-4 py-3 text-sm text-text-primary placeholder-muted/40 transition-all duration-300 focus:outline-none focus:ring-2`}
                disabled={status === 'submitting'}
              />
              {errors.subject && (
                <span className="text-xs text-red-500/80 mt-1">{errors.subject}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs uppercase tracking-[0.15em] text-muted font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Hi Akshat, I would love to connect..."
                rows={5}
                className={`w-full resize-none rounded-xl border ${errors.message ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-stroke focus:border-[#4E85BF] focus:ring-[#4E85BF]/20'
                  } bg-bg/40 px-4 py-3 text-sm text-text-primary placeholder-muted/40 transition-all duration-300 focus:outline-none focus:ring-2`}
                disabled={status === 'submitting'}
              />
              {errors.message && (
                <span className="text-xs text-red-500/80 mt-1">{errors.message}</span>
              )}
            </div>

            {status === 'error' && (
              <div className="rounded-xl bg-red-500/10 p-3 text-xs text-red-500 border border-red-500/20">
                Something went wrong. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-text-primary px-5 py-4 text-sm font-medium text-bg transition-all duration-300 hover:opacity-90 disabled:opacity-50"
            >
              {status === 'submitting' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Message...
                </>
              ) : (
                <>
                  Send Message
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
