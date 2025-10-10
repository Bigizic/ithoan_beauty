#!/usr/bin/node

let bkD = new Date('2025/10/10')
  bkD.getDate() + 1
  bkD.setHours(0, 0, 0, 0)
  const dateTime = `${bkD.getFullYear()}-${String(bkD.getMonth() + 1).padStart(2, '0')}-${String(bkD.getDate()).padStart(2, '0')}`

console.log(new Date(dateTime).toDateString())


console.log(new Date('2025-10-10T23:59:59.999Z').toDateString())
