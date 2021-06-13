import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/grid.css'
import {
    useQuery, useSubscription
} from '@apollo/client'

import { GET_MATCH, MATCH_UPDATED, GET_TEAM } from '../queries'

//components
import TeamBar from '../components/teambar'
import TurnLabels from '../components/turnlabels'
import TurnImages from '../components/turnImages'
import ChoiceBar from '../components/choicebar'


const Match = () => {

    const _id = useParams()._id.toString()
    const teamId = useParams().teamId
    const [match, setMatch] = useState('Loading...')
    const [update, setUpdate] = useState(null)
    const { error, data } = useQuery(GET_MATCH, { variables: { _id } })

    useSubscription(MATCH_UPDATED, {
        variables: { _id },
        onSubscriptionData: ({ subscriptionData }) => {
            if (subscriptionData)
                setUpdate(subscriptionData.data)
        }
    })

    useEffect(() => {
        if (data) setMatch(data.getMatch)
    }, [data])

    useEffect(() => {
        if (update && !update.loading) setMatch(update.data)
    }, [update])

    if (error) return error
    if (match === 'Loading...') return 'loading...'
    
    return (
        <>
            <div className="fullView">
                <TeamBar match={match} teamId={teamId}/>
                <TurnLabels />
                <TurnImages match={match} />
                <ChoiceBar match={match} teamId={teamId} />
            </div>
        </>
    )
}

export default Match