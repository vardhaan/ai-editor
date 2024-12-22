import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { DocumentData } from '../types/document';
import { AIEditData } from '../types/aiedit';


export const saveJsonObject = (filename: string, fileContents: any) => {
    console.log("about to write")
    fs.writeFileSync(`${filename}.json`, JSON.stringify(fileContents, null, 2));
    console.log("finished writing")
}

export const generateFileID = () => {
    const newUuid = uuidv4()
    return newUuid
}


export const initDB = (dbName: string, version: number): Promise<IDBDatabase> => {

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, version)

        request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            const db = request.result
            if (!db.objectStoreNames.contains("myObjectStore")) {
                console.log("mos should be initted here")
                db.createObjectStore("myObjectStore", {keyPath: "id"})
            }
            if (!db.objectStoreNames.contains("aiEditData")) {
                db.createObjectStore("aiEditData", {keyPath: "id"})
            }
        }

        request.onsuccess = () => {
            resolve(request.result)
        }

        request.onerror = () => {
            reject(request.error)
        }
    })

}

export const saveJsonToDb = (data: DocumentData, db: IDBDatabase) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("myObjectStore", "readwrite")
        const store = transaction.objectStore("myObjectStore")

        const request = store.put(data)

        request.onsuccess = () => resolve(true)
        request.onerror = () => reject(request.error)
    })
}

export const readFileFromDb = (db: IDBDatabase, id: string) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("myObjectStore", "readonly")
        const store = transaction.objectStore("myObjectStore")

        const request = store.get(id)

        request.onsuccess = () => {
            resolve(request.result as DocumentData)
        }

        request.onerror = () => {
            reject(request.error)
        }
    })
}

export const getAllFilesFromDb = (db: IDBDatabase) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("myObjectStore", "readonly")
        const store = transaction.objectStore("myObjectStore")

        const request = store.getAll()

        request.onsuccess = () => {
            resolve(request.result as DocumentData[])
        }

        request.onerror = () => {
            reject(request.error)
        }
    })
}


export const getAIEditFromDb = (aiEditID: string, db: IDBDatabase) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("aiEditData", "readonly")
        const store = transaction.objectStore("aiEditData")

        const request = store.get(aiEditID)

        request.onsuccess = () => {
            resolve(request.result as AIEditData)
        }
        request.onerror = () => {
            reject(request.error)
        }
    })
}

export const saveAIEditToDb = (editData: AIEditData, db: IDBDatabase) => {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("aiEditData", "readwrite")
        const store = transaction.objectStore("aiEditData")

        const request = store.put(editData)

        request.onsuccess = () => resolve(true)
        request.onerror = () => reject(request.error)
    })
}