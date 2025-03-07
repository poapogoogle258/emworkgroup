'use client'

import React, { useState, useEffect } from "react";
import { fetchMembers } from "@/service/member/api"
import type { member } from "@/type/member";
import { Button, Input, Radio } from "antd";

import { MemberTable } from "./table"
import Link from "next/link";



export const HomePage:React.FC = (props) => {
    const [members, setMember] = useState<member[]>([])
    const [orderOption, serOrderOption] = useState<'asc' | 'desc'>('asc')
    const [search, setSearch] = useState<string | undefined>(undefined)

    const UpdateData = async () => {
        const res = await fetchMembers({ text: search, order: orderOption })
        setMember(res.data!)
    }

    useEffect(() => {
        UpdateData()
    }, [search, orderOption])


    return (
        <main>
            <div className="container mx-auto my-5 flex-row gap-5">
                <Input type="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                <Radio.Group value={orderOption} onChange={(e) => serOrderOption(e.target.value as 'asc' | 'desc')}>
                    <Radio value={'asc'}>order age asc</Radio>
                    <Radio value={'desc'}>order age desc</Radio>
                </Radio.Group>

                <div className="mx-auto my-5 flex flex-row justify-between">
                    <h1 className="flex flex-row gap-2">
                        member : {members?.length ?? 0}
                        <Link href={'/bar'} type="primary">
                            <h2 className="text-blue-500 hover:text-blue-800 hover:underline">
                                show bar chart
                            </h2>
                        </Link>
                    </h1>
                    <CreateNewMemberButton />
                </div>
                <MemberTable datasource={members ?? []} setMembers= {setMember} />
            </div>
        </main>
    );
}

function CreateNewMemberButton() {
    return <Link href={'/new'}>
        <Button type="primary">
            Create New Member
        </Button>
    </Link>

}
