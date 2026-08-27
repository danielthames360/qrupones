import { EmpresaCategoria } from './CouponsInterface';

/** Un sello de la tarjeta: numero, fecha en que se gano y sucursal donde se gano. */
export interface StampCardStampInterface {
  Numero: number;
  Fecha: string;
  Sucursal: string;
}

/** Cupon premio ya emitido por el daemon para una tarjeta completa. */
export interface StampCardPrizeInterface {
  CodigoQR: string;
  FechaExpiracion: string | null;
}

/**
 * Tarjeta de sellos tal como la devuelve GET /api/cards/list.
 * Las fechas viajan como string ISO (las serializa NextResponse.json).
 * Estado: 0 activa, 1 completa (las vencidas no se listan).
 */
export interface StampCardInterface {
  TarjetaID: number;
  Sellos: number;
  Meta: number;
  Estado: number;
  FechaUltimoSello: string | null;
  ClienteNombre: string | null;
  Empresa: {
    Nombre: string;
    LogoUrl: string;
    Categoria: EmpresaCategoria;
  };
  Campana: {
    Nombre: string;
    MensajeCanje: string;
    Fondo: string;
    SelloImagen: string;
    LetrasNegras: string;
  };
  sellos: StampCardStampInterface[];
  premio: StampCardPrizeInterface | null;
}
