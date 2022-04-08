import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import { HttpService } from "../common/function";

export const TaskCreation = ({ type, id, cancelModal }) => {
  //
  const handleSubmit = async (e) => {
    await e.preventDefault();
    if (type === "task") {
      await HttpService("POST", "/create-task", {
        taskTitle: e?.target?.[0]?.value,
        taskDescription: e?.target?.[1]?.value,
        dateAndTime: moment(new Date()).format("MM/DD/YYYY || hh:mm"),
      }).then((res) => {
        if (!res.error) {
          toast(res?.data);
          document.getElementById("form").reset();
          cancelModal();
        }
      });
    } else {
      await HttpService("POST", "/add-subtask", [
        {
          taskTitle: e?.target?.[0]?.value,
          taskDescription: e?.target?.[1]?.value,
          dateAndTime: moment(new Date()).format("MM/DD/YYYY || hh:mm"),
          parentTaskID: id,
        },
      ]).then((res) => {
        if (!res.error) {
          toast(res?.data);
          document.getElementById("form").reset();
          cancelModal();
        }
      });
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", width: 300 }}>
      <div style={{ fontWeight: "bold" }}>
        {type === "task" ? "Create a Task" : "Create a Sub Task"}
      </div>
      <div>
        <form id="form" onSubmit={handleSubmit}>
          <table>
            <tr>
              {" "}
              <label>Title</label>
              <td>
                <input name="title" id="title" required type="text" />
              </td>
            </tr>
            <tr>
              <td>
                <label>Description</label>
              </td>
              <td>
                <textarea id="description" name="description" required />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                {" "}
                <button type="submit">Submit</button>
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};
