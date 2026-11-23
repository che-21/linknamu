import type { BrandIconName } from "@/components/BrandIcon";

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  icon: BrandIconName;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "박지연",
  bio: "세계 최강 바이브코더",
  imageUrl: "/chiikawa.PNG",
  links: [
    { id: "github", title: "깃허브", url: "https://github.com/che-21", icon: "github" },
    { id: "blog", title: "블로그", url: "https://parkdelay.tistory.com/", icon: "tistory" },
    { id: "email", title: "이메일", url: "mailto:cieletoile623@gmail.com", icon: "gmail" },
  ],
};
