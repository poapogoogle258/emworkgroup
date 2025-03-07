'use server'

import { getMember } from "@/service/member/api";
import { UpdateMemberFrom } from "./editMemberForm";

export default async function EditMemberPage({ params }: { params: { member_id: string } }) {
  const memberId = (await params).member_id;
  const member = await getMember(memberId)

  return (
    <main>
      <div className="container mx-auto my-5 flex-row gap-5">
        <UpdateMemberFrom data={member.data!}/>
      </div>
    </main>
  );
}
