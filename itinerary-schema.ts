import { z } from 'zod'

export const activitySchema = z.object({
  time: z.string().describe('Time of day, e.g. "Morning", "9:00 AM", "Afternoon"'),
  title: z.string().describe('Short name of the activity or place'),
  description: z.string().describe('One or two sentences about what to do'),
  estimatedCost: z.number().describe('Estimated cost per person in Pakistani Rupees (PKR), 0 if free'),
})

export const daySchema = z.object({
  day: z.number().describe('Day number, starting at 1'),
  title: z.string().describe('Theme or headline for the day'),
  location: z.string().describe('Primary city or area for the day'),
  activities: z.array(activitySchema).describe('3 to 5 activities for the day'),
  meals: z.array(z.string()).describe('Recommended local dishes or restaurants for the day'),
  accommodation: z.string().describe('Suggested place or type of stay for the night'),
})

export const itinerarySchema = z.object({
  summary: z.string().describe('A vivid 2-3 sentence overview of the trip'),
  bestTimeToVisit: z.string().describe('Best season/months to take this trip'),
  totalEstimatedCost: z.number().describe('Total estimated cost per person in PKR for the whole trip'),
  currency: z.literal('PKR').describe('Always PKR'),
  days: z.array(daySchema).describe('Day-by-day plan, one entry per day of the trip'),
  packingList: z.array(z.string()).describe('6 to 10 essential items to pack for this specific trip'),
  travelTips: z.array(z.string()).describe('4 to 6 practical, Pakistan-specific tips (safety, connectivity, etiquette, transport)'),
})

export type Itinerary = z.infer<typeof itinerarySchema>
export type ItineraryDay = z.infer<typeof daySchema>
