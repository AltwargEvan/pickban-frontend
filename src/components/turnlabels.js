import React from 'react'
import SpacerDiv from './spacerdiv'
import Label from './label'

const TurnLabels = () => {
    return (
    <div className="labels">
        <SpacerDiv />
        <Label text="Map Ban" bg="bg-teamA" />
        <SpacerDiv />
        <Label text="Map Ban" bg="bg-teamB" />
        <SpacerDiv />
        <Label text="Map Pick" bg="bg-teamB" />
        <SpacerDiv />
        <Label text="Map Pick" bg="bg-teamA" />
        <SpacerDiv />
        <Label text="Tie Breaker" bg="bg-info" />
        <SpacerDiv />
        <Label text="Tank Bans" bg="bg-teamB" />
        <SpacerDiv />
        <Label text="Tank Bans" bg="bg-teamA" />
        <SpacerDiv />
    </div>)
}

export default TurnLabels