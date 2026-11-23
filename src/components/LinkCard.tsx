type LinkCardProps = {
  title: string;
  url: string;
};

export default function LinkCard({ title, url }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md active:translate-y-0 dark:border-neutral-700 dark:bg-neutral-900"
    >
      {title}
    </a>
  );
}
