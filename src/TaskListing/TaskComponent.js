import { Modal } from "antd";
import React, { useState } from "react";
import { TaskCreation } from "../TaskCreation/TaskCreation";

export const TaskComponent = (props) => {
  return (
    <div className="task">
      <div>{props?.data?.taskTitle}</div>
      <div>{props?.data?.dateAndTime}</div>
      <div>{props?.data?.taskDescription}</div>
      <div>
        <button onClick={() => props?.handleDisplayModal(props?.data?._id)}>
          Add SubTask
        </button>
      </div>
    </div>
  );
};
