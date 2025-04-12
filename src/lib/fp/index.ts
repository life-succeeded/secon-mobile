type FormErrors = {
    errors?: Record<string, { message?: React.ReactNode }>;
};

export class fp {
    /**
     * Получает сообщение об ошибке или значение по умолчанию
     * @param defaultValue Значение по умолчанию
     * @param path Путь к ошибке в формате 'errors.fieldName.message'
     * @param formState Состояние формы
     * @returns React.ReactNode - сообщение об ошибке или defaultValue
     */
    static getOr<D extends React.ReactNode>(
        defaultValue: D,
        path: string,
        formState: FormErrors
    ): React.ReactNode {
        if (!path || !formState?.errors) return defaultValue;

        const parts = path.split('.');
        if (parts.length !== 3 || parts[0] !== 'errors') return defaultValue;

        const [, fieldName, prop] = parts;
        if (prop !== 'message') return defaultValue;

        const fieldError = formState.errors[fieldName];
        if (!fieldError || typeof fieldError !== 'object') return defaultValue;

        return fieldError.message ?? defaultValue;
    }

    /**
     * Проверяет наличие сообщения об ошибке
     * @param path Путь к ошибке в формате 'errors.fieldName.message'
     * @param formState Состояние формы
     * @returns boolean - true если ошибка существует
     */
    static has(
        path: string,
        formState: FormErrors
    ): boolean {
        if (!path || !formState?.errors) return false;

        const parts = path.split('.');
        if (parts.length !== 3 || parts[0] !== 'errors') return false;

        const [, fieldName, prop] = parts;
        if (prop !== 'message') return false;

        const fieldError = formState.errors[fieldName];
        if (!fieldError || typeof fieldError !== 'object') return false;

        return fieldError.message !== undefined;
    }
}