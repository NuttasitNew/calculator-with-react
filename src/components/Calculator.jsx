import { useEffect, useState } from "react";
import "../css/Calculator.css";

export default function Calculator() {
  const [historic, setHistoric] = useState("");
  const [preValue, setPreValue] = useState([]);
  const [value, setValue] = useState("0");

  useEffect(() => {
    function handleKeyPress(e) {
      switch (e.key) {
        case "1":
          handleClick("1");
          break;
        case "2":
          handleClick("2");
          break;
        case "3":
          handleClick("3");
          break;
        case "4":
          handleClick("4");
          break;
        case "5":
          handleClick("5");
          break;
        case "6":
          handleClick("6");
          break;
        case "7":
          handleClick("7");
          break;
        case "8":
          handleClick("8");
          break;
        case "9":
          handleClick("9");
          break;
        case "0":
          handleClick("0");
          break;
        case "+":
          operatorClick("+");
          break;
        case "*":
          operatorClick("×");
          break;
        case "-":
          operatorClick("-");
          break;
        case "/":
          operatorClick("/");
          break;
        case "Enter":
          calculateClick();
          break;
        case "Backspace":
          backspace();
          break;
      }
    }

    // เพิ่ม event listener เมื่อ component ถูก mount
    window.addEventListener("keydown", handleKeyPress);

    // ลบ event listener เมื่อ component ถูก unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [value]);
  function backspace() {
    setValue(value.substring(0, value.length - 1));
  }
  function calculateClick() {
    setHistoric(value);
    // แปลงตัวดำเนินการให้เข้ากับ JavaScript
    let processedValue = value.replace(/×/g, "*").replace(/÷/g, "/");

    try {
      // ใช้ eval ในการคำนวณค่าจากสตริง
      let result = eval(processedValue);
      // อัพเดทผลลัพธ์ลงใน state
      setValue(result.toString());
    } catch (error) {
      // จัดการกับข้อผิดพลาดที่อาจเกิดขึ้น เช่น สูตรคำนวณไม่ถูกต้อง
      console.error("Error in calculation: ", error);
      setValue("Error");
    }
  }

  function handleClick(number) {
    setValue((oldValues) => {
      return oldValues === "0" ? number : oldValues + number;
    });
  }

  function operatorClick(operator) {
    operator = operator.trim();
    const lastChar = value.trim().slice(-1);
    const operatorSigns = ["+", "-", "×", "/"];

    if (operatorSigns.includes(lastChar)) {
      const newValue = value.slice(0, -1) + operator;
      setValue(newValue);
    } else {
      setPreValue([...preValue, value, operator]);
      setValue((oldValues) => {
        return oldValues === "0" ? operator : oldValues + operator.trim();
      });
      console.log(value);
    }
  }

  return (
    <div className="content-container">
      <div className="calculator-container">
        <div className="display-container">
          <div className="display">
            <div className="display-history">{historic}</div>
            <div className="display-result">{value}</div>
          </div>
        </div>
        <div className="command-container">
          <div className="row-1">
            <button className="operator" value="(">
              (
            </button>
            <button className="operator" value=")">
              )
            </button>
            <button className="operator">%</button>
            <button
              className="operator"
              onClick={() => {
                setValue("0");
                setPreValue([]);
                setHistoric("");
              }}
            >
              AC
            </button>
          </div>
          <div className="row-2">
            <button value="7" onClick={(e) => handleClick(e.target.value)}>
              7
            </button>
            <button value="8" onClick={(e) => handleClick(e.target.value)}>
              8
            </button>
            <button value="9" onClick={(e) => handleClick(e.target.value)}>
              9
            </button>
            <button
              className="operator"
              value=" × "
              onClick={(e) => operatorClick(e.target.value)}
            >
              ×
            </button>
          </div>
          <div className="row-3">
            <button value="4" onClick={(e) => handleClick(e.target.value)}>
              4
            </button>
            <button value="5" onClick={(e) => handleClick(e.target.value)}>
              5
            </button>
            <button value="6" onClick={(e) => handleClick(e.target.value)}>
              6
            </button>
            <button
              className="operator"
              value=" / "
              onClick={(e) => operatorClick(e.target.value)}
            >
              /
            </button>
          </div>
          <div className="row-4">
            <button value="1" onClick={(e) => handleClick(e.target.value)}>
              1
            </button>
            <button value="2" onClick={(e) => handleClick(e.target.value)}>
              2
            </button>
            <button value="3" onClick={(e) => handleClick(e.target.value)}>
              3
            </button>
            <button
              className="operator"
              value=" + "
              onClick={(e) => operatorClick(e.target.value)}
            >
              +
            </button>
          </div>
          <div className="row-5">
            <button value="0" onClick={(e) => handleClick(e.target.value)}>
              0
            </button>
            <button value="." onClick={(e) => handleClick(e.target.value)}>
              .
            </button>
            <button className="equals" onClick={calculateClick}>
              =
            </button>
            <button
              className="operator"
              value=" - "
              onClick={(e) => operatorClick(e.target.value)}
            >
              -
            </button>
          </div>
        </div>
      </div>
      .
    </div>
  );
}
