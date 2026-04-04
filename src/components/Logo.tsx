import { cn } from '@/lib/utils';
import logoImg from '@/assets/images/logo.webp';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className, variant = 'light' }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <img 
        src={logoImg} 
        alt="Wabi Sabi Logo" 
        className={cn(
          "w-full h-full object-contain",
          variant === 'dark' ? "brightness-0" : "invert brightness-200"
        )}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
