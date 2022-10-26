import { HttpException } from "@nestjs/common";

export function validateAllKeysAreTruthy(object: Object, exceptionToThrow: HttpException) {
    for (let key in object) {
        if (!key) {
            exceptionToThrow.message = `key ${key} missing in object ${object}`
            throw exceptionToThrow;
        }
    }
}