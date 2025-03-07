'use client'

import React from "react";
import { Bar } from 'react-chartjs-2';

import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);


import type { member } from "../../type/member";

interface GraphProps {
    datasource: member[]
}


function randomColor(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b}, 0.2)`;
}


export const GraphBar: React.FC<GraphProps> = (props) => {

    const { datasource } = props;

    const groupByAge = new Map<number, member[]>()
    for (const member of datasource) {
        if (!groupByAge.has(member.age)) {
            groupByAge.set(member.age, [])
        }
        groupByAge.get(member.age)?.push(member)
    }

    const sortedAge = Array.from(groupByAge.keys()).sort((a,b) => a - b)
    const labels = sortedAge
    const data = sortedAge.map((age) => {
        const members = groupByAge.get(age)
        return members ? members.length : 0
    })
    

    const colors = data.map(() => randomColor())

    
    const chartData: any = {
        labels: labels,
        datasets: [
            {   
                label: "Age of member",
                data: data,
                backgroundColor :colors,
                fill : true,
                minBarLength : 100,
                borderWidth: 1,
            }
        ]
    }

    const option = {
        type : "bar",
        scales: {
            y: {
                beginAtZero: true
            }
        }
    
    }
    

    return <Bar 
        data={chartData}
        options={option}
    />

}
