import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import { HttpService } from "../common/function";

export const TaskComponent = (props) => {
  const handleComplete = async () => {
    let response = await HttpService("POST", "/change-status", {
      status: "completed",
      dateAndTime: moment(new Date()).format("MM/DD/YYYY || hh:mm"),
      taskID: props?.data?._id,
    });
    if (response?.status === 200) {
      toast(response?.data);
      props?.fetchTaskList();
    }
  };
  return (
    <div className="task">
      <div style={{ fontWeight: "bold" }}>{props?.data?.taskTitle}</div>
      <hr style={{}} />
      <div style={{ fontWeight: "lighter", fontSize: "10px" }}>
        {" " + props?.data?.dateAndTime}
      </div>
      <div
        style={{
          border: "0.5px solid black",
          padding: "10px",
          margin: "10px 10px 10px 10px",
          fontFamily: "cursive",
        }}
      >
        {props?.data?.taskDescription}
      </div>
      <div>
        <div style={{ fontWeight: "bold" }}>Sub Task List</div>
        <div style={{ marginLeft: -40 }}>
          <ol type={"1"}>
            {props?.data?.subTask?.map((val, index) => {
              return <li key={index}>{val?.taskTitle}</li>;
            })}
            {!props?.data?.subTask?.length && "No task available"}
          </ol>
        </div>
      </div>
      <div>
        {props?.data?.status === "new" && (
          <button onClick={() => props?.handleDisplayModal(props?.data?._id)}>
            Add SubTask
          </button>
        )}
        {props?.data?.status === "In Progress" && (
          <>
            <button onClick={() => props?.handleDisplayModal(props?.data?._id)}>
              Add SubTask
            </button>
            <button onClick={handleComplete} style={{ marginLeft: 10 }}>
              Complete Task
            </button>
          </>
        )}
      </div>
    </div>
  );
};
