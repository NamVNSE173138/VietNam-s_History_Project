// import { MailOutlined, SettingOutlined } from '@ant-design/icons';
// import { AppstoreOutlined } from '@ant-design/icons';
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import "./Grade.css";
const { Search } = Input;
function getItem(label, key, children, type) {
  return {
    key,
    children,
    label,
    type,
  };
}
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value) => console.log(value);

const items = [
  getItem("Grade 4", "sub4", [
    getItem(
      "Phần 1: Buổi đầu dựng nước và giữ nước (Khoảng 700 năm TCN đến năm 179 TCN)",
      "1"
    ),
    getItem(
      "Phần 2: Hơn một nghìn năm đấu tranh giành lại độc lập (Từ năm 179 TCN đến năm 938)",
      "2"
    ),
    getItem(<Link to={"/"}>demo</Link>, "3"),
    getItem("Phần 4: Nước Đại Việt thời Lý (Từ năm 1009 đến năm 1226)", "4", [
      getItem("demo"),
    ]),
  ]),
  getItem("Grade 5", "sub5", [
    getItem('Bài 1: "Bình Tây Đại nguyên soái" Trương Định', "5"),
    getItem("Bài 2: Nguyễn Trường Tộ mong muốn canh tân đất nước", "6"),
    getItem("Bài 3: Cuộc phản công ở kinh thành Huế", "sub3"),
  ]),
  getItem("Grade 6", "sub6", [
    getItem("Chương 1: Vì sao phải học lịch sử", "9"),
    getItem("Chương 2: Xã hội nguyên thủy", "10"),
    getItem("Chương 3: Xã hội cổ đại", "11"),
    getItem(
      "Chương 4: Đông Nam Á từ những thế kỉ tiếp giáp đầu công nguyên đến thế kỉ X",
      "12"
    ),
  ]),
  getItem("Grade 7", "sub7", [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
  getItem("Grade 8", "sub8", [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
  getItem("Grade 9", "sub9", [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
  getItem("Grade 10", "sub10", [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
  getItem("Grade 11", "sub11", [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
  getItem("Grade 12", "sub12", [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = [
  "sub4",
  "sub5",
  "sub6",
  "sub7",
  "sub8",
  "sub9",
  "sub10",
  "sub11",
  "sub12",
];
const Grade = () => {
  const [openKeys, setOpenKeys] = useState([""]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <>
      <div className="grade">
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          items={items}
        />
      </div>
    </>
  );
};
export default Grade;
