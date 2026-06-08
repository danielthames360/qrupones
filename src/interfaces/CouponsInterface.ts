export type EmpresaCategoria = 'Tiendas' | 'Gastronomia' | 'Eventos';

export interface CouponsInterface {
  CodigoQR: string;
  FechaExpiracion: Date;
  MensajeCanje: string;
  Nombre: string;
  LogoUrl: string;
  Categoria: EmpresaCategoria;
  CampanaID: number;
}
