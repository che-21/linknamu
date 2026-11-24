import { connection } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { profile } from "@/data/profile";

const linkIds = new Set(profile.links.map((link) => link.id));

// 모든 링크의 현재 클릭 수를 한 번에 반환: { github: 42, blog: 7, ... }
export async function GET() {
  await connection(); // 항상 요청 시점에 실행 (빌드 시 프리렌더링 방지)

  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({ _id: { $in: [...linkIds] } }).toArray();

    const counts: Record<string, number> = {};
    for (const id of linkIds) counts[id] = 0;
    for (const doc of docs) counts[doc._id] = doc.count;

    return Response.json(counts, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("클릭 수 조회 실패:", err);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

// 링크 클릭 수 1 증가. body: { id: "github" }
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !linkIds.has(id)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ id, count: doc?.count ?? 1 });
  } catch (err) {
    console.error("클릭 수 저장 실패:", err);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
