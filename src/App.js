import React, { useState } from "react"; 
import {useForm} from "react-hook-form";
import "./style.css"
import {PasswordComplexity} from "./PasswordComplexity"

function App() {

  const [passwordShown, setPasswordShown] = useState(false)

  const DefaultValuesForForm = {
    registration: {
      password: "",
      confirmPassword: "",
    }
  }
  
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm  ({
    defaultValues: DefaultValuesForForm.registration 
  })

  const watchAllFields = watch()

  console.log("watchAllFields", watchAllFields)

  const onSubmit = async (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "baseline",
        justifyContent: "flex-start",
        gap: "15px",
      }}>
      <label>Password</label>
      <button 
        style={{
          fontSize: "8px",
          cursor: "pointer",
        }}
        onClick={() => setPasswordShown(!passwordShown)}>
        Show Password
      </button>
      </div>
      <input 
      name="password"
      type={passwordShown ? "text" : "password"}
      { ...register("password", {
        required: "You must specify a password",
        minLength: {
          value: 12,
          message: "Password must have at least 12 characters"
        }
      })}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <PasswordComplexity valueOfNewPassword={getValues().password?.toString()} />

      <label>Confirm Password</label>
      <input 
      name="confirmPassword"
      type="password"
      {...register("confirmPassword ", {
         validate: (value) => 
          value === getValues().password || "The password does not match",
      })}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <input type="submit" onClick={handleSubmit(onSubmit)}/>
    </form>
  );
}

export default App;
