import { useEffect, useId, useState } from 'react';
import {
    DragDropContext,
    DropResult,
} from 'react-beautiful-dnd';
import Column from './column';
import type { Column as ColumnProps } from './interface';
import { Button } from '@/components/ui/button';
import { getTaskList } from '@/service/task';
const projects :ColumnProps[]= [
    { id: '1', name: '已结束', children: [] },
    { id: '2', name: '进行中', children: [] },
    { id: '3', name: '未开始', children: [] },
];

const About = () => {

    const tasks :ColumnProps[]= [
        { id: useId(), name: '消息推送改造', status:'1' },
        { id: useId(), name: '搜索算法优化', status:'2' },
        { id: useId(), name: '消息推送改造', status:'3' },
        { id: useId(), name: '搜索算法优化', status:'1' },
        { id: useId(), name: '消息推送改造', status:'3' },
        { id: useId(), name: '搜索算法优化', status:'3' },
    ];
    const [ projectsState, setProjectsState ] = useState(projects);
    
    const getTask :()=>Promise<ColumnProps[]>= () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(tasks);
            }, 3000);
        });
    };
    const init = async () => {
        const taskList : ColumnProps[]= await getTask();
        projectsState.forEach(item => {
            item.children = taskList.filter((task)=>item.id === task.status );
        });
        setProjectsState([ ...projectsState ]);
        console.log(projectsState, '=====>');
    };
    useEffect( () => {
        init();
    }, []);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        console.log(source, destination);
        if (!destination) return;

        setProjectsState(prev => {
            // 创建完全新的数组结构
            const newProjects = prev.map(column => ({
                ...column,
                children: [ ...column.children! ]
            }));

            if (source.droppableId === destination.droppableId) {
                const columnIndex = newProjects.findIndex(p => p.id === source.droppableId);
                const items = newProjects[columnIndex].children!;
                const [ removed ] = items.splice(source.index, 1);
                items.splice(destination.index, 0, removed);
            } else {
                const sourceColIndex = newProjects.findIndex(p => p.id === source.droppableId);
                const destColIndex = newProjects.findIndex(p => p.id === destination.droppableId);
                
                const [ removed ] = newProjects[sourceColIndex].children!.splice(source.index, 1);
                newProjects[destColIndex].children!.splice(destination.index, 0, removed);
                
                // 创建新的列对象以触发重新渲染
                newProjects[sourceColIndex] = { ...newProjects[sourceColIndex] };
                newProjects[destColIndex] = { ...newProjects[destColIndex] };
            }

            return newProjects;
        });
    };
    const handleAdd = async () => {
        const params = {
            taskName: '随机任务',
            taskContent: 'sssssssss',
            taskSubTitle:''
        };
        const result = await getTaskList(params);
        console.log(result);
    };

    return (
        <div className='flex flex-col h-full'>
            <div className='h-20'>
                <Button size="lg" onClick={handleAdd}>新建</Button>
            </div>
            <div className="flex place-content-between h-full my-2 flex-auto">
          
                <DragDropContext onDragEnd={onDragEnd}>
                    {projectsState.map((item) => (
                        <Column key={item.id} item={item} />
                    ))}
                </DragDropContext>
            </div>
        </div>
   
    );
};
export default About;
