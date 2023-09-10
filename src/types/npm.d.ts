interface NpmDownloads {
    downloads: Array<{
        day: string
        downloads: number
    }>
    end: string
    start: string
    package: string
}
