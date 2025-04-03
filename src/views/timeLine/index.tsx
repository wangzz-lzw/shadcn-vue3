import Timeline from 'react-calendar-timeline';
// 确保包含时间轴的样式表，否则时间轴不会有样式
import 'react-calendar-timeline/style.css';
import moment from 'moment';

const groups = [ { id: 1, title: '组1' }, { id: 2, title: '组2' } ];
const items = [
    {
        id: 1,
        group: 1,
        title: '项目1',
        start_time: moment(),
        end_time: moment().add(1, 'hour')
    },
    {
        id: 2,
        group: 2,
        title: '项目2',
        start_time: moment().subtract(0.5, 'hour'),
        end_time: moment().add(0.5, 'hour')
    },
    {
        id: 3,
        group: 1,
        title: '项目3',
        start_time: moment().add(2, 'hour'),
        end_time: moment().add(3, 'hour')
    }
];

const TimeLine = () => {
    return (
        <Timeline
            groups={groups}
            items={items}
            defaultTimeStart={moment().subtract(12, 'hour').valueOf()}
            defaultTimeEnd={moment().add(12, 'hour').valueOf()}
        />
    );
};

export default TimeLine;
