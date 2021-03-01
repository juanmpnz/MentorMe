import React from "react"
import { useForm, Controller } from "react-hook-form"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"

export default function CheckboxList({ handleSelect, objectives }) {
  const defaultNames = []
  const { control, handleSubmit } = useForm({
    defaultValues: { names: defaultNames },
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="checkboxlist-ul-container" >
        <ul className="checkboxList-ul" >
          {objectives &&
            objectives.map((objective, key) => (
              <li key={key} >
                <FormControlLabel

                  control={
                    <Controller
                      name="names"

                      render={({ onChange: onCheckChange }) => {
                        return (
                          <Checkbox
                            color="primary"
                            checked={objective.isCompleted}
                            onChange={() => onCheckChange(handleSelect(objective._id))}
                          />
                        )
                      }}
                      control={control}
                    />
                  }
                  key={objective.name}
                  label={objective.name}

                />
              </li>
            ))}
        </ul>
      </div>

    </form>
  )
}
