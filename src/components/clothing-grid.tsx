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
  colors: string[];
  sizes: Size;
}
const products = [
  {
    id: 1,
    name: 'Футболка оверсайз МОСКВА',
    image: '/clothes-1.svg',

    colors: ['#BD93FF', '#FFFFFF', '#64ACFF'],
    sizes: { XS: 2, S: 2, M: 2, L: 1, XL: 1 },
  },
  {
    id: 2,
    name: 'Футболка оверсайз МОСКВА',
    image: '/clothes-2.svg',

    colors: ['#E60528', '#64ACFF', '#BD93FF'],
    sizes: { XS: 1, S: 1, M: 2, L: 2, XL: 2 },
  },
  {
    id: 3,
    name: 'Лонгслив мужской МОСКВА',
    image: '/clothes-3.svg',

    colors: ['#E60528'],
    sizes: { XS: 2, S: 2, M: 2, L: 1, XL: 1 },
  },
  {
    id: 4,
    name: 'Худи оверсайз МОСКВА',
    image: '/clothes-4.svg',

    colors: ['#FFC0CB', '#FFFFFF', '#000000'],
    sizes: { XS: 1, S: 2, M: 1, L: 2, XL: 2 },
  },
  {
    id: 5,
    name: 'Толстовка на молнии МОСКВА',
    image: '/clothes-5.svg',

    colors: ['#BD93FF', '#000000', '#FFFFFF'],
    sizes: { XS: 2, S: 2, M: 2, L: 1, XL: 1 },
  },
  {
    id: 6,
    name: 'Бомбер на кнопках МОСКВА',
    image: '/clothes-6.svg',

    colors: ['#000000', '#FFFFFF', '#BD93FF'],
    sizes: { XS: 1, S: 2, M: 1, L: 2, XL: 2 },
  },
];



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
        paddingLeft: '0',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '40px',
        rowGap: '119px',
        alignSelf: 'stretch',
        borderRadius: '40px',
        border: '3px solid #DBDBDB',
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
          paddingLeft: '40px',
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
            borderRadius: '20px',
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
              width: '100%',
              height: '420px',
              objectFit: 'contain',
              objectPosition: 'left',
              marginLeft: 0,
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
                display: 'flex',
                gap: '20px',
                marginLeft: 'auto',
                justifyContent: 'flex-end',
              }}>
              {product.colors.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div
            style={{
              marginTop: '30px',
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: '10px',
              }}>
              {Object.entries(product.sizes).map(([size, quantity], index, array) => (
                <>
                  <div
                    key={size}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '10px',
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
                      {quantity}{' '}
                      <span
                        style={{
                          color: '#000',
                          fontFamily: 'Inter',
                          fontSize: '32px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '120%',
                          opacity: 0.4,
                        }}>
                        шт.
                      </span>
                    </div>
                  </div>

                  {index < array.length - 1 && (
                    <div
                      style={{
                        height: '2px',
                        alignSelf: 'stretch',
                        borderRadius: '999px',
                        opacity: 0.1,
                        background: '#000',
                      }}
                    />
                  )}
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
  const [loading, setLoading] = React.useState(true);
  const [clothesData, setClothesData] = React.useState<Product[]>(products);

  React.useEffect(() => {
    const fetchClothes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/clothes');
        
        if (!response.ok) {
          throw new Error('Failed to fetch clothes data');
        }
        
        const data = await response.json();
        
        // Transform the API data to match our Product interface
        const transformedData: Product[] = data.map((item: any, index: number) => {
          // Extract colors from the API response
          const colors = Array.isArray(item.colors) 
            ? item.colors 
            : typeof item.colors === 'string' 
              ? item.colors.split(',').map(color => {
                  // Map color names to hex codes
                  switch(color.trim().toLowerCase()) {
                    case 'red': return '#E60528';
                    case 'blue': return '#64ACFF';
                    case 'white': return '#FFFFFF';
                    case 'black': return '#000000';
                    case 'purple': return '#BD93FF';
                    case 'pink': return '#FFC0CB';
                    default: return '#000000';
                  }
                })
              : ['#000000'];
          
          // Transform sizes array to Size object
          const sizes: Size = { XS: 0, S: 0, M: 0, L: 0, XL: 0 };
          if (Array.isArray(item.sizes)) {
            item.sizes.forEach((sizeItem: { size: string; amount: number }) => {
              if (sizeItem.size in sizes) {
                sizes[sizeItem.size as keyof Size] = sizeItem.amount;
              }
            });
          }
          
          return {
            id: index + 1,
            name: item.name || `Product ${index + 1}`,
            image: `/clothes-${index + 1}.svg`, // Use existing images
            colors,
            sizes
          };
        });
        
        setClothesData(transformedData);
      } catch (error) {
        console.error('Error fetching clothes data:', error);
        // Fallback to hardcoded data in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, []);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}>
      {/* Products grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '24px' }}>Загрузка данных...</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '20px',
            marginBottom: '24px',
          }}>
          {clothesData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
