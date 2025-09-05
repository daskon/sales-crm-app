export declare class AuthService {
    login(username: string, password: string): Promise<{
        token: string;
        user: {
            id: any;
            username: string;
        };
    }>;
}
//# sourceMappingURL=auth.services.d.ts.map