import {addLeadingZero} from "@/utils/string.utils.js";
export function convertDateFromIso(isoDate, withTime = true) {
    if (!isoDate) return ''

    const date = new Date(isoDate)
    const day = addLeadingZero(date.getUTCDate())
    const month = addLeadingZero(date.getUTCMonth() + 1)
    const year = date.getUTCFullYear()
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()

    const formattedDate = `${day}.${month}.${year}`
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`

    if (!withTime) return formattedDate

    return `${formattedDate} ${formattedTime}`
}