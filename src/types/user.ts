export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
    correctPassword: (
        candidatePassword: string,
        userPassword: string
    ) => Promise<boolean>;
}
