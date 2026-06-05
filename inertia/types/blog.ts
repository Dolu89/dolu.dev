export type BlogPostMeta = {
  slug: string
  title: string
  description: string
  date: string
  readingTime: string
  tags: string[]
}

export type BlogPost = BlogPostMeta & {
  html: string
}

/**
 * Formats an ISO date (YYYY-MM-DD) as e.g. "29 Apr 2026" without depending on
 * the visitor's locale ordering.
 */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return `${day} ${months[month - 1]} ${year}`
}
