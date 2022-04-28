export interface InventarioI {
    id_inv?: number,
    id_usuario: number,
    id_proser: number,
    stockasignado_inv: number,
    stockentregado_inv: number,
    descripcion_inv: string,
    proyectos_inv: string
}