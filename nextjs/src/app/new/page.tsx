'use server'

import { CreateNewMemberFrom} from "./createMemberForm"

export default async function CreateNewMemberPage() {

  return (
    <main>
      <div className="container mx-auto my-5 flex-row gap-5">
        <CreateNewMemberFrom/>
      </div>
    </main>
  );

}
