import prisma from '../src/lib/prisma';

async function main() {
  console.log('🔄 Agregando a Daniel Céspedes...');

  const now = new Date();

  // Create sales for Daniel
  const ventas = await Promise.all([
    prisma.ventas.create({
      data: {
        Fecha: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
        Nit: '87654321',
        Celular: '77655430',
        ClienteNombre: 'Daniel Céspedes',
        Monto: 350.0,
        esRecompra: false,
        UsuarioVentaID: 1,
        SucursalVentaID: 1,
        Activa: true,
        CodigoPais: 591,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.ventas.create({
      data: {
        Fecha: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 día atrás
        Nit: '87654321',
        Celular: '77655430',
        ClienteNombre: 'Daniel Céspedes',
        Monto: 200.0,
        esRecompra: true,
        UsuarioVentaID: 2,
        SucursalVentaID: 2,
        Activa: true,
        CodigoPais: 591,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);
  console.log(`✅ Creadas ${ventas.length} ventas`);

  // Create coupons for Daniel
  const cupones = await Promise.all([
    prisma.cupones.create({
      data: {
        CodigoQR: 'QR-DANIEL-001',
        EstadoQR: 1, // Activo
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 28 * 24 * 60 * 60 * 1000), // 28 días
        CampanaID: 1, // TechStore 10%
        EstadoWhatsapp: 1,
        VentaID: ventas[0].VentaID,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.cupones.create({
      data: {
        CodigoQR: 'QR-DANIEL-002',
        EstadoQR: 1, // Activo
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 días
        CampanaID: 2, // El Sabor - Postre gratis
        EstadoWhatsapp: 1,
        VentaID: ventas[1].VentaID,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);
  console.log(`✅ Creados ${cupones.length} cupones`);

  console.log('\n🎉 ¡Daniel agregado exitosamente!');
  console.log('\n📋 Datos de prueba:');
  console.log('   Nombre: Daniel Céspedes');
  console.log('   Teléfono: 77655430');
  console.log('   País: +591 (Bolivia)');
  console.log('   Cupones activos: 2');
  console.log('\n📱 Para probar:');
  console.log('   1. Ve a /customers');
  console.log('   2. Ingresa tu número: 77655430');
  console.log('   3. Recibirás un WhatsApp con el código de acceso');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
