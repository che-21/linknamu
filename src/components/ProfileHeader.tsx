import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="rounded-full bg-white/70 p-1.5 shadow-[0_18px_40px_-18px_rgb(150_90_55/0.55),0_2px_6px_rgb(150_90_55/0.12)] ring-1 ring-white/80">
        <Image
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          width={150}
          height={150}
          priority
          className="h-[150px] w-[150px] rounded-full object-cover shadow-[inset_0_0_0_1px_rgb(0_0_0/0.04)]"
        />
      </div>
      <h1 className="mt-6 text-[22px] font-semibold tracking-tight">{name}</h1>
      <p className="mt-1.5 text-[15px] text-stone-500">{bio}</p>
    </header>
  );
}
