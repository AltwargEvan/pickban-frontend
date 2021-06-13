import React from "react"
import ImgHolder from "./imageholder"
import SpacerDiv from "./spacerdiv"
import { Maps } from "../assets/data"
import { arr_diff } from "../functions/arr_diff"

const MapPanels = ({ match }) => {
    //get maps picked / banned
    const filteredTurns = match.turns.filter(turn => turn.action.includes('MAP')).map(turn => {
        if (turn.action.includes('MAP')) {
            const map = (Maps.find(map => map.label === turn.response))
            const img = map ? (map.bgImg ? map.bgImg : (map.mapImg ? map.mapImg : '')) : ''
            const border = match.teamAName === turn.team ? "img-teamA" : "img-teamB"
            return {
                response: turn.response,
                action: turn.action,
                imgSrc: img,
                key: turn.response,
                imgParams: border
            }
        }
        return null
    })

    //get tiebreaker map
    const getTieBreaker = () => {
        const mapName = arr_diff(match.bans, match.format.maps)[0]
        const map = Maps.find(map => map.label === mapName)
        const img = map ? (map.bgImg ? map.bgImg : (map.mapImg ? map.mapImg : '')) : ''
        return {
            response: mapName,
            action: 'TIEBREAKER',
            imgSrc: img,
            imgParams: "img-info"
        }
    }
  
    const tieBreakerTurn = match.bans.length < match.format.maps.length - 1 ? {
        response: null,
        action: 'TIEBREAKER',
        imgSrc: null,
        imgParams: "img-info"
    } : getTieBreaker()


    return (filteredTurns.concat(tieBreakerTurn)).map(turn => {
        return (
            <>
                <ImgHolder src={turn.imgSrc} text={turn.response} key={turn.response} imgParams={"img-tall " + turn.imgParams} />
                <SpacerDiv />
            </>
        )
    })
}

const TankBans = ({ match }) => {
    return null
}

const TurnImages = ({ match }) => {
    if(!match) return null
    return (
        <div className="labels">
            <SpacerDiv />
            <MapPanels match={match} />
        </div>
    )
}

export default TurnImages