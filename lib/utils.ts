import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPKR(amount: number) {
  return `Rs ${amount.toLocaleString('en-PK')}`
}

export function mapsDirectionsUrl(from: string, to: string, mode = 'driving') {
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&travelmode=${mode}`
}

export function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function mapsEmbedUrl(place: string, zoom = 11) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(place || 'Pakistan')}&z=${zoom}&output=embed`
}

export function googleHotelsUrl(city: string) {
  return `https://www.google.com/travel/hotels/${encodeURIComponent(city)}`
}

export function bookingUrl(city: string) {
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}`
}
