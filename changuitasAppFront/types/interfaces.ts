export interface SolicitudHistorial {
  id: number;
  comentario: string | null;
  fechaSolicitud: string;
  fechaTrabajo: string;
  fechaValoracion: string | null;
  valoracion: number | null;
  proveedorServicio: number;
  cliente: number;
  notificacion: any; 
  estado: "PA" | "I" | "F" | "C";
  proveedor_id: number;
  nombreServicio: string;
  cliente_nombre: string;
  servicio_id: number; 
}

export interface Solicitud {
  proveedorId: number;
  idSolicitud: number;
  fechaSolicitud: string;
}

export interface Direccion {
  calle: string;
  altura: number;
  piso: number | null;
  nroDepto: number | null;
  barrio: string;
}

export interface Proveedor {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  documento: number;
  telefono: number;
  fotoPerfil: string;
  fechaNacimiento: string;
  direccion: Direccion;
  cantServiciosContratados: number | null;
  cantServiciosTrabajados: number | null;
  puntaje: number | null;
  bloqueados: number[];
  is_verified: boolean;
}

  export interface Servicio {
    id: number;
    nombreServicio: string;
    descripcion: string;
    dia?: string;
    desdeHora?: string;
    hastaHora?: string;
    dias?: Array<{
      dia: string;
      desdeHora: string;
      hastaHora: string;
    }>;
    fechaDesde?: string;
  }