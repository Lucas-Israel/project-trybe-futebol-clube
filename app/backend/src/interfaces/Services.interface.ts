export default interface CRUD<T> {
  findOne(param: unknown): Promise<T>
}
