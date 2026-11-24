import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-6 pt-20 pb-16 sm:pt-24">
      <div className="w-full max-w-sm">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
        <LinkList links={profile.links} />
      </div>
    </main>
  );
}
