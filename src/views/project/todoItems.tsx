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
                    className={`rounded h-20 my-2 flex cursor-pointer bg-white hover:text-white items-center justify-center hover:bg-violet-300 ${snapshot.isDragging ? 'bg-violet-500 text-white shadow-violet-400/50' : ''}`}
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