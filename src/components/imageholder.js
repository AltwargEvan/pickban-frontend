import React from "react"

const ImgHolder = ({imgParams, src, text}) => {
    return (
        <div className={"card bg-spectator holder-tall"}>
            <img className={imgParams} src={src}></img>
            <div className="centered-text outlined-text">{text}</div>
        </div>
    )
}
export default ImgHolder