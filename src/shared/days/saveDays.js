"use strict"


export default function saveDays(username, newDaysList) {
    localStorage.setItem(`${username}:days`,
        JSON.stringify(newDaysList)
    )
}
