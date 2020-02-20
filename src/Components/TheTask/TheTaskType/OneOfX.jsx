import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function OneOfX() {
    const theTask = JSON.parse(JSON.stringify(useSelector(state => state.constructorTests.previewTask)))
    const [variants, setVariants] = useState([])


    function editVariant() {
        theTask.wrongs.push(theTask.correct)
        theTask.wrongs = theTask.wrongs.sort(function () {
            return Math.random() - 0.5;
        });
        setVariants(theTask.wrongs)
    }
    useEffect(() => {
        editVariant()
    }, [])
    return (
        theTask && (
            <div>
                {theTask.task}
                <div>
                    {variants.map((element,index) => (
                        <div key={`variant${index}`}>
                            {element}
                        </div>
                    ))}
                </div>
            </div>)
    )
}
