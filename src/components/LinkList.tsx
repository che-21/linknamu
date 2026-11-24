"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  // 서버에서 받은 값 (받기 전에는 비어 있어 0회로 표시)
  const [serverCounts, setServerCounts] = useState<Record<string, number>>({});
  // 이 화면에서 누른 횟수 (응답 도착 순서와 상관없이 클릭이 사라지지 않도록 따로 보관)
  const [localClicks, setLocalClicks] = useState<Record<string, number>>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져옴
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: Record<string, number>) => setServerCounts(data))
      .catch((err) => {
        if (err.name !== "AbortError") console.error("클릭 수를 불러오지 못했습니다:", err);
      });
    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    // 화면에는 바로 +1 반영
    setLocalClicks((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    // 새 탭/메일 앱으로 이동해도 요청이 끊기지 않도록 sendBeacon 우선 사용
    const body = JSON.stringify({ id });
    const sent =
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon("/api/clicks", new Blob([body], { type: "application/json" }));
    if (!sent) {
      fetch("/api/clicks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch((err) => console.error("클릭 수를 저장하지 못했습니다:", err));
    }
  }

  return (
    <ul className="mt-12 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            icon={link.icon}
            clickCount={(serverCounts[link.id] ?? 0) + (localClicks[link.id] ?? 0)}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
