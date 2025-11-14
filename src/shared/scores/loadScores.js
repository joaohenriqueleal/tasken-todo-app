"use strict"


export default function loadScores(username) {
    return Number(localStorage.getItem(`${username}:scores`)) || 0
}
