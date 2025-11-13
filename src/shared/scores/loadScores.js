"use strict"


export default function loadScores(username) {
    return localStorage.getItem(`${username}:scores`) || 0
}
