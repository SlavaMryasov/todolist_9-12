import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    title: string
    setNewValue: (newValue: string)=> void
}

export const EditableSpan = ({title, setNewValue}: EditableSpanPropsType) => {
    const [editMode, setEdit] = useState(false)
    const [value, setValue] = useState(title)
    
    const editModeHandler = () => {
        setEdit(!editMode)
        editMode && updateTitleHandler()
    }

    const setValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        
    }

    const updateTitleHandler = () => {
        setNewValue(value.trim())
    }

    return(
        editMode 
        ?<input onChange={setValueHandler} onBlur={editModeHandler}  autoFocus type="text" value={value}/>
        :<span onDoubleClick={editModeHandler}>{title}</span>
    )
}