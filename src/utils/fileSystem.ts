 
import * as fsp from 'fs/promises';
 

abstract class FileSystemManager<T> {
    public fullPath: string;
    constructor(private readonly path: string) {
        this.fullPath =  `${__dirname}\\data\\jsons\\${this.path}`;
        console.log(this.fullPath);
 
    }

   
      
    async saveEntity (entity: T): Promise<T>  {
        
        await fsp.writeFile(`${this.fullPath}/data.json`, this.convertToString(entity));
        return Promise.resolve(entity);
    }
     async getAllEntities(): Promise<T[]> {
        const rawData = await fsp.readFile(`${this.fullPath}/data.json`);
        // const rawData =  await fsp.readFile(`${this fullpath}/data.json`);
        const listData = rawData.toString().split('\n');
        const entities: T[] = [];
        for (const item of listData) {
            entities.push(this.convertToEntity(item));
        }
        return entities;

    } 
    abstract convertToString(entity: T): string;
    abstract convertToEntity(data: string): T;
}

export default FileSystemManager;