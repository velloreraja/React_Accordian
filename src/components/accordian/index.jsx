// single selection
//multiple selection

import { useState } from "react";
import data from "./data";
import "./style.css";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMulSel, setEnableMulSel] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(getCurId) {
    // console.log(getCurId);
    setSelected(getCurId === selected ? null : getCurId);
  }

  function handleMultiSelection(getCurId) {
    let copyMultiple = [...multiple];
    const findIndexOgCurrentId = copyMultiple.indexOf(getCurId);
    // console.log(findIndexOgCurrentId);

    if (findIndexOgCurrentId === -1) {
      copyMultiple.push(getCurId);
    } else {
      copyMultiple.splice(findIndexOgCurrentId, 1);
    }
    setMultiple(copyMultiple);
  }

  function toggleMultiSelection() {
    setEnableMulSel(!enableMulSel);
    setSelected(null); // Reset single selection
    setMultiple([]); // Reset multiple selection
  }
  return (
    <>
      <div className="wrapper">
        <button onClick={toggleMultiSelection}>
          {enableMulSel ? "Disable Multi-Selection" : "Enable Multi-Selection"}
        </button>
        <div className="accordian">
          {data && data.length > 0 ? (
            data.map((dataItem) => {
              const isExpanded = enableMulSel
                ? multiple.includes(dataItem.id)
                : selected === dataItem.id;

              return (
                <div className="item" key={dataItem.id}>
                  <div
                    className="title"
                    onClick={
                      enableMulSel
                        ? () => handleMultiSelection(dataItem.id)
                        : () => handleSingleSelection(dataItem.id)
                    }
                  >
                    <h3 className="data">{dataItem.question}</h3>
                    <span>{isExpanded ? "-" : "+"}</span>
                  </div>
                  <div>
                    {enableMulSel
                      ? multiple.indexOf(dataItem.id) !== -1 && (
                          <div className="content">{dataItem.answer}</div>
                        )
                      : selected === dataItem.id && (
                          <div className="content">{dataItem.answer}</div>
                        )}
                    {/* {selected === dataItem.id ? (
                      <div>{dataItem.answer}</div>
                    ) : null} */}
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      </div>
    </>
  );
}
