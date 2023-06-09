interface DocumentResult<T> {
    _doc: T;
}

export interface IUser extends DocumentResult<IUser> {
    first_name: string
    last_name: string
    email: string
    password: string
    onboardig: Date
    default_plants_selection:Array<string>

}