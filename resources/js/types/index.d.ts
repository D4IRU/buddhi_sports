export interface User {
    idPenyewa: number;
    namaPenyewa: string;
    noHp: string;
    email: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        error?: string;
        success?: string;
    };
};
