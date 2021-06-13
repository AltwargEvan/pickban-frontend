import React, { useState } from 'react';
import { DO_TURN } from "../queries"
import { useMutation } from '@apollo/client'

const ChooseSide = ({ teamId, match }) => {
    const [doTurn] = useMutation(DO_TURN)
    //to show or not to show
    const turn = match.turns[match.currentTurn]

    const action = "PICKSIDE"
    const handleClick = async (response) => {
        try {
            await doTurn({ variables: { teamId, action, response } })
        } catch (error) { console.error(error) }
    }
    const clickA = () => handleClick('attack')
    const clickD = () => handleClick('defense')
    return (
        <div className="">
            <h5 className="modal-title" id="exampleModalLabel">Choose a starting side on {match.turns[match.currentTurn - 1].response}</h5>
            <button type="button" className="btn btn-teamA" onClick={clickA}>Attack</button>
            <button type="button" className="btn btn-teamB" onClick={clickD}>Defense</button>
        </div>
    )
}

export default ChooseSide