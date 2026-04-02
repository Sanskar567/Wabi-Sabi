import { cn } from '@/src/lib/utils';
import logoImg from '../assets/WabiSabiLogo.webp';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export default function Logo({ className, variant = 'light' }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      {/* Placeholder for the logo image provided by the user */}
      {/* User should replace this src with their actual hosted logo URL */}
      <img 
        src={logoImg} 
        alt="Wabi Sabi Logo" 
        className={cn(
          "w-12 h-12 md:w-16 md:h-16 object-contain mb-1",
          variant === 'dark' ? "filter invert" : ""
        )}
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div className="hidden flex flex-col items-center">
        <div className={cn(
          "w-10 h-10 rounded-full border-2 flex items-center justify-center mb-1",
          variant === 'light' ? "border-white text-white" : "border-resort-ink text-resort-ink"
        )}>
          <span className="text-[10px] font-serif">WS</span>
        </div>
        <span className={cn(
          "text-xs font-serif tracking-[0.3em] uppercase",
          variant === 'light' ? "text-white" : "text-resort-ink"
        )}>
          Wabi Sabi
        </span>
      </div>
    </div>
  );
}
