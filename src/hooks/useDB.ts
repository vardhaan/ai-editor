import { useEffect, useState } from "react"
import { initDB } from "../lib/io"

export const DEFAULT_DB_NAME = "te-db"
export const DEFAULT_DB_VERSION = 1


export const useDB = (dbName?: string, version?: number) => {
    const useDbName = dbName ?? DEFAULT_DB_NAME
    const useDbVers = version ?? DEFAULT_DB_VERSION

    const [db, setDb] = useState<IDBDatabase | null>(null)

    useEffect(() => {
        initDB(useDbName, useDbVers).then(setDb)
    }, [dbName, version])

    return {db}
}