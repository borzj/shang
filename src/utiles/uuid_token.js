import { v4 as uuidv4 } from 'uuid';
export function getUUIDToken() {
    let uuidToken = localStorage.getItem('UUID_TOKEN');
    if (!uuidToken) {
        uuidToken = uuidv4();
        localStorage.setItem('UUID_TOKEN', uuidToken)
    }

    return uuidToken
}
