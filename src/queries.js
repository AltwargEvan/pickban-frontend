import { gql } from '@apollo/client';

export const CREATE_MATCH = gql`
    mutation createMatch(
        $maps: [String!]!,
        $totalGames: Int!,
        $gamesPerSide: Int!,
        $tankPicking: Boolean!,
        $globalTankBans: Int!,
        $teamAName: String!,
        $teamBName: String!
    ) {
        createMatch(
            maps: $maps,
            totalGames: $totalGames,
            gamesPerSide: $gamesPerSide,
            tankPicking: $tankPicking,
            globalTankBans: $globalTankBans
            teamAName: $teamAName
            teamBName: $teamBName
        ) {
            teamA 
            teamB
            _id
        }
    }
`

export const DO_TURN = gql`
    mutation doTurn(
        $teamId: String!,
        $action: String!,
        $response: String!
        ) {
            doTurn(
                teamId: $teamId,
                action: $action,
                response: $response
            ) {
                response
            }
        }
`
export const GET_MATCH = gql`
   query getMatch($_id: String!){
       getMatch(
           _id: $_id
       ) {
        format {
            maps
            totalGames
            gamesPerSide
            tankPicking
            globalTankBans
            playersPerTeam
        }
        turns {
            action
            team
            response
            teamId
        }
        currentTurn
        teamA
        teamB
        _id
        teamAName
        teamBName
        bans
       }
   }
`
export const GET_TEAM = gql`
   query getTeam($_id: String!){
       getMatch(
           _id: $_id
       ) {
        match
       }
   }
`



export const MATCH_UPDATED = gql`
  subscription matchUpdated($_id: String!) {
        matchUpdated(
            _id: $_id
        ) {
        format {
            maps
            totalGames
            gamesPerSide
            tankPicking
            globalTankBans
            playersPerTeam
        }
        turns {
            action
            team
            response
        }
        currentTurn
        teamA
        teamB
        _id
        teamAName
        teamBName
        bans
        }
    }
`