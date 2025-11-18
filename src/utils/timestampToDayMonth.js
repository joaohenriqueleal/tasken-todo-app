"use strict"


export default function timestampToDayMonth(timestamp) {
    return new Date(timestamp).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit"
    });
}
