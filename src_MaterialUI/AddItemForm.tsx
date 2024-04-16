// import {Button} from "./Button";
// import { Button } from "@mui/material"; // так не надо
import Button from "@mui/material/Button";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";

type PropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = ({ addItem }: PropsType) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== "") {
      addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addItemHandler();
    }
  };
  const buttonStyles = { background: "black", width: "40px", height: "40px" };
  return (
    <div>
      <TextField
        label="Enter a title"
        variant={"outlined"}
        className={error ? "error" : ""}
        error={!!error}
        value={title}
        size={"small"}
        onChange={changeItemHandler}
        onKeyUp={addItemOnKeyUpHandler}
        helperText={error}
      />
      {/* <input
				className={error ? 'error' : ''}
				value={title}
				onChange={changeItemHandler}
				onKeyUp={addItemOnKeyUpHandler}
			/> */}
      {/* <Button title={'+'} onClick={addItemHandler} /> */}
      {/* <Button
        size="small"
        variant="contained"
        onClick={addItemHandler}
        style={buttonStyles}
      >
        +
      </Button> */}
      <IconButton onClick={addItemHandler} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
      {/* {error && <div className={"error-message"}>{error}</div>} */}
    </div>
  );
};
