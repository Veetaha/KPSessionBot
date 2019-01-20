export class StatusedError extends Error {
    constructor(message: string, public status: number){
        super(message);
    }
}