import { Button, List } from 'antd';
import { Link } from 'react-router-dom';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 5',
  },
  {
    title: 'Ant Design Title 6',
  },
  {
    title: 'Ant Design Title 7',
  },
  {
    title: 'Ant Design Title 8',
  },
  
];
const App = () => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          // avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
          title={<Link to={"/events/eventsDetail"}>{item.title}</Link>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          
        />
        <Button type="primary" ><Link to={"/events/eventsDetail"}>Detail of event</Link></Button>
      </List.Item>
    )}
  />
);
export default App;