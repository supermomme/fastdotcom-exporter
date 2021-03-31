# fastdotcom-exporter
Simple speedtest using [fast.com](https://fast.com/).

Inspired by [speedtest-exporter](https://github.com/nlamirault/speedtest_exporter) and uses [fast-cli](https://github.com/sindresorhus/fast-cli)
## Using Docker
`docker pull supermomme/fastdotcom-exporter`

### Docker Run
`docker run -d -p 9696:9696 --restart always supermomme/fastdotcom-exporter`

 ### Docker Compose
```yaml
version: "3"
services:
  fastdotcom:
    image: supermomme/fastdotcom-exporter
    ports:
      - 9696:9696
    restart: always
```

## prometheus job
```yaml
scrape_configs:
  - job_name: 'fastdotcom'
    metrics_path: /metrics
    scrape_interval: 15m # running speedtest every 15 minutes
    scrape_timeout: 60s # running speedtest needs time to complete
    static_configs:
      - targets: ['fastdotcom:9696']
```