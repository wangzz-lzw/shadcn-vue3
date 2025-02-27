import { Draggable } from 'react-beautiful-dnd';

const TodoItems = ({
    id,
    name,
    index,
}: {
  id: string;
  index: number;
  name: string;
}) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(draggableProvider, snapshot) => (
                <div
                    className={`rounded h-20 my-2 flex cursor-pointer bg-white hover:text-white items-center justify-center hover:bg-violet-700 ${snapshot.isDragging ? 'bg-violet-800 text-white shadow-violet-900/50' : ''}`}
                    {...draggableProvider.draggableProps}
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.dragHandleProps}
                >
                    {name}
                </div>
            )}
        </Draggable>
    );
};

export default TodoItems;