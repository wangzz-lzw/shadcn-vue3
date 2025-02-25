import {
    DragDropContext,
    DropResult,
} from 'react-beautiful-dnd';
import Column from './column';
import type { Column as ColumnProps } from './interface';
import { useState } from 'react';
const projects :ColumnProps[]= [
    { id: '1', name: '已结束', children: [ { id: '1-1', name: '第一个' } ] },
    { id: '2', name: '进行中', children: [ { id: '2-1', name: '第2个' } ] },
    { id: '3', name: '未开始', children: [ { id: '3-1', name: '第3个' } ] },
];

const About = () => {
    const [ projectsState, setProjectsState ] = useState(projects);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
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

    return (
        <div className="flex place-content-between h-full">
            <DragDropContext onDragEnd={onDragEnd}>
                {projectsState.map((item) => (
                    <Column key={item.id} item={item} />
                ))}
            </DragDropContext>
        </div>
    );
};
export default About;
