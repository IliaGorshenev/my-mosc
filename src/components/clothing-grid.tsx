import React from 'react';

interface Size {
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
}

interface Product {
  id: number;
  name: string;
  image: string;
  outOfStock: number;
  colors: string[];
  sizes: Size;
}
const products = [
  {
    id: 1,
    name: 'Футболка оверсайз МОСКВА',
    image: '/clothes-1.svg',
    outOfStock: 8,
    colors: ['#BD93FF', '#FFFFFF', '#64ACFF'],
    sizes: { XS: 2, S: 2, M: 2, L: 1, XL: 1 },
  },
  {
    id: 2,
    name: 'Футболка оверсайз МОСКВА',
    image: '/clothes-2.svg',
    outOfStock: 8,
    colors: ['#E60528', '#64ACFF', '#BD93FF'],
    sizes: { XS: 1, S: 1, M: 2, L: 2, XL: 2 },
  },
  {
    id: 3,
    name: 'Лонгслив мужской МОСКВА',
    image: '/clothes-3.svg',
    outOfStock: 8,
    colors: ['#E60528'],
    sizes: { XS: 2, S: 2, M: 2, L: 1, XL: 1 },
  },
  {
    id: 4,
    name: 'Худи оверсайз МОСКВА',
    image: '/clothes-4.svg',
    outOfStock: 8,
    colors: ['#FFC0CB', '#FFFFFF', '#000000'],
    sizes: { XS: 1, S: 2, M: 1, L: 2, XL: 2 },
  },
  {
    id: 5,
    name: 'Толстовка на молнии МОСКВА',
    image: '/clothes-5.svg',
    outOfStock: 8,
    colors: ['#BD93FF', '#000000', '#FFFFFF'],
    sizes: { XS: 2, S: 2, M: 2, L: 1, XL: 1 },
  },
  {
    id: 6,
    name: 'Бомбер на кнопках МОСКВА',
    image: '/clothes-6.svg',
    outOfStock: 8,
    colors: ['#000000', '#FFFFFF', '#BD93FF'],
    sizes: { XS: 1, S: 2, M: 1, L: 2, XL: 2 },
  },
  {
    id: 7,
    name: 'Шоппер классика МОСКВА',
    image: '/clothes-7.svg',
    outOfStock: 8,
    colors: ['#BD93FF', '#FFFFFF', '#64ACFF'],
    sizes: { XS: 0, S: 2, M: 2, L: 2, XL: 2 },
  },
  {
    id: 8,
    name: 'Сумка-тоут оверсайз МОСКВА',
    image: '/clothes-8.svg',
    outOfStock: 8,
    colors: ['#FFC0CB', '#BD93FF', '#000000'],
    sizes: { XS: 0, S: 2, M: 1, L: 2, XL: 2 },
  },
];

// ... existing interfaces and product data ...

const ColorSwatch: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      width: '48px',
      height: '48px',
      borderRadius: '999px',
      backgroundColor: color,
      border: '2px solid #B2B2B2',
    }}
  />
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // Calculate total quantity for this product
  const totalQuantity = Object.values(product.sizes).reduce((sum, qty) => sum + qty, 0);

  return (
    <div
      style={{
        display: 'flex',
        padding: '40px',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '40px',
        flex: '1 0 0',
        alignSelf: 'stretch',
        borderRadius: '40px',
        border: '3px solid rgba(252, 230, 233, 0.20)',
        background: '#FFF',
      }}>
      {/* Header with name and total quantity */}
      <div
        style={{
          display: 'flex',
          padding: '10px 20px',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '5px',
          alignSelf: 'stretch',
        }}>
        <h3
          style={{
            color: '#191919',
            fontFamily: 'Inter',
            fontSize: '40px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
            margin: 0,
          }}>
          {product.name}
        </h3>
        <div
          style={{
            backgroundColor: '#E60528',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            fontFamily: 'Inter',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
          }}>
          {totalQuantity} шт.
        </div>
      </div>

      {/* Content area with image and details */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          gap: '40px',
        }}>
        {/* Left - Product image */}
        <div
          style={{
            flex: '0 0 40%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              maxWidth: '100%',
              height: '400px',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* Right - Product details */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}>
          {/* Colors */}
          <div>
            <div
              style={{
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '120%',
                marginBottom: '15px',
              }}>
              Цвета:
            </div>
            <div
              style={{
                display: 'flex',
                gap: '20px',
              }}>
              {product.colors.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            <div
              style={{
                color: '#000',
                fontFamily: 'Inter',
                fontSize: '32px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '120%',
                marginBottom: '15px',
              }}>
              Размеры:
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: '10px',
              }}>
              {Object.entries(product.sizes).map(([size, quantity]) => (
                <>
                  <div
                    key={size}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <div
                      style={{
                        color: '#000',
                        fontFamily: 'Inter',
                        fontSize: '32px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '120%',
                      }}>
                      {size}
                    </div>
                    <div
                      style={{
                        color: quantity === 0 ? '#E60528' : '#000',
                        fontFamily: 'Inter',
                        fontSize: '32px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '120%',
                      }}>
                      {quantity} шт
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      height: '2px',
                      alignSelf: 'stretch',
                      borderRadius: '999px',
                      opacity: 0.1,
                      background: '#000',
                    }}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClothingGrid: React.FC = () => {
  // Calculate total quantity
//   const totalQuantity = products.reduce((total, product) => {
//     return total + Object.values(product.sizes).reduce((sum, qty) => sum + qty, 0);
//   }, 0);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}>
      {/* Products grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '20px',
          marginBottom: '24px',
        }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
