# inclassClone

**Ejercicio de maquetación: reconstruir la web de una marca de mobiliario desde cero
con Angular 17**, tomando como referencia la de [INCLASS](https://www.inclass.es).

> ⚠️ **No es un proyecto oficial de INCLASS ni tengo relación con la empresa.**
> Es un ejercicio de práctica sin ánimo comercial. El contenido de muestra
> (textos, datos de contacto, nombres de producto) es de la marca original y se usa
> sólo para que la maqueta tenga contenido realista. Ni está desplegado ni se distribuye.

---

## Por qué este ejercicio

Copiar una web bonita es fácil; reconstruirla **con arquitectura de verdad** no. La
gracia estaba en montar una web de catálogo con la estructura que tendría en producción:
rutas con lazy loading, guard de sesión, servicios separados del componente y todo el
contenido fuera del HTML.

## Qué tiene

- **Catálogo** de productos y colecciones, con ficha de detalle
- **Cuenta de usuario** con login y zona de reservas protegida por `authGuard`
- **Multiidioma** en la estructura de navegación (EN/ES/FR/DE/IT)
- **Contenido desacoplado**: todo vive en `src/app/data/site-content.json`,
  así que cambiar la web no obliga a tocar componentes
- **Descarga de recursos** con un script propio (`scripts/download-assets.mjs`)
  en vez de arrastrar imágenes al repositorio

## Cómo está organizado

```
src/app/
├── core/
│   ├── guards/auth.guard.ts        protege las rutas privadas
│   ├── models/catalog.model.ts     tipado del catálogo
│   └── services/                   auth y catálogo, inyectables
├── data/site-content.json          TODO el contenido de la web
├── layout/                         header y footer
├── features/hero/                  bloques reutilizables
└── pages/                          una carpeta por página
```

## Stack

Angular 17 (standalone components) · TypeScript · RxJS · PostCSS

## Ejecutarlo

```bash
npm install
npm start        # http://localhost:4200
```

## Nota honesta sobre este repositorio

La autenticación es **simulada**: los usuarios se guardan en `localStorage` y no hay
backend detrás. Es intencionado — el ejercicio era de frontend — pero que quede claro
que eso no es un sistema de login válido para producción.
