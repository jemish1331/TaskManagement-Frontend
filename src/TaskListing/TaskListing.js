import { Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { HttpService } from "../common/function";
import { TaskCreation } from "../TaskCreation/TaskCreation";
import { TaskComponent } from "./TaskComponent";
import { StickyContainer, Sticky } from "react-sticky";
import "../index.css";
const { TabPane } = Tabs;

export const TaskListing = () => {
  const [taskList, setTaskList] = useState([]);
  const [isModalVisible, setIsMOdalVisible] = useState(false);
  const [type, setType] = useState("subtask");
  const [parentTaskID, setParentTaskID] = useState("");
  const handleDisplayModal = (id, task) => {
    if (task === "task") {
      setType("task");
    }
    setParentTaskID(id);
    setIsMOdalVisible(true);
  };
  const cancelModal = () => {
    setIsMOdalVisible(false);
    setParentTaskID("");
    setType("subtask");
  };
  useEffect(() => {
    fetchTaskList();
  }, []);
  const fetchTaskList = async () => {
    const response = await HttpService("GET", "/list-task", {});

    if (response?.status === 200) {
      setTaskList(response?.data);
    }
  };
  return (
    <div>
      {isModalVisible ? (
        <dialog style={{ backgroundColor: "lightblue" }} open>
          <TaskCreation
            type={type}
            id={parentTaskID}
            cancelModal={cancelModal}
            fetchTaskList={fetchTaskList}
          />
        </dialog>
      ) : (
        <>
          <div>
            <button onClick={() => handleDisplayModal(0, "task")}>
              Create a Task
            </button>
          </div>
          <div className="card-container">
            <Tabs type="card" defaultActiveKey="1">
              <TabPane style={{ marginRight: 20 }} tab="New Task List" key="1">
                {taskList?.map((val, index) => {
                  if (val?.status === "new" || !val.status) {
                    return (
                      <TaskComponent
                        data={val}
                        key={index}
                        handleDisplayModal={handleDisplayModal}
                        fetchTaskList={fetchTaskList}
                      />
                    );
                  }
                }) || "No data Available"}
              </TabPane>
              <TabPane tab="In Progress Task List" key="2">
                {taskList?.map((val, index) => {
                  if (val?.status === "In Progress") {
                    return (
                      <TaskComponent
                        data={val}
                        key={index}
                        handleDisplayModal={handleDisplayModal}
                        fetchTaskList={fetchTaskList}
                      />
                    );
                  }
                }) || "No data Available"}
              </TabPane>
              <TabPane tab="Completed Task List" key="3">
                {taskList?.map((val, index) => {
                  if (val?.status === "completed" && index <= 9) {
                    return (
                      <TaskComponent
                        data={val}
                        key={index}
                        handleDisplayModal={handleDisplayModal}
                        fetchTaskList={fetchTaskList}
                      />
                    );
                  }
                }) || "No data Available"}
              </TabPane>
              <TabPane tab="Archive Task List" key="4">
                {taskList?.map((val, index) => {
                  if (val?.status === "completed" && index > 9) {
                    return (
                      <TaskComponent
                        data={val}
                        key={index}
                        handleDisplayModal={handleDisplayModal}
                        fetchTaskList={fetchTaskList}
                      />
                    );
                  }
                }) || "No data Available"}
              </TabPane>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};
