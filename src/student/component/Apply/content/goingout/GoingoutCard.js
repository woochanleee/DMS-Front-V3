import React from 'react'
import './GoingoutCard.scss'

const GoingoutCard = ({gooutDate, returnDate, reason, id, onChangeCard, selectedClass}) => {
    const gooutTime = gooutDate.substr(10, 6);
    const returnTime = returnDate.substr(10, 6);
    const date = `${gooutDate[5]}${gooutDate[6]}월 ${gooutDate[8]}${gooutDate[9]}일`;
    
    return (
        <div className = {`unselectable apply--goingout--card ${selectedClass}`} onClick = {onChangeCard.bind(null, id)}>
            <p className = 'apply--goingout--card--title'>외출 신청서</p>
            <p className = 'apply--goingout--card--time'>{`${date} ${gooutTime} ~ ${returnTime}`}</p>
            <p className = 'apply--goingout--card--reason'>{reason}</p>
        </div>
    )
}

export default GoingoutCard;