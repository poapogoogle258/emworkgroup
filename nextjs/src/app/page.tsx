'use server'

import { HomePage } from "./client_page";

export default async function Page() {

  return (
    <main>
      <div className="container mx-auto my-5 flex-row gap-5">
          <HomePage/>
      </div>
    </main>
  );

}
