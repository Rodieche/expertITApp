type BodyType = { [key: string]: any };

export const paramsBuilder = (validParams: string[], body: BodyType): BodyType => {
    // Verificar que validParams es un array y body es un objeto
    if (!Array.isArray(validParams)) {
        throw new TypeError('validParams debe ser un array');
    }
    if (typeof body !== 'object' || body === null) {
        throw new TypeError('body debe ser un objeto no nulo');
    }

    // Crear el objeto params
    let params: BodyType = {};

    for (const attr of validParams) {
        if (Object.prototype.hasOwnProperty.call(body, attr)) {
            params[attr] = body[attr];
        }
    }

    return params;
}
