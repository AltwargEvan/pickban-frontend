import React from "react"

const Label = ({ text, bg }) => {
    return (
        <div className={"card rounded-0 text-center " + bg}>
            <h2><b>{text}</b></h2>
        </div>
    )
}

export default Label