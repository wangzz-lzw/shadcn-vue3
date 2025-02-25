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
            {(draggableProvider) => (
                <div
                    className="h-20 my-2 flex cursor-pointer bg-cyan-800 items-center justify-center"
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