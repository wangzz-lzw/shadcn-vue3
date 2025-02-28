import { Draggable } from 'react-beautiful-dnd';

const TodoItems = ({
    id,
    taskName,
    index,
}: {
  id: string;
  index: number;
  taskName: string;
}) => {
    return (
        <Draggable draggableId={String(id)} index={index}>
            {(draggableProvider, snapshot) => (
                <div
                    className={`rounded h-20 my-2 flex cursor-pointer bg-white hover:text-white items-center justify-center hover:bg-indigo-300 ${snapshot.isDragging ? 'bg-indigo-500 text-white shadow-indigo-400' : ''}`}
                    {...draggableProvider.draggableProps}
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.dragHandleProps}
                >
                    {taskName}
                </div>
            )}
        </Draggable>
    );
};

export default TodoItems;