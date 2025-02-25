import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';

const projects = [
    { id: '1', name: '已结束', children: [ { id: '1-1', name: '第一个' } ] },
    { id: '2', name: '进行中', children: [ { id: '2-1', name: '第2个' } ] },
    { id: '3', name: '未开始', children: [ { id: '3-1', name: '第3个' } ] },
];

const ProjectList = ({ item }: { item: (typeof projects)[number] }) => {
    return (
        <Droppable
            droppableId={item.id}
            direction="vertical"
            isDropDisabled={false}
        >
            {(provider) => (
                <div
                    {...provider.droppableProps}
                    ref={provider.innerRef}
                    className="h-full w-full p-10"
                >
                    {item.children.map((childItem, index) => (
                        <TodoItems
                            key={childItem.id}
                            id={childItem.id}
                            name={childItem.name}
                            index={index}
                        />
                    ))}
                    {provider.placeholder}
                </div>
            )}
        </Droppable>
    );
};
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
                <span
                    className="w-full h-20 flex block cursor-pointer bg-cyan-800 items-center justify-center"
                    {...draggableProvider.draggableProps}
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.dragHandleProps}
                >
                    {name}
                </span>
            )}
        </Draggable>
    );
};
const About = () => {
    const onDragEnd = (dragProps: DropResult) => {
        console.log('dragProps=====>', dragProps);
    };

    return (
        <div className="flex place-content-between h-full">
            <DragDropContext onDragEnd={onDragEnd}>
                {projects.map((item) => (
                    <ProjectList key={item.id} item={item} />
                ))}
            </DragDropContext>
        </div>
    );
};

export default About;
