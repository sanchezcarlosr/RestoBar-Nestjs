import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/core';

export class PasswordService {
    
    async hashPassword(password: string){
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    async compareEncryptedPassword(password: string, encryptedPassword: string): Promise<boolean>{
        return bcrypt.compare(password, encryptedPassword)
    }
}