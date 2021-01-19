import React, { useState } from "react";
import { Button, Checkbox, Input } from "antd";
import "antd/dist/antd.css";

export default function List(props) {
  const { id, text, onDelete, onUpdate, isUpdate, setIsUpdate, setIsDone } = props;
  const [title, settitle] = useState('')
  return (
    <div>
      {!isUpdate ? (
        <div>
          <Input style={{width: '10rem'}} value={text}></Input>
          <Checkbox onChange={(event) => setIsDone(event.target.checked, id)} />
          <Button type="danger" shape="circle" onClick={() => onDelete(id)}>
            X
          </Button>
          <Button type="primary" onClick={() => setIsUpdate(true, id)}>
            Update
          </Button>
        </div>
      ) : (
        <div>
          <Input style={{width: '10rem'}} value={text}></Input>
          <Checkbox onChange={(event) => setIsDone(event.target.checked, id)} />
          <Button type="danger" shape="circle" onClick={() => onDelete(id)}>
            X
          </Button>
          <Input style={{width: '10rem'}} onChange={event => settitle(event.target.value)} />
          <Button type="primary" onClick={() => onUpdate(id, title)}>
            Update
          </Button>
        </div>
      )}
    </div>
  );
}
