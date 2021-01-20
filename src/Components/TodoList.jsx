import React, { Component } from "react";
import "./TodoList.css";
import "antd/dist/antd.css";
import Checkbox from "antd/lib/checkbox/Checkbox";
import List from "./List";
export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      todoListDone: [],
      isFilter: true,
    };
  }
  renderList = () =>
    this.state.todoList.map((list, index) => {
      return (
        <List
          index={index}
          id={list.id}
          text={list.text}
          onDelete={this.handleDelete}
          onUpdate={this.handleUpdate}
          onTextUpdate={this.handleKeyDown}
          isUpdate={list.isUpdate}
          setIsUpdate={this.handleIsUpdate}
          setIsDone={this.handleIsDone}
        />
      );
    });
  renderListDone = () =>
    this.state.todoListDone.map((list, index) => {
      return (
        <List
          index={index}
          id={list.id}
          text={list.text}
          onDelete={this.handleDelete}
          onUpdate={this.handleUpdate}
          onTextUpdate={this.handleKeyDown}
          isUpdate={list.isUpdate}
          setIsUpdate={this.handleIsUpdate}
          setIsDone={this.handleIsDone}
          isDone={list.isDone}
        />
      );
    });

  handleFilter = () => {
    if (this.state.isFilter) {
      let listState = [...this.state.todoList];
      let listUpdate = [];
      listState.map((ele) => {
        if (ele.isDone) {
          listUpdate.push(ele);
        }
      });
      this.setState({ todoListDone: listUpdate });
    }
    this.setState({ isFilter: !this.state.isFilter });
  };
  handleIsDone = (isDone, id) => {
    let listUpdate = [...this.state.todoList];
    listUpdate.map((ele) => {
      if (ele.id === id) {
        ele.isDone = isDone;
      }
    });
    return this.setState({ todoList: listUpdate });
  };

  handleIsUpdate = (isUpdate, id) => {
    let listUpdate = [...this.state.todoList];
    listUpdate.map((ele) => {
      if (ele.id === id) {
        ele.isUpdate = isUpdate;
      }
    });
    return this.setState({ todoList: listUpdate });
  };
  handleDelete = (key) => {
    let newToDoListDone = [...this.state.todoListDone];
    let indexDone = this.state.todoListDone.findIndex((prevKey) => prevKey.id === key);
    if (indexDone !== -1) {
      newToDoListDone.splice(indexDone, 1);
      this.setState({ todoListDone: newToDoListDone });
    }
    let newToDoList = [...this.state.todoList];
    let index = this.state.todoList.findIndex((prevKey) => prevKey.id === key);
    if (index !== -1) {
      newToDoList.splice(index, 1);
      this.setState({ todoList: newToDoList });
    }
  };

  handleUpdate = (id, title) => {
    if (title !== "") {
      let listUpdate = [...this.state.todoList];
      listUpdate.map((ele, index) => {
        if (ele.id === id) {
          ele.text = title;
          ele.isUpdate = false;
        }
      });
      return this.setState({ todoList: listUpdate });
    }
  };
  addItem = (e) => {
    if (this.inputElement.value !== "") {
      var newItem = {
        text: this.inputElement.value,
        id: Date.now(),
        isUpdate: false,
        isDone: false,
      };
      this.setState((prevState) => {
        return {
          todoList: prevState.todoList.concat(newItem),
        };
      });
    }
    this.inputElement = "";
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <div className="parent">
          <form onSubmit={this.addItem}>
            <div className="header">To do list</div>
            <input
              type="text"
              ref={(a) => (this.inputElement = a)}
              placeholder="To do list"
            />
            <button type="submit">Add Item</button>
            <Checkbox onChange={this.handleFilter}>
              Filter done/not done
            </Checkbox>
          </form>
          {/* {this.renderList()} */}
          {!this.state.isFilter ? this.renderListDone() : this.renderList()}
        </div>
      </div>
    );
  }
}
