export interface CouponsHistoryInterface {
  CodigoQR: string;
  ClienteNombre: string;
  Celular: string;
  FechaExpiracion: Date;
  MensajeCanje: string;
  Empresa: string;
  MontoOrigen: number;
  FechaGenerado: Date;
  EstadoQR: number;
  MontoQrupon: number | null;
  FechaUso: Date | null;
  Moneda: string;
  LogoUrl: string;
  Categoria: string;
}
