import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { CheckCircle2 } from 'lucide-react'

interface FormValues {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (values.name.trim().length < 2) {
    errors.name = '// error: name must be at least 2 characters'
  }
  if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = '// error: enter a valid email address'
  }
  if (values.message.trim().length < 10) {
    errors.message = '// error: message must be at least 10 characters'
  }
  return errors
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-md border bg-panel px-3 py-2 font-mono text-sm text-text placeholder:text-faint transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text ${
    hasError ? 'border-text' : 'border-line'
  }`

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)

  const update =
    (field: keyof FormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }))
      setErrors((err) => ({ ...err, [field]: undefined }))
    }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    if (Object.keys(next).length > 0) return
    // TODO: wire to Resend or Formspree
    setSent(true)
    setValues({ name: '', email: '', message: '' })
  }

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="flex items-center gap-2 font-mono text-sm">
          <CheckCircle2 className="h-4 w-4 text-matrix" />
          message sent — thanks for reaching out!
        </p>
        <p className="text-sm text-muted">
          I'll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="rounded-md border border-line px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
        >
          send_another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="font-mono text-xs text-muted">
          name:
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={update('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          placeholder="Jane Doe"
          className={inputClass(Boolean(errors.name))}
        />
        {errors.name && (
          <p id="contact-name-error" className="font-mono text-xs text-text">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-email" className="font-mono text-xs text-muted">
          email:
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={update('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          placeholder="jane@example.com"
          className={inputClass(Boolean(errors.email))}
        />
        {errors.email && (
          <p id="contact-email-error" className="font-mono text-xs text-text">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="font-mono text-xs text-muted"
        >
          message:
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={values.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? 'contact-message-error' : undefined
          }
          placeholder="Tell me about your project..."
          className={`${inputClass(Boolean(errors.message))} resize-y`}
        />
        {errors.message && (
          <p id="contact-message-error" className="font-mono text-xs text-text">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-text px-4 py-2.5 font-mono text-sm font-bold text-bg transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text"
      >
        submit
      </button>
    </form>
  )
}
