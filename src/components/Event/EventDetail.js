import { Card } from 'antd';
const App = () => (
  <Card
    title="Card title"
    bordered={false}
    style={{
      width: 300,
    }}
  >
    <img src='https://cropper.watch.aetnd.com/cdn.watch.aetnd.com/sites/2/2022/05/3.jpg?w=400'/>
    <p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
  </Card>
);
export default App;