import React, { useState } from "react";
import { Button, Checkbox, Input, Switch } from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

export default function List(props) {
  const {
    id,
    text,
    onDelete,
    onUpdate,
    isUpdate,
    setIsUpdate,
    setIsDone,
    isDone
  } = props;
  const [title, settitle] = useState("");
  return (
    <div className="List-item">
      {!isUpdate ? (
        <div>
          <Input
            style={{ width: "10rem", marginRight: "6rem" }}
            value={text}
          ></Input>
          <Switch onChange={(checked) => setIsDone(checked, id)}  defaultChecked={isDone}/>
          <CloseCircleOutlined
            type="danger"
            shape="circle"
            onClick={() => onDelete(id)}
          >
            X
          </CloseCircleOutlined>
          <EditOutlined type="primary" onClick={() => setIsUpdate(true, id)}>
            Update
          </EditOutlined>
        </div>
      ) : (
        <div>
          <Input style={{ width: "10rem" }} value={text}></Input>
          <Switch onChange={(checked) => setIsDone(checked, id)}  defaultChecked={isDone}/>
          <CloseCircleOutlined
            type="danger"
            shape="circle"
            onClick={() => onDelete(id)}
          >
            X
          </CloseCircleOutlined>
          <Input
            style={{ width: "10rem" }}
            onChange={(event) => settitle(event.target.value)}
          />
          <EditOutlined type="primary" onClick={() => onUpdate(id, title)}>
            Update
          </EditOutlined>
        </div>
      )}
    </div>
  );
}
