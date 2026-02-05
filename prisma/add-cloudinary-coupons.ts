import prisma from '../src/lib/prisma';

async function main() {
  console.log('🔄 Adding Cloudinary test coupons...');

  const now = new Date();

  // Create 4 sales for Daniel Cespedes
  const ventas = await Promise.all([
    prisma.ventas.create({
      data: {
        Fecha: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
        Monto: 400.0,
        esRecompra: false,
        UsuarioVentaID: 1,
        SucursalVentaID: 1,
        Activa: true,
        CodigoPais: 591,
        createdAt: now,
        updatedAt: now,
      },
    }),
    prisma.ventas.create({
      data: {
        Fecha: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
        Monto: 180.0,
        esRecompra: true,
        UsuarioVentaID: 2,
        SucursalVentaID: 2,
        Activa: true,
        CodigoPais: 591,
        createdAt: now,
        updatedAt: now,
      },
    }),
    prisma.ventas.create({
      data: {
        Fecha: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
        Monto: 275.0,
        esRecompra: true,
        UsuarioVentaID: 3,
        SucursalVentaID: 3,
        Activa: true,
        CodigoPais: 591,
        createdAt: now,
        updatedAt: now,
      },
    }),
    prisma.ventas.create({
      data: {
        Fecha: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
        Monto: 520.0,
        esRecompra: true,
        UsuarioVentaID: 1,
        SucursalVentaID: 1,
        Activa: true,
        CodigoPais: 591,
        createdAt: now,
        updatedAt: now,
      },
    }),
  ]);
  console.log(`✅ Created ${ventas.length} sales`);

  // Create 4 coupons with Cloudinary codes
  const cupones = await Promise.all([
    prisma.cupones.create({
      data: {
        CodigoQR: 'PB6N4L',
        EstadoQR: 0,
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000),
        CampanaID: 1, // TechStore
        EstadoWhatsapp: 1,
        VentaID: ventas[0].VentaID,
        createdAt: now,
        updatedAt: now,
      },
    }),
    prisma.cupones.create({
      data: {
        CodigoQR: 'PB6NEL',
        EstadoQR: 0,
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000),
        CampanaID: 2, // El Sabor
        EstadoWhatsapp: 1,
        VentaID: ventas[1].VentaID,
        createdAt: now,
        updatedAt: now,
      },
    }),
    prisma.cupones.create({
      data: {
        CodigoQR: 'PB6NDL',
        EstadoQR: 0,
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 20 * 24 * 60 * 60 * 1000),
        CampanaID: 3, // Moda Express
        EstadoWhatsapp: 1,
        VentaID: ventas[2].VentaID,
        createdAt: now,
        updatedAt: now,
      },
    }),
    prisma.cupones.create({
      data: {
        CodigoQR: 'PB6NGL',
        EstadoQR: 0,
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        CampanaID: 1, // TechStore
        EstadoWhatsapp: 1,
        VentaID: ventas[3].VentaID,
        createdAt: now,
        updatedAt: now,
      },
    }),
  ]);
  console.log(`✅ Created ${cupones.length} Cloudinary coupons`);

  console.log('\n🎉 Cloudinary test coupons added!');
  console.log('\n📋 Coupon codes (with Cloudinary images):');
  console.log('   PB6N4L → TechStore (Campaign 1)');
  console.log('   PB6NEL → El Sabor (Campaign 2)');
  console.log('   PB6NDL → Moda Express (Campaign 3)');
  console.log('   PB6NGL → TechStore (Campaign 1)');
  console.log('\n📱 Test: log in as Daniel Cespedes (+591 77655430)');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
