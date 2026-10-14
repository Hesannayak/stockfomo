import { Suspense } from "react";
import { ProfileContent } from "./profile-content";

export const instant = false;

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  return (
    <Suspense fallback={<div className="p-8 text-center" style={{ color: "var(--fg-dim)" }}>Loading...</div>}>
      <ProfileContent username={username} />
    </Suspense>
  );
}
