export const site = {
  name: 'Ivan Franco',
  role: 'Software Developer',
  location: 'Barcelona',
  tagline: 'Building tools, telling stories, drinking mate.',
  bio: "I'm a software developer based in Barcelona. I build things for the web, write about what I learn, and host a podcast about software and culture.",
  email: 'hello@ivanfranco.dev',
  url: 'https://ivanfranco502.vercel.app',
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/podcast', label: 'Podcast' },
  { href: '/now', label: 'Now' },
  { href: '/resume', label: 'Resume' },
] as const;

type SocialLink = {
  label: string;
  href: string;
  icon: string;
};

export const socials: readonly SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/ivanfranco502', icon: 'simple-icons:github' },
  { label: 'Medium', href: 'https://medium.com/@ivanfranco502', icon: 'simple-icons:medium' },
  { label: 'Collected Notes', href: 'https://collectednotes.com/ivanfranco502', icon: 'lucide:notebook-pen' },
  { label: 'Email', href: 'mailto:hello@ivanfranco.dev', icon: 'lucide:mail' },
] as const;

export const writingProfiles = [
  {
    platform: 'Collected Notes',
    href: 'https://collectednotes.com/ivanfranco502',
    description: 'Notes, essays, and longer-form thinking.',
    icon: 'lucide:notebook-pen',
  },
  {
    platform: 'Medium',
    href: 'https://medium.com/@ivanfranco502',
    description: 'Cross-posted articles and developer write-ups.',
    icon: 'simple-icons:medium',
  },
] as const;
