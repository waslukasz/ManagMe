export default interface IRepository<T> {
    GetById(id: string): Promise<T>
    GetAll(): Promise<Array<T>>
    Add(object: T) : Promise<T>
    Update(object: T) : Promise<T>
    Delete(object: T) : Promise<void>
}