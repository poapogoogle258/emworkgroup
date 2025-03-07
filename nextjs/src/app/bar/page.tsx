'use server'

import { GraphBar } from "@/app/bar/graph_bar";
import { fetchMembers } from "@/service/member/api"

export default async function Page() {
  const data = await fetchMembers()
  return (
    <main>
      <div className="container mx-auto my-5">
          <GraphBar datasource={data.data!} />
      </div>
    </main>
  );
}
