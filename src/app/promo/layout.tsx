import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Promo Anniversary 5 HIGH FIVE! - IDPlay',
  description: 'Nikmati penawaran spesial kami! Dapatkan gratis upgrade kecepatan dan bonus bulan langganan.',
  openGraph: {
    title: 'Promo Anniversary 5 HIGH FIVE! - IDPlay',
    description: 'Nikmati penawaran spesial kami! Dapatkan gratis upgrade kecepatan dan bonus bulan langganan.',
    url: 'https://www.idplay.it.com/promo',
    images: [{ url: '/promo20oct-20nov.jpg', width: 1200, height: 630, alt: 'Promo Anniversary 5 HIGH FIVE! - IDPlay' }],
    siteName: 'IDPlay',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Promo Anniversary 5 HIGH FIVE! - IDPlay',
    description: 'Nikmati penawaran spesial kami! Dapatkan gratis upgrade kecepatan dan bonus bulan langganan.',
    images: ['/promo20oct-20nov.jpg'],
  },
};

export default function PromoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}