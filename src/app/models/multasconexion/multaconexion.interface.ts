export interface MultaconexionI{
    id_cli: string,
    tipo_mul: string,
    descripcion_mul: string,
    valor_mul: string,
    saldo_mul: string,
    cancelada_mul: string, 
    fechapago: string,
    valorpagado_mul: string,
    detalles_mul?: string
}