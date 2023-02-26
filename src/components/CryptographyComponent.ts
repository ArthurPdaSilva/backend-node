import CryptoJS from "crypto-js";
import DotenvComponent from "./DotEnvComponent";

export default class CryptographyComponent {
    private static key = DotenvComponent.API_CRYPTO_KEY;

    public static encrypt (password:string): string {

        return CryptoJS.AES.encrypt(password, CryptographyComponent.key).toString();
    }

    public static decrypt(passwordEncrypted: string): string {
        const bytes = CryptoJS.AES.decrypt(passwordEncrypted, CryptographyComponent.key);

        return bytes.toString(CryptoJS.enc.Utf8);
    }
}