import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_MATCH } from '../queries'
const Format = require('../formatConfigs/sterlingCup')

const Links = ({ a, b, m }) => {
    if (a && b && m)
        return (
            <>
                <div className="bg-teamA row mx-auto top-buffer rounded">
                    <div className="text-white">
                        Team A Link: <a className="text-white" href={a} target="_blank" rel="noreferrer">{a}</a>
                    </div>
                </div>
                <div className="bg-teamB row mx-auto top-buffer rounded">
                    <div className="text-white">
                        Team B Link: <a className="text-white" href={b} target="_blank" rel="noreferrer">{b}</a>
                    </div>
                </div>
                <div className="bg-spectator row mx-auto top-buffer rounded">
                    <div className="text-white">
                        Spectator Link: <a className="text-white" href={m} target="_blank" rel="noreferrer">{m}</a>
                    </div>
                </div>

            </>
        )
    return null
}

const Error = ({ show, setShow }) => {
    if (!show) return null
    setTimeout(() => {
        setShow(null)
    }, 5000)
    return (
        <>
            <div className="bg-danger" onClick={() => setShow(false)} style={{ opacity: 1 }}>
                Something went wrong. Did you select a format?
            </div>
        </>
    )
}

const Home = () => {
    //links
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [m, setM] = useState('')
    //team names
    const [teamAName, setteamAName] = useState('Team A')
    const [teamBName, setteamBName] = useState('Team B')
    //radio styles
    const [c5, set5] = useState('btn-primary')
    const [c7, set7] = useState('btn-primary')
    //variables to create match
    const [totalGames, setTotalGames] = useState(null)
    const maps = Format.maps
    const gamesPerSide = Format.gamesPerSide
    const tankPicking = Format.tankPicking
    const globalTankBans = Format.globalTankBans
    const [createMatch] = useMutation(CREATE_MATCH)
    //error altert
    const [showAlert, setShowAlert] = useState(false)
    console.log(maps)

    const on5 = () => {
        set7('btn-secondary')
        set5('btn-primary')
        setTotalGames(5)
    }
    const on7 = () => {
        set7('btn-primary')
        set5('btn-secondary')
        setTotalGames(7)
    }
    const handle1Change = (event) => {
        setteamAName(event.target.value)
    }
    const handle2Change = (event) => {
        setteamBName(event.target.value)
    }
    const handleClick = async () => {
        try {
            const res = await createMatch({ variables: { maps, totalGames, gamesPerSide, tankPicking, globalTankBans, teamAName, teamBName } })
            setA(`${window.location.href}${res.data.createMatch._id}/${res.data.createMatch.teamA}`)
            setB(`${window.location.href}${res.data.createMatch._id}/${res.data.createMatch.teamB}`)
            setM(`${window.location.href}${res.data.createMatch._id}`)
        } catch (error) {
            setShowAlert(true)
        }
    }
    return (
        <>
            <div className="d-flex align-items-center justify-content-center fullView">
                <div className="text-center">
                    <h1 className="text-white"><b>World of Tanks Pick Ban Tool</b></h1>
                    <div className="row mx-auto row top-buffer">
                        <div className="col row">
                            <button type="radio" onClick={on5} className={'btn btn-lg btn-block rounded-0 ' + c7}>Best of 5</button>
                        </div>
                        <div className="col row ">
                            <button type="radio" onClick={on7} className={'btn btn-lg btn-block rounded-0 ' + c5}>Best of 7</button>
                        </div>
                    </div>
                    <div className="input-group mb-3 top-buffer">
                        <input type="text" value={teamAName} onChange={handle1Change} className="form-control" placeholder="Team A" aria-label="Username" aria-describedby="basic-addon1" />
                        <input type="text" value={teamBName} onChange={handle2Change} className="form-control" placeholder="Team B" aria-label="Username" aria-describedby="basic-addon1" />
                        <button type="button" className="btn btn-primary" onClick={handleClick}>Go</button>
                    </div>
                    <Links a={a} b={b} m={m} />
                    <Error show={showAlert} setShow={setShowAlert} />
                </div>
            </div>
        </>
    )
}

export default Home