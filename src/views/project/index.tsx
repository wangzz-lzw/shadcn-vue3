import { useEffect, useState } from 'react';
import {
    DragDropContext,
    DropResult,
} from 'react-beautiful-dnd';
import Column from './column';
import type { Column as ColumnProps } from './interface';
import { Button } from '@/components/ui/button';
import TaskFormDialog from './addTask';
import { getTaskList, updateTaskStatus } from '@/service/task';

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
        projectsState.forEach(item => {
            item.children = taskList.filter((task)=>item.taskId === task.status );
        });
        setProjectsState([ ...projectsState ]);
    };

    useEffect(() => {
        if (!dialogOpen) {
            init();
        }
    }, [ dialogOpen ]);

    const onDragEnd = async (result: DropResult) => {
        console.log(result, 'result');
        const { source, destination } = result;
      
        console.log(source, destination);
        const params = {
            source,
            destination
        };
        
        if (!destination) return;
        await updateTaskStatus(params);
        await init();
    };
    
    const handleAdd = async () => {
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
