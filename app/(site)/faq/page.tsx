'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

const faqs = [
  {
    question: 'How does SmartSafar create personalized itineraries?',
    answer:
      'Our AI analyzes your preferences, budget, interests, and travel style to generate day-by-day itineraries tailored to your needs. Each itinerary includes specific locations, meal recommendations, estimated costs, and travel tips.',
  },
  {
    question: 'Can I edit an AI-generated itinerary?',
    answer:
      'Yes! Once generated, you can save itineraries to your account and view them anytime. While editing within the app is coming soon, you can copy details and modify them as needed.',
  },
  {
    question: 'What is a travel pass and how do I get one?',
    answer:
      'Travel passes are digital documents containing your trip details and a QR code for easy identification at checkpoints and accommodations. You can generate a pass directly from your dashboard with your personal and trip information.',
  },
  {
    question: 'Is SmartSafar available in English and Urdu?',
    answer:
      'Yes! SmartSafar is fully bilingual. You can toggle between English and Urdu anytime using the language selector in the header.',
  },
  {
    question: 'How secure is my personal information?',
    answer:
      'We use enterprise-grade encryption, secure authentication with Better Auth, and follow industry best practices to protect your data. Your information is never shared with third parties without consent.',
  },
  {
    question: 'What areas of Pakistan does SmartSafar cover?',
    answer:
      'We cover all major destinations including Hunza Valley, Skardu, Swat Valley, Naran-Kaghan, Lahore, Karachi, Islamabad, and many more. Our database continuously expands with new locations.',
  },
  {
    question: 'Can I book hotels and flights through SmartSafar?',
    answer:
      'Currently, SmartSafar provides recommendations and booking links to partner platforms. Direct in-app booking is coming soon.',
  },
  {
    question: 'How much does SmartSafar cost?',
    answer:
      'SmartSafar is completely free! The AI planner, travel pass generator, and all core features are available at no cost. We may introduce premium features in the future, but basics will always be free.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-16 max-w-3xl">
      <section className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
        <p className="text-lg text-muted-foreground">
          Find answers to common questions about SmartSafar
        </p>
      </section>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, index) => (
          <button
            key={index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6 text-left transition-colors hover:border-primary/50"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold text-lg">{faq.question}</h3>
              <ChevronDown
                className={`h-5 w-5 text-primary transition-transform flex-shrink-0 ${'transform ' + (openIndex === index ? 'rotate-180' : '')}`}
              />
            </div>
            {openIndex === index && (
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-gradient-to-br from-primary/10 to-amber-500/10 border border-primary/20 p-12 text-center flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Still have questions?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Contact our support team at contact@smartsafar.pk or call +92 300 1234567
        </p>
      </div>
    </div>
  )
}
