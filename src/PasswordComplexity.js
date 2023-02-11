import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import zxcvbn from "zxcvbn";

export const PasswordComplexity = (
    {valueOfNewPassword}
) => {
    const testResult = zxcvbn(valueOfNewPassword)
    const num = (testResult.score * 100) / 3
    
    const [passwordValidity, setPasswordValidity] = useState({
        minLength: null,
        minLowerCase: null,
        minUpperCase: null,
        minNumbers: null,
        minSymbol: null, 
    })

    const isNumber = /\d/
    const oneLowerCase = /^(?=.*?[a-z])/
    const oneUpperCase = /^(?=.*?[A-Z])/
    const specialCharacters = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/


    useEffect(() => {
        setPasswordValidity({
            minLength: valueOfNewPassword?.length >= 12,
            minLowerCase: !!oneLowerCase.test(valueOfNewPassword),
            minUpperCase: !!oneUpperCase.test(valueOfNewPassword),
            minNumbers: !!isNumber.test(valueOfNewPassword),
            minSymbol: !!specialCharacters.test(valueOfNewPassword), 
        })
    }, [valueOfNewPassword])

    const PasswordStrenghIndicatorItem = ({isValid, text}) => {
        return <li style={{color: isValid ? "green" : "grey"}}>{text}</li>
    }

    const funcProgressLabel = () => {
        switch (testResult.score) {
            case 0 :
                return "Very Weak";
            case 1 :
                return "Weak";
            case 2 : 
                return "Good";
            case 3 :
                return "Strong";
            default:
                return "none"
        }
    }

    const funcProgressColor = () => {
        switch (testResult.score) {
            case 0 :
                return "grey";
            case 1 :
                return "red";
            case 2 : 
                return "orange";
            case 3 :
                return "green";
            default:
                return "none"
        }
    }

    const changeProgressBarColor = () => ({
        width: `${num}%`,
        background: funcProgressColor(),
        height: "10px",
    })


    return (
        <>
        <div style={{color: "white"}}>
            Password Strengh: 
            <span style={{
                color: funcProgressColor()
            }}>
                {funcProgressLabel()}

            </span>
        </div>
            <div style={{
                background: "#e9ecef"
            }}>
            <ProgressBar style={
                changeProgressBarColor()
            }/>
            </div>
            <div style={{
                color: "white",
            }}>
                Password must contains: 
            </div>
            <ul>
                <PasswordStrenghIndicatorItem 
                text="Have at least 8 characters"
                isValid={passwordValidity?.minLength}
                />
                <PasswordStrenghIndicatorItem 
                text="Have at least 1 lowercase character "
                isValid={passwordValidity?.minLowerCase}
                />
                <PasswordStrenghIndicatorItem 
                text="Have at least 1 uppercase character "
                isValid={passwordValidity?.minUpperCase}
                />
                <PasswordStrenghIndicatorItem 
                text="Have at least 1 special symbol "
                isValid={passwordValidity?.minSymbol}
                />
                <PasswordStrenghIndicatorItem 
                text="Have at least 1 number "
                isValid={passwordValidity?.minNumbers}
                />
            </ul>
            
        </>
    )
}

