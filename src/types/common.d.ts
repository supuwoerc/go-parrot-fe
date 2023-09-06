interface SystemInfo {
    name: string
    platform_id: string
    system_id: number
}
interface AppEnum {
    manage_system: Array<SystemInfo>
}
interface AppSyncRoutes {
    manage_system: Array<SystemInfo>
}
