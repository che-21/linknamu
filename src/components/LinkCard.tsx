import BrandIcon, { type BrandIconName } from "@/components/BrandIcon";

type LinkCardProps = {
  title: string;
  url: string;
  icon: BrandIconName;
  clickCount: number;
  onClick?: () => void;
};

export default function LinkCard({ title, url, icon, clickCount, onClick }: LinkCardProps) {
  const isMail = url.startsWith("mailto:");

  return (
    <a
      href={url}
      onClick={onClick}
      {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
      className="relative flex w-full items-center justify-center rounded-2xl border border-white/70 bg-white/45 px-14 py-4 text-[15px] font-medium shadow-[0_8px_24px_-12px_rgb(150_90_55/0.3)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-[0_12px_28px_-12px_rgb(150_90_55/0.38)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <BrandIcon name={icon} className="absolute left-5 h-5 w-5" />
      {title}
      <span
        className="absolute right-5 text-xs font-normal tabular-nums opacity-60"
        aria-label={`클릭 ${clickCount}회`}
      >
        {clickCount.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
