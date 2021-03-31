const fast = require('fast-cli/api')
const express = require('express')
const app = express()
const port = 9696

app.get('/metrics', async (req, res) => {
  try {
    console.log('speedtest started')
    let data = {}
    await fast().forEach(result => {
      data = result
      process.stdout.write('.')
    })
    let downloadSpeed = data.downloadSpeed
    let uploadSpeed = data.uploadSpeed
    if (data.downloadUnit.toUpperCase() === 'KBPS') downloadSpeed = downloadSpeed / 1000
    if (data.uploadUnit.toUpperCase() === 'KBPS') uploadSpeed = uploadSpeed / 1000
    if (data.downloadUnit.toUpperCase() === 'GBPS') downloadSpeed = downloadSpeed * 1000
    if (data.uploadUnit.toUpperCase() === 'GBPS') uploadSpeed = uploadSpeed * 1000
    res.setHeader('content-type', 'text/plain')
    res.send(
`# TYPE fastdotcom_megabits_per_second gauge
# HELP fastdotcom_megabits_per_second Speed measured against fast.com
fastdotcom_megabits_per_second{direction="downstream"} ${data.downloadSpeed}
fastdotcom_megabits_per_second{direction="upstream"} ${data.uploadSpeed}`)
    console.log('speedtest end')
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.listen(port, () => {
  console.log(`fastdotcom-exporter listening at http://0.0.0.0:${port}`)
})
