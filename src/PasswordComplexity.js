import React, { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

export const PasswordComplexity = (
    {valueOfNewPassword}
) => {

    const [passwordValidity, setPasswordValidity] = useState({
        minLength: null,
        maxLength: null,
        minLowerCase: null,
        minUpperCase: null,
        minNumbers: null,
        minSymbol: null, 
    })

    const isNumber = /\d/
    const oneLowerCase = /^(?=.*?[a-z])/
    const oneUpperCase = /^(?=.*?[A-Z])/
    const specialCharacters = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

    const generateScore = () => {
        const {
            minLowerCase, 
            minUpperCase,
            minNumbers,
            minSymbol,
            minLength,
            maxLength 
        } = passwordValidity

        if (valueOfNewPassword == "") { return 0 } 
        let isAlphanumeric = minNumbers && minSymbol && minLowerCase && minUpperCase
        
        if ( maxLength && isAlphanumeric ) {
            return 3
        } else if ( minLength && isAlphanumeric ) { 
            return 2
        }
        return 1
    }

    useEffect(() => {
        let isMoreThanMaxLength = valueOfNewPassword.length > 12
        let isMoreThanMinLength = valueOfNewPassword.length > 8

        setPasswordValidity({
            minLength: isMoreThanMinLength,
            maxLength: isMoreThanMaxLength,
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
        let score = generateScore()
        switch (score) {
            case 0,1 :
                return "Weak";
            case 2 : 
                return "Good";
            case 3 :
                return "Strong";
            default:
                return ""
        }
    }

    const funcProgressColor = () => {
        let score = generateScore()
        switch (score) {
            case 0,1 :
                return "red";
            case 2 : 
                return "orange";
            case 3 :
                return "green";
            default:
                return "grey"
        }
    }

    const changeProgressBarColor = () => {
        let score = generateScore()
        let percentage = score == 0 ? 0 : (score/3) * 100
        return {
        width: `${percentage}%`,
        background: funcProgressColor(),
        height: "10px",
    }}
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
                text="Have at least 9 characters"
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