"use strict"


export default function loadDays(username) {
    return JSON.parse(
            localStorage.getItem(`${username}:days`)
        ) || []
}
