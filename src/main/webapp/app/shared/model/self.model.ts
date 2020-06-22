export interface ISelf {
    id?: number;
    name?: string;
}

export class Self implements ISelf {
    constructor(public id?: number, public name?: string) {}
}
