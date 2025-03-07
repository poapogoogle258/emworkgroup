'use client'

import React from "react"
import { Button, DatePicker, Form, Input } from "antd";
import { CreateNewMemberAction } from "../memberAction"
import dayjs from "dayjs";

interface MemberFrom {
    name: string;
    lastname: string;
    birthday: Date;
}

export function CreateNewMemberFrom() {

    const [form] = Form.useForm<MemberFrom>();

    const [upload, setUpload] = React.useState<string>('')

    const onFinish = async(values: MemberFrom) => {
        await CreateNewMemberAction(values.name, values.lastname, values.birthday.toISOString(), upload)
        form.resetFields()
        setUpload('')
    };
    

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            autoComplete="off"
        >

            <Form.Item
                label="Upload"
                name="upload"
            >
                {upload && (
                    <img src={upload} alt="Uploaded" style={{ maxWidth: '200px' }} />
                )}
                
                <input type="file" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const formData = new FormData();
                        formData.append('file', file);
                        const res = await fetch('http://localhost:8000/upload', {
                            method: 'POST',
                            body: formData,
                        });
                        if (res.ok) {
                            const data = await res.json();
                            setUpload(data.url)
                        }
                    }
                }} />
            </Form.Item>

            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}> 
                <Input /> 
            </Form.Item>
            <Form.Item label="Lastname" name="lastname" rules={[{ required: true, message: 'Please input your lastname!' }]}>
                <Input /> 
            </Form.Item>
            <Form.Item label="Birthday" name="birthday" rules={[{ required: true, message: 'Please input your birthday!' }]}>
                <DatePicker maxDate={dayjs()}/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}> 
                <Button type="primary" htmlType="submit"> Submit </Button> 
            </Form.Item>
        </Form>
    )
}
