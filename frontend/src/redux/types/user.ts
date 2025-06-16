export type User = {
    id?: string;
    name: string;
    phone: string;
    email ?:string;
    password: string;
}



export interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

