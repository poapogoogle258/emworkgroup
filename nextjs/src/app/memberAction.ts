"use server"
import { createMember, updateMember, deleteMember } from "@/service/member/api"
import { revalidatePath } from "next/cache"
import { redirect } from 'next/navigation'

export async function CreateNewMemberAction(name:string, lastname:string, birthday: string, image : string) {
    const res = await createMember(name, lastname, birthday, image)
    revalidatePath("/")
    redirect("/")
}


export async function UpdateMemberAction(memberId: string,name:string, lastname:string, birthday: string, image : string) {
    const res = await updateMember(memberId,name, lastname, birthday, image)
    revalidatePath("/")
    redirect("/")
}

export async function DeleteMemberAction(memberId: string) {
    const res = await deleteMember(memberId)
    revalidatePath("/")
}