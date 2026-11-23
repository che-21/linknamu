import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={112}
        height={112}
        priority
        className="h-28 w-28 rounded-full border-2 border-emerald-500 object-cover"
      />
      <h1 className="mt-4 text-2xl font-bold">{name}</h1>
      <p className="mt-2 text-base text-neutral-600 dark:text-neutral-400">{bio}</p>
    </header>
  );
}
