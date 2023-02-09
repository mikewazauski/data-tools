export class User {
    static fromFireBase({
        email,
        uid,
        name,
    }: {
        email: string;
        uid: string;
        name: string;
    }): User {
        return new User(uid, name, email);
    }

    constructor(
        public uid: string | undefined | null,
        public name: string | undefined | null,
        public email: string | undefined | null
    ) { }
}
