import { Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { HttpService } from "../common/function";
import { TaskCreation } from "../TaskCreation/TaskCreation";
import { TaskComponent } from "./TaskComponent";
const { TabPane } = Tabs;

export const TaskListing = () => {
  const [taskList, setTaskList] = useState([]);
  const [isModalVisible, setIsMOdalVisible] = useState(false);
  const [parentTaskID, setParentTaskID] = useState("");
  const handleDisplayModal = (id) => {
    setParentTaskID(id);
    setIsMOdalVisible(true);
  };
  const cancelModal = () => {
    setIsMOdalVisible(false);
    setParentTaskID("");
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
            type={"subtask"}
            id={parentTaskID}
            cancelModal={cancelModal}
          />
        </dialog>
      ) : (
        <Tabs defaultActiveKey="1" size={"small"} style={{ marginBottom: 32 }}>
          <TabPane tab="New Task List" key="1">
            {taskList?.map((val, index) => {
              if (val?.status === "new" || !val.status) {
                return (
                  <TaskComponent
                    data={val}
                    key={index}
                    handleDisplayModal={handleDisplayModal}
                  />
                );
              }
            })}
          </TabPane>
          <TabPane tab="In Progress Task List" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Completed Task List" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};
