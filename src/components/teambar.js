import React from 'react'
import SidePick from '../components/sidepick'
const actionText = {
    'BANMAP': "Banning a Map",
    'PICKMAP': "Picking a map",
    'PICKSIDE': 'Picking a side'
}
const Team = ({ name, logo, bg }) => {
    return (
        <div className={"card rounded-0 text-center " + bg}>
            <h1 className="bigger-text"><b>{name}</b></h1>
        </div>
    )
}
const Turn = ({ currentTurn, match, teamId }) => {
    const action = actionText[currentTurn.action]
    const turn = match.turns[match.currentTurn]
    console.log(turn)
    if (turn.teamId.toString() === teamId.toString() && turn.action === 'PICKSIDE') {
        return (
            <div className="card rounded-0 bg-info text-center">
                <SidePick match={match} teamId={teamId} />
            </div>
        )
    }
    return (
        <div className="card rounded-0 bg-info text-center ">
            <h1 className="bigger-text"><b>{currentTurn.team} {action}</b></h1>
        </div>
    )
}

const TeamBar = ({ match, teamId }) => {
    if (!match) return null
    return (
        <div className="topBar border-black">
            {/* TROLL LINK IN TOP LEFT FOR MEMES. RICKROLLED IDIOTS */}
            <div className="card rounded-0 bg-teamA text-center text-teamA">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">lmao</a>
            </div>
            <Team name={match.teamAName} bg="bg-teamA" />
            <Turn currentTurn={match.turns[match.currentTurn]} match={match} teamId={teamId} />
            <Team name={match.teamBName} bg="bg-teamB" />
            <div className="card rounded-0 bg-teamB text-center text-teamB"></div>
        </div>
    )
}

export default TeamBar