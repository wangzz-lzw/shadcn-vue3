import LoadingPage from '@/hooks/useloading.tsx';
import { Droppable } from 'react-beautiful-dnd';
import type { Column } from './interface.ts';
import TodoItems from './todoItems';
const Column = ({ item }: { item: Column }) => {
    return (
        <div className='flex flex-col'>
            <h1 className="text-lg font-semibold mb-2"> {item.name}</h1>
            <Droppable
                droppableId={item.id}
                direction="vertical"
                isDropDisabled={false}
                isCombineEnabled={false}
                ignoreContainerClipping={false}
            >   
                {(provider, snapshot) => (
                    <div
                        {...provider.droppableProps}
                        ref={provider.innerRef}
                        className={`flex flex-col w-60 p-4 h-full bg-gray-100 rounded-lg hover:bg-yellow-100 ${snapshot.isUsingPlaceholder ? 'bg-yellow-400' : ''}`}
                    >
                        <div className="flex flex-col  flex-1">
                            {item.children!.length ? item.children!.map((childItem, index) => (
                                <TodoItems
                                    key={childItem.id}
                                    id={childItem.id}
                                    name={childItem.name}
                                    index={index}
                                />
                            )) : <LoadingPage />}
                            {provider.placeholder}
                        </div>
              
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;