"use client"

import { useSession } from "next-auth/react";

export default function Home() {
  const {data:session} = useSession();
  return (
    <div>
      there is no content on this page so leave it hahahaha
    </div>
  );
}
