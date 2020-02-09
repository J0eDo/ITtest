import React from 'react'
import ServerPanel from './ServerPanel/ServerPanel'
import RequestBody from './RequestBody/RequestBody'
import { InfoCard } from '../../Style/elements'
import './style.scss'
export default function index() {
    return (
        <div>
            {InfoCard(ServerPanel)}
            {InfoCard(RequestBody)}
        </div>
    )
}
