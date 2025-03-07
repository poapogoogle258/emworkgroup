import type { Response } from "@/type/response";
import type { member } from "@/type/member";

const HOST = "http://127.0.0.1:8000"


export async function fetchMembers(query : {text? : string, order? : 'asc' | 'desc'} = {}): Promise<Response<member[]>> {

    const querySting = new URLSearchParams()
    if(query.text) querySting.set('search', query.text)
    if(query.order) querySting.set('age', query.order)

    const res = await fetch(`${HOST}/api/members?` + querySting.toString())
    if (res.status !== 200) {
      throw new Error('Failed to fetch data')
    }
    
    const result: Response<member[]> = await res.json()

    if(result.error) throw new Error(result.error)

    return result

}


export async function getMember(memberId: string): Promise<Response<member>> {

  const res = await fetch(`${HOST}/api/members/${memberId}`)
  if (res.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  
  const result: Response<member> = await res.json()

  if(result.error) throw new Error(result.error)

  return result

}

export async function createMember(name:string, lastname: string, birthday:string, image: string) {
  const res = await fetch(`${HOST}/api/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, lastname, birthday , image}),
  })
  if (res.status !== 201) {
    throw new Error('Failed to create member')
  }
  return await res.json()
}

export async function updateMember(memberId:string, name:string, lastname: string, birthday:string, image: string) {
  const res = await fetch(`${HOST}/api/members/${memberId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, lastname, birthday, image }),
  })
  if (res.status !== 200) {
    throw new Error('Failed to update member')
  }
  return await res.json()
}

export async function deleteMember(memberId:string) {
  const res = await fetch(`${HOST}/api/members/${memberId}`, {
    method: 'DELETE',
  })
  if (res.status !== 204) {
    throw new Error('Failed to delete member')
  }
  return res

  
}
