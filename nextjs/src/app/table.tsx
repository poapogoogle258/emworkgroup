'use client'

import React from 'react';
import type { TableProps } from 'antd';
import { Button,Table } from 'antd';
import type { member } from '@/type/member';
import { deleteMember } from '@/service/member/api';
import Link from 'next/link';



interface MemberTableProps {
    datasource: member[]
    setMembers : React.Dispatch<React.SetStateAction<member[]>>
}

interface DataType {
    key: string;
    image: string;
    name: string;
    lastname: string;
    birthday: Date,
    age: number;
}

export const MemberTable: React.FC<MemberTableProps> = (props) => {

    const data = props.datasource.map((data) => ({ key: data.id, ...data }))

    const column: TableProps<DataType>['columns']  = [
        {
            title: 'id',
            dataIndex: 'key',
        },
        {
            title: 'profile',
            dataIndex: 'image',
            render: (_, record) => {
                return <img src={record.image} alt="profile" width={100} height={100} />
            }
        },
        {
            title: 'name',
            dataIndex: 'name',
        },
        {
            title: 'lastname',
            dataIndex: 'lastname',
        },
        {
            title: 'birthday',
            dataIndex: 'birthday',
            render: (_, record) => {
                const time = new Date(record?.birthday)
                return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
            }
        },
        {
            title: 'age',
            dataIndex: 'age',
        },

        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: DataType) => {
                return <span className='flex flew-row gap-5'>
                    
                    <Link href={`/edit/${record.key}`}>
                        <Button>
                            Edit
                        </Button>
                    </Link>
                    <Button danger onClick={async() => {
                        await deleteMember(record.key)
                        const filterData = props.datasource.filter((data) => data.id !== record.key)
                        props.setMembers(filterData)
                    }}>
                        Delete
                    </Button>   
                </span>
            },
        },
    ];

    return (
        <Table
            columns={column}
            dataSource={data}
            rowClassName="editable-row"
            pagination={{
                defaultPageSize: 5,
                position: ['bottomCenter'],
            }}
        />
    );
};

export default MemberTable;



// title: "birthday",
// "dataIndex": "birthday",
// editable: true,
// render: (_, record) => {

//     const time = new Date(record?.birthday)
//     return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`
// }

