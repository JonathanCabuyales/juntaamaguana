-- CONSULTA DE ASIGNACION DE INVENTARIO
-- POR UNIDAD
-- select usu.nombres, usu.apellidos, descripcion_proser, stockasignado_inv 
-- from inventario_asignado inv, usuarios usu, productos_servicios proser
-- where usu.id_usuario = '1'
-- and proser.id_proser = '8'


-- consulta reporte de cobros agua
-- SELECT prefac.id_cli, cli.nombres_cli, cli.apellidos_cli, cli.direccion_cli, prefac.fechapago_prefac, prefac.neto_prefac, prefac.total_prefac FROM prefactura prefac, clientes cli
-- WHERE prefac.fechapago_prefac BETWEEN '2021-10-01 00:00:00' AND '2021-10-15 23:59:59'
-- AND prefac.facturagenerada_prefac = 'S'
-- AND prefac.id_cli = cli.id_cli
-- ORDER BY cli.direccion_cli DESC



-- consulta para el dashboard de los cobros

-- SELECT * FROM 
-- (SELECT ROUND(SUM(pre.total_prefac), 2) ENERO 
-- FROM prefactura pre WHERE pre.fechapago_prefac BETWEEN '2022-01-01 01:00:00' AND '2022-01-31 20:00:00' AND pre.facturagenerada_prefac = 'S') ENERO, 
-- (SELECT ROUND(SUM(pre.total_prefac), 2) FEBRERO 
-- FROM prefactura pre WHERE pre.fechapago_prefac BETWEEN '2022-02-01 01:00:00' AND '2022-02-28 20:00:00' AND pre.facturagenerada_prefac = 'S') FEBRERO,
-- (SELECT ROUND(SUM(pre.total_prefac), 2) MARZO 
-- FROM prefactura pre WHERE pre.fechapago_prefac BETWEEN '2022-03-01 01:00:00' AND '2022-03-25 20:00:00' AND pre.facturagenerada_prefac = 'S') MARZO,
-- (SELECT ROUND(SUM(pre.total_prefac), 2) ABRIL 
-- FROM prefactura pre WHERE pre.fechapago_prefac BETWEEN '2022-04-01 01:00:00' AND '2022-04-30 20:00:00' AND pre.facturagenerada_prefac = 'S') ABRIL


-- -- consulta para el consumo de agua por cada barrio de forma mensual


-- SELECT * FROM (select ROUND(SUM(lec.consumo_lec), 2) 'CUENDINA CHICO' from lecturas lec, clientes cli where cli.id_cli = lec.id_med AND cli.direccion_cli = 'CUENDINA CHICO' AND lec.fechalecact_lec BETWEEN '2022-01-01 00:00:00' AND '2022-01-28 23:59:00') CUENDINA,
-- (select ROUND(SUM(lec.consumo_lec), 2) 'EL ROSARIO' from lecturas lec, clientes cli where cli.id_cli = lec.id_med AND cli.direccion_cli = 'EL ROSARIO' AND lec.fechalecact_lec BETWEEN '2022-01-01 00:00:00' AND '2022-01-28 23:59:00') ROSARIO,
-- (select ROUND(SUM(lec.consumo_lec), 2) 'GUAMBA' from lecturas lec, clientes cli where cli.id_cli = lec.id_med AND cli.direccion_cli = 'GUAMBA' AND lec.fechalecact_lec BETWEEN '2022-01-01 00:00:00' AND '2022-01-28 23:59:00') GUAMBA,
-- (select ROUND(SUM(lec.consumo_lec), 2) 'SAN JUAN' from lecturas lec, clientes cli where cli.id_cli = lec.id_med AND cli.direccion_cli = 'SAN JUAN' AND lec.fechalecact_lec BETWEEN '2022-01-01 00:00:00' AND '2022-01-28 23:59:00') SANJUAN,
-- (select ROUND(SUM(lec.consumo_lec), 2) 'SAN LUIS' from lecturas lec, clientes cli where cli.id_cli = lec.id_med AND cli.direccion_cli = 'SAN LUIS' AND lec.fechalecact_lec BETWEEN '2022-01-01 00:00:00' AND '2022-01-28 23:59:00') SANLUIS,
-- (select ROUND(SUM(lec.consumo_lec), 2) 'SANTA ROSA' from lecturas lec, clientes cli where cli.id_cli = lec.id_med AND cli.direccion_cli = 'SANTA ROSA' AND lec.fechalecact_lec BETWEEN '2022-01-01 00:00:00' AND '2022-01-28 23:59:00') SANTAROSA;