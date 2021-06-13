import React from "react"
import { useMutation } from '@apollo/client'
import SpacerDiv from "./spacerdiv"
import { Maps } from "../assets/data"
import { DO_TURN } from "../queries"

const Map = ({ match, item, handleClick }) => {
    if (item.state !== 'NOTPICKEDORBANNED') item.label = 'x'
    const styler = item.label === 'x' ? 'big-x' : 'outlined-text'
    const click = () => { if(item.teamId) handleClick(item.teamId, match.turns[match.currentTurn].action, item.label) }
    return (
        <div className={"card bg-spectator holder-tall"} onClick={click}>
            <img className="img-spectator" src={item.src} alt="label"></img>
            <div className={"centered-text " + styler}>{item.label}</div>
        </div >
    )
}

const MapDisplay = ({ match, teamId, handleClick }) => {
    const mapList = match.format.maps
    console.log('id', teamId)
    const output = mapList.map(mapName => {
        const item = Maps.find(map => map.label === mapName)
        const filteredTurn = match.turns.filter(turn => {
            return turn.response ? turn.response.includes(mapName) : false
        })[0]
        const action = filteredTurn ? filteredTurn.action : "NOTPICKEDORBANNED"
        const mapImg = item ? item.mapImg : "Not Found"
        return {
            label: mapName,
            src: mapImg,
            key: mapName,
            state: action,
            teamId: teamId
        }
    })
    return output.map((item) => {
        return (
            <>
                <Map item={item} handleClick={handleClick} match={match}/>
                <SpacerDiv />
            </>
        )
    })
}

const ChoiceBar = ({ match, teamId }) => {
    const [doTurn] = useMutation(DO_TURN)
    const handleClick = async (teamId, action, response) => {
        try {
            await doTurn({ variables: { teamId, action, response } })
        } catch (error) { console.error(error) }
    }
    if (!match) return null

    return (
        <div className="labels">
            <SpacerDiv /> <SpacerDiv /> <SpacerDiv />
            <MapDisplay match={match} teamId={teamId} handleClick={handleClick} />
        </div>
    )
}

export default ChoiceBar