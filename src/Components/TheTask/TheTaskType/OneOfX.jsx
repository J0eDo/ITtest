import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import '../style.scss'

const SELECT_CLASS = 'variantLI_select'

function theVariant(classNames, text) {
    return {
        toggle: () => {

        },
        classNames
        , text
    }
}

export default function OneOfX() {
    let _theTask = useSelector(state => state.constructorTests.theTask)
    const [variants, setVariants] = useState([])
    const [theTask, setTheTask] = useState({
        task: [],
        correct: [],
        wrongs: []
    })


    function editVariant() {
        let newVariants = JSON.parse(JSON.stringify((_theTask)))
        newVariants.wrongs.push(newVariants.correct[0])
        newVariants = newVariants.wrongs.map(element => theVariant(['variantLI'], element))
        console.log(newVariants, "POINT");

        newVariants = newVariants.sort(function () {
            return Math.random() - 0.5;
        });

        setVariants(newVariants)
        console.log(newVariants);


    }
    useEffect(() => {
        if (_theTask) {
            setTheTask(JSON.parse(JSON.stringify((_theTask))))
            editVariant()
        }
    }, [_theTask])

    const changeVariantEvent = e => {
        let indexTarget = parseInt(e.target.getAttribute('index'))

        variants.forEach((element, index) => {
            if (index === indexTarget &&
                !element.classNames.includes(SELECT_CLASS)) {
                element.classNames.push(SELECT_CLASS)
            } else if (index !== indexTarget &&
                element.classNames.includes(SELECT_CLASS)) {
                let removeIndex = element.classNames.indexOf(SELECT_CLASS)
                element.classNames.splice(removeIndex,1)
            }
        });

        let newVariants = JSON.parse(JSON.stringify(variants))
        variantUpdate(newVariants)
    }

    const variantUpdate = (newVariants) => setVariants(newVariants)


    return (
        theTask ? (
            <div>
                <div className="theTastText">{theTask.task[0]}</div>
                <ol type="A">
                    {variants.map((element, index) => (
                        <li
                            index={index}
                            onClick={changeVariantEvent}
                            className={element.classNames.join(' ')}
                            key={`variant${index}`}
                        >
                            {element.text}
                        </li>
                    ))}
                </ol>
            </div>) : (<div></div>)
    )
}
