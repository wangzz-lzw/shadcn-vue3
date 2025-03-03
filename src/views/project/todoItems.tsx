import { Draggable } from 'react-beautiful-dnd';

const TodoItems = ({
    id,
    taskName,
    index,
    taskContent
}: {
  id: string;
  index: number;
        taskName: string;
        taskContent: string;
}) => {
    return (
        <Draggable draggableId={String(id)} index={index}>
            {(draggableProvider, snapshot) => (
                <div
                    className={`rounded h-28 my-2  flex cursor-pointer flex-col bg-violet-100 hover:text-white  hover:bg-violet-300 ${snapshot.isDragging ? 'text-white' : ''}`}
                    {...draggableProvider.draggableProps}
                    ref={draggableProvider.innerRef}
                >
                    <h1 className={`text-lg rounded px-2 ${snapshot.isDragging ? 'bg-violet-600' : ''}`}
                        {...draggableProvider.dragHandleProps}
                    > {taskName} </h1>
                    <div className='px-2'>{taskContent}</div>
                </div>
            )}
        </Draggable>
    );
};

export default TodoItems;