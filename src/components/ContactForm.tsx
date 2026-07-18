import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FormData {
  fullName: string
  phone: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  fullName?: string
  phone?: string
  email?: string
  subject?: string
  message?: string
}

const SUBJECTS = [
  'Job Opportunity',
  'Freelance Project',
  'Collaboration',
  'Just Saying Hi',
  'Other',
]

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!formData.fullName.trim()) e.fullName = 'Full name is required'
    if (!formData.phone.trim()) e.phone = 'Phone number is required'
    if (!formData.email.trim()) {
      e.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Enter a valid email address'
    }
    if (!formData.subject) e.subject = 'Please select a subject'
    if (!formData.message.trim()) {
      e.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus('success')
      setFormData({ fullName: '', phone: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputBase =
    'w-full rounded-xl border bg-surface/50 px-4 py-3 text-sm text-text-primary placeholder-muted/50 transition-all duration-200 focus:outline-none focus:ring-2'
  const inputNormal = `${inputBase} border-stroke focus:border-[#2563EB] focus:ring-[#2563EB]/20`
  const inputError  = `${inputBase} border-red-500/50 focus:border-red-500 focus:ring-red-500/20`

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-stroke bg-surface/40 p-6 backdrop-blur-sm shadow-sm md:p-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-500">
              <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="absolute inset-0 animate-ping rounded-full bg-green-500/20 opacity-75" />
            </div>
            <h3 className="mb-2 text-2xl font-semibold text-text-primary">Message Sent!</h3>
            <p className="mb-8 max-w-sm text-sm text-muted">
              Thanks for reaching out. I'll get back to you as soon as possible.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="rounded-full border border-stroke bg-surface px-6 py-3 text-sm font-medium text-text-primary transition hover:border-[#2563EB]"
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
            noValidate
          >
            <h2 className="mb-6 text-xl font-bold text-text-primary">Send me a Message</h2>

            {/* Row 1: Full Name + Phone */}
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-xs font-medium text-text-primary">
                  Full Name <span className="text-[#2563EB]">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={status === 'submitting'}
                  className={errors.fullName ? inputError : inputNormal}
                />
                {errors.fullName && <span className="text-xs text-red-500">{errors.fullName}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-medium text-text-primary">
                  Phone Number <span className="text-[#2563EB]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  disabled={status === 'submitting'}
                  className={errors.phone ? inputError : inputNormal}
                />
                {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="mb-5 flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-medium text-text-primary">
                Email Address <span className="text-[#2563EB]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={status === 'submitting'}
                className={errors.email ? inputError : inputNormal}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
            </div>

            {/* Row 3: Subject dropdown */}
            <div className="mb-5 flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-xs font-medium text-text-primary">
                Subject <span className="text-[#2563EB]">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={status === 'submitting'}
                className={`${errors.subject ? inputError : inputNormal} appearance-none cursor-pointer`}
              >
                <option value="" disabled>Select a subject</option>
                {SUBJECTS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.subject && <span className="text-xs text-red-500">{errors.subject}</span>}
            </div>

            {/* Row 4: Message */}
            <div className="mb-6 flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-medium text-text-primary">
                Message <span className="text-[#2563EB]">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about the opportunity and how I can contribute to your team..."
                rows={5}
                disabled={status === 'submitting'}
                className={`resize-none ${errors.message ? inputError : inputNormal}`}
              />
              {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
            </div>

            {status === 'error' && (
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-500">
                Something went wrong. Please try again.
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-surface border border-stroke px-5 py-4 text-sm font-semibold text-muted transition hover:border-[#2563EB]/50 hover:text-text-primary disabled:opacity-50"
            >
              {status === 'submitting' ? (
                <>
                  <svg className="-ml-1 mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
