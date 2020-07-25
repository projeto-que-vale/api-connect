export class ApiUtil {
    public static camelCase = (str) => {
        return str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `${letter}`);
    };
    public static camelToSnakeCase = (str) => {
        return str[0].toLowerCase() + str.slice(1, str.length).replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    };

    public static createdAt(): number {
        return parseFloat(Date.now().toString().substr(0, 10));
    }

    public static expireAt(minutes: number = 1): number {
        const date = new Date();
        return parseFloat((new Date(date.getTime() + minutes * 60000)).getTime().toString().substr(0, 10));
    }
}
