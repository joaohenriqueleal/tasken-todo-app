"use strict"


export default function saveScores(username, scores) {
    localStorage.setItem(`${username}:scores`, scores)
}
