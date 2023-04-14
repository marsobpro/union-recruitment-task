import { useState, useEffect } from "react";

function arrayToSet(arr) {
  let newSet = [];
  arr.map((num) => {
    if (!newSet.includes(num)) {
      newSet.push(num);
    }
  });
  return newSet;
}

const Card = ({
  toDisplay,
  handleForm,
  handleInput,
  displayForm,
  style,
  value,
  handleClick,
  name,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#f9f8f6",
        border: "2px solid grey",
        borderRadius: "20px",
        padding: "5rem 2rem",
        gap: "2rem",
        color: "black",
        boxShadow: "0 0 25px rgba(0, 0, 0, 0.1 )",
        ...style,
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: "200",
            fontFamily: "monospace",
          }}
        >
          {name}
        </h2>
      </div>{" "}
      <div>
        {" "}
        {toDisplay.map((number, index) => (
          <span
            style={{ fontSize: "1.7rem", cursor: "pointer" }}
            key={index}
            onClick={() => handleClick(toDisplay, number)}
          >
            {number}
            {index === toDisplay.length - 1 ? "" : ", "}
          </span>
        ))}
      </div>
      {displayForm ? (
        <form
          onSubmit={handleForm}
          style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
        >
          <input
            type="number"
            placeholder="Enter a number"
            onChange={handleInput}
            style={{
              borderRadius: "4px",
              padding: "5px",
              backgroundColor: "inherit",
              color: "black",
              border: "2px solid green",
              outline: "none",
            }}
            value={value}
          ></input>
          <button
            type="submit"
            style={{
              cursor: "pointer",
              backgroundColor: "green",
              padding: "5px",
              borderRadius: "6px",
            }}
          >
            Add
          </button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default function Home() {
  const arrayOne = [1, 3, 5, 2, 3, 1];
  const arrayTwo = [1, 7, 12, 15];
  const joinedArray = arrayToSet([...arrayOne, ...arrayTwo]);
  const finalArrayCardStyle = { gridColumn: "-1/1" };

  const [currentFirstArray, setCurrentFirstArray] = useState(arrayOne);
  const [currentSecondArray, setCurrentSecondArray] = useState(arrayTwo);
  const [finalArray, setFinalArray] = useState(joinedArray);

  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");

  useEffect(() => {
    const updatedFinalArray = currentFirstArray
      .concat(currentSecondArray)
      .sort((a, b) => a - b);
    setFinalArray(arrayToSet(updatedFinalArray));
  }, [currentFirstArray, currentSecondArray]);

  function handleForm(e, arrayToUpdate, value) {
    e.preventDefault();
    if (!value) return;

    const updatedArray = [...arrayToUpdate, +value];
    if (arrayToUpdate === currentFirstArray) {
      setCurrentFirstArray(updatedArray);
      setFirstValue("");
    } else if (arrayToUpdate === currentSecondArray) {
      setCurrentSecondArray(updatedArray);
      setSecondValue("");
    }
  }

  function handleInputOne(e) {
    setFirstValue(e.target.value);
  }

  function handleInputTwo(e) {
    setSecondValue(e.target.value);
  }

  function handleClick(arrayToUpdate, numberToRemove) {
    const updatedArray = arrayToUpdate.filter(
      (number) => number !== numberToRemove
    );
    if (arrayToUpdate === currentFirstArray) {
      setCurrentFirstArray(updatedArray);
    } else if (arrayToUpdate === currentSecondArray) {
      setCurrentSecondArray(updatedArray);
    } else if (arrayToUpdate === finalArray) {
      return;
    }
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        marginInline: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gridAutoFlow: "row",
        gridGap: "10px",
      }}
    >
      <Card
        toDisplay={currentFirstArray}
        handleForm={(e) => handleForm(e, currentFirstArray, firstValue)}
        handleInput={handleInputOne}
        displayForm={true}
        value={firstValue}
        handleClick={handleClick}
        name={"First array"}
      />
      <Card
        toDisplay={currentSecondArray}
        handleForm={(e) => handleForm(e, currentSecondArray, secondValue)}
        handleInput={handleInputTwo}
        displayForm={true}
        value={secondValue}
        handleClick={handleClick}
        name={"Second array"}
      />
      <Card
        toDisplay={finalArray}
        style={finalArrayCardStyle}
        displayForm={false}
        name={"Unique values from both arrays"}
        handleClick={handleClick}
      />
    </div>
  );
}
