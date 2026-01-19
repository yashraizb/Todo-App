import "./Sidebar.css";
import { useRecoilState } from "recoil";
import { list } from "../atom";
import type { TaskGroup } from "../models";

type SidebarProps = {
  collapsed: boolean;
};

export default function Sidebar({ collapsed }: SidebarProps) {

  const [listOfTasks, setListOfTasks] = useRecoilState<TaskGroup[]>(list);

  const handleCheckboxChange = (index: number) => {
    const updatedTasks = listOfTasks.map((taskGroup, i) => {
      if (i === index) {
        return { ...taskGroup, isChecked: !taskGroup.isChecked };
      }
      return taskGroup;
    });
    setListOfTasks(updatedTasks);
  };

  return (
    <>
      <div className={"wrapper p-3 text-white bg-dark" + (collapsed ? " collapsed" : "")}>
        <aside className={"sidebar" + (collapsed ? " collapsed" : "")}>
          <h4>Lists</h4>
          {listOfTasks.map((taskGroup, index) => (
            <div className="form-check w-100" key={index}>
              {
                (taskGroup.isChecked) ? (
                <input className="form-check-input" type="checkbox" value="" id={index.toString()} checked onChange={() => handleCheckboxChange(index)}/>
                ) : (
                <input className="form-check-input" type="checkbox" value="" id={index.toString()} onChange={() => handleCheckboxChange(index)}/>
                )
              }

              <label className="form-check-label" htmlFor={index.toString()}>
                {taskGroup.title}
              </label>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
