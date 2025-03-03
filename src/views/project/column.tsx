import { Droppable } from 'react-beautiful-dnd';
import type { Column } from './interface.ts';
import TodoItems from './todoItems';
import { EmptyState } from '@/components/empty/index.tsx';
const Column = ({ item }: { item: Column }) => {
    return (
        <div className='flex flex-col'>
            <h1 className="text-lg font-semibold mb-2"> {item.taskName}</h1>
            <Droppable
                droppableId={item.taskId}
                direction="vertical"
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
            >   
                {(provider, snapshot) => (
                    <div
                        {...provider.droppableProps}
                        ref={provider.innerRef}
                        className={`flex flex-col flex-1 w-60 p-4 h-full bg-gray-100 rounded-lg hover:bg-yellow-100 ${snapshot.isUsingPlaceholder ? 'bg-yellow-400' : ''}`}
                    >
                        <div className='h-full'>
                            {item.children!.length ? item.children!.map((childItem) => (
                                <TodoItems
                                    index={childItem.index!}
                                    key={childItem.taskId}
                                    id={childItem.taskId}
                                    taskName={childItem.taskName}
                                    taskContent={childItem.taskContent!}
                                />
                            )) : <EmptyState />}
                            {provider.placeholder}
                        </div>
              
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;