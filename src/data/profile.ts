export type LinkItem = {
  id: string;
  title: string;
  url: string;
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
  imageUrl: "/profile.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "blog", title: "Blog", url: "https://velog.io" },
    { id: "instagram", title: "Instagram", url: "https://instagram.com" },
    { id: "youtube", title: "YouTube", url: "https://youtube.com" },
  ],
};
