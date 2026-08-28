const productos = {
  percusion: [
    {
      id: 1,
      nombre: 'Batería Acústica Completa',
      precio: 'Q 3,200.00',
      descripcion: 'Batería de 5 piezas con platillos, lista para principiantes e intermedios.',
      especificaciones: [
        { etiqueta: 'Piezas', valor: '5 piezas: caja, toms, bombo y platillos' },
        { etiqueta: 'Accesorios', valor: 'Incluye: baquetas, estandartes y banco ajustable' },
        { etiqueta: 'Material', valor: 'Abedul laminado' },
        { etiqueta: 'Ideal para', valor: 'Principiantes e intermedios' }
      ],
      imagen: 'image/bateria-acustica.jpg'
    },
    {
      id: 2,
      nombre: 'Par de Bongós',
      precio: 'Q 650.00',
      descripcion: 'Tumbadores de 8" y 9" con cuero natural, perfectos para música latina.',
      especificaciones: [
        { etiqueta: 'Tamaño', valor: '8" y 9"' },
        { etiqueta: 'Material', valor: 'Madera de teca' },
        { etiqueta: 'Parche', valor: 'Cuero natural de res' },
        { etiqueta: 'Ideal para', valor: 'Música latina y caribeña' }
      ],
      imagen: 'image/bongo.jpg'
    },
    {
      id: 3,
      nombre: 'Timbales 14" y 15"',
      precio: 'Q 1,850.00',
      descripcion: 'Cáscara de acero cromado con soporte y platillos, ideal para salsa y cumbia.',
      especificaciones: [
        { etiqueta: 'Cáscara', valor: 'Acero cromado' },
        { etiqueta: 'Accesorios', valor: 'Soporte con platillos y campana' },
        { etiqueta: 'Base', valor: 'Madera reforzada' },
        { etiqueta: 'Ideal para', valor: 'Salsa, merengue, cumbia' }
      ],
      imagen: 'image/timbales.jpg'
    },
    {
      id: 4,
      nombre: 'Conga 12" Tumbadora',
      precio: 'Q 980.00',
      descripcion: 'Conga de fibra de vidrio con cuero sintético, ideal para ensambles.',
      especificaciones: [
        { etiqueta: 'Altura', valor: '76 cm' },
        { etiqueta: 'Material', valor: 'Fibra de vidrio' },
        { etiqueta: 'Parche', valor: 'Cuero sintético resistente' },
        { etiqueta: 'Ideal para', valor: 'Ensambles de percusión' }
      ],
      imagen: 'image/conga.jpg'
    },
    {
      id: 5,
      nombre: 'Caja Marcha 14"',
      precio: 'Q 420.00',
      descripcion: 'Caja de marcha con cuerdas metálicas, incluye baqueta y correa.',
      especificaciones: [
        { etiqueta: 'Cuerdas', valor: 'Ajuste metálico' },
        { etiqueta: 'Material', valor: 'Fondo y tarola de madera' },
        { etiqueta: 'Accesorios', valor: 'Baqueta y correa' },
        { etiqueta: 'Ideal para', valor: 'Bandas marciales y escuelas' }
      ],
      imagen: 'image/caja.jpg'
    },
    {
      id: 6,
      nombre: 'Pandero con Platillos',
      precio: 'Q 285.00',
      descripcion: 'Pandero de 10" con 10 pares de platillos de latón, para música folclórica.',
      especificaciones: [
        { etiqueta: 'Diámetro', valor: '10"' },
        { etiqueta: 'Platillos', valor: '10 pares de latón' },
        { etiqueta: 'Aro', valor: 'Madera tallada' },
        { etiqueta: 'Ideal para', valor: 'Música folclórica' }
      ],
      imagen: 'image/pandero.jpg'
    }
  ],
  viento: [
    {
      id: 1,
      nombre: 'Trompeta Bb Profesional',
      precio: 'Q 2,850.00',
      descripcion: 'Trompeta en Si bemol con 3 pistones de latón, incluye estuche rígido.',
      especificaciones: [
        { etiqueta: 'Llaves', valor: '3 pistones de latón' },
        { etiqueta: 'Tipo', valor: 'Bb (Si bemol)' },
        { etiqueta: 'Boca', valor: '11.66 mm' },
        { etiqueta: 'Accesorios', valor: 'Estuche rígido y embocadura' }
      ],
      imagen: 'image/trompeta.jpg'
    },
    {
      id: 2,
      nombre: 'Saxofón Alto Eb',
      precio: 'Q 4,500.00',
      descripcion: 'Saxofón de latón dorado lacado con llaves plateadas, incluye estuche.',
      especificaciones: [
        { etiqueta: 'Cuerpo', valor: 'Latón dorado lacado' },
        { etiqueta: 'Llaves', valor: 'Plateadas con abolladuras de perla' },
        { etiqueta: 'Tipo', valor: 'Eb (Mi bemol)' },
        { etiqueta: 'Accesorios', valor: 'Estuche, boquilla y gorjeo' }
      ],
      imagen: 'image/saxofon.jpg'
    },
    {
      id: 3,
      nombre: 'Flauta Traversa Bb',
      precio: 'Q 1,200.00',
      descripcion: 'Flauta de níquel plata con clave simple, ideal para principiantes.',
      especificaciones: [
        { etiqueta: 'Cuerpo', valor: 'Níquel plata' },
        { etiqueta: 'Mecánica', valor: 'Claves simples' },
        { etiqueta: 'Boca', valor: 'Tipo parábola' },
        { etiqueta: 'Ideal para', valor: 'Principiantes e intermedios' }
      ],
      imagen: 'image/flauta.jpg'
    },
    {
      id: 4,
      nombre: 'Trombón Tenor Bb',
      precio: 'Q 3,100.00',
      descripcion: 'Trombón abierto con émbolo en bronce lacado satinado, incluye estuche.',
      especificaciones: [
        { etiqueta: 'Tipo', valor: 'Abierto con émbolo' },
        { etiqueta: 'Diámetro del tubo', valor: '12.70 mm' },
        { etiqueta: 'Material', valor: 'Bronce lacado satinado' },
        { etiqueta: 'Accesorios', valor: 'Estuche y embocadura' }
      ],
      imagen: 'image/trombon.jpg'
    },
    {
      id: 5,
      nombre: 'Corneta Bb Compañera',
      precio: 'Q 1,750.00',
      descripcion: 'Corneta de latón dorado con campana de 15 cm, para bandas militares.',
      especificaciones: [
        { etiqueta: 'Llaves', valor: '3 pistones' },
        { etiqueta: 'Campana', valor: '15 cm de diámetro' },
        { etiqueta: 'Material', valor: 'Latón dorado' },
        { etiqueta: 'Ideal para', valor: 'Bandas militares y de guerra' }
      ],
      imagen: 'image/corneta.jpg'
    },
    {
      id: 6,
      nombre: 'Clarinete Bb de 17 Llaves',
      precio: 'Q 2,300.00',
      descripcion: 'Clarinete Boehm de granadilla sintética con llaves de níquel, incluye estuche.',
      especificaciones: [
        { etiqueta: 'Material', valor: 'Granadilla sintética' },
        { etiqueta: 'Llaves', valor: 'Níquel plateado' },
        { etiqueta: 'Tipo', valor: 'Boehm' },
        { etiqueta: 'Accesorios', valor: 'Estuche, boquilla y gorjeos' }
      ],
      imagen: 'image/clarinete.jpg'
    }
  ],
  audio: [
    {
      id: 1,
      nombre: 'Micrófono Dinámico Vocal',
      precio: 'Q 450.00',
      descripcion: 'Micrófono cardioide dinámico con conector XLR, ideal para voces en vivo.',
      especificaciones: [
        { etiqueta: 'Tipo', valor: 'Cardioide dinámico' },
        { etiqueta: 'Frecuencia', valor: '50 Hz - 15 kHz' },
        { etiqueta: 'Conector', valor: 'XLR macho' },
        { etiqueta: 'Ideal para', valor: 'Voces en vivo y presentaciones' }
      ],
      imagen: 'image/microfono-dinamico.jpg'
    },
    {
      id: 2,
      nombre: 'Mesa de Mezclas 12 Canales',
      precio: 'Q 2,800.00',
      descripcion: 'Mesa de 12 canales con efectos y alimentación phantom de 48V.',
      especificaciones: [
        { etiqueta: 'Canales', valor: '6 mono + 3 estéreo' },
        { etiqueta: 'Efectos', valor: 'Reverb y delay integrados' },
        { etiqueta: 'Salida', valor: 'Main L/R + Monitor' },
        { etiqueta: 'Alimentación', valor: 'Phantom 48V' }
      ],
      imagen: 'image/mesa-mezcladora.png'
    },
    {
      id: 3,
      nombre: 'Par de Bafles Activos 15"',
      precio: 'Q 5,600.00',
      descripcion: 'Bafles activos de 1000W cada uno, para eventos de hasta 200 personas.',
      especificaciones: [
        { etiqueta: 'Potencia', valor: '1000W cada uno' },
        { etiqueta: 'Respuesta', valor: '40 Hz - 20 kHz' },
        { etiqueta: 'Entradas', valor: 'XLR + 1/4"' },
        { etiqueta: 'Ideal para', valor: 'Eventos de hasta 200 personas' }
      ],
      imagen: 'image/bafle-par.jpg'
    },
    {
      id: 4,
      nombre: 'Monitor de Escenario 12"',
      precio: 'Q 1,950.00',
      descripcion: 'Monitor tipo wedge de 250W RMS con ángulo de inclinación de 40°.',
      especificaciones: [
        { etiqueta: 'Tipo', valor: 'Monitor wedge' },
        { etiqueta: 'Potencia', valor: '250W RMS' },
        { etiqueta: 'Ángulo de inclinación', valor: '40°' },
        { etiqueta: 'Ideal para', valor: 'Escenarios y ensayos' }
      ],
      imagen: 'image/parlante-monitor.jpg'
    },
    {
      id: 5,
      nombre: 'Subwoofer Activo 18"',
      precio: 'Q 4,200.00',
      descripcion: 'Subwoofer de 2000W en carcasa MDF reforzado, ideal para eventos grandes.',
      especificaciones: [
        { etiqueta: 'Potencia', valor: '2000W' },
        { etiqueta: 'Frecuencia', valor: '20 Hz - 150 Hz' },
        { etiqueta: 'Carcasa', valor: 'MDF reforzado con asas' },
        { etiqueta: 'Ideal para', valor: 'Sonido en eventos grandes' }
      ],
      imagen: 'image/subwoofer.jpg'
    },
    {
      id: 6,
      nombre: 'Cable XLR 10 Metros (Unidad)',
      precio: 'Q 85.00',
      descripcion: 'Cable blindado XLR macho a hembra con guía externa de PVC resistente.',
      especificaciones: [
        { etiqueta: 'Conectores', valor: 'XLR macho a hembra' },
        { etiqueta: 'Blindaje', valor: 'Cobre estañado' },
        { etiqueta: 'Guía externa', valor: 'PVC resistente' },
        { etiqueta: 'Ideal para', valor: 'Conexión de micrófonos y equipos' }
      ],
      imagen: 'image/cable-xlr.jpg'
    }
  ],
  iluminacion: [
    {
      id: 1,
      nombre: 'Par LED RGB 54W',
      precio: 'Q 580.00',
      descripcion: 'Par LED COB RGB con cobertura de 120°, control DMX512 y manual.',
      especificaciones: [
        { etiqueta: 'Tipo', valor: 'LED COB RGB' },
        { etiqueta: 'Cobertura', valor: '120°' },
        { etiqueta: 'Control', valor: 'DMX512 + Manual' },
        { etiqueta: 'Ideal para', valor: 'Escenarios y fiestas' }
      ],
      imagen: 'image/par-led.jpg'
    },
    {
      id: 2,
      nombre: 'Cabeza Móvil LED 200W',
      precio: 'Q 2,400.00',
      descripcion: 'Cabeza móvil con motor Pan/Tilt 540°/270°, 12 colores y 14 gobos rotativos.',
      especificaciones: [
        { etiqueta: 'Motor', valor: 'Pan/Tilt 540°/270°' },
        { etiqueta: 'Colores', valor: '12 + blanco' },
        { etiqueta: 'Gobos', valor: '14 rotativos + 11 fijos' },
        { etiqueta: 'Control', valor: 'DMX512 12/16 canales' }
      ],
      imagen: 'image/cabeza-movil.jpg'
    },
    {
      id: 3,
      nombre: 'Láser Show RGB 1W',
      precio: 'Q 3,100.00',
      descripcion: 'Láser RGB de 1W con 128 patrones preprogramados y control por sonido.',
      especificaciones: [
        { etiqueta: 'Potencia', valor: '1W RGB' },
        { etiqueta: 'Efectos', valor: '128 patrones preprogramados' },
        { etiqueta: 'Control', valor: 'Sound Active + DMX' },
        { etiqueta: 'Ideal para', valor: 'Eventos musicales y discotecas' }
      ],
      imagen: 'image/laser-show.jpg'
    },
    {
      id: 4,
      nombre: 'Strobe LED 300W',
      precio: 'Q 720.00',
      descripcion: 'Strobe blanco frío 6500K con frecuencia ajustable de 1-25 Hz.',
      especificaciones: [
        { etiqueta: 'Frecuencia', valor: '1-25 Hz ajustable' },
        { etiqueta: 'Color', valor: 'Blanco frío 6500K' },
        { etiqueta: 'Control', valor: 'DMX + Sound Active' },
        { etiqueta: 'Ideal para', valor: 'Efectos de flash en eventos' }
      ],
      imagen: 'image/strobe.jpg'
    },
    {
      id: 5,
      nombre: 'Controlador DMX 192 Canales',
      precio: 'Q 890.00',
      descripcion: 'Controlador de 192 canales con conexión XLR y batería recargable.',
      especificaciones: [
        { etiqueta: 'Canales', valor: '192 (12 escenarios)' },
        { etiqueta: 'Conexión', valor: '3 pin XLR' },
        { etiqueta: 'Batería', valor: 'Recargable incluida' },
        { etiqueta: 'Ideal para', valor: 'Control de iluminación en vivo' }
      ],
      imagen: 'image/usb-dmx.jpg'
    },
    {
      id: 6,
      nombre: 'Máquina de Humo 1500W',
      precio: 'Q 1,350.00',
      descripcion: 'Máquina de humo de 1500W con calefacción de 8 minutos, incluye control remoto.',
      especificaciones: [
        { etiqueta: 'Potencia', valor: '1500W' },
        { etiqueta: 'Calefacción', valor: '8 minutos' },
        { etiqueta: 'Capacidad', valor: '2.5 litros de líquido' },
        { etiqueta: 'Accesorios', valor: 'Control remoto + líquido' }
      ],
      imagen: 'image/humo-maquina.jpg'
    }
  ],
  cuerdas: [
    {
      id: 1,
      nombre: 'Guitarra Acústica Dreadnought',
      precio: 'Q 1,150.00',
      descripcion: 'Guitarra de caoba laminada con tapa de pícea sólida, 6 cuerdas de acero.',
      especificaciones: [
        { etiqueta: 'Cuerpo', valor: 'Caoba laminada' },
        { etiqueta: 'Tapa', valor: 'Pícea sólida' },
        { etiqueta: 'Cuerdas', valor: '6 de acero' },
        { etiqueta: 'Ideal para', valor: 'Principiantes y composición' }
      ],
      imagen: 'image/guitarra-acustica.jpg'
    },
    {
      id: 2,
      nombre: 'Guitarra Eléctrica Stratocaster',
      precio: 'Q 2,600.00',
      descripcion: 'Stratocaster de aliso con cuello de arce y 3 pickups single-coil.',
      especificaciones: [
        { etiqueta: 'Cuello', valor: 'Arce con diapasón de palisandro' },
        { etiqueta: 'Pickups', valor: '3 single-coil' },
        { etiqueta: 'Cuerpo', valor: 'Aliso' },
        { etiqueta: 'Ideal para', valor: 'Rock, blues y pop' }
      ],
      imagen: 'image/guitarra-electrica.jpg'
    },
    {
      id: 3,
      nombre: 'Bajo Eléctrico 4 Cuerdas',
      precio: 'Q 2,200.00',
      descripcion: 'Bajo de aliso con cuello de arce atornillado y 2 pickups jazz bass.',
      especificaciones: [
        { etiqueta: 'Cuerpo', valor: 'Aliso' },
        { etiqueta: 'Cuello', valor: 'Arce atornillado' },
        { etiqueta: 'Pickups', valor: '2 jazz bass' },
        { etiqueta: 'Ideal para', valor: 'Rock, funk y jazz' }
      ],
      imagen: 'image/bajo-electrico.jpg'
    },
    {
      id: 4,
      nombre: 'Violín 4/4 Estudiante',
      precio: 'Q 1,800.00',
      descripcion: 'Violín completo de maple y pícea, incluye arco, estuche y resina.',
      especificaciones: [
        { etiqueta: 'Tamaño', valor: 'Completo (4/4)' },
        { etiqueta: 'Cuerpo', valor: 'Maple y pícea' },
        { etiqueta: 'Accesorios', valor: 'Arco, estuche y resina' },
        { etiqueta: 'Ideal para', valor: 'Principiantes de orquesta' }
      ],
      imagen: 'image/violin.jpg'
    },
    {
      id: 5,
      nombre: 'Ukelele Soprano 21"',
      precio: 'Q 280.00',
      descripcion: 'Ukelele de caoba laminada con 4 cuerdas de nailon, compacto y para viajes.',
      especificaciones: [
        { etiqueta: 'Cuerpo', valor: 'Caoba laminada' },
        { etiqueta: 'Cuerdas', valor: '4 de nailon' },
        { etiqueta: 'Tamaño', valor: 'Cuerpo soprano compacto' },
        { etiqueta: 'Ideal para', valor: 'Principiantes y viajes' }
      ],
      imagen: 'image/ukelele.png'
    },
    {
      id: 6,
      nombre: 'Set de Cuerdas para Guitarra Acústica',
      precio: 'Q 65.00',
      descripcion: 'Set D\'Addario extra light .010-.047, acero con bronce 80/20.',
      especificaciones: [
        { etiqueta: 'Marca', valor: 'D\'Addario' },
        { etiqueta: 'Gauge', valor: 'Extra Light (.010 - .047)' },
        { etiqueta: 'Material', valor: 'Acero con bronce 80/20' },
        { etiqueta: 'Ideal para', valor: 'Reposición y mantenimiento' }
      ],
      imagen: 'image/cuerdas-set.jpg'
    }
  ]
}

export { productos }