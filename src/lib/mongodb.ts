import { MongoClient, type Collection } from "mongodb";

export type ClickDoc = {
  _id: string; // 링크 id (profile.links[].id)
  count: number;
};

declare global {
  // 개발 모드의 HMR에서 연결이 계속 새로 생기지 않도록 전역에 보관
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
  }

  if (!globalThis._mongoClientPromise) {
    globalThis._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 연결 실패 시 다음 요청에서 다시 시도할 수 있도록 캐시를 비움
      globalThis._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalThis._mongoClientPromise;
}

export async function getClicksCollection(): Promise<Collection<ClickDoc>> {
  const client = await getClientPromise();
  // DB 이름은 URI 경로(/linknamu)에서 가져옴
  return client.db().collection<ClickDoc>("clicks");
}
