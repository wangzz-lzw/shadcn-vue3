import { Droppable } from 'react-beautiful-dnd';
import TodoItems from './todoItems';
import type { Column } from './interface.ts';
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
                {(provider) => (
                    <div
                        {...provider.droppableProps}
                        ref={provider.innerRef}
                        className="flex flex-col w-60 p-4 min-h-[300px] bg-gray-100 rounded-lg"
                    >
                        <div className="flex flex-col  flex-1">
                            {item.children!.map((childItem, index) => (
                                <TodoItems
                                    key={childItem.id}
                                    id={childItem.id}
                                    name={childItem.name}
                                    index={index}
                                />
                            ))}
                            {provider.placeholder}
                        </div>
              
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;