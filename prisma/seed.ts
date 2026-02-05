import prisma from '../src/lib/prisma';

async function main() {
  console.log('🌱 Seeding database...');

  // 1. Create Companies
  const empresas = await Promise.all([
    prisma.empresas.upsert({
      where: { EmpresaID: 1 },
      update: {},
      create: {
        EmpresaID: 1,
        Nombre: 'TechStore Bolivia',
        CodigoCreacionUsuarios: 'TECH001',
        Nit: '1234567890',
        Representante: 'Carlos Mendoza',
        Telefono: '591-2-2222222',
        Activa: true,
        Moneda: 'Bs',
        Pais: 'Bolivia',
        LogoUrl: 'https://placehold.co/200x200.png?text=TechStore',
        Categoria: 'Tiendas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.empresas.upsert({
      where: { EmpresaID: 2 },
      update: {},
      create: {
        EmpresaID: 2,
        Nombre: 'Restaurante El Sabor',
        CodigoCreacionUsuarios: 'REST001',
        Nit: '0987654321',
        Representante: 'María García',
        Telefono: '591-2-3333333',
        Activa: true,
        Moneda: 'Bs',
        Pais: 'Bolivia',
        LogoUrl: 'https://placehold.co/200x200.png?text=ElSabor',
        Categoria: 'Gastronomia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.empresas.upsert({
      where: { EmpresaID: 3 },
      update: {},
      create: {
        EmpresaID: 3,
        Nombre: 'Moda Express',
        CodigoCreacionUsuarios: 'MODA001',
        Nit: '1122334455',
        Representante: 'Ana López',
        Telefono: '591-2-4444444',
        Activa: true,
        Moneda: 'Bs',
        Pais: 'Bolivia',
        LogoUrl: 'https://placehold.co/200x200.png?text=ModaExpress',
        Categoria: 'Tiendas',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);
  console.log(`✅ Created ${empresas.length} empresas`);

  // 2. Create Branches
  const sucursales = await Promise.all([
    prisma.sucursales.upsert({
      where: { SucursalID: 1 },
      update: {},
      create: {
        SucursalID: 1,
        Nombre: 'TechStore - Centro',
        Direccion: 'Av. 16 de Julio #1234',
        Horarios: '09:00 - 21:00',
        Telefonos: '2-2222222',
        Activa: true,
        EmpresaID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.sucursales.upsert({
      where: { SucursalID: 2 },
      update: {},
      create: {
        SucursalID: 2,
        Nombre: 'El Sabor - Sopocachi',
        Direccion: 'Calle Rosendo Gutiérrez #890',
        Horarios: '12:00 - 23:00',
        Telefonos: '2-3333333',
        Activa: true,
        EmpresaID: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.sucursales.upsert({
      where: { SucursalID: 3 },
      update: {},
      create: {
        SucursalID: 3,
        Nombre: 'Moda Express - Mall',
        Direccion: 'MegaCenter Local 45',
        Horarios: '10:00 - 22:00',
        Telefonos: '2-4444444',
        Activa: true,
        EmpresaID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);
  console.log(`✅ Created ${sucursales.length} sucursales`);

  // 3. Create Users
  const usuarios = await Promise.all([
    prisma.usuarios.upsert({
      where: { Login: 'admin_tech' },
      update: {},
      create: {
        UsuarioID: 1,
        Nombre: 'Admin TechStore',
        Login: 'admin_tech',
        Pwd: 'hashed_password',
        Correo: 'admin@techstore.bo',
        Activa: true,
        TipoUsuarioID: 'admin',
        EmpresaID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.usuarios.upsert({
      where: { Login: 'admin_sabor' },
      update: {},
      create: {
        UsuarioID: 2,
        Nombre: 'Admin El Sabor',
        Login: 'admin_sabor',
        Pwd: 'hashed_password',
        Correo: 'admin@elsabor.bo',
        Activa: true,
        TipoUsuarioID: 'admin',
        EmpresaID: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.usuarios.upsert({
      where: { Login: 'admin_moda' },
      update: {},
      create: {
        UsuarioID: 3,
        Nombre: 'Admin Moda',
        Login: 'admin_moda',
        Pwd: 'hashed_password',
        Correo: 'admin@modaexpress.bo',
        Activa: true,
        TipoUsuarioID: 'admin',
        EmpresaID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);
  console.log(`✅ Created ${usuarios.length} usuarios`);

  // 4. Create Campaigns
  const now = new Date();
  const campanas = await Promise.all([
    prisma.campanas.upsert({
      where: { CampanaID: 1 },
      update: {},
      create: {
        CampanaID: 1,
        Nombre: 'Descuento TechStore 10%',
        Desde: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        Hasta: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
        Activa: true,
        MensajeCanje: '¡Felicidades! Has canjeado tu cupón de 10% de descuento en TechStore',
        DiasVigencia: 30,
        DsctoPorcentaje: 10,
        DsctoMonto: 0,
        EmpresaID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.campanas.upsert({
      where: { CampanaID: 2 },
      update: {},
      create: {
        CampanaID: 2,
        Nombre: 'Postre Gratis El Sabor',
        Desde: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
        Hasta: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000),
        Activa: true,
        MensajeCanje: '¡Disfruta tu postre gratis en El Sabor!',
        DiasVigencia: 15,
        DsctoPorcentaje: 0,
        DsctoMonto: 0,
        EmpresaID: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.campanas.upsert({
      where: { CampanaID: 3 },
      update: {},
      create: {
        CampanaID: 3,
        Nombre: 'Moda Express 50Bs',
        Desde: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
        Hasta: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        Activa: true,
        MensajeCanje: 'Cupón de Bs. 50 de descuento en tu próxima compra',
        DiasVigencia: 20,
        DsctoPorcentaje: 0,
        DsctoMonto: 50,
        EmpresaID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);
  console.log(`✅ Created ${campanas.length} campañas`);

  // 5. Create Sales for test customer (Daniel Cespedes - 77655430)
  const ventas = await Promise.all([
    prisma.ventas.upsert({
      where: { VentaID: 1 },
      update: {},
      create: {
        VentaID: 1,
        Fecha: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
        Monto: 500.0,
        esRecompra: false,
        UsuarioVentaID: 1,
        SucursalVentaID: 1,
        Activa: true,
        CodigoPais: 591,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.ventas.upsert({
      where: { VentaID: 2 },
      update: {},
      create: {
        VentaID: 2,
        Fecha: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
        Monto: 150.0,
        esRecompra: true,
        UsuarioVentaID: 2,
        SucursalVentaID: 2,
        Activa: true,
        CodigoPais: 591,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.ventas.upsert({
      where: { VentaID: 3 },
      update: {},
      create: {
        VentaID: 3,
        Fecha: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
        Monto: 300.0,
        esRecompra: true,
        UsuarioVentaID: 3,
        SucursalVentaID: 3,
        Activa: true,
        CodigoPais: 591,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    // Additional sales for more coupons
    prisma.ventas.upsert({
      where: { VentaID: 4 },
      update: {},
      create: {
        VentaID: 4,
        Fecha: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
        Monto: 450.0,
        esRecompra: true,
        UsuarioVentaID: 1,
        SucursalVentaID: 1,
        Activa: true,
        CodigoPais: 591,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.ventas.upsert({
      where: { VentaID: 5 },
      update: {},
      create: {
        VentaID: 5,
        Fecha: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
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
    prisma.ventas.upsert({
      where: { VentaID: 6 },
      update: {},
      create: {
        VentaID: 6,
        Fecha: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
        Monto: 350.0,
        esRecompra: true,
        UsuarioVentaID: 3,
        SucursalVentaID: 3,
        Activa: true,
        CodigoPais: 591,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    // Used coupon sale
    prisma.ventas.upsert({
      where: { VentaID: 7 },
      update: {},
      create: {
        VentaID: 7,
        Fecha: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
        Monto: 800.0,
        esRecompra: false,
        UsuarioVentaID: 1,
        SucursalVentaID: 1,
        Activa: true,
        CodigoPais: 591,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    // Expired coupon sale
    prisma.ventas.upsert({
      where: { VentaID: 8 },
      update: {},
      create: {
        VentaID: 8,
        Fecha: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000),
        Nit: '12345678',
        Celular: '77655430',
        ClienteNombre: 'Daniel Cespedes',
        Monto: 250.0,
        esRecompra: false,
        UsuarioVentaID: 1,
        SucursalVentaID: 1,
        Activa: true,
        CodigoPais: 591,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);
  console.log(`✅ Created ${ventas.length} ventas`);

  // 6. Create Coupons (6 active, 1 used, 1 expired)
  const cupones = await Promise.all([
    // Active coupons (6 total)
    prisma.cupones.upsert({
      where: { CuponID: 1 },
      update: {},
      create: {
        CuponID: 1,
        CodigoQR: 'QR-TECH-001',
        EstadoQR: 0,
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 25 * 24 * 60 * 60 * 1000),
        CampanaID: 1,
        EstadoWhatsapp: 1,
        VentaID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.cupones.upsert({
      where: { CuponID: 2 },
      update: {},
      create: {
        CuponID: 2,
        CodigoQR: 'QR-SABOR-001',
        EstadoQR: 0,
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000), // Expiring soon!
        CampanaID: 2,
        EstadoWhatsapp: 1,
        VentaID: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.cupones.upsert({
      where: { CuponID: 3 },
      update: {},
      create: {
        CuponID: 3,
        CodigoQR: 'QR-MODA-001',
        EstadoQR: 0,
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 19 * 24 * 60 * 60 * 1000),
        CampanaID: 3,
        EstadoWhatsapp: 1,
        VentaID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.cupones.upsert({
      where: { CuponID: 4 },
      update: {},
      create: {
        CuponID: 4,
        CodigoQR: 'QR-TECH-002',
        EstadoQR: 0,
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
        CampanaID: 1,
        EstadoWhatsapp: 1,
        VentaID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.cupones.upsert({
      where: { CuponID: 5 },
      update: {},
      create: {
        CuponID: 5,
        CodigoQR: 'QR-SABOR-002',
        EstadoQR: 0,
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), // Expiring very soon!
        CampanaID: 2,
        EstadoWhatsapp: 1,
        VentaID: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.cupones.upsert({
      where: { CuponID: 6 },
      update: {},
      create: {
        CuponID: 6,
        CodigoQR: 'QR-MODA-002',
        EstadoQR: 0,
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
        CampanaID: 3,
        EstadoWhatsapp: 1,
        VentaID: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    // Used coupon (for history)
    prisma.cupones.upsert({
      where: { CuponID: 7 },
      update: {},
      create: {
        CuponID: 7,
        CodigoQR: 'QR-TECH-USED',
        EstadoQR: 1,
        CantidadCanjes: 1,
        CanjesMaximos: 1,
        FechaCanje: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
        FechaExpiracion: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000),
        UsuarioCanjeID: 1,
        SucursalCanjeID: 1,
        CampanaID: 1,
        EstadoWhatsapp: 1,
        VentaID: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    // Expired coupon (for history)
    prisma.cupones.upsert({
      where: { CuponID: 8 },
      update: {},
      create: {
        CuponID: 8,
        CodigoQR: 'QR-TECH-EXPIRED',
        EstadoQR: 0,
        CantidadCanjes: 0,
        CanjesMaximos: 1,
        FechaExpiracion: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        CampanaID: 1,
        EstadoWhatsapp: 1,
        VentaID: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);
  console.log(`✅ Created ${cupones.length} cupones`);

  // 7. Create Test Session
  await prisma.sesionesClientes.upsert({
    where: { SesionClienteID: 1 },
    update: { Codigo: 'TEST123' },
    create: {
      SesionClienteID: 1,
      Codigo: 'TEST123',
      ClienteNombre: 'Daniel Cespedes',
      Celular: '77655430',
      CodigoPais: '591',
    },
  });
  console.log('✅ Created test session: TEST123');

  console.log('\n🎉 Seed completed!');
  console.log('\n📋 Test Instructions:');
  console.log('1. Run: npm run dev');
  console.log('2. Open: http://localhost:3000/coupons/TEST123');
  console.log('3. You should see 6 active coupons (some expiring soon!)');
  console.log('4. Check /history for used/expired coupons');
  console.log('\nAlternatively, log in with WhatsApp using: +591 77655430');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
