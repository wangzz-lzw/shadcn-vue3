import { useEffect, useState } from 'react';
import {
    DragDropContext,
    DropResult,
} from 'react-beautiful-dnd';
import Column from './column';
import type { Column as ColumnProps } from './interface';
import { Button } from '@/components/ui/button';
import TaskFormDialog from './addTask';
import { getTaskList } from '@/service/task';

const projects :ColumnProps[]= [
    { taskId: 'completed', taskName: '已结束', children: [] },
    { taskId: 'in_progress', taskName: '进行中', children: [] },
    { taskId: 'pending', taskName: '未开始', children: [] },
];

const About = () => {
    const [ dialogOpen, setDialogOpen ] = useState(false);
    const [ projectsState, setProjectsState ] = useState(projects);
    const init = async () => {
        const { data } = await getTaskList();
        const taskList: ColumnProps[] = data!;
        console.log(taskList, 'taskList');
        projectsState.forEach(item => {
            item.children = taskList.filter((task)=>item.taskId === task.status );
        });
        setProjectsState([ ...projectsState ]);
        console.log(projectsState, '=====>');
    };
    useEffect( () => {
        init();
    }, []);

    const onDragEnd = (result: DropResult) => {
        console.log(result, 'result');
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
                const columnIndex = newProjects.findIndex(p => p.taskId === source.droppableId);
                const items = newProjects[columnIndex].children!;
                const [ removed ] = items.splice(source.index, 1);
                items.splice(destination.index, 0, removed);
            } else {
                const sourceColIndex = newProjects.findIndex(p => p.taskId === source.droppableId);
                const destColIndex = newProjects.findIndex(p => p.taskId === destination.droppableId);
                
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
        // const params = {
        //     taskName: '随机任务',
        //     taskContent: 'sssssssss',
        //     taskSubTitle:''
        // };
        // const result = await addtask(params);
        // console.log(result);
        setDialogOpen(true);
    };

    return (
        <div className='flex flex-col h-full'>
            <div className='h-20'>
                <Button size="lg" onClick={handleAdd}>新建</Button>
            </div>
            <div className="flex place-content-between h-full my-2 flex-auto">
          
                <DragDropContext onDragEnd={onDragEnd}>
                    {projectsState.map((item) => (
                        <Column key={item.taskId} item={item} />
                    ))}
                </DragDropContext>
            </div>
            <TaskFormDialog open={dialogOpen} 
                onOpenChange={setDialogOpen}/>
        </div>
   
    );
};
export default About;
