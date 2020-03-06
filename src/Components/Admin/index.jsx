import React from 'react'
import './style.scss'
//Components
import { InfoCard } from '../../Style/elements'
import ServerPanel from './ServerPanel/ServerPanel'
import RequestBody from './Request/RequestBody'
import TableConteiner from './DataTable/TableConteiner'

export default function index() {
    return (
        <div>
            {InfoCard(ServerPanel)}
            {InfoCard(RequestBody)}
            {InfoCard(TableConteiner)}
        </div>
    )
}
