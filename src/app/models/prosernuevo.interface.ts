export interface ProsernuevoI {
    //variables a utilizar
    id_proser: number,
    codigo_proser: string,
    categoria_proser: string,
    nombre_proser: string,
    descripcion_proser: string,
    precio_proser: number,
    IVA_proser?: string,
    cantidad_proser: number,
    cantidadfinal_proser: number,
    tipobien_proser: string,
    unidadmedida_proser: string,
    marca_proser: string,
    modelo_proser: string,
    serie_proser: string,
    estado_proser: string,
    foto: string,
    created_at: string
}